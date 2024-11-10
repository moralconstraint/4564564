import { Monitor, Gamepad2, Computer } from 'lucide-react';
import { Platform } from '@/types/product';

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

export function PlatformIcon({ platform, className = "h-4 w-4" }: PlatformIconProps) {
  switch (platform) {
    case 'windows':
      return <Computer className={className} />;
    case 'xbox':
      return <Monitor className={className} />;
    case 'playstation':
      return <Gamepad2 className={className} />;
    default:
      return null;
  }
}