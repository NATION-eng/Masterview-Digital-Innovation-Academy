import { useState } from 'react'
import { Trophy, Plus, Shield, ShieldOff, Search, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const CERTS = [
  { id:'1', certNumber:'MVAC-2024-A1B2C3D4', student:'Emeka Obi', course:'Software Development', badge:'Badge 1: Web Foundations', issuedAt:'2024-11-15', status:'active' },
  { id:'2', certNumber:'MVAC-2024-E5F6G7H8', student:'Adaeze Nwosu', course:'Software Development', badge:'Badge 2: Frontend Dev', issuedAt:'2024-12-20', status:'active' },
  { id:'3', certNumber:'MVAC-2024-I9J0K1L2', student:'Tunde Adeyemi', course:'Graphic Design', badge:'Badge 1: Design Principles', issuedAt:'2024-12-10', status:'revoked' },
]

export default function AdminCertificates() {
  const [search, setSearch] = useState('')
  const [showIssue, setShowIssue] = useState(false)
  const [form, setForm] = useState({ student:'', course:'', badge:'' })

  const filtered = CERTS.filter(c =>
    c.student.toLowerCase().includes(search.toLowerCase()) ||
    c.certNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Certificates</h1>
        <button className="btn-primary text-sm" onClick={() => setShowIssue(true)}><Plus size={15}/> Issue Certificate</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[{label:'Total Issued',val:134,color:'text-white'},{label:'Active',val:128,color:'text-emerald-400'},{label:'Revoked',val:6,color:'text-red-400'}].map(s=>(
          <div key={s.label} className="stat-card"><div className={`font-display text-2xl font-bold ${s.color}`}>{s.val}</div><div className="stat-label">{s.label}</div></div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
        <input className="input pl-9" placeholder="Search certificates..." value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Certificate #</th><th>Student</th><th>Course / Badge</th><th>Issued</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td><span className="font-mono text-xs text-brand-400">{c.certNumber}</span></td>
                <td><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-400 text-xs font-bold">{c.student[0]}</div><span className="text-sm font-medium text-white">{c.student}</span></div></td>
                <td><div className="text-sm text-slate-300">{c.course}</div><div className="text-xs text-slate-500">{c.badge}</div></td>
                <td className="text-slate-400 text-sm">{new Date(c.issuedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</td>
                <td><span className={`badge ${c.status==='active'?'badge-green':'badge-red'}`}>{c.status}</span></td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="btn-ghost p-1.5 text-slate-400 hover:text-white"><Download size={13}/></button>
                    <a href={`/verify/${c.certNumber}`} target="_blank" rel="noopener noreferrer" className="btn-ghost p-1.5 text-brand-400 hover:text-brand-300"><Shield size={13}/></a>
                    {c.status === 'active' && (
                      <button onClick={() => toast.success('Certificate revoked')} className="btn-ghost p-1.5 text-red-400 hover:text-red-300"><ShieldOff size={13}/></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showIssue && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md">
            <h2 className="font-display text-lg font-bold text-white mb-5">Issue Certificate</h2>
            <div className="space-y-3">
              <div><label className="label">Student</label><input className="input" placeholder="Search student..." value={form.student} onChange={e=>setForm({...form,student:e.target.value})}/></div>
              <div><label className="label">Course</label>
                <select className="input" value={form.course} onChange={e=>setForm({...form,course:e.target.value})}>
                  <option value="">Select course</option>
                  {['Software Development','Vibe Coding','Artificial Intelligence','Graphic Design','Video Editing'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div><label className="label">Badge Level</label>
                <select className="input" value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}>
                  <option value="">Select badge</option>
                  <option>Badge 1</option><option>Badge 2</option><option>Badge 3</option>
                </select>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-400">
                ⚠️ Only issue certificates to students who have completed the badge requirements.
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-primary flex-1 justify-center" onClick={() => { toast.success('Certificate issued!'); setShowIssue(false) }}><Trophy size={14}/> Issue Certificate</button>
              <button className="btn-ghost" onClick={() => setShowIssue(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
