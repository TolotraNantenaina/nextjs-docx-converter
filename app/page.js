"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { APP_STATES, formatFileSize, getStateLabel, PageWidth } from "./helper/pageHelper";
import { convertDocxToImage } from "./service/convertService";
import { StatusBadge } from "./components/statusBadge";
import { DropZone } from "./components/dropZone";
import { FileInfoBadge } from "./components/fileInfoBadge";
import { PreviewPanel } from "./components/previewPanel";
import { HowItWorks } from "./components/howItWorks";
import ThemeChanger from "./components/themeChanger";
import { useTheme } from "next-themes";
import { useWindowSize } from "./hook/useWindowSize";
import { useLoader } from "./context/LoaderContext";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DocxConverter() {
  const [appState, setAppState] = useState(APP_STATES.IDLE);
  const { width: pageWidth } = useWindowSize();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processingLabel, setProcessingLabel] = useState(`Loading libraries…`);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { showLoader, hideLoader, updateLabel } = useLoader();
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const manageFile = useCallback(async (file) => {
    if (!file.name.match(/\.(docx|pdf)$/i)) {
      alert(`Please upload a valid .docx or .pdf file`);
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert(`File is too large (max 20 MB)`);
      return;
    }

    setSelectedFile(file);
    setAppState(APP_STATES.PROCESSING);
    setResult(null);
    setProcessingLabel(`Converting document…`);
    showLoader(`Chargement des bibliothèques…`);

    try {
      const converted = await convertDocxToImage(file);
      updateLabel(`Finalisation de l'image…`);
      await new Promise((r) => setTimeout(r, 300));
      setResult(converted);
      setAppState(APP_STATES.SUCCESS);
      hideLoader();
    } catch (err) {
      setAppState(APP_STATES.ERROR);
      hideLoader();
      alert(`Conversion failed: ${err instanceof Error ? err.message : `Unknown error`}`);
    }
  }, [showLoader, hideLoader, updateLabel]);

  const manageDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const manageDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const manageDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) manageFile(file);
  }, [manageFile]);

  const manageFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) manageFile(file);
    e.target.value = ``;
  }, [manageFile]);

  const manageReset = useCallback(() => {
    setAppState(APP_STATES.IDLE);
    setSelectedFile(null);
    setResult(null);
  }, []);

  const manageRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setResult(null);
    setAppState(APP_STATES.IDLE);
  }, []);

  const canDrop = appState === APP_STATES.IDLE || appState === APP_STATES.ERROR;

  return (
    <div data-cmp="DocxConverter" className="w-full max-w-[1440px] mx-auto min-h-screen bg-background pt-8 min-[680px]:pl-32 min-[680px]:pr-32 max-[680px]:pl-8 max-[680px]:pr-8 min-[1180px]:pb-16">
      {/* Top header bar */}
      <header className="flex items-center justify-between min-[680px]:mb-16 max-[680px]:mb-8 pb-8 border-b border-border">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg ${
            mounted ? (resolvedTheme === 'dark' ? 'bg-white' : 'bg-black') : 'bg-black'
            } flex items-center justify-center`}>
            <svg className={`w-5 h-5 min-[480px]:shrink-0 ${
              mounted ? (resolvedTheme === 'dark' ? 'text-black' : 'text-white') : 'text-white opacity-0'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">DocVersImage</h1>
            <p className="text-xs text-muted-foreground max-[450px]:max-w-[200px]">
              Convertir vos documents Word et PDF en image PNG
            </p>
          </div>
        </div>
        <div className="min-[450px]:flex min-[450px]:items-center max-[450px]:items-end max-[450px]:flex-row min-[450px]:gap-4">
          { pageWidth < 450 && 
          <div className="mb-[3px] pl-4 items-end">
            <ThemeChanger />
          </div>}
          <StatusBadge state={appState} />
          { pageWidth >= 450 && <ThemeChanger /> }
        </div>
      </header>

      {/* Main two-column layout */}
      <div className="flex flex-col min-[680px]:gap-12 min-[680px]:gap-6 items-start min-[1180px]:flex-row">
        {/* Left column — Upload */}
        <div className="w-full min-[1180px]:max-w-[450px] shrink-0 flex flex-col gap-6">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-foreground mb-3">Téléverser un document</h2>
            <p className="text-sm text-muted-foreground">
              Sélectionnez ou faites glisser un fichier <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">.docx</code> or <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">.pdf</code> pour le convertir en image PNG haute résolution.
            </p>
          </div>

          <div className={`transition-opacity duration-200 ${canDrop ? `opacity-100` : `opacity-40 pointer-events-none`}`}>
            <DropZone
              isDragging={isDragging}
              onDragOver={manageDragOver}
              onDragLeave={manageDragLeave}
              onDrop={manageDrop}
              onFileSelect={manageFileSelect}
              inputRef={inputRef}
            />
          </div>

          <div className={`transition-all duration-300 ${selectedFile ? `opacity-100` : `opacity-0 pointer-events-none h-0 overflow-hidden`}`}>
            {selectedFile && (
              <FileInfoBadge file={selectedFile} onRemove={manageRemoveFile} />
            )}
          </div>

          {/* How it works */}
          { pageWidth >= 1180 && <HowItWorks /> }
        
        </div >  

        {/* Right column — Preview */}
        <div className="w-full flex-1 min-w-0 rounded-2xl border border-border bg-card p-8 shadow-custom">
          <PreviewPanel result={result} state={appState} onReset={manageReset} />

          {/* Progress steps indicator */}
          <div className="mt-8 pt-6 border-t border-border flex items-center gap-0">
            {([APP_STATES.IDLE, APP_STATES.PROCESSING, APP_STATES.SUCCESS]).map((s, i) => {
              const isActive = appState === s;
              const isDone =
                (s === APP_STATES.IDLE && (appState === APP_STATES.PROCESSING || appState === APP_STATES.SUCCESS)) ||
                (s === APP_STATES.PROCESSING && appState === APP_STATES.SUCCESS || (s === APP_STATES.SUCCESS && appState === APP_STATES.SUCCESS));
              return (
                <React.Fragment key={s}>
                  <div className="min-[450px]:flex min-[450px]:items-center gap-3">
                    <div className={`min-[480px]:w-8 min-[480px]:h-8 max-[480px]:w-6 max-[480px]:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                      max-[480px]:text-[10px] ring-2 ring-primary/30
                      ${isDone ? `bg-primary text-primary-foreground` : isActive ? `bg-primary/15 text-primary ` : `bg-muted text-muted-foreground`}`}>
                      {isDone ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : i + 1}
                    </div>
                    <span className={`text-sm max-[480px]:text-[10px] font-medium transition-colors duration-200 ${isActive || isDone ? `text-foreground` : `text-muted-foreground`}`}>
                      {getStateLabel(s)}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-px mx-4 transition-all duration-500 ${isDone ? `bg-primary` : `bg-border`}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {pageWidth <= 1180 && (
          <div className="w-full max-[1180px]:mb-16 border-border">
            <HowItWorks />
          </div>
        )}
      </div>
    </div>
  );
}
