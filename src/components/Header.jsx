import ThemeToggle from './ThemeToggle'
import { clsx } from 'clsx'

export default function Header({ total, completed }) {
  return (
    <header className={clsx('sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:dark:bg-slate-900/60', 'border-b border-slate-200 dark:border-slate-800')}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-sky-600 grid place-items-center text-white font-bold">TF</div>
          <div>
            <h1 className="text-lg font-semibold">TaskFlow</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{completed} done • {total - completed} open</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
