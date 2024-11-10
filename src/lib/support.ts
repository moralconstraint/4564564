import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAdmin } from '@/lib/admin';
import { Ticket } from '@/types/ticket';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

interface SupportState {
  tickets: Ticket[];
  activeTicket: Ticket | null;
  createTicket: (data: Partial<Ticket>) => Promise<Ticket>;
  addMessage: (ticketId: string, content: string, sender?: 'user' | 'support', attachments?: File[]) => Promise<void>;
  closeTicket: (ticketId: string) => Promise<void>;
  getTicket: (ticketId: string) => Ticket | null;
  getTickets: () => Ticket[];
}

export const useSupport = create<SupportState>()(
  persist(
    (set, get) => ({
      tickets: [],
      activeTicket: null,

      createTicket: async (data) => {
        // Check if user already has an active ticket
        const existingTicket = get().tickets.find(
          ticket => ticket.status !== 'CLOSED'
        );

        if (existingTicket) {
          throw new Error('You already have an active ticket');
        }

        const ticket: Ticket = {
          id: `TICKET-${Math.random().toString(36).substr(2, 9)}`,
          subject: data.subject || '',
          category: data.category || '',
          priority: data.priority || 'LOW',
          status: 'OPEN',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [
            {
              id: Math.random().toString(36).substr(2, 9),
              content: data.description || '',
              sender: 'user',
              timestamp: new Date(),
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              content: "Thank you for contacting support. An agent will be with you shortly.",
              sender: 'support',
              timestamp: new Date(),
            },
          ],
          userId: data.userId || '',
          userEmail: data.userEmail || '',
        };

        set((state) => ({
          tickets: [ticket, ...state.tickets],
          activeTicket: ticket,
        }));

        // Add activity to admin panel
        const { addActivity } = useAdmin.getState();
        addActivity({
          type: 'ticket',
          action: 'New Ticket',
          details: `New support ticket created: ${ticket.subject}`,
          userEmail: ticket.userEmail,
        });

        return ticket;
      },

      addMessage: async (ticketId, content, sender = 'user', attachments = []) => {
        const message: Message = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          sender,
          timestamp: new Date(),
        };

        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  messages: [...ticket.messages, message],
                  updatedAt: new Date(),
                  status: sender === 'support' ? 'IN_PROGRESS' : ticket.status,
                }
              : ticket
          ),
          activeTicket: state.activeTicket?.id === ticketId
            ? {
                ...state.activeTicket,
                messages: [...state.activeTicket.messages, message],
                updatedAt: new Date(),
                status: sender === 'support' ? 'IN_PROGRESS' : state.activeTicket.status,
              }
            : state.activeTicket,
        }));

        // Add activity to admin panel
        const { addActivity } = useAdmin.getState();
        const ticket = get().getTicket(ticketId);
        if (ticket) {
          addActivity({
            type: 'ticket',
            action: 'New Message',
            details: `New ${sender} message in ticket ${ticket.id}`,
            userEmail: ticket.userEmail,
          });
        }
      },

      closeTicket: async (ticketId) => {
        set((state) => ({
          tickets: state.tickets.filter(ticket => ticket.id !== ticketId),
          activeTicket: state.activeTicket?.id === ticketId ? null : state.activeTicket,
        }));

        // Add activity to admin panel
        const { addActivity } = useAdmin.getState();
        const ticket = get().getTicket(ticketId);
        if (ticket) {
          addActivity({
            type: 'ticket',
            action: 'Ticket Closed',
            details: `Support ticket ${ticket.id} has been closed`,
            userEmail: ticket.userEmail,
          });
        }
      },

      getTicket: (ticketId) => {
        return get().tickets.find((ticket) => ticket.id === ticketId) || null;
      },

      getTickets: () => {
        return get().tickets;
      },
    }),
    {
      name: 'support-storage',
      version: 1,
    }
  )
);