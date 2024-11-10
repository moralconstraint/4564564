import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, MessageSquare, HelpCircle, AlertCircle, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const progressSteps = [
  { id: 'details', label: 'Basic Details' },
  { id: 'description', label: 'Description' },
  { id: 'review', label: 'Review' },
];

export function TicketForm({ onSubmit, loading }: TicketFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.subject) newErrors.subject = 'Subject is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.priority) newErrors.priority = 'Priority is required';
    } else if (step === 1) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (formData.description && formData.description.length < 20) {
        newErrors.description = 'Description must be at least 20 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, progressSteps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="bg-background/50 border-white/10"
                error={errors.subject}
                placeholder="Brief description of your issue"
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.subject}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.category}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger className="bg-background/50 border-white/10">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.priority}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[200px] bg-background/50 border-white/10"
                placeholder="Please provide as much detail as possible about your issue"
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.description}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <p className="text-lg">{formData.subject}</p>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <p className="text-lg capitalize">{formData.category}</p>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <p className="text-lg capitalize">{formData.priority}</p>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-lg whitespace-pre-wrap">{formData.description}</p>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden backdrop-blur-xl bg-background/30 border-white/10">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
          <div className="relative p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-3"
            >
              How can we help?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-md mx-auto"
            >
              Create a support ticket and our team will assist you as soon as possible
            </motion.p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-4 bg-background/50 border-y border-white/10">
          <div className="flex justify-between">
            {progressSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center"
                style={{ width: index === progressSteps.length - 1 ? 'auto' : '100%' }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    animate={{
                      scale: index === currentStep ? 1.1 : 1,
                      backgroundColor: index <= currentStep ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                    }}
                  >
                    {index < currentStep ? (
                      '✓'
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  <span className="text-sm mt-2">{step.label}</span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 mt-4">
                    <motion.div
                      className="h-full bg-muted"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: index < currentStep ? 1 : 0,
                        backgroundColor: index < currentStep ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                      }}
                      style={{ transformOrigin: 'left' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            <motion.div
              variants={itemVariants}
              className="flex justify-between pt-6"
            >
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </Button>
              )}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="ml-auto"
              >
                {currentStep < progressSteps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="gap-2 bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating Ticket...
                      </>
                    ) : (
                      'Submit Ticket'
                    )}
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-background/50 border-t border-white/10">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Average response time: 2-4 hours</span>
            </div>

          </div>
        </div>
      </Card>
    </motion.div>
  );
}