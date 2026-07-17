import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isTabletSize = width > 600;
    setIsTablet(isTabletSize);
    setIsMobile(!isTabletSize);
  }, [width]);

  return {
    width,
    height,
    isTablet,
    isMobile,
    breakpoint: isTablet ? 'tablet' : 'mobile'
  };
}
