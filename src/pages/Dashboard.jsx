import Stats from '../components/Stats'
import TaskForm from '../components/TaskForm'
import FilterBar from '../components/FilterBar'
import TaskList from '../components/TaskList'

export default function Dashboard(props) {
  const {
    state: { tasks, query, category, status, sort },
    actions
  } = props

  const { setQuery, setCategory, setStatus, setSort, onAdd, onUpdate, onToggle, onDelete, editing, setEditing } = actions

  const filtered = tasks
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
    .filter(t => category === 'All' ? true : t.category === category)
    .filter(t => {
      if (status === 'All') return true
      if (status === 'Completed') return t.completed
      if (status === 'Overdue') return !t.completed && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())
      return !t.completed
    })
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'priority') return ['Low','Medium','High'].indexOf(b.priority) - ['Low','Medium','High'].indexOf(a.priority)
      if (sort === 'dueDate') return (a.dueDate || '').localeCompare(b.dueDate || '')
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const overdue = tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())).length

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 grid gap-6">
      <Stats total={total} completed={completed} overdue={overdue} />
      <TaskForm onAdd={onAdd} onUpdate={onUpdate} editing={editing} setEditing={setEditing} />
      <FilterBar query={query} setQuery={setQuery} category={category} setCategory={setCategory} status={status} setStatus={setStatus} sort={sort} setSort={setSort} />
      <TaskList tasks={filtered} onToggle={onToggle} onDelete={onDelete} onEdit={(t) => setEditing(t)} />
    </div>
  )
}
