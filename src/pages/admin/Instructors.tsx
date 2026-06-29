import { useState } from 'react'
import { Plus, Search, MoreVertical, Trash2, UserX } from 'lucide-react'
import toast from 'react-hot-toast'

const INSTRUCTORS = [
  { id:'1', name:'Dr. Emeka Okafor', instructorId:'MVI24001', email:'emeka.o@masterviewacademy.com', specializations:['Node.js','MongoDB','System Design'], courses:['Software Development'], students:48, status:'active' },
  { id:'2', name:'Ngozi Adeleke', instructorId:'MVI24002', email:'ngozi.a@masterviewacademy.com', specializations:['React','TypeScript','UI/UX'], courses:['Software Development','Vibe Coding'], students:36, status:'active' },
  { id:'3', name:'Tunde Balogun', instructorId:'MVI24003', email:'tunde.b@masterviewacademy.com', specializations:['Python','ML','TensorFlow'], courses:['Artificial Intelligence'], students:24, status:'active' },
  { id:'4', name:'Amaka Eze', instructorId:'MVI24004', email:'amaka.e@masterviewacademy.com', specializations:['Figma','Branding','Illustrator'], courses:['Graphic Design'], students:30, status:'active' },
]

export default function AdminInstructors() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [openMenu, setOpenMenu] = useState<string|null>(null)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', specializations:'' })

  const filtered = INSTRUCTORS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Instructors</h1>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}><Plus size={15}/> Add Instructor</button>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
        <input className="input pl-9 max-w-sm" placeholder="Search instructors..." value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(inst => (
          <div key={inst.id} className="card-hover p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-brand-600 flex items-center justify-center text-white font-bold">{inst.name[0]}</div>
                <div>
                  <div className="font-semibold text-white">{inst.name}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{inst.instructorId}</div>
                </div>
              </div>
              <div className="relative">
                <button className="btn-ghost p-1.5" onClick={() => setOpenMenu(openMenu===inst.id?null:inst.id)}><MoreVertical size={15}/></button>
                {openMenu === inst.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 card py-1 shadow-2xl z-20">
                    <button onClick={() => { toast.success(`${inst.name} suspended`); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"><UserX size={12}/> Suspend</button>
                    <button onClick={() => { toast.success(`${inst.name} removed`); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12}/> Remove</button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-2.5 text-sm">
              <div className="text-slate-500 text-xs">{inst.email}</div>
              <div className="flex flex-wrap gap-1.5">
                {inst.specializations.map(s => <span key={s} className="badge badge-purple text-[10px]">{s}</span>)}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <div className="text-xs text-slate-500">{inst.courses.length} course{inst.courses.length>1?'s':''} · {inst.students} students</div>
                <span className="badge badge-green">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md">
            <h2 className="font-display text-lg font-bold text-white mb-5">Add Instructor</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">First Name</label><input className="input" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/></div>
                <div><label className="label">Last Name</label><input className="input" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/></div>
              </div>
              <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              <div><label className="label">Specializations (comma separated)</label><input className="input" placeholder="React, Node.js, MongoDB" value={form.specializations} onChange={e=>setForm({...form,specializations:e.target.value})}/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-primary flex-1 justify-center" onClick={() => { toast.success('Instructor added!'); setShowAdd(false) }}>Add Instructor</button>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
