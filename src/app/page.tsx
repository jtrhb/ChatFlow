"use client";

import React, { useState, useEffect, useRef } from 'react'
import { getConversationSessions, getChatHistory, WechatyMessage, ConversationSession } from '@/services/wechaty'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Socket, io } from 'socket.io-client'
import { QRCodeSVG } from 'qrcode.react'

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
  {
    id: '4',
    nickname: 'Bob Williams',
    avatarUrl: 'https://picsum.photos/id/240/50/50',
    unreadMessageCount: 0,
    recentActivity: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
  },
  {
    id: '5',
    nickname: 'Emily Brown',
    avatarUrl: 'https://picsum.photos/id/241/50/50',
    unreadMessageCount: 3,
    recentActivity: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
  },
  {
    id: '6',
    nickname: 'David Garcia',
    avatarUrl: 'https://picsum.photos/id/242/50/50',
    unreadMessageCount: 1,
    recentActivity: Date.now() - 1000 * 60 * 60 * 96, // 4 days ago
  },
  {
    id: '7',
    nickname: 'Olivia Rodriguez',
    avatarUrl: 'https://picsum.photos/id/243/50/50',
    unreadMessageCount: 0,
    recentActivity: Date.now() - 1000 * 60 * 60 * 120, // 5 days ago
  },
  {
    id: '8',
    nickname: 'Daniel Martinez',
    avatarUrl: 'https://picsum.photos/id/244/50/50',
    unreadMessageCount: 2,
    recentActivity: Date.now() - 1000 * 60 * 60 * 144, // 6 days ago
  },
  {
    id: '9',
    nickname: 'Sophia Anderson',
    avatarUrl: 'https://picsum.photos/id/245/50/50',
    unreadMessageCount: 0,
    recentActivity: Date.now() - 1000 * 60 * 60 * 168, // 7 days ago
  },
  {
    id: '10',
    nickname: 'Matthew Thomas',
    avatarUrl: 'https://picsum.photos/id/246/50/50',
    unreadMessageCount: 1,
    recentActivity: Date.now() - 1000 * 60 * 60 * 192, // 8 days ago
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
    content: 'I am doing great as well.This is a very long message to test the UI and see how it wraps. I hope it looks good!',
    timestamp: Date.now() - 1000 * 60 * 1,
    type: 'text',
  },
  {
    sender: 'John Doe',
    content: 'Awesome! Let\'s catch up soon.  This is a very long message to test the UI and see how it wraps. I hope it looks good!',
    timestamp: Date.now(),
    type: 'text',
  },
  {
    sender: 'You',
    content: 'Sounds like a plan!',
    timestamp: Date.now() + 1000 * 60 * 1,
    type: 'text',
  },
  {
    sender: 'John Doe',
    content: 'Great! Talk to you later.This is a very long message to test the UI and see how it wraps. I hope it looks good!',
    timestamp: Date.now() + 1000 * 60 * 2,
    type: 'text',
  },
  {
    sender: 'You',
    content: 'Bye!',
    timestamp: Date.now() + 1000 * 60 * 3,
    type: 'text',
  },
  {
    sender: 'John Doe',
    content: 'See ya!',
    timestamp: Date.now() + 1000 * 60 * 4,
    type: 'text',
  },
  {
    sender: 'You',
    content: '👋',
    timestamp: Date.now() + 1000 * 60 * 5,
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
        <CardTitle>对话列表</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto p-0">
        <ScrollArea className="h-[calc(100vh - 100px)]">
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
        </ScrollArea>
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
        <CardTitle>历史消息</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh - 200px)]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'
                  }`}
              >
                <div
                  className={`rounded-xl px-4 py-2 break-words ${message.sender === 'You'
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
        </ScrollArea>
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
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  useEffect(() => {
    const socket: Socket = io('http://localhost:9000')

    socket.on('connect', () => {
      console.log('WebSocket connected');
    })

    socket.on('disconnect', (reason: any) => {
      console.warn('Socket disconnected:', reason);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex h-svh w-full">
      <Sidebar className="w-64 border-r">
        {
            qrCodeData?(
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'10px' }}>
                  <QRCodeSVG value={qrCodeData} size={200}/>
                </div>
              ):(<></>)
        }
        <SidebarContent>
          <ConversationList onSelectConversation={handleSelectConversation} />
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col flex-1">
        <MessageDisplayArea conversationId={selectedConversationId} />
        <MessageInput />
      </div>
      <div>
        <h2>Logs:</h2>
        <Card className="h-48 rounded-none border-none shadow-none">
          <CardContent className="overflow-y-auto p-4">
            {logMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

