import { useState } from 'react'
import { Plus, BookOpen, Users, Edit3, Archive, MoreVertical } from 'lucide-react'
import toast from 'react-hot-toast'

const COURSES = [
  { id:'1', title:'Software Development', department:'School of Software Engineering', price:150000, deposit:90000, enrolled:48, instructors:['Emeka Okafor','Ngozi Adeleke'], deliveryMode:'hybrid', status:'published' },
  { id:'2', title:'Vibe Coding', department:'School of Software Engineering', price:80000, deposit:50000, enrolled:24, instructors:['Ngozi Adeleke'], deliveryMode:'online', status:'published' },
  { id:'3', title:'Artificial Intelligence', department:'School of AI & Data Science', price:250000, deposit:150000, enrolled:18, instructors:['Tunde Balogun'], deliveryMode:'hybrid', status:'published' },
  { id:'4', title:'Graphic Design', department:'School of Creative Arts', price:100000, deposit:60000, enrolled:30, instructors:['Amaka Eze'], deliveryMode:'physical', status:'published' },
  { id:'5', title:'Video Editing', department:'School of Creative Arts', price:80000, deposit:50000, enrolled:15, instructors:['Amaka Eze'], deliveryMode:'physical', status:'draft' },
]

export default function AdminCourses() {
  const [showAdd, setShowAdd] = useState(false)
  const [openMenu, setOpenMenu] = useState<string|null>(null)
  const [form, setForm] = useState({ title:'', department:'', price:'', depositPercentage:'60', deliveryMode:'hybrid', description:'' })

  const depositAmt = form.price ? Math.ceil((+form.price * +form.depositPercentage) / 100) : 0

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Courses</h1>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}><Plus size={15}/> Add Course</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {COURSES.map(c => (
          <div key={c.id} className="card-hover p-5 relative">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600/15 flex items-center justify-center flex-shrink-0"><BookOpen size={17} className="text-brand-400"/></div>
              <div className="relative">
                <button className="btn-ghost p-1.5" onClick={() => setOpenMenu(openMenu===c.id?null:c.id)}><MoreVertical size={15}/></button>
                {openMenu === c.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 card py-1 shadow-2xl z-20">
                    <button className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/5 flex items-center gap-2"><Edit3 size={12}/> Edit Course</button>
                    <button onClick={() => { toast.success('Course archived'); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"><Archive size={12}/> Archive</button>
                  </div>
                )}
              </div>
            </div>
            <h3 className="font-display font-semibold text-white mb-1">{c.title}</h3>
            <p className="text-xs text-slate-500 mb-3">{c.department}</p>
            <div className="space-y-2 text-xs mb-4">
              <div className="flex justify-between"><span className="text-slate-500">Price</span><span className="font-mono font-medium text-white">₦{c.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Min. Deposit</span><span className="font-mono text-emerald-400">₦{c.deposit.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Enrolled</span><span className="text-white flex items-center gap-1"><Users size={10}/> {c.enrolled}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Mode</span><span className={`badge text-[10px] ${c.deliveryMode==='online'?'badge-indigo':c.deliveryMode==='physical'?'badge-cyan':'badge-purple'}`}>{c.deliveryMode}</span></div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-1">{c.instructors.slice(0,2).map(i=><span key={i} className="text-[10px] text-slate-500">{i.split(' ')[0]}</span>)}</div>
              <span className={`badge text-[10px] ${c.status==='published'?'badge-green':'badge-amber'}`}>{c.status}</span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="card p-6 w-full max-w-lg my-4">
            <h2 className="font-display text-lg font-bold text-white mb-5">Add New Course</h2>
            <div className="space-y-3">
              <div><label className="label">Course Title</label><input className="input" placeholder="e.g. Software Development" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div><label className="label">Department</label><input className="input" placeholder="e.g. School of Software Engineering" value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></div>
              <div><label className="label">Description</label><textarea className="input h-20 resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Course Fee (₦)</label><input type="number" className="input" placeholder="150000" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></div>
                <div><label className="label">Deposit % (min 50%)</label><input type="number" min={50} max={100} className="input" value={form.depositPercentage} onChange={e=>setForm({...form,depositPercentage:e.target.value})}/></div>
              </div>
              {depositAmt > 0 && <p className="text-xs text-emerald-400">Minimum deposit: ₦{depositAmt.toLocaleString()}</p>}
              <div><label className="label">Delivery Mode</label>
                <select className="input" value={form.deliveryMode} onChange={e=>setForm({...form,deliveryMode:e.target.value})}>
                  <option value="hybrid">Physical + Online</option><option value="physical">Physical Only</option><option value="online">Online Only</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-primary flex-1 justify-center" onClick={() => { toast.success('Course created!'); setShowAdd(false) }}>Create Course</button>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
