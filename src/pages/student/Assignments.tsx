import { useState } from 'react'
import { Upload, Github, Globe, Clock, CheckCircle2, AlertCircle, LucideIcon } from 'lucide-react'

interface Assignment {
  id: string
  title: string
  course: string
  week: string
  dueDate: string
  maxScore: number
  status: 'pending'|'submitted'|'graded'|'late'
  description?: string
  submissionTypes?: string[]
  score?: number
  feedback?: string
  submittedAt?: string
}

const ASSIGNMENTS: Assignment[] = [
  { id:'1', title:'Build a REST API with Express.js', course:'Software Development', week:'Week 3', dueDate:'2025-01-30', maxScore:100, status:'pending', description:'Create a fully functional REST API with CRUD operations, authentication middleware, and proper error handling.', submissionTypes:['file','github','liveUrl'] },
  { id:'2', title:'React Portfolio Website', course:'Software Development', week:'Week 2', dueDate:'2025-01-20', maxScore:100, status:'graded', score:88, feedback:'Excellent work on component structure. Clean code and great use of hooks. Minor: add loading states.', submittedAt:'2025-01-19' },
  { id:'3', title:'Prompt Engineering Challenge', course:'Vibe Coding', week:'Week 1', dueDate:'2025-02-05', maxScore:50, status:'pending', description:'Complete 5 prompt engineering exercises demonstrating different techniques.', submissionTypes:['text','file'] },
]

const statusConfig: Record<string, { label:string; className:string; Icon: LucideIcon }> = {
  pending:   { label:'Pending',   className:'badge-amber', Icon: Clock },
  submitted: { label:'Submitted', className:'badge-blue',  Icon: CheckCircle2 },
  graded:    { label:'Graded',    className:'badge-green', Icon: CheckCircle2 },
  late:      { label:'Late',      className:'badge-red',   Icon: AlertCircle },
}

export default function StudentAssignments() {
  const [selected, setSelected] = useState<string|null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [notes, setNotes] = useState('')

  const selectedAssignment = ASSIGNMENTS.find(a => a.id === selected)

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Assignments</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ASSIGNMENTS.map(a => {
          const cfg = statusConfig[a.status]
          const isOverdue = new Date(a.dueDate) < new Date() && a.status === 'pending'
          return (
            <div key={a.id} className={`card-hover p-5 cursor-pointer ${selected===a.id ? 'border-brand-500/50' : ''}`} onClick={() => setSelected(a.id===selected?null:a.id)}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-white leading-snug">{a.title}</h3>
                <span className={`badge ${cfg.className} flex-shrink-0`}>{cfg.label}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                <span>{a.course}</span><span>·</span><span>{a.week}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1.5 ${isOverdue ? 'text-red-400' : 'text-slate-500'}`}>
                  <Clock size={11}/> Due: {new Date(a.dueDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
                </span>
                <span className="text-slate-500">{a.maxScore} pts</span>
              </div>
              {a.status === 'graded' && (
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-500">Score</span>
                  <span className="font-mono font-bold text-emerald-400">{a.score}/{a.maxScore}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedAssignment && selectedAssignment.status === 'pending' && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-1">{selectedAssignment.title}</h2>
          <p className="text-slate-400 text-sm mb-5">{selectedAssignment.description}</p>
          <div className="space-y-4">
            <div>
              <label className="label">Upload Files</label>
              <div className="border-2 border-dashed border-white/[0.1] rounded-xl p-8 text-center hover:border-brand-500/40 transition-colors cursor-pointer">
                <Upload size={24} className="text-slate-500 mx-auto mb-2"/>
                <p className="text-sm text-slate-400">Drop files here or click to upload</p>
                <p className="text-xs text-slate-600 mt-1">PDF, ZIP, PNG, JPG — max 10MB</p>
              </div>
            </div>
            {selectedAssignment.submissionTypes?.includes('github') && (
              <div>
                <label className="label flex items-center gap-2"><Github size={14}/> GitHub Repository URL</label>
                <input className="input" placeholder="https://github.com/username/repo" value={githubUrl} onChange={e=>setGithubUrl(e.target.value)}/>
              </div>
            )}
            {selectedAssignment.submissionTypes?.includes('liveUrl') && (
              <div>
                <label className="label flex items-center gap-2"><Globe size={14}/> Live URL</label>
                <input className="input" placeholder="https://your-project.vercel.app" value={liveUrl} onChange={e=>setLiveUrl(e.target.value)}/>
              </div>
            )}
            <div>
              <label className="label">Notes to Instructor (optional)</label>
              <textarea className="input h-20 resize-none" placeholder="Any notes about your submission..." value={notes} onChange={e=>setNotes(e.target.value)}/>
            </div>
            <div className="flex gap-3">
              <button className="btn-primary" onClick={() => setSubmitting(true)}>
                {submitting ? 'Submitting...' : <><Upload size={14}/> Submit Assignment</>}
              </button>
              <button className="btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedAssignment && selectedAssignment.status === 'graded' && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-white mb-4">{selectedAssignment.title} — Feedback</h2>
          <div className="flex items-center gap-4 mb-5 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 size={20} className="text-emerald-400"/>
            <div>
              <div className="text-emerald-400 font-semibold">Score: {selectedAssignment.score}/{selectedAssignment.maxScore}</div>
              <div className="text-xs text-emerald-400/70 mt-0.5">Submitted {selectedAssignment.submittedAt}</div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white mb-2">Instructor Feedback</p>
            <p className="text-slate-400 text-sm leading-relaxed">{selectedAssignment.feedback}</p>
          </div>
        </div>
      )}
    </div>
  )
}
