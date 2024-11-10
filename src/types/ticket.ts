export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'CLOSED';
  createdAt: Date;
  messages: Message[];
  userId: string;
  userEmail: string;
}