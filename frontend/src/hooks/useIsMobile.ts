// frontend/src/hooks/useIsMobile.ts
import { useMemo } from 'react';
import useWindowSize from './useWindowSize';

export default function useIsMobile({ mobileMax = 767 }: { mobileMax?: number } = {}) {
  const { width } = useWindowSize();
  // default breakpoint: < 768 is mobile
  const isMobile = useMemo(() => (typeof width === 'number' ? width <= mobileMax : false), [width, mobileMax]);
  return { isMobile };
}
