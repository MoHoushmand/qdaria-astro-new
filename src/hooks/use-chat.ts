/**
 * Convenience re-export of useChatContext from the ChatProvider.
 * Import this hook when using chat features outside the ChatLayout component.
 * NOTE: The consuming component must be wrapped in <ChatProvider>.
 */
export { useChatContext as useChat } from '../components/admin/chat/ChatProvider';
