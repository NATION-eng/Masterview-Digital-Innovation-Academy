import { useState } from 'react'
import { Search, Download, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const PAYMENTS = [
  { id:'1', student:'Emeka Obi', course:'Software Development', total:150000, paid:90000, balance:60000, status:'partial', lastPayment:'2025-01-10', gateway:'Paystack' },
  { id:'2', student:'Adaeze Nwosu', course:'Graphic Design', total:100000, paid:100000, balance:0, status:'paid', lastPayment:'2024-12-15', gateway:'Flutterwave' },
  { id:'3', student:'Tunde Adeyemi', course:'Vibe Coding', total:80000, paid:50000, balance:30000, status:'partial', lastPayment:'2025-01-05', gateway:'Paystack' },
  { id:'4', student:'Ngozi Eze', course:'Artificial Intelligence', total:250000, paid:0, balance:250000, status:'overdue', lastPayment:null, gateway:'-' },
  { id:'5', student:'Chukwudi Okafor', course:'Video Editing', total:80000, paid:80000, balance:0, status:'paid', lastPayment:'2025-01-20', gateway:'Paystack' },
  { id:'6', student:'Blessing Okoro', course:'Software Development', total:150000, paid:90000, balance:60000, status:'overdue', lastPayment:'2024-11-01', gateway:'Paystack' },
]

const monthlyRevenue = [
  { month:'Aug', amount:820 }, { month:'Sep', amount:1100 }, { month:'Oct', amount:960 },
  { month:'Nov', amount:1340 }, { month:'Dec', amount:1120 }, { month:'Jan', amount:1580 },
]

const statusBadge: Record<string,string> = { paid:'badge-green', partial:'badge-amber', pending:'badge-indigo', overdue:'badge-red', failed:'badge-red', refunded:'badge-cyan' }

export default function AdminPayments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = PAYMENTS.filter(p =>
    (statusFilter==='all' || p.status===statusFilter) &&
    p.student.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = PAYMENTS.reduce((a,p)=>a+p.paid, 0)
  const totalOutstanding = PAYMENTS.reduce((a,p)=>a+p.balance, 0)
  const overdueCount = PAYMENTS.filter(p=>p.status==='overdue').length

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold text-white">Payments & Finance</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Revenue', value:`₦${(totalRevenue/1000).toFixed(0)}k`, icon:TrendingUp, color:'text-emerald-400 bg-emerald-600/15' },
          { label:'Outstanding', value:`₦${(totalOutstanding/1000).toFixed(0)}k`, icon:Clock, color:'text-amber-400 bg-amber-600/15' },
          { label:'Overdue Students', value:overdueCount.toString(), icon:AlertCircle, color:'text-red-400 bg-red-600/15' },
          { label:'Fully Paid', value:PAYMENTS.filter(p=>p.status==='paid').length.toString(), icon:CheckCircle2, color:'text-cyan-400 bg-cyan-600/15' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}><s.icon size={17}/></div>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-white mb-4">Monthly Revenue (₦ thousands)</h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyRevenue}>
            <XAxis dataKey="month" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis hide/>
            <Tooltip formatter={(v:number)=>[`₦${v}k`,'Revenue']} contentStyle={{background:'#0F1A2E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',color:'#f1f5f9',fontSize:12}}/>
            <Bar dataKey="amount" fill="#4F46E5" radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input className="input pl-9" placeholder="Search students..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="input sm:w-40" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="paid">Fully Paid</option>
          <option value="partial">Partial</option>
          <option value="overdue">Overdue</option>
          <option value="pending">Pending</option>
        </select>
        <button className="btn-outline text-sm flex items-center gap-2"><Download size={14}/> Export CSV</button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Student</th><th>Course</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Last Payment</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><span className="font-medium text-white text-sm">{p.student}</span></td>
                <td><span className="text-sm text-slate-300">{p.course}</span></td>
                <td><span className="font-mono text-sm text-slate-300">₦{p.total.toLocaleString()}</span></td>
                <td><span className="font-mono text-sm text-emerald-400">₦{p.paid.toLocaleString()}</span></td>
                <td><span className={`font-mono text-sm ${p.balance>0?'text-amber-400':'text-slate-500'}`}>{p.balance>0?`₦${p.balance.toLocaleString()}`:'—'}</span></td>
                <td><span className={`badge ${statusBadge[p.status]}`}>{p.status}</span></td>
                <td className="text-slate-500 text-sm">{p.lastPayment ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
