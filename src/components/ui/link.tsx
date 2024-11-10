import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        ref={ref}
        className={cn(
          'text-foreground hover:text-foreground/80 transition-colors',
          className
        )}
        {...props}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
);
Link.displayName = 'Link';

export { Link };