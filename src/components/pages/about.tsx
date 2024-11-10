import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Sparkles, Code2, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-primary/10 backdrop-blur-sm mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Elevating Your Gaming Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers dedicated to creating premium tools
            and services for the gaming community.
          </p>
        </motion.div>

        {/* Core Values */}
        <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security First</h3>
            <p className="text-muted-foreground">
              We prioritize the security and privacy of our users above all else,
              implementing robust protection measures and regular updates.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
            <Code2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Our development team constantly pushes boundaries to deliver
              cutting-edge solutions and features.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-background/30 border-white/10">
            <Wrench className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              Every tool and service undergoes rigorous testing to ensure
              reliability and performance.
            </p>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 backdrop-blur-xl bg-background/30 border-white/10">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                We strive to provide the most advanced and secure gaming tools while
                maintaining the highest standards of quality and customer satisfaction.
                Our commitment to excellence drives us to continuously improve and
                innovate our services.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Support Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 backdrop-blur-xl bg-background/30 border-white/10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Need Help?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our support team is available to assist you. Create a support ticket
                and we'll help you with any questions or concerns.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-primary/50 hover:bg-primary/60 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                  onClick={() => navigate('/support')}
                >
                  Create Support Ticket
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/services')}
                >
                  Browse Services
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}