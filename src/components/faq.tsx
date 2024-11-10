import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const faqs = [
  {
    question: 'How do your services work?',
    answer:
      'Our services use advanced techniques to modify game data securely. After purchase, you\'ll receive instant access to your chosen service with detailed instructions for activation.',
  },
  {
    question: 'Are your services safe to use?',
    answer:
      'Yes, we prioritize security above all else. Our tools use advanced protection measures and are regularly updated to maintain undetected status. We constantly monitor game updates to ensure compatibility and safety.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, and various cryptocurrency payments. All transactions are processed securely and your payment information is never stored on our servers.',
  },
  {
    question: 'How often do you update your services?',
    answer:
      'We provide regular updates to maintain compatibility with the latest game versions. Our team monitors game updates 24/7 to ensure our services remain functional and undetected.',
  },
  {
    question: 'What happens if I need help?',
    answer:
      'Our support team is available 24/7 through our ticket system and Discord. Premium members receive priority support with guaranteed response times under 1 hour.',
  },
];

export function FAQ() {
  const navigate = useNavigate();

  return (
    <section className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>
        <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <Accordion type="single" collapsible className="mb-8">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-white hover:text-white/90">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center">
            <p className="text-white/80 mb-4">
              Still have questions? Our support team is here to help!
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/support')}
              className="bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}