import { Search } from 'lucide-react'
import { useState } from 'react'
const STUDENTS = [
  { id:'1', name:'Emeka Obi', studentId:'MV24001', course:'Software Dev', progress:72, attendance:90, status:'active' },
  { id:'2', name:'Adaeze Nwosu', studentId:'MV24002', course:'Software Dev', progress:85, attendance:96, status:'active' },
  { id:'3', name:'Tunde Adeyemi', studentId:'MV24003', course:'Vibe Coding', progress:45, attendance:75, status:'active' },
  { id:'4', name:'Ngozi Eze', studentId:'MV24004', course:'Software Dev', progress:30, attendance:60, status:'at-risk' },
]
export default function InstructorStudents() {
  const [search, setSearch] = useState('')
  const filtered = STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.includes(search))
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Students</h1>
        <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input className="input pl-9 w-56" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>
      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Student</th><th>Course</th><th>Progress</th><th>Attendance</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">{s.name[0]}</div><div><div className="font-medium text-white text-sm">{s.name}</div><div className="text-xs text-slate-500 font-mono">{s.studentId}</div></div></div></td>
                <td><span className="badge badge-indigo">{s.course}</span></td>
                <td><div className="flex items-center gap-2"><div className="w-20 progress-track"><div className="progress-fill" style={{width:`${s.progress}%`}}/></div><span className="text-xs font-mono text-slate-400">{s.progress}%</span></div></td>
                <td><span className={`font-mono text-sm ${s.attendance < 70 ? 'text-red-400' : s.attendance < 85 ? 'text-amber-400' : 'text-emerald-400'}`}>{s.attendance}%</span></td>
                <td><span className={`badge ${s.status==='at-risk'?'badge-red':'badge-green'}`}>{s.status==='at-risk'?'At Risk':'Active'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
