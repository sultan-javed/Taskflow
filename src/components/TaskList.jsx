import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return <div className="card p-8 text-center text-slate-500">No tasks match the current filters.</div>
  }
  return (
    <div className="grid gap-3">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}
