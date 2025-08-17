function Stat({ label, value }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

export default function Stats({ total, completed, overdue }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="Total" value={total} />
      <Stat label="Completed" value={completed} />
      <Stat label="Overdue" value={overdue} />
    </div>
  )
}
