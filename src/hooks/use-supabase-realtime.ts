import { useEffect, useRef, useState } from 'react';

/**
 * Hook to subscribe to Supabase Realtime postgres_changes on a given table.
 *
 * @param table - The database table to subscribe to
 * @param filter - Optional filter string (e.g. "channel_id=eq.abc")
 * @param onInsert - Callback when a new row is inserted
 * @param onUpdate - Optional callback for row updates
 * @param onDelete - Optional callback for row deletions
 * @returns Object with `isConnected` status
 */
export function useSupabaseRealtime(
  table: string,
  filter: string | null,
  onInsert: (payload: any) => void,
  onUpdate?: (payload: any) => void,
  onDelete?: (payload: any) => void
): { isConnected: boolean } {
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionRef = useRef<any>(null);

  // Store latest callbacks in refs to avoid re-subscribing on every render
  const onInsertRef = useRef(onInsert);
  const onUpdateRef = useRef(onUpdate);
  const onDeleteRef = useRef(onDelete);

  useEffect(() => {
    onInsertRef.current = onInsert;
    onUpdateRef.current = onUpdate;
    onDeleteRef.current = onDelete;
  });

  useEffect(() => {
    let cancelled = false;

    async function subscribe() {
      try {
        const { supabase } = await import('../lib/supabase/client');
        if (!supabase || cancelled) {
          setIsConnected(false);
          return;
        }

        const channelName = `realtime-${table}-${filter || 'all'}`;

        const filterConfig: any = {
          event: '*',
          schema: 'public',
          table,
        };
        if (filter) {
          filterConfig.filter = filter;
        }

        const channel = supabase
          .channel(channelName)
          .on('postgres_changes' as any, filterConfig, (payload: any) => {
            switch (payload.eventType) {
              case 'INSERT':
                onInsertRef.current(payload);
                break;
              case 'UPDATE':
                onUpdateRef.current?.(payload);
                break;
              case 'DELETE':
                onDeleteRef.current?.(payload);
                break;
            }
          })
          .subscribe((status: string) => {
            if (!cancelled) {
              setIsConnected(status === 'SUBSCRIBED');
            }
          });

        subscriptionRef.current = channel;
      } catch {
        if (!cancelled) setIsConnected(false);
      }
    }

    subscribe();

    return () => {
      cancelled = true;
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe?.();
        subscriptionRef.current = null;
      }
    };
  }, [table, filter]);

  return { isConnected };
}
