import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Thompson',
    role: 'Pro Gamer',
    content:
      'The best COD tools I\'ve ever used. Extremely reliable and the support team is amazing.',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    content:
      'These tools have completely transformed my gaming experience. Worth every penny!',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'Competitive Player',
    content:
      'Incredible service and top-notch security. I\'ve been using their tools for months without issues.',
    avatar: 'https://i.pravatar.cc/150?u=mike',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="container py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Trusted by Thousands
        </h2>
        <p className="text-lg text-muted-foreground">
          Hear what our customers have to say about our services
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>
                  {testimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="flex mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-muted-foreground">{testimonial.content}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}