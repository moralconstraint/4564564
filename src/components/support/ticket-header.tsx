import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MessageSquare, Tag, Clock, Flag, X } from 'lucide-react';

interface TicketHeaderProps {
  id: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  createdAt: Date;
  onClose: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority.toUpperCase()) {
    case 'LOW':
      return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
    case 'MEDIUM':
      return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
    case 'HIGH':
      return 'text-red-500 border-red-500/20 bg-red-500/10';
    default:
      return '';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'OPEN':
      return 'text-green-500 border-green-500/20 bg-green-500/10';
    case 'IN_PROGRESS':
      return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
    case 'WAITING':
      return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
    case 'CLOSED':
      return 'text-red-500 border-red-500/20 bg-red-500/10';
    default:
      return '';
  }
};

export function TicketHeader({ id, subject, status, priority, category, createdAt, onClose }: TicketHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">{subject}</h2>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="gap-1">
            <Tag className="h-3 w-3" />
            {id}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {new Date(createdAt).toLocaleDateString()}
          </Badge>
          <Badge 
            variant="outline" 
            className={`gap-1 ${getPriorityColor(priority)}`}
          >
            <Flag className="h-3 w-3" />
            {priority.toUpperCase()}
          </Badge>
          <Badge 
            variant="outline"
            className={getStatusColor(status)}
          >
            {status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="gap-2">
            <X className="h-4 w-4" />
            Close Ticket
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close Support Ticket</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to close this ticket? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600"
            >
              Close Ticket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}