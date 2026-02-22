import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ChatChannel, ChatMessage } from '../../../types/admin';

interface ChatContextType {
  channels: ChatChannel[];
  activeChannel: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  setActiveChannel: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}

const DEFAULT_CHANNELS: ChatChannel[] = [
  {
    id: 'ch-general',
    name: 'general',
    description: 'General discussion for the team',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-engineering',
    name: 'engineering',
    description: 'Engineering and development topics',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-business',
    name: 'business',
    description: 'Business strategy and investor relations',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ch-random',
    name: 'random',
    description: 'Off-topic, fun, and random conversations',
    type: 'group',
    is_private: false,
    unread_count: 0,
    created_at: '2025-01-01T00:00:00Z',
  },
];

// Start with empty messages -- real messages come from the API or are added by users
const SEED_MESSAGES: Record<string, ChatMessage[]> = {};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [channels, setChannels] = useState<ChatChannel[]>(DEFAULT_CHANNELS);
  const [activeChannel, setActiveChannel] = useState<string | null>('ch-general');
  const [messageStore, setMessageStore] = useState<Record<string, ChatMessage[]>>(SEED_MESSAGES);
  const [isConnected, setIsConnected] = useState(false);
  const msgCounter = useRef(100);

  // Try to load channels from API on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/admin/chat/channels');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.channels?.length > 0) {
            setChannels(data.channels);
          }
        }
      } catch {
        // fallback to defaults
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Load messages when active channel changes
  useEffect(() => {
    if (!activeChannel) return;
    let cancelled = false;
    async function loadMessages() {
      try {
        const res = await fetch(`/api/admin/chat/messages?channel_id=${activeChannel}&limit=50`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data.messages?.length > 0) {
            setMessageStore(prev => ({ ...prev, [activeChannel!]: data.messages }));
          }
        }
      } catch {
        // fallback to seed messages
      }
    }
    loadMessages();
    return () => { cancelled = true; };
  }, [activeChannel]);

  // Try Supabase Realtime connection
  useEffect(() => {
    let subscription: any = null;
    async function connectRealtime() {
      try {
        const { supabase } = await import('../../../lib/supabase/client');
        if (!supabase) {
          setIsConnected(false);
          return;
        }

        subscription = supabase
          .channel('chat-messages')
          .on(
            'postgres_changes' as any,
            { event: 'INSERT', schema: 'public', table: 'chat_messages' },
            (payload: any) => {
              const msg = payload.new as ChatMessage;
              setMessageStore(prev => ({
                ...prev,
                [msg.channel_id]: [...(prev[msg.channel_id] || []), msg],
              }));
            }
          )
          .subscribe((status: string) => {
            setIsConnected(status === 'SUBSCRIBED');
          });
      } catch {
        setIsConnected(false);
      }
    }
    connectRealtime();
    return () => {
      if (subscription) {
        subscription.unsubscribe?.();
      }
    };
  }, []);

  const messages = activeChannel ? (messageStore[activeChannel] || []) : [];

  const sendMessage = useCallback(async (content: string) => {
    if (!activeChannel || !content.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-local-${++msgCounter.current}`,
      channel_id: activeChannel,
      sender_id: '1',
      sender_name: 'You',
      content: content.trim(),
      message_type: 'text',
      is_edited: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
    };

    // Optimistic update
    setMessageStore(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    // Try API
    try {
      const res = await fetch('/api/admin/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel_id: activeChannel,
          content: content.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          // Replace optimistic message with server message
          setMessageStore(prev => ({
            ...prev,
            [activeChannel]: (prev[activeChannel] || []).map(m =>
              m.id === newMsg.id ? data.message : m
            ),
          }));
        }
      }
    } catch {
      // Keep optimistic update
    }
  }, [activeChannel]);

  // Update last_message on channels
  const enrichedChannels = channels.map(ch => {
    const chMsgs = messageStore[ch.id];
    if (chMsgs?.length) {
      return { ...ch, last_message: chMsgs[chMsgs.length - 1] };
    }
    return ch;
  });

  return (
    <ChatContext.Provider
      value={{
        channels: enrichedChannels,
        activeChannel,
        messages,
        isConnected,
        setActiveChannel,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
