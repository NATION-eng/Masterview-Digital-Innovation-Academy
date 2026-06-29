import { useState } from 'react'
import { Search, Users, UserX, UserCheck, Trash2, MoreVertical } from 'lucide-react'
import toast from 'react-hot-toast'

const ALL_USERS = [
  { id:'1', name:'Dr. Emeka Okafor', email:'emeka.o@masterviewacademy.com', role:'admin', status:'active', joined:'2024-01-01' },
  { id:'2', name:'Ngozi Adeleke', email:'ngozi@masterviewacademy.com', role:'instructor', status:'active', joined:'2024-01-15' },
  { id:'3', name:'Emeka Obi', email:'emeka.obi@example.com', role:'student', status:'active', joined:'2024-09-01' },
  { id:'4', name:'Adaeze Nwosu', email:'adaeze@example.com', role:'student', status:'active', joined:'2024-09-01' },
  { id:'5', name:'Tunde Adeyemi', email:'tunde@example.com', role:'student', status:'suspended', joined:'2024-11-01' },
  { id:'6', name:'Tunde Balogun', email:'tunde.b@masterviewacademy.com', role:'instructor', status:'active', joined:'2024-02-01' },
]

const roleColors: Record<string,string> = { student:'badge-indigo', instructor:'badge-purple', admin:'badge-amber', super_admin:'text-yellow-400 bg-yellow-500/15 border-yellow-500/30 border' }

export default function SuperAdminUsers() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState<string|null>(null)

  const filtered = ALL_USERS.filter(u =>
    (roleFilter==='all'||u.role===roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold text-white">All Users</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{label:'Total',val:ALL_USERS.length},{label:'Students',val:ALL_USERS.filter(u=>u.role==='student').length},{label:'Instructors',val:ALL_USERS.filter(u=>u.role==='instructor').length},{label:'Admins',val:ALL_USERS.filter(u=>u.role==='admin').length}].map(s=>(
          <div key={s.label} className="card p-3.5 text-center"><div className="font-display text-xl font-bold text-white">{s.val}</div><div className="text-xs text-slate-500 mt-0.5">{s.label}</div></div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input className="input pl-9" placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="input sm:w-40" value={roleFilter} onChange={e=>setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th></th></tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">{u.name[0]}</div>
                    <div><div className="font-medium text-white text-sm">{u.name}</div><div className="text-xs text-slate-500">{u.email}</div></div>
                  </div>
                </td>
                <td><span className={`badge ${roleColors[u.role]}`}>{u.role.replace('_',' ')}</span></td>
                <td><span className={`badge ${u.status==='active'?'badge-green':'badge-red'}`}>{u.status}</span></td>
                <td className="text-sm text-slate-500">{u.joined}</td>
                <td>
                  <div className="relative">
                    <button className="btn-ghost p-1.5" onClick={() => setOpenMenu(openMenu===u.id?null:u.id)}><MoreVertical size={15}/></button>
                    {openMenu === u.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 card py-1 shadow-2xl z-20">
                        {u.status==='active'
                          ? <button onClick={()=>{toast.success(`${u.name} suspended`);setOpenMenu(null)}} className="w-full text-left px-3.5 py-2 text-xs text-amber-400 hover:bg-amber-500/10 flex items-center gap-2"><UserX size={12}/> Suspend</button>
                          : <button onClick={()=>{toast.success(`${u.name} reactivated`);setOpenMenu(null)}} className="w-full text-left px-3.5 py-2 text-xs text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-2"><UserCheck size={12}/> Reactivate</button>}
                        <button onClick={()=>{toast.success('User deleted');setOpenMenu(null)}} className="w-full text-left px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={12}/> Delete User</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
