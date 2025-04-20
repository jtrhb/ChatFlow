# **App Name**: ChatFlow

## Core Features:

- Conversation List: Display a list of all created conversation sessions, sorted by recent activity. Show contact avatar, nickname and unread message counts.
- Message Display Area: Display the complete chat history (text/images/emojis/files, etc.) of the selected session with auto scroll to bottom feature.
- Message Input: Provide an input box for sending text, emojis, and uploading images/files.
- Real-time Communication: Maintain a connection to the Wechaty backend using WebSocket (or SSE) to update the interface in real-time when new messages arrive.

## Style Guidelines:

- Primary color: White or light grey for a clean background.
- Secondary color: A calming blue (#E3F2FD) for message bubbles.
- Accent: Teal (#009688) for interactive elements and highlights.
- Use a split layout with a conversation list on the left and the message display area on the right.
- Message bubbles should use a speech bubble design to indicate senders. Align left/right based on message origin.
- Use simple, clear icons from a library like Material Icons for attachments and actions.
- Subtle transitions for new messages and chat selection changes.

## Original User Request:
场景
我正在用 Wechaty 开发一个智能聊天机器人，需要一个独立的前端界面来展示机器人与用户的所有消息往来。

功能需求
	1.	会话列表
	•	左侧展示所有已创建会话（按最近活跃排序），显示联系人头像、昵称和未读消息计数。
	2.	消息展示区
	•	右侧主区域滚动显示所选会话的完整聊天记录（文本／图片／表情／文件等）。
	•	支持“自动滚到底部”功能。
	•	不同消息方用左右对齐和气泡样式区分。
	3.	消息输入框
	•	底部提供输入框，支持发送文本、表情，以及上传图片／文件。
	4.	实时通信
	•	前端通过 WebSocket（或 SSE）与 Wechaty 后端保持连接，一有新消息即可实时更新界面。
	5.	可扩展性
	•	组件化设计，便于集成到 Vue／React／Angular 等主流框架。
	6.	样式和主题
	•	默认提供简洁明亮主题，支持自定义 CSS 覆盖样式。

技术栈建议
	•	前端框架：React（或 Vue、Angular）
	•	实时通信：Socket.io（或原生 WebSocket / SSE）
	•	UI 组件库：可选 Ant Design、Material‑UI、Element‑UI、Chakra UI 等
  