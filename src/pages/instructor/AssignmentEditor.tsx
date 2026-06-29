import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
export default function InstructorAssignmentEditor() {
  const nav = useNavigate()
  const [form, setForm] = useState({ title:'', description:'', instructions:'', dueDate:'', maxScore:'100', submissionTypes:['file'] })
  const toggleType = (t: string) => setForm(f => ({ ...f, submissionTypes: f.submissionTypes.includes(t) ? f.submissionTypes.filter(x=>x!==t) : [...f.submissionTypes, t] }))
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3"><button onClick={()=>nav('/instructor/courses')} className="btn-ghost p-2"><ArrowLeft size={17}/></button><h1 className="font-display text-xl font-bold text-white">New Assignment</h1></div>
      <div className="card p-6 space-y-4">
        <div><label className="label">Title</label><input className="input" placeholder="Assignment title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
        <div><label className="label">Description</label><textarea className="input h-24 resize-none" placeholder="What should students do?" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
        <div><label className="label">Detailed Instructions</label><textarea className="input h-32 resize-none" placeholder="Step by step instructions..." value={form.instructions} onChange={e=>setForm({...form,instructions:e.target.value})}/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Due Date</label><input type="datetime-local" className="input" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></div>
          <div><label className="label">Max Score</label><input type="number" className="input" value={form.maxScore} onChange={e=>setForm({...form,maxScore:e.target.value})}/></div>
        </div>
        <div>
          <label className="label">Accepted Submission Types</label>
          <div className="flex flex-wrap gap-2">
            {['file','github','portfolio','liveUrl','text'].map(t=>(
              <button key={t} type="button" onClick={()=>toggleType(t)} className={`badge capitalize border cursor-pointer transition-all ${form.submissionTypes.includes(t)?'badge-indigo border-brand-500/50':'text-slate-500 border-white/10 hover:border-white/20'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="btn-primary" onClick={()=>{toast.success('Assignment saved!');nav('/instructor/courses')}}><Save size={14}/> Save Assignment</button>
          <button className="btn-ghost" onClick={()=>nav('/instructor/courses')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
