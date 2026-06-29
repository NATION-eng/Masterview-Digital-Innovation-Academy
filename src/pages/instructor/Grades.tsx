import { useState } from 'react'
import { Star, Check } from 'lucide-react'
import toast from 'react-hot-toast'

const SUBMISSIONS = [
  { id:'1', student:'Emeka Obi', assignment:'REST API with Express.js', course:'Software Dev', submittedAt:'2025-01-28', githubUrl:'https://github.com/emeka/api', status:'submitted', score:null },
  { id:'2', student:'Adaeze Nwosu', assignment:'React Portfolio', course:'Software Dev', submittedAt:'2025-01-27', liveUrl:'https://adaeze.vercel.app', status:'submitted', score:null },
  { id:'3', student:'Tunde Adeyemi', assignment:'Prompt Engineering', course:'Vibe Coding', submittedAt:'2025-01-26', textContent:'Completed all 5 exercises...', status:'submitted', score:null },
]

export default function InstructorGrades() {
  const [scores, setScores] = useState<Record<string,string>>({})
  const [feedbacks, setFeedbacks] = useState<Record<string,string>>({})
  const [selected, setSelected] = useState<string|null>(null)

  const handleGrade = (id: string) => {
    toast.success(`Graded: ${scores[id]}/100`)
    setSelected(null)
  }

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold text-white">Grade Submissions</h1>
      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Student</th><th>Assignment</th><th>Course</th><th>Submitted</th><th>Score</th><th></th></tr></thead>
          <tbody>
            {SUBMISSIONS.map(s => (
              <>
                <tr key={s.id}>
                  <td><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 text-xs font-bold">{s.student[0]}</div><span className="font-medium text-white">{s.student}</span></div></td>
                  <td>{s.assignment}</td>
                  <td><span className="badge badge-indigo">{s.course}</span></td>
                  <td className="text-slate-500">{s.submittedAt}</td>
                  <td>{s.score !== null ? <span className="font-mono font-bold text-emerald-400">{s.score}/100</span> : <span className="badge badge-amber">Pending</span>}</td>
                  <td><button onClick={() => setSelected(s.id===selected?null:s.id)} className="btn-primary text-xs py-1.5 px-3"><Star size={11}/> Grade</button></td>
                </tr>
                {selected === s.id && (
                  <tr key={`${s.id}-grade`}>
                    <td colSpan={6} className="px-4 py-4 bg-ink-700/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><label className="label">Score (out of 100)</label><input type="number" min={0} max={100} className="input" placeholder="85" value={scores[s.id]||''} onChange={e=>setScores(sc=>({...sc,[s.id]:e.target.value}))}/></div>
                        <div><label className="label">Feedback</label><textarea className="input h-20 resize-none" placeholder="Instructor feedback..." value={feedbacks[s.id]||''} onChange={e=>setFeedbacks(fb=>({...fb,[s.id]:e.target.value}))}/></div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleGrade(s.id)} className="btn-primary text-sm"><Check size={14}/> Submit Grade</button>
                        <button onClick={()=>setSelected(null)} className="btn-ghost text-sm">Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
