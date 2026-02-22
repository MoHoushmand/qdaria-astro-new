import { useState, useEffect, useRef } from 'react';
import {
  Hash, Lock, Circle, Users, PanelRightClose, PanelRightOpen,
} from 'lucide-react';
import { ChatProvider, useChatContext } from './ChatProvider';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import type { ChatChannel } from '../../../types/admin';

// Mock members for the sidebar
const MEMBERS = [
  { id: '1', name: 'Daniel Mo Houshmand', online: true },
  { id: '2', name: 'Svein-Erik Nilsen', online: true },
  { id: '3', name: 'Gaspar Alvarado', online: true },
  { id: '4', name: 'Sharareh M. Shariat Panahi', online: false },
  { id: '5', name: 'Caroline Woie', online: true },
  { id: '6', name: 'Rajesh Chavan', online: false },
  { id: '7', name: 'Nick Saaf', online: true },
  { id: '8', name: 'Fredrik Krey Stubberud', online: true },
  { id: '9', name: 'Yulia Ginzburg', online: false },
  { id: '10', name: 'John Kristiansen', online: false },
  { id: '11', name: 'Nils Bjelland Gronvold', online: false },
  { id: '12', name: 'Lindsay Sanner', online: false },
  { id: '13', name: 'Lillian Kristiansen', online: false },
  { id: '14', name: 'Daria Houshmand', online: false },
];

function ChannelListItem({ channel, isActive, onClick }: {
  channel: ChatChannel; isActive: boolean; onClick: () => void;
}) {
  const lastPreview = channel.last_message?.content ?? '';
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
        isActive
          ? 'bg-cyan-500/10 text-cyan-400'
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
      }`}
    >
      {channel.is_private ? (
        <Lock className="h-4 w-4 shrink-0 text-gray-500" />
      ) : (
        <Hash className="h-4 w-4 shrink-0 text-gray-500" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{channel.name}</span>
          {(channel.unread_count ?? 0) > 0 && (
            <span className="ml-1 rounded-full bg-cyan-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {channel.unread_count}
            </span>
          )}
        </div>
        {lastPreview && (
          <p className="truncate text-xs text-gray-600">{lastPreview}</p>
        )}
      </div>
    </button>
  );
}

function ChatInner() {
  const { channels, activeChannel, messages, isConnected, setActiveChannel, sendMessage } = useChatContext();
  const [showMembers, setShowMembers] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentChannel = channels.find(c => c.id === activeChannel);
  const onlineCount = MEMBERS.filter(m => m.online).length;

  return (
    <div className="flex h-[calc(100vh-220px)] min-h-[500px] rounded-xl border border-gray-800 bg-[#111827] overflow-hidden">
      {/* Left: Channel list */}
      <div className="flex w-[250px] shrink-0 flex-col border-r border-gray-800 bg-[#0d1117]">
        <div className="border-b border-gray-800 px-4 py-3">
          <h3 className="text-sm font-semibold text-white">Channels</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-500">
              {isConnected ? 'Connected' : 'Local mode'}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {channels.map(ch => (
            <ChannelListItem
              key={ch.id}
              channel={ch}
              isActive={ch.id === activeChannel}
              onClick={() => setActiveChannel(ch.id)}
            />
          ))}
        </div>
      </div>

      {/* Center: Messages */}
      <div className="flex flex-1 flex-col">
        {/* Channel header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-white">{currentChannel?.name ?? 'Select a channel'}</span>
            {currentChannel?.description && (
              <>
                <span className="text-gray-700">|</span>
                <span className="truncate text-xs text-gray-500">{currentChannel.description}</span>
              </>
            )}
          </div>
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            title={showMembers ? 'Hide members' : 'Show members'}
          >
            {showMembers ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Hash className="mb-3 h-12 w-12 text-gray-700" />
              <p className="text-lg font-medium text-gray-400">
                Welcome to #{currentChannel?.name}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {currentChannel?.description || 'This is the start of the conversation.'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.sender_id === '1'}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="border-t border-gray-800 px-4 py-3">
          <MessageInput
            onSend={sendMessage}
            disabled={!activeChannel}
          />
        </div>
      </div>

      {/* Right: Members panel */}
      {showMembers && (
        <div className="w-[200px] shrink-0 border-l border-gray-800 bg-[#0d1117]">
          <div className="border-b border-gray-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-white">Members</span>
            </div>
            <span className="text-xs text-gray-500">{onlineCount} online</span>
          </div>
          <div className="overflow-y-auto p-2">
            {/* Online */}
            <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              Online - {onlineCount}
            </p>
            {MEMBERS.filter(m => m.online).map(m => (
              <div key={m.id} className="flex items-center gap-2 rounded-md px-2 py-1.5">
                <div className="relative">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-[10px] font-bold text-gray-300">
                    {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
                </div>
                <span className="truncate text-xs text-gray-300">{m.name.split(' ')[0]}</span>
              </div>
            ))}
            {/* Offline */}
            <p className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              Offline - {MEMBERS.length - onlineCount}
            </p>
            {MEMBERS.filter(m => !m.online).map(m => (
              <div key={m.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 opacity-50">
                <div className="relative">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-[10px] font-bold text-gray-300">
                    {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 fill-gray-600 text-gray-600" />
                </div>
                <span className="truncate text-xs text-gray-500">{m.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatLayout() {
  return (
    <ChatProvider>
      <ChatInner />
    </ChatProvider>
  );
}
