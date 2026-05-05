export function HowItWorks() {
    return (
        <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-custom">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">Comment ça marche</h3>
            <div className="flex flex-col gap-4">
                {[
                    { icon: `upload`, step: `01`, title: `Téléverser`, desc: `Déposez ou parcourez votre fichier .docx ou .pdf` },
                    { icon: `zap`, step: `02`, title: `Conversion`, desc: `Traitement et conversion automatique du document en image` },
                    { icon: `image`, step: `03`, title: `Aperçu`, desc: `Voyez l'image rendue avant de la télécharger` },
                    { icon: `download`, step: `04`, title: `Télécharger`, desc: `Enregistrer en tant que fichier PNG haute résolution` },
                ].map(({ icon, step, title, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            {icon === 'upload' && <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
                            {icon === 'zap' && <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            {icon === 'image' && <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                            {icon === 'download' && <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-foreground">
                                <span className="text-muted-foreground mr-1.5">{step}</span>{title}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}