import type { ChatMessage } from '../../../types/admin';

interface Props {
  message: ChatMessage;
  isOwn: boolean;
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  if (isToday) return time;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday ${time}`;
  return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ${time}`;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = [
  'bg-cyan-600', 'bg-purple-600', 'bg-emerald-600', 'bg-amber-600',
  'bg-pink-600', 'bg-blue-600', 'bg-red-600', 'bg-indigo-600',
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function MessageBubble({ message, isOwn }: Props) {
  const senderName = message.sender_name || 'Unknown';

  // System messages
  if (message.message_type === 'system') {
    return (
      <div className="flex justify-center py-2">
        <span className="rounded-full bg-gray-800/50 px-4 py-1 text-xs text-gray-500">
          {message.content}
        </span>
      </div>
    );
  }

  // Deleted messages
  if (message.is_deleted) {
    return (
      <div className={`flex py-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <span className="text-xs italic text-gray-600">This message was deleted</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-2.5 py-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isOwn && (
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getAvatarColor(senderName)}`}>
          <span className="text-xs font-bold text-white">{getInitials(senderName)}</span>
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[65%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <p className="mb-0.5 text-xs font-medium text-gray-400">{senderName}</p>
        )}
        <div
          className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
            isOwn
              ? 'rounded-tr-md bg-cyan-600 text-white'
              : 'rounded-tl-md bg-gray-800 text-gray-200'
          }`}
        >
          {message.content}
          {message.is_edited && (
            <span className="ml-1.5 text-[10px] opacity-60">(edited)</span>
          )}
        </div>
        <p className={`mt-0.5 text-[10px] text-gray-600 ${isOwn ? 'text-right' : 'text-left'}`}>
          {formatTimestamp(message.created_at)}
        </p>
      </div>
    </div>
  );
}
