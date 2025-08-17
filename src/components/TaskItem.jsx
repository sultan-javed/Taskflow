import { clsx } from 'clsx'

const priorityColors = {
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const overdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().toDateString())

  return (
    <div className={clsx('card p-4 flex items-start gap-3', task.completed && 'opacity-70')}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-4 w-4 accent-sky-600"
        aria-label="Mark complete"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={clsx('font-medium', task.completed && 'line-through')}>{task.title}</h3>
          <span className="badge">{task.category}</span>
          <span className={clsx('badge', priorityColors[task.priority])}>{task.priority}</span>
          {task.dueDate && (
            <span className={clsx('badge', overdue ? 'border-rose-300 text-rose-600 dark:text-rose-300' : 'border-slate-200')}>
              📅 {new Date(task.dueDate).toLocaleDateString()}{overdue ? ' • overdue' : ''}
            </span>
          )}
        </div>
        {task.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{task.description}</p>}
        <div className="text-xs text-slate-400 mt-1">Added {new Date(task.createdAt).toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  )
}
