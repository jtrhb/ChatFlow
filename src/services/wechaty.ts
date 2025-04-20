/**
 * Represents a message received from Wechaty.
 */
export interface WechatyMessage {
  /**
   * The sender of the message.
   */
  sender: string;
  /**
   * The content of the message.
   */
  content: string;
  /**
   * The timestamp of the message.
   */
  timestamp: number;
  /**
   * The type of message (e.g., text, image, file).
   */
  type: string;
}

/**
 * Asynchronously retrieves the chat history for a given conversation.
 *
 * @param conversationId The ID of the conversation to retrieve.
 * @returns A promise that resolves to an array of WechatyMessage objects.
 */
export async function getChatHistory(conversationId: string): Promise<WechatyMessage[]> {
  // TODO: Implement this by calling the Wechaty API.

  return [
    {
      sender: 'user1',
      content: 'Hello!',
      timestamp: Date.now(),
      type: 'text',
    },
    {
      sender: 'bot',
      content: 'Hi there!',
      timestamp: Date.now(),
      type: 'text',
    },
  ];
}

/**
 * Represents a conversation session.
 */
export interface ConversationSession {
  /**
   * The ID of the conversation.
   */
  id: string;
  /**
   * The nickname of the contact.
   */
  nickname: string;
  /**
   * The URL of the contact's avatar.
   */
  avatarUrl: string;
  /**
   * The number of unread messages.
   */
  unreadMessageCount: number;
  /**
   * The timestamp of the most recent activity.
   */
  recentActivity: number;
}

/**
 * Asynchronously retrieves all conversation sessions.
 *
 * @returns A promise that resolves to an array of ConversationSession objects.
 */
export async function getConversationSessions(): Promise<ConversationSession[]> {
  // TODO: Implement this by calling the Wechaty API.

  return [
    {
      id: '1',
      nickname: 'John Doe',
      avatarUrl: 'https://picsum.photos/id/237/50/50',
      unreadMessageCount: 0,
      recentActivity: Date.now(),
    },
    {
      id: '2',
      nickname: 'Jane Smith',
      avatarUrl: 'https://picsum.photos/id/238/50/50',
      unreadMessageCount: 2,
      recentActivity: Date.now(),
    },
  ];
}

