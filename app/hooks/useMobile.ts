import { createContext, useContext, useEffect, useState } from 'react';
import isMobile from 'is-mobile';
import { IncomingMessage } from 'http';

// Context to store if is mobile from server
const MobileContext = createContext<boolean>(false);

export const MobileProvider = MobileContext.Provider;
export const MobileConsumer = MobileContext.Consumer;

export enum MobileBreakpoint {
  SM = 480, 
  MD = 768,
}

export function useMobile(targetSize: MobileBreakpoint = MobileBreakpoint.MD) {
  // Get context from server
  const mobileSSR = useContext(MobileContext);
  // Sync state with client and setup responsive
  const isMobile = useMobileResponsive(mobileSSR, targetSize);

  return isMobile;
}

export function useMobileResponsive(initialState: boolean, targetSize: MobileBreakpoint): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(initialState);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < targetSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [targetSize]);

  return isMobile;
}

// Hook to get isMobile from server
export function isMobileSSR(req: IncomingMessage): boolean {
  return isMobile({ ua: req.headers['user-agent'] });
}