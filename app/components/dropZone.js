// ─── Sub-components ───────────────────────────────────────────────────────────

export function DropZone({ isDragging = false, onDragOver, onDragLeave, onDrop, onFileSelect, inputRef }) {
  return (
    <div
      data-cmp="DropZone"
      className={`upload-zone border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer
        ${isDragging ? `dragging border-primary scale-[1.01]` : `border-border`}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className="flex flex-col items-center justify-center py-12 px-8 select-none">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200
          ${isDragging ? `bg-primary text-primary-foreground scale-110` : `bg-secondary text-muted-foreground`}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-base font-semibold text-foreground mb-1">
          {isDragging ? `Déposez votre fichier ici` : `Glissez-déposez votre fichier .docx ou .pdf`}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          ou <span className="text-primary font-medium underline underline-offset-2 cursor-pointer">parcourir pour téléverser</span>
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Formats supportés: <strong>.docx, .pdf</strong> — Max 20 MB
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
        className="hidden"
        onChange={onFileSelect}
      />
    </div>
  );
}