import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupport } from '@/lib/support';
import { useToast } from '@/components/ui/use-toast';
import { TicketForm } from '@/components/support/ticket-form';
import { TicketChat } from '@/components/support/ticket-chat';

export function SupportPage() {
  const { createTicket, addMessage, closeTicket, activeTicket } = useSupport();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmitTicket = async (data: any) => {
    setLoading(true);
    try {
      const ticket = await createTicket({
        ...data,
        userId: '1', // This should come from auth context
      });
      toast({
        title: "Success",
        description: "Your support ticket has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create ticket",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!activeTicket) return false;
    
    try {
      await addMessage(activeTicket.id, content, attachments);
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleCloseTicket = async () => {
    if (!activeTicket) return;
    
    try {
      await closeTicket(activeTicket.id);
      toast({
        title: "Success",
        description: "Ticket has been closed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to close ticket",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-12">
      <AnimatePresence mode="wait">
        {activeTicket ? (
          <TicketChat
            key="chat"
            ticket={activeTicket}
            onClose={handleCloseTicket}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <TicketForm
            key="form"
            onSubmit={handleSubmitTicket}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}