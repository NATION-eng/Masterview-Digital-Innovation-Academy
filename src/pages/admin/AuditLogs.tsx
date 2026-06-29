import { useState } from 'react'
import { Search, Shield, AlertCircle, CheckCircle2, Filter } from 'lucide-react'

const LOGS = [
  { id:'1', user:'admin@masterviewacademy.com', action:'LOGIN', entity:'User', status:'success', ipAddress:'102.89.23.44', userAgent:'Chrome/120 Windows', createdAt:'2025-01-28T09:14:22' },
  { id:'2', user:'emeka@example.com', action:'LOGIN_FAILED', entity:'User', status:'failure', ipAddress:'102.89.23.55', userAgent:'Firefox/121 Mac', createdAt:'2025-01-28T09:10:11' },
  { id:'3', user:'admin@masterviewacademy.com', action:'CERTIFICATE_ISSUED', entity:'Certificate', entityId:'MVAC-2024-A1B2C3D4', status:'success', ipAddress:'102.89.23.44', userAgent:'Chrome/120 Windows', createdAt:'2025-01-27T16:42:00' },
  { id:'4', user:'admin@masterviewacademy.com', action:'STUDENT_SUSPENDED', entity:'User', entityId:'MV24004', status:'success', ipAddress:'102.89.23.44', userAgent:'Chrome/120 Windows', createdAt:'2025-01-27T14:20:33' },
  { id:'5', user:'ngozi@masterviewacademy.com', action:'LESSON_CREATED', entity:'Lesson', status:'success', ipAddress:'197.211.62.10', userAgent:'Chrome/120 Mac', createdAt:'2025-01-27T11:05:17' },
  { id:'6', user:'emeka@example.com', action:'PAYMENT_MADE', entity:'Payment', entityId:'MV-PAY-001', status:'success', ipAddress:'102.89.44.22', userAgent:'Chrome/120 Android', createdAt:'2025-01-26T10:30:00' },
]

const actionColors: Record<string,string> = {
  LOGIN:'badge-green', LOGIN_FAILED:'badge-red', CERTIFICATE_ISSUED:'badge-amber',
  STUDENT_SUSPENDED:'badge-red', LESSON_CREATED:'badge-cyan', PAYMENT_MADE:'badge-green',
}

export default function AdminAuditLogs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = LOGS.filter(l =>
    (statusFilter === 'all' || l.status === statusFilter) &&
    (l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.entity.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Shield size={20} className="text-brand-400"/>
        <h1 className="font-display text-2xl font-bold text-white">Audit Logs</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[{label:'Total Events',val:LOGS.length,color:'text-white'},{label:'Failed',val:LOGS.filter(l=>l.status==='failure').length,color:'text-red-400'},{label:'Today',val:4,color:'text-brand-400'}].map(s=>(
          <div key={s.label} className="stat-card"><div className={`font-display text-xl font-bold ${s.color}`}>{s.val}</div><div className="stat-label">{s.label}</div></div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input className="input pl-9" placeholder="Search logs..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="input sm:w-36" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Time</th><th>User</th><th>Action</th><th>Entity</th><th>IP Address</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id}>
                <td className="font-mono text-xs text-slate-400 whitespace-nowrap">{new Date(log.createdAt).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
                <td className="text-sm text-slate-300 max-w-[180px] truncate">{log.user}</td>
                <td><span className={`badge ${actionColors[log.action] ?? 'badge-indigo'} text-[10px]`}>{log.action.replace(/_/g,' ')}</span></td>
                <td><div className="text-sm text-slate-300">{log.entity}</div>{log.entityId && <div className="text-[10px] text-slate-600 font-mono">{log.entityId}</div>}</td>
                <td className="font-mono text-xs text-slate-500">{log.ipAddress}</td>
                <td>
                  {log.status === 'success'
                    ? <CheckCircle2 size={14} className="text-emerald-400"/>
                    : <AlertCircle size={14} className="text-red-400"/>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-10 text-center text-slate-500 text-sm">No logs match your filters.</div>}
      </div>
    </div>
  )
}
