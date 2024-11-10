import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { EmojiPicker } from '@/components/support/emoji-picker';
import { FileUpload } from '@/components/support/file-upload';
import { MessageContent } from '@/components/support/message-content';
import { TicketHeader } from '@/components/support/ticket-header';
import { AlertCircle, Send, Loader2, FileText, X } from 'lucide-react';

interface TicketChatProps {
  ticket: any;
  onClose: () => void;
  onSendMessage: (message: string, attachments?: File[]) => Promise<boolean>;
}

export function TicketChat({ ticket, onClose, onSendMessage }: TicketChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [ticket.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
    setIsAtBottom(atBottom);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0 || sending) return;
    
    setSending(true);
    try {
      const success = await onSendMessage(newMessage, attachments);
      if (success) {
        setNewMessage('');
        setAttachments([]);
        inputRef.current?.focus();
        scrollToBottom();
      }
    } finally {
      setSending(false);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setNewMessage(prev => prev + emoji.native);
    inputRef.current?.focus();
  };

  const handleFileSelect = (file: File) => {
    setAttachments(prev => [...prev, file]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col h-[calc(100vh-16rem)] max-h-[800px]"
    >
      <Card className="flex flex-col h-full backdrop-blur-xl bg-background/30 border-white/10">
        <div className="p-6 border-b border-white/10">
          <TicketHeader {...ticket} onClose={onClose} />
        </div>

        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          <AnimatePresence initial={false}>
            {ticket.messages.map((message: any) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-accent/50 border border-white/10'
                  }`}
                >
                  <MessageContent
                    content={message.content}
                    attachments={message.attachments}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/10">
          {ticket.status === 'closed' ? (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">This ticket is closed. Please create a new ticket if you need further assistance.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-white/10"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:text-red-500"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-background/50 border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={sending}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={sending || (!newMessage.trim() && attachments.length === 0)}
                  className="gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] min-w-[100px]"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <FileUpload onFileSelect={handleFileSelect} />
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </div>
                <p className="text-xs">Press Enter to send, Shift + Enter for new line</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}