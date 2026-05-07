import React, { useState, useRef, useCallback, useEffect } from "react";
import { ProcessingLoader } from "./processingLoader";
import JSZip from 'jszip';
import { base64ToBlob } from "../helper/pageHelper";

export function PreviewPanel({ result = null, state = `idle`, onReset = () => { } }) {
  const images = result?.images ?? [];

  const manageDownload = useCallback(() => {
    if (!result || !images.length) return;

    if (images.length === 1) {
      const link = document.createElement('a');
      link.href = images[0];
      link.download = result.fileName;
      link.click();
    } else {
      const zip = new JSZip();
      images.forEach((img, index) => {
        const blob = base64ToBlob(img, 'image/png');
        const fileName = `${result.fileName.replace(/\.[^/.]+$/, "")}_${index + 1}.png`;
        zip.file(fileName, blob);
      });
      zip.generateAsync({ type: 'blob' }).then((content) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${result.fileName.replace(/\.[^/.]+$/, "")}.zip`;
        link.click();
      });
    }
    onReset();
  }, [result, images]);

  const isEmpty = state === `inactif`;
  const isProcessing = state === `traitement`;
  const isSuccess = state === `succes`;

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentPage(0);
    }
  }, [images.length]);

  const currentImage = images[currentPage] ?? images[0] ?? "";
  const hasMultiple = images.length > 1;

  return (
    <div data-cmp="PreviewPanel" className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-semibold text-foreground">Aperçu</span>
        </div>
        <div className={`transition-opacity duration-300 ${isSuccess ? `opacity-100` : `opacity-0 pointer-events-none`}`}>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Convertir un autre document
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className={`relative rounded-xl border border-border overflow-hidden bg-muted min-h-64
        transition-all duration-300`}>

        {/* Empty state */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300
          ${isEmpty ? `opacity-100` : `opacity-0 pointer-events-none`}`}>
          <div className="w-12 h-12 rounded-2xl bg-border/60 flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground text-center">Votre image convertie apparaîtra ici</p>
        </div>

        {/* Processing state */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
          ${isProcessing ? `opacity-100` : `opacity-0 pointer-events-none`}`}>
          <ProcessingLoader label="Conversion du document en image…" />
        </div>

        {/* Success state */}
        <div className={`transition-opacity duration-500
          ${isSuccess ? `opacity-100` : `opacity-0 pointer-events-none`}`}>
          <div className="p-3 flex flex-col items-center gap-4">
            {hasMultiple && (<button
                type="button"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="text-sm text-muted-foreground disabled:opacity-40 text-left mr-auto"
              > Précédent </button>)}
            {hasMultiple && (<button
              type="button"
              disabled={currentPage >= images.length - 1}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, images.length - 1))}
              className="text-sm text-muted-foreground disabled:opacity-40 text-right ml-auto mt-[-35px]"
            > Suivant </button>)}
            <img
              src={currentImage}
              alt="Converted document preview"
              className="w-full rounded-lg shadow-custom object-contain max-h-[520px] animate-fade-in-up"
            />
          </div>
        </div>

        {/* Error state */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300
          ${state === `erreur` ? `opacity-100` : `opacity-0 pointer-events-none`}`}>
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">La conversion a échoué — veuillez réessayer</p>
        </div>
      </div>

      {/* Download button */}
      {<div className={`transition-all duration-300 ${isSuccess ? `opacity-100 translate-y-0` : `opacity-0 translate-y-2 pointer-events-none`}`}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-1.5 min-w-0 w-full text-xs text-muted-foreground px-3 py-3 mb-4 rounded-xl bg-secondary border border-border">
            <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="break-words min-w-0">
              {images.length > 1 ? `${result?.fileName.replace(/\.[^/.]+$/, "")}.zip` : `${result?.fileName}` ?? ``}
            </span>
          </div>
          <button
            type="button"
            onClick={manageDownload}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-primary text-primary-foreground font-semibold text-sm
              hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-custom"
          >
            <svg className="w-4 h-4  shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {images.length > 1 ? `Télécharger le ZIP` : `Télécharger l'image`}
          </button>
        </div>
      </div>}
    </div>
  );
}
