import { useEffect, useState } from 'react'

const defaultTask = {
  title: '',
  description: '',
  category: 'Personal',
  priority: 'Medium',
  dueDate: '',
}

export default function TaskForm({ onAdd, onUpdate, editing }) {
  const [task, setTask] = useState(defaultTask)

  useEffect(() => {
    if (editing) setTask(editing)
  }, [editing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((t) => ({ ...t, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.title.trim()) return
    if (editing) onUpdate(task)
    else onAdd(task)
    setTask(defaultTask)
  }

  const isEditing = Boolean(editing)

  return (
    <form onSubmit={handleSubmit} className="card p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-500">Title</label>
          <input name="title" className="input mt-1" value={task.title} onChange={handleChange} placeholder="e.g., Prepare monthly report" />
        </div>
        <div>
          <label className="text-sm text-slate-500">Category</label>
          <select name="category" className="input mt-1" value={task.category} onChange={handleChange}>
            {['Personal', 'Work', 'Learning', 'Urgent'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-500">Priority</label>
          <select name="priority" className="input mt-1" value={task.priority} onChange={handleChange}>
            {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-500">Due date</label>
          <input type="date" name="dueDate" className="input mt-1" value={task.dueDate} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-slate-500">Description</label>
          <textarea name="description" rows="3" className="input mt-1" value={task.description} onChange={handleChange} placeholder="Optional details..." />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button className="btn btn-primary" type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {isEditing && <span className="text-sm text-slate-500">Editing mode</span>}
      </div>
    </form>
  )
}
