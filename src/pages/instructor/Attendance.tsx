import { useState } from 'react'
import { Save, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const STUDENTS = [
  { id:'1', name:'Emeka Obi', studentId:'MV24001' },
  { id:'2', name:'Adaeze Nwosu', studentId:'MV24002' },
  { id:'3', name:'Tunde Adeyemi', studentId:'MV24003' },
  { id:'4', name:'Ngozi Eze', studentId:'MV24004' },
  { id:'5', name:'Chukwudi Okafor', studentId:'MV24005' },
]
type Status = 'present'|'absent'|'late'|'excused'
const STATUS: Status[] = ['present','absent','late','excused']
const statusColors: Record<Status,string> = { present:'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', absent:'bg-red-500/15 text-red-400 border-red-500/30', late:'bg-amber-500/15 text-amber-400 border-amber-500/30', excused:'bg-slate-500/15 text-slate-400 border-slate-500/30' }

export default function InstructorAttendance() {
  const [attendance, setAttendance] = useState<Record<string,Status>>(Object.fromEntries(STUDENTS.map(s=>[s.id,'present'])))
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [session, setSession] = useState('Morning Session')

  const summary = STATUS.map(s => ({ status:s, count:Object.values(attendance).filter(v=>v===s).length }))

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-white">Mark Attendance</h1>
      <div className="card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div><label className="label">Date</label><input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)}/></div>
          <div><label className="label">Session</label><input className="input" value={session} onChange={e=>setSession(e.target.value)}/></div>
        </div>
        <div className="flex gap-2 flex-wrap mb-5">
          {summary.map(s => (
            <div key={s.status} className={`badge border ${statusColors[s.status]}`}>{s.status}: {s.count}</div>
          ))}
        </div>
        <div className="space-y-2">
          {STUDENTS.map(student => (
            <div key={student.id} className="flex items-center justify-between p-3.5 bg-ink-700/50 rounded-xl border border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">{student.name[0]}</div>
                <div><p className="text-sm font-medium text-white">{student.name}</p><p className="text-xs text-slate-500 font-mono">{student.studentId}</p></div>
              </div>
              <div className="flex gap-1">
                {STATUS.map(s => (
                  <button key={s} onClick={() => setAttendance(a=>({...a,[student.id]:s}))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize border transition-all ${attendance[student.id]===s ? statusColors[s] : 'text-slate-600 border-white/[0.06] hover:border-white/20'}`}>
                    {s[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn-primary" onClick={() => toast.success('Attendance saved!')}><Save size={15}/> Save Attendance</button>
        </div>
      </div>
    </div>
  )
}
