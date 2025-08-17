import { useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

const STORAGE_KEY = 'taskflow:v1'

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleData())
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('createdAt')
  const [editing, setEditing] = useState(null)

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length

  const onAdd = (input) => {
    const now = new Date().toISOString()
    const newTask = {
      id: uuid(),
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category,
      priority: input.priority,
      dueDate: input.dueDate || null,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    setTasks(prev => [newTask, ...prev])
  }

  const onUpdate = (updated) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? { ...t, ...updated, updatedAt: new Date().toISOString() } : t))
    setEditing(null)
  }

  const onToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t))
  }

  const onDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const state = useMemo(() => ({ tasks, query, category, status, sort }), [tasks, query, category, status, sort])
  const actions = { setQuery, setCategory, setStatus, setSort, onAdd, onUpdate, onToggle, onDelete, editing, setEditing }

  return (
    <div className="min-h-screen">
      <Header total={total} completed={completed} />
      <Dashboard state={state} actions={actions} />
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-slate-400">
        Built with React + Tailwind
      </footer>
    </div>
  )
}

function sampleData() {
  // Seed with a few example tasks to make the UI feel alive on first run.
  const today = new Date()
  const iso = (d) => d.toISOString().split('T')[0]
  return [
    {
      id: uuid(),
      title: 'Prepare monthly report',
      description: 'Gather metrics from analytics and finance.',
      category: 'Work',
      priority: 'High',
      dueDate: iso(new Date(today.getTime() + 3*86400000)),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: '30 min React practice',
      description: 'Hooks & component composition.',
      category: 'Learning',
      priority: 'Medium',
      dueDate: iso(new Date(today.getTime() + 1*86400000)),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: 'Call the dentist',
      description: '',
      category: 'Personal',
      priority: 'Low',
      dueDate: iso(new Date(today.getTime() - 1*86400000)),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}
