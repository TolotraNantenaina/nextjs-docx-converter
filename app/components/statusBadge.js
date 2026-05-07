import { getStateLabel } from '../helper/pageHelper';
// ─── Sub-components ───────────────────────────────────────────────────────────

export function StatusBadge({ state = `inactif` }) {
  const configs = {
    inactif: { cls: `badge-idle text-muted-foreground border border-muted-foreground`, dot: `bg-muted-foreground`, text: `Inactif` },
    traitement: { cls: `badge-processing text-amber-700 dark:text-amber-300 border border-amber-300 border-[0.5px]`, dot: `bg-amber-500 animate-pulse`, text: `Traitement` },
    succes: { cls: `badge-success text-emerald-700 dark:text-emerald-300 border border-emerald-300 border-[0.5px]`, dot: `bg-emerald-500 animate-pulse-ring`, text: `Succès` },
    erreur: { cls: `bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-400`, dot: `bg-red-500`, text: `Erreur` },
  };
  const c = configs[state];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {getStateLabel(state)}
    </span>
  );
}