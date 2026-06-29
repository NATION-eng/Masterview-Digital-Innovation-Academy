import { Users, BookOpen, CreditCard, Trophy, TrendingUp, AlertCircle, UserCheck, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month:'Aug', revenue:820000 }, { month:'Sep', revenue:1100000 }, { month:'Oct', revenue:960000 },
  { month:'Nov', revenue:1340000 }, { month:'Dec', revenue:1120000 }, { month:'Jan', revenue:1580000 },
]

const recentStudents = [
  { name:'Emeka Obi', course:'Software Dev', date:'Jan 28', status:'active' },
  { name:'Adaeze Nwosu', course:'Graphic Design', date:'Jan 27', status:'active' },
  { name:'Tunde Adeyemi', course:'Vibe Coding', date:'Jan 26', status:'pending' },
  { name:'Ngozi Eze', course:'AI', date:'Jan 25', status:'active' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Masterview Digital Innovation Academy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Students', value:'247', delta:'+12 this month', icon:Users, color:'text-brand-400 bg-brand-600/15', deltaColor:'stat-delta-up' },
          { label:'Active Students', value:'189', delta:'77% active rate', icon:UserCheck, color:'text-emerald-400 bg-emerald-600/15', deltaColor:'stat-delta-up' },
          { label:'Instructors', value:'8', delta:'2 programs', icon:GraduationCap, color:'text-purple-400 bg-purple-600/15', deltaColor:'text-slate-500 text-xs' },
          { label:'Certificates Issued', value:'134', delta:'+9 this month', icon:Trophy, color:'text-amber-400 bg-amber-600/15', deltaColor:'stat-delta-up' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}><s.icon size={17}/></div>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={s.deltaColor}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">Last 6 months</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-emerald-400 text-lg">₦1.58M</div>
              <div className="text-xs text-slate-500">This month</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip formatter={(v: number) => [`₦${(v/1000).toFixed(0)}k`, 'Revenue']} contentStyle={{ background:'#0F1A2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', color:'#f1f5f9', fontSize:12 }}/>
              <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="url(#revGrad)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-white">Quick Actions</h2>
          {[
            { label:'Add New Student', to:'/admin/students', icon:Users, color:'text-brand-400' },
            { label:'Manage Courses', to:'/admin/courses', icon:BookOpen, color:'text-cyan-400' },
            { label:'Payment Overview', to:'/admin/payments', icon:CreditCard, color:'text-amber-400' },
            { label:'Issue Certificate', to:'/admin/certificates', icon:Trophy, color:'text-emerald-400' },
            { label:'Overdue Payments', to:'/admin/payments', icon:AlertCircle, color:'text-red-400' },
          ].map(a => (
            <Link key={a.label} to={a.to} className="flex items-center gap-3 p-3.5 card-hover rounded-xl cursor-pointer">
              <a.icon size={16} className={a.color}/>
              <span className="text-sm text-slate-300 hover:text-white transition-colors">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent enrollments */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <h2 className="font-display font-semibold text-white">Recent Enrollments</h2>
          <Link to="/admin/students" className="text-xs text-brand-400">View all →</Link>
        </div>
        <table className="tbl w-full">
          <thead><tr><th>Student</th><th>Course</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {recentStudents.map(s => (
              <tr key={s.name}>
                <td><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">{s.name[0]}</div><span className="font-medium text-white text-sm">{s.name}</span></div></td>
                <td><span className="badge badge-indigo">{s.course}</span></td>
                <td className="text-slate-500">{s.date}</td>
                <td><span className={`badge ${s.status==='active'?'badge-green':'badge-amber'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
