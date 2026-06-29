import { useState } from 'react'
import { Plus, Pin, Trash2, Edit3, Megaphone } from 'lucide-react'
import toast from 'react-hot-toast'

const ANNOUNCEMENTS = [
  { id:'1', title:'Cohort 8 Schedule Update', content:'The start date for Cohort 8 Software Development has been moved to February 3rd. All enrolled students have been notified via email.', author:'Admin', targetRoles:['student'], isPinned:true, publishedAt:'2025-01-20', expiresAt:'2025-02-05' },
  { id:'2', title:'New Resources: React Hooks Cheat Sheets', content:'We have uploaded comprehensive React Hooks cheat sheets to the resources section for all Software Development students.', author:'Ngozi Adeleke', targetRoles:['student'], isPinned:false, publishedAt:'2025-01-18', expiresAt:null },
  { id:'3', title:'Instructor Meeting — Wednesday 4pm', content:'All instructors are required to attend the curriculum review meeting this Wednesday at 4pm in the main hall.', author:'Admin', targetRoles:['instructor'], isPinned:false, publishedAt:'2025-01-17', expiresAt:'2025-01-22' },
]

export default function AdminAnnouncements() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title:'', content:'', targetRoles:['student'], isPinned:false, expiresAt:'' })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Announcements</h1>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}><Plus size={15}/> New Announcement</button>
      </div>

      {showAdd && (
        <div className="card p-6 border-brand-600/30">
          <h2 className="font-display font-semibold text-white mb-4">New Announcement</h2>
          <div className="space-y-3">
            <div><label className="label">Title</label><input className="input" placeholder="Announcement title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div><label className="label">Content</label><textarea className="input h-28 resize-none" placeholder="Write your announcement..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Target Audience</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['student','instructor','admin'].map(role => (
                    <label key={role} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox"
                        checked={form.targetRoles.includes(role)}
                        onChange={e => setForm(f => ({ ...f, targetRoles: e.target.checked ? [...f.targetRoles,role] : f.targetRoles.filter(r=>r!==role) }))}
                        className="rounded"/>
                      <span className="text-sm text-slate-300 capitalize">{role}s</span>
                    </label>
                  ))}
                </div>
              </div>
              <div><label className="label">Expires (optional)</label><input type="date" className="input" value={form.expiresAt} onChange={e=>setForm({...form,expiresAt:e.target.value})}/></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPinned} onChange={e=>setForm({...form,isPinned:e.target.checked})} className="rounded"/>
              <span className="text-sm text-slate-300">Pin this announcement</span>
            </label>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary" onClick={() => { toast.success('Announcement published!'); setShowAdd(false) }}><Megaphone size={14}/> Publish</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} className={`card-hover p-5 ${a.isPinned ? 'border-brand-600/30' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {a.isPinned && <Pin size={12} className="text-brand-400 flex-shrink-0"/>}
                  <h3 className="font-semibold text-white">{a.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">{a.content}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>By {a.author}</span>
                  <span>·</span>
                  <span>{a.publishedAt}</span>
                  {a.expiresAt && <span>· Expires {a.expiresAt}</span>}
                  <span>·</span>
                  {a.targetRoles.map(r => <span key={r} className={`badge text-[10px] ${r==='student'?'badge-indigo':r==='instructor'?'badge-purple':'badge-amber'}`}>{r}s</span>)}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="btn-ghost p-1.5"><Edit3 size={13}/></button>
                <button onClick={() => toast.success('Deleted')} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10"><Trash2 size={13}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
