export interface Activity {
  id: string;
  type: 'transaction' | 'ticket' | 'user' | 'system';
  action: string;
  details: string;
  userId?: string;
  userEmail?: string;
  timestamp: Date;
}