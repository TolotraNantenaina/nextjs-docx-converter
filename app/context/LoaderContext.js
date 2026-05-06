'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');

  const showLoader = useCallback((message = 'Traitement en cours...') => {
    setLabel(message);
    setIsVisible(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsVisible(false);
  }, []);

  const updateLabel = useCallback((message) => {
    setLabel(message);
  }, []);

  const value = {
    isVisible,
    label,
    showLoader,
    hideLoader,
    updateLabel,
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within LoaderProvider');
  }
  return context;
}
