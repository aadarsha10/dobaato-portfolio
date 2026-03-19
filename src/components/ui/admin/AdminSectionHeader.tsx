interface AdminSectionHeaderProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export default function AdminSectionHeader({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: AdminSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900/70">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onButtonClick}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:from-primary-700 hover:to-blue-700"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
