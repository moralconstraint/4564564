import Linkify from 'linkify-react';
import { motion } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageContentProps {
  content: string;
  attachments?: Array<{
    url: string;
    name: string;
  }>;
  onRemoveAttachment?: (index: number) => void;
  isEditing?: boolean;
}

export function MessageContent({ 
  content, 
  attachments,
  onRemoveAttachment,
  isEditing 
}: MessageContentProps) {
  return (
    <div className="space-y-2">
      <Linkify
        options={{
          target: '_blank',
          className: 'text-primary hover:underline',
        }}
      >
        {content}
      </Linkify>

      {attachments && attachments.length > 0 && (
        <div className="space-y-2 mt-2">
          {attachments.map((attachment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative group"
            >
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-white/10">
                <FileText className="h-4 w-4" />
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline flex-1 truncate"
                >
                  {attachment.name}
                </a>
                {isEditing && onRemoveAttachment && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                    onClick={() => onRemoveAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}