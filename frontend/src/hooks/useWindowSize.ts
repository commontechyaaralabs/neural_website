// frontend/src/hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

export type WindowSize = { width?: number; height?: number };

export default function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: undefined, height: undefined });

  useEffect(() => {
    // don't run on server
    if (typeof window === 'undefined') return;

    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
