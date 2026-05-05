'use client';
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function doResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener("resize", doResize);
    doResize(); // Appel pour initialiser
    
    return () => window.removeEventListener("resize", doResize);
  }, []);

  return windowSize;
}