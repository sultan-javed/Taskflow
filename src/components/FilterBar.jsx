export default function FilterBar({ query, setQuery, category, setCategory, status, setStatus, sort, setSort }) {
  return (
    <div className="card p-3 md:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <input className="input" placeholder="Search by title..." value={query} onChange={e => setQuery(e.target.value)} />
      <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
        {['All','Personal','Work','Learning','Urgent'].map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
        {['All','Open','Completed','Overdue'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
        {[
          ['createdAt','Recently Added'],
          ['dueDate','Due Date'],
          ['priority','Priority'],
          ['title','Title A→Z'],
        ].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  )
}
