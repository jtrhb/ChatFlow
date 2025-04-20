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

import { Wechaty, log } from 'wechaty'
import { PuppetXp } from 'wechaty-puppet-xp';
import WebSocket from 'ws';

let bot: Wechaty | null = null;
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', ws => {
  console.log('WebSocket server connected');
});

function logToWebSocket(message: string) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export async function getWechatyBot(): Promise<Wechaty> {
  if (bot) {
    return bot;
  }

  const puppet = new PuppetXp();

  bot = new Wechaty({
    puppet,
    name: 'WechatyBot', // Optional bot name
  });

  bot.on('scan', (qrcode, status) => {
    const message = `Scan QR Code to login: ${status}\n${qrcode}`;
    logToWebSocket(message);
    console.log(message);
  });

  bot.on('login', user => {
    const message = `User ${user} logged in`;
    logToWebSocket(message);
    console.log(message);
  });

  bot.on('message', message => {
    const logMessage = `Message: ${message.text()}`;
    logToWebSocket(logMessage);
    console.log(logMessage);
  });

  await bot.start();
  logToWebSocket('Wechaty bot started.');
  console.log('Wechaty bot started.');

  return bot;
}

export async function stopWechatyBot(): Promise<void> {
  if (bot) {
    await bot.stop();
    logToWebSocket('Wechaty bot stopped.');
    console.log('Wechaty bot stopped.');
    bot = null;
  }
}
