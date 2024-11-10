import { useEffect } from 'react';

export function useHotkeys(key: string, callback: () => void) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!key) return;
      
      const keys = key.toLowerCase().split('+');
      const mainKey = keys[keys.length - 1];
      
      const modifiers = {
        meta: keys.includes('meta'),
        ctrl: keys.includes('ctrl'),
        alt: keys.includes('alt'),
        shift: keys.includes('shift'),
      };

      if (
        e.key?.toLowerCase() === mainKey &&
        modifiers.meta === e.metaKey &&
        modifiers.ctrl === e.ctrlKey &&
        modifiers.alt === e.altKey &&
        modifiers.shift === e.shiftKey
      ) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [key, callback]);
}