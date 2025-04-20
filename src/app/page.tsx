"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getConversationSessions, getChatHistory, WechatyMessage, ConversationSession } from '@/services/wechaty';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const mockConversations: ConversationSession[] = [
  {
    id: '1',
    nickname: 'John Doe',
    avatarUrl: 'https://picsum.photos/id/237/50/50',
    unreadMessageCount: 2,
    recentActivity: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    id: '2',
    nickname: 'Jane Smith',
    avatarUrl: 'https://picsum.photos/id/238/50/50',
    unreadMessageCount: 0,
    recentActivity: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: '3',
    nickname: 'Alice Johnson',
    avatarUrl: 'https://picsum.photos/id/239/50/50',
    unreadMessageCount: 1,
    recentActivity: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
];

const mockMessages: WechatyMessage[] = [
  {
    sender: 'John Doe',
    content: 'Hey there!',
    timestamp: Date.now() - 1000 * 60 * 4,
    type: 'text',
  },
  {
    sender: 'You',
    content: 'Hello! How are you?',
    timestamp: Date.now() - 1000 * 60 * 3,
    type: 'text',
  },
  {
    sender: 'John Doe',
    content: 'I am good, thanks! What about you?',
    timestamp: Date.now() - 1000 * 60 * 2,
    type: 'text',
  },
  {
    sender: 'You',
    content: 'I am doing great as well.',
    timestamp: Date.now() - 1000 * 60 * 1,
    type: 'text',
  },
];

const ConversationList = ({ onSelectConversation }: { onSelectConversation: (id: string) => void }) => {
  const [conversations, setConversations] = useState<ConversationSession[]>(mockConversations);

  useEffect(() => {
    // getConversationSessions().then(setConversations);
    // TODO: Implement the real data fetching
  }, []);

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>Conversations</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto p-0">
        <ul className="divide-y divide-border">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className="flex items-center space-x-4 p-4 hover:bg-accent cursor-pointer"
              onClick={() => onSelectConversation(conversation.id)}
            >
              <Avatar>
                <AvatarImage src={conversation.avatarUrl} alt={conversation.nickname} />
                <AvatarFallback>{conversation.nickname.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{conversation.nickname}</p>
                {conversation.unreadMessageCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {conversation.unreadMessageCount} unread messages
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const MessageDisplayArea = ({ conversationId }: { conversationId: string | null }) => {
  const [messages, setMessages] = useState<WechatyMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) return;
    // getChatHistory(conversationId).then(setMessages);
    setMessages(mockMessages); // Use mock messages
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>Chat History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'
                }`}
            >
              <div
                className={`rounded-xl px-4 py-2 ${message.sender === 'You'
                  ? 'bg-blue-100 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {message.content}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {message.sender} - {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // TODO: Send message to Wechaty backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-full"
      />
      <Button onClick={handleSendMessage} className="rounded-full">
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  return (
    <div className="flex h-svh w-full">
      <Sidebar className="w-80 border-r">
        <SidebarContent>
          <ConversationList onSelectConversation={handleSelectConversation} />
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <MessageDisplayArea conversationId={selectedConversationId} />
        <MessageInput />
      </div>
    </div>
  );
}
