import { useState } from 'react'
import { Search, Plus, MoreVertical, UserX, UserCheck, Trash2, Eye, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const STUDENTS = [
  { id:'1', name:'Emeka Obi', studentId:'MV24001', email:'emeka@example.com', course:'Software Development', badge:'Badge 2', progress:72, status:'active', enrolled:'2024-09-01', payment:'partial' },
  { id:'2', name:'Adaeze Nwosu', studentId:'MV24002', email:'adaeze@example.com', course:'Graphic Design', badge:'Badge 1', progress:85, status:'active', enrolled:'2024-09-01', payment:'paid' },
  { id:'3', name:'Tunde Adeyemi', studentId:'MV24003', email:'tunde@example.com', course:'Vibe Coding', badge:'Badge 1', progress:45, status:'active', enrolled:'2024-11-01', payment:'partial' },
  { id:'4', name:'Ngozi Eze', studentId:'MV24004', email:'ngozi@example.com', course:'Artificial Intelligence', badge:'Badge 1', progress:30, status:'suspended', enrolled:'2024-11-01', payment:'pending' },
  { id:'5', name:'Chukwudi Okafor', studentId:'MV24005', email:'chukwudi@example.com', course:'Video Editing', badge:'Badge 1', progress:60, status:'active', enrolled:'2025-01-05', payment:'paid' },
  { id:'6', name:'Blessing Okoro', studentId:'MV24006', email:'blessing@example.com', course:'Software Development', badge:'Badge 1', progress:20, status:'active', enrolled:'2025-01-05', payment:'overdue' },
]

const paymentBadge: Record<string,string> = { paid:'badge-green', partial:'badge-amber', pending:'badge-indigo', overdue:'badge-red' }
const statusBadge: Record<string,string> = { active:'badge-green', suspended:'badge-red', dropped:'badge-amber' }

export default function AdminStudents() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState<string|null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStudent, setNewStudent] = useState({ firstName:'', lastName:'', email:'', phone:'', course:'' })

  const filtered = STUDENTS.filter(s =>
    (statusFilter === 'all' || s.status === statusFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.includes(search) || s.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-white">Students</h1>
        <button className="btn-primary text-sm self-start" onClick={() => setShowAddModal(true)}><Plus size={15}/> Add Student</button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input className="input pl-9" placeholder="Search by name, ID or email..." value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <select className="input sm:w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{ label:'Total', val: STUDENTS.length, color:'text-white' },{ label:'Active', val: STUDENTS.filter(s=>s.status==='active').length, color:'text-emerald-400' },{ label:'Suspended', val: STUDENTS.filter(s=>s.status==='suspended').length, color:'text-red-400' },{ label:'Overdue Payment', val: STUDENTS.filter(s=>s.payment==='overdue').length, color:'text-amber-400' }].map(s => (
          <div key={s.label} className="card p-3.5 text-center">
            <div className={`font-display text-xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold flex-shrink-0">{s.name[0]}</div>
                    <div>
                      <div className="font-medium text-white text-sm">{s.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{s.studentId} · {s.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm text-slate-300">{s.course}</div>
                  <div className="text-[10px] text-slate-500">{s.badge}</div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 progress-track"><div className="progress-fill" style={{width:`${s.progress}%`}}/></div>
                    <span className="text-xs font-mono text-slate-400">{s.progress}%</span>
                  </div>
                </td>
                <td><span className={`badge ${paymentBadge[s.payment]}`}>{s.payment}</span></td>
                <td><span className={`badge ${statusBadge[s.status]}`}>{s.status}</span></td>
                <td>
                  <div className="relative">
                    <button className="btn-ghost p-1.5" onClick={() => setOpenMenu(openMenu === s.id ? null : s.id)}><MoreVertical size={15}/></button>
                    {openMenu === s.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 card py-1 shadow-2xl shadow-black/50 z-20">
                        <button className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/5 flex items-center gap-2"><Eye size={12}/> View Profile</button>
                        {s.status === 'active'
                          ? <button onClick={() => { toast.success(`${s.name} suspended`); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"><UserX size={12}/> Suspend</button>
                          : <button onClick={() => { toast.success(`${s.name} reactivated`); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-2"><UserCheck size={12}/> Reactivate</button>
                        }
                        <button onClick={() => { toast.success(`${s.name} deleted`); setOpenMenu(null) }} className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12}/> Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">No students match your search.</div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-md">
            <h2 className="font-display text-lg font-bold text-white mb-5">Add New Student</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">First Name</label><input className="input" placeholder="Emeka" value={newStudent.firstName} onChange={e=>setNewStudent({...newStudent,firstName:e.target.value})}/></div>
                <div><label className="label">Last Name</label><input className="input" placeholder="Obi" value={newStudent.lastName} onChange={e=>setNewStudent({...newStudent,lastName:e.target.value})}/></div>
              </div>
              <div><label className="label">Email</label><input className="input" type="email" placeholder="student@example.com" value={newStudent.email} onChange={e=>setNewStudent({...newStudent,email:e.target.value})}/></div>
              <div><label className="label">Phone</label><input className="input" placeholder="08012345678" value={newStudent.phone} onChange={e=>setNewStudent({...newStudent,phone:e.target.value})}/></div>
              <div>
                <label className="label">Program</label>
                <select className="input" value={newStudent.course} onChange={e=>setNewStudent({...newStudent,course:e.target.value})}>
                  <option value="">Select program</option>
                  {['Software Development','Vibe Coding','Artificial Intelligence','Graphic Design','Video Editing'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="btn-primary flex-1 justify-center" onClick={() => { toast.success('Student added!'); setShowAddModal(false) }}>Add Student</button>
              <button className="btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
