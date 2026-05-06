'use client';
import { ThemeProvider } from 'next-themes';
import { LoaderProvider } from './context/LoaderContext';
import { LoaderOverlay } from './components/loaderOverlay';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <LoaderProvider>
        <LoaderOverlay />
        {children}
      </LoaderProvider>
    </ThemeProvider>
  );
}
