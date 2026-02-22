import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import {
  Plus,
  Sparkles,
  Settings2,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Bot,
  User,
  Copy,
  Check,
  Trash2,
  RotateCcw,
  Loader2,
  ArrowUp,
  X,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface PlaygroundSettings {
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  thinkingMode: boolean;
  deepResearch: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MODELS = [
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Default)' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { value: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite' },
];

const SYSTEM_PRESETS = [
  {
    name: 'CEO Assistant',
    prompt:
      'You are the AI assistant for Daniel Mo Houshmand, CEO of QDaria AS, a quantum computing startup based in Oslo, Norway. Help with executive decisions, company strategy, investor relations, and team management.',
  },
  {
    name: 'Contract Drafter',
    prompt:
      'You are a legal assistant specializing in Norwegian employment law and startup equity agreements. Help draft, review, and analyze employment contracts, NDAs, non-compete clauses, and equity vesting schedules for QDaria AS.',
  },
  {
    name: 'Equity Advisor',
    prompt:
      'You are a startup equity specialist. Help analyze cap tables, vesting schedules, dilution scenarios, and funding round implications for QDaria Holdings and its 7 spin-off companies.',
  },
  {
    name: 'Quantum Research',
    prompt:
      'You are a quantum computing research assistant with expertise in topological quantum computing, quantum reservoir computing, fibonacci anyons, and quantum error correction. Help with research papers, experimental design, and technical analysis.',
  },
  {
    name: 'General',
    prompt: 'You are a helpful AI assistant.',
  },
];

const DEFAULT_SETTINGS: PlaygroundSettings = {
  model: 'gemini-2.5-flash',
  systemPrompt: SYSTEM_PRESETS[4].prompt,
  temperature: 0.7,
  maxTokens: 4096,
  thinkingMode: false,
  deepResearch: false,
};

// ---------------------------------------------------------------------------
// Simple Markdown Renderer
// ---------------------------------------------------------------------------

function renderMarkdown(text: string): string {
  let html = text;

  // Escape HTML entities (but preserve our own tags later)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_match, lang, code) =>
      `<pre class="my-2 overflow-x-auto rounded-lg bg-[#0a0e1a] p-3 text-sm"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(
    /`([^`\n]+)`/g,
    '<code class="rounded bg-[#0a0e1a] px-1.5 py-0.5 text-xs text-cyan-300">$1</code>'
  );

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Headings (### h3, ## h2, # h1)
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="mt-3 mb-1 text-sm font-semibold text-white">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="mt-3 mb-1 text-base font-semibold text-white">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="mt-3 mb-1 text-lg font-bold text-white">$1</h1>'
  );

  // Unordered lists
  html = html.replace(/^[*-] (.+)$/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-gray-300">$1</li>');

  // Wrap consecutive <li> items
  html = html.replace(
    /(<li[^>]*>.*?<\/li>\n?)+/g,
    (match) => `<ul class="my-1 space-y-0.5">${match}</ul>`
  );

  // Line breaks (double newline = paragraph break, single newline preserved)
  html = html.replace(/\n\n/g, '</p><p class="mt-2">');
  html = html.replace(/\n/g, '<br/>');

  // Wrap in paragraph
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*<(pre|ul|ol|h[1-6])/g, '<$1');
  html = html.replace(/<\/(pre|ul|ol|h[1-6])>\s*<\/p>/g, '</$1>');

  return html;
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function MessageBubble({
  message,
  isStreaming,
}: {
  message: Message;
  isStreaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message.content]);

  return (
    <div className={`group flex gap-3 py-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-cyan-500/20' : 'bg-purple-500/20'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-cyan-400" />
        ) : (
          <Bot className="h-4 w-4 text-purple-400" />
        )}
      </div>

      {/* Content */}
      <div className={`flex max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="mb-0.5 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-[10px] text-gray-600">{formatTime(message.timestamp)}</span>
        </div>

        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'rounded-tr-md bg-cyan-600/20 text-gray-200'
              : 'rounded-tl-md bg-[#1a1f2e] text-gray-300'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div
              className="prose-playground"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          )}
          {isStreaming && (
            <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-cyan-400" />
          )}
        </div>

        {/* Copy button for assistant */}
        {!isUser && !isStreaming && message.content && (
          <button
            onClick={handleCopy}
            className="mt-1 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-gray-600 opacity-0 transition-opacity hover:bg-gray-800 hover:text-gray-400 group-hover:opacity-100"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-xs text-gray-400">{label}</span>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          enabled ? 'bg-cyan-600' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function PlaygroundLayout() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [settings, setSettings] = useState<PlaygroundSettings>(DEFAULT_SETTINGS);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Derived
  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;
  const messages = activeConversation?.messages ?? [];

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, messages[messages.length - 1]?.content]);

  // Focus textarea
  useEffect(() => {
    textareaRef.current?.focus();
  }, [activeConversationId]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  const createConversation = useCallback((): string => {
    const id = `conv-${Date.now()}`;
    const conv: Conversation = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveConversationId(id);
    return id;
  }, []);

  const updateConversationMessages = useCallback(
    (convId: string, updater: (msgs: Message[]) => Message[]) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c;
          const newMessages = updater(c.messages);
          // Update title from first user message
          const firstUser = newMessages.find((m) => m.role === 'user');
          const title = firstUser
            ? firstUser.content.slice(0, 40) + (firstUser.content.length > 40 ? '...' : '')
            : c.title;
          return { ...c, messages: newMessages, title };
        })
      );
    },
    []
  );

  // -------------------------------------------------------------------------
  // Send message
  // -------------------------------------------------------------------------

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const assistantMessage: Message = {
      id: `msg-${Date.now()}-assistant`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    // Add user message + empty assistant message
    updateConversationMessages(convId, (msgs) => [...msgs, userMessage, assistantMessage]);
    setInput('');
    setIsStreaming(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Build messages array for API
    // We need to get the current messages PLUS the new user message
    const currentConv = conversations.find((c) => c.id === convId);
    const apiMessages = [
      ...(currentConv?.messages ?? []).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user' as const, content: trimmed },
    ];

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch('/api/admin/playground/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          model: settings.model,
          systemPrompt: settings.systemPrompt,
          temperature: settings.temperature,
          maxTokens: settings.maxTokens,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errData.error || `HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        // Keep the last potentially incomplete line in the buffer
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data: ')) {
            const data = trimmedLine.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                const finalContent = accumulated;
                updateConversationMessages(convId!, (msgs) =>
                  msgs.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: finalContent }
                      : m
                  )
                );
              }
            } catch {
              // Skip malformed SSE data
            }
          }
        }
      }

      // Process any remaining data in the buffer
      if (buffer.trim().startsWith('data: ')) {
        const data = buffer.trim().slice(6).trim();
        if (data && data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              accumulated += parsed.text;
              const finalContent = accumulated;
              updateConversationMessages(convId!, (msgs) =>
                msgs.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, content: finalContent }
                    : m
                )
              );
            }
          } catch {
            // Skip malformed final data
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // User cancelled
        return;
      }
      const errorMsg =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      updateConversationMessages(convId!, (msgs) =>
        msgs.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: `Error: ${errorMsg}` }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [
    input,
    isStreaming,
    activeConversationId,
    conversations,
    settings,
    createConversation,
    updateConversationMessages,
  ]);

  // -------------------------------------------------------------------------
  // Improve Prompt
  // -------------------------------------------------------------------------

  const improvePrompt = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isImproving) return;

    setIsImproving(true);
    try {
      const response = await fetch('/api/admin/playground/improve-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!response.ok) {
        throw new Error('Failed to improve prompt');
      }

      const data = await response.json();
      if (data.improved) {
        setInput(data.improved);
      }
    } catch (err) {
      console.error('Improve prompt error:', err);
    } finally {
      setIsImproving(false);
    }
  }, [input, isImproving]);

  // -------------------------------------------------------------------------
  // Delete conversation
  // -------------------------------------------------------------------------

  const deleteConversation = useCallback(
    (convId: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (activeConversationId === convId) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  // -------------------------------------------------------------------------
  // Cancel streaming
  // -------------------------------------------------------------------------

  const cancelStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  // -------------------------------------------------------------------------
  // Key handler
  // -------------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  // -------------------------------------------------------------------------
  // Textarea auto-resize
  // -------------------------------------------------------------------------

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, []);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="flex h-[calc(100vh-220px)] min-h-[500px] overflow-hidden rounded-xl border border-gray-800 bg-[#111827]">
      {/* ================================================================= */}
      {/* LEFT SIDEBAR: Conversations */}
      {/* ================================================================= */}
      {leftSidebarOpen && (
        <div className="flex w-64 shrink-0 flex-col border-r border-gray-800 bg-[#0d1117]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-white">Conversations</h3>
            <button
              onClick={() => setLeftSidebarOpen(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
              title="Hide sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={() => {
                createConversation();
                setInput('');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-300 transition-colors hover:border-cyan-700 hover:bg-cyan-500/10 hover:text-cyan-400"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </button>
          </div>

          {/* Conversation List */}
          <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
            {conversations.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <MessageSquare className="mx-auto mb-2 h-8 w-8 text-gray-700" />
                <p className="text-xs text-gray-600">No conversations yet</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-center rounded-lg transition-colors ${
                    conv.id === activeConversationId
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <button
                    onClick={() => setActiveConversationId(conv.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{conv.title}</p>
                      <p className="truncate text-[10px] text-gray-600">
                        {conv.messages.length} messages
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="mr-2 rounded p-1 text-gray-600 opacity-0 transition-opacity hover:bg-gray-700 hover:text-red-400 group-hover:opacity-100"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Presets Section */}
          <div className="border-t border-gray-800 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              Quick Presets
            </p>
            <div className="flex flex-wrap gap-1">
              {SYSTEM_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() =>
                    setSettings((s) => ({ ...s, systemPrompt: preset.prompt }))
                  }
                  className={`rounded-md px-2 py-1 text-[10px] transition-colors ${
                    settings.systemPrompt === preset.prompt
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* CENTER: Chat Area */}
      {/* ================================================================= */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            {!leftSidebarOpen && (
              <button
                onClick={() => setLeftSidebarOpen(true)}
                className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                title="Show conversations"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            )}
            <Bot className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-white">AI Playground</span>
            {activeConversation && (
              <>
                <span className="text-gray-700">|</span>
                <span className="truncate text-xs text-gray-500">
                  {activeConversation.title}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">
              {MODELS.find((m) => m.value === settings.model)?.label ?? settings.model}
            </span>
            {!rightSidebarOpen && (
              <button
                onClick={() => setRightSidebarOpen(true)}
                className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
                title="Show settings"
              >
                <PanelRightOpen className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">
                <Bot className="h-8 w-8 text-purple-400" />
              </div>
              <h2 className="mb-1 text-lg font-semibold text-white">AI Playground</h2>
              <p className="mb-4 max-w-md text-sm text-gray-500">
                Start a conversation with the AI. Choose a system preset, adjust settings, and
                explore different models.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SYSTEM_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setSettings((s) => ({ ...s, systemPrompt: preset.prompt }));
                      setInput(
                        preset.name === 'CEO Assistant'
                          ? 'What are the key metrics I should track for our Q1 board meeting?'
                          : preset.name === 'Contract Drafter'
                            ? 'Draft an NDA template for new QDaria employees.'
                            : preset.name === 'Equity Advisor'
                              ? 'Analyze the dilution impact if we raise a NOK 30M Series A.'
                              : 'Explain the advantages of fibonacci anyons for fault-tolerant quantum computing.'
                      );
                    }}
                    className="rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-xs text-gray-400 transition-colors hover:border-cyan-700 hover:text-cyan-400"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isStreaming={
                    isStreaming &&
                    msg.role === 'assistant' &&
                    idx === messages.length - 1
                  }
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 px-4 py-3">
          {isStreaming && (
            <div className="mb-2 flex items-center justify-center">
              <button
                onClick={cancelStreaming}
                className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-[#0a0e1a] px-3 py-1 text-xs text-gray-400 transition-colors hover:border-red-700 hover:text-red-400"
              >
                <X className="h-3 w-3" />
                Stop generating
              </button>
            </div>
          )}
          <div className="flex items-end gap-2">
            <div className="relative flex flex-1 items-end rounded-lg border border-gray-700 bg-[#0a0e1a] focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                disabled={isStreaming}
                rows={1}
                className="flex-1 resize-none bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
              {/* Improve Prompt button */}
              <button
                onClick={improvePrompt}
                disabled={!input.trim() || isImproving || isStreaming}
                className="m-1.5 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-gray-500 transition-colors hover:bg-gray-800 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
                title="Improve prompt"
              >
                {isImproving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">Improve</span>
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-30"
              title="Send message"
            >
              {isStreaming ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* RIGHT SIDEBAR: Settings */}
      {/* ================================================================= */}
      {rightSidebarOpen && (
        <div className="flex w-72 shrink-0 flex-col border-l border-gray-800 bg-[#0d1117]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-semibold text-white">Settings</h3>
            </div>
            <button
              onClick={() => setRightSidebarOpen(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
              title="Hide settings"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-4">
            {/* Model Selector */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Model</label>
              <select
                value={settings.model}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, model: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {MODELS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* System Prompt */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                System Prompt
              </label>
              <textarea
                value={settings.systemPrompt}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, systemPrompt: e.target.value }))
                }
                rows={5}
                className="w-full resize-y rounded-lg border border-gray-700 bg-[#0a0e1a] px-3 py-2 text-xs leading-relaxed text-gray-300 placeholder-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Enter system prompt..."
              />
              <div className="mt-1.5 flex flex-wrap gap-1">
                {SYSTEM_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      setSettings((s) => ({ ...s, systemPrompt: preset.prompt }))
                    }
                    className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                      settings.systemPrompt === preset.prompt
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-gray-400">Temperature</label>
                <span className="rounded bg-gray-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400">
                  {settings.temperature.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.temperature}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    temperature: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-cyan-500"
              />
              <div className="mt-0.5 flex justify-between text-[9px] text-gray-600">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium text-gray-400">Max Tokens</label>
                <span className="rounded bg-gray-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400">
                  {settings.maxTokens}
                </span>
              </div>
              <input
                type="range"
                min="256"
                max="8192"
                step="256"
                value={settings.maxTokens}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    maxTokens: parseInt(e.target.value, 10),
                  }))
                }
                className="w-full accent-cyan-500"
              />
              <div className="mt-0.5 flex justify-between text-[9px] text-gray-600">
                <span>256</span>
                <span>8192</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 rounded-lg border border-gray-800 bg-[#0a0e1a] p-3">
              <ToggleSwitch
                label="Thinking Mode"
                enabled={settings.thinkingMode}
                onChange={(v) => setSettings((s) => ({ ...s, thinkingMode: v }))}
              />
              <div className="border-t border-gray-800" />
              <ToggleSwitch
                label="Deep Research"
                enabled={settings.deepResearch}
                onChange={(v) => setSettings((s) => ({ ...s, deepResearch: v }))}
              />
            </div>

            {/* Reset */}
            <button
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-500 transition-colors hover:border-gray-600 hover:text-gray-300"
            >
              <RotateCcw className="h-3 w-3" />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
