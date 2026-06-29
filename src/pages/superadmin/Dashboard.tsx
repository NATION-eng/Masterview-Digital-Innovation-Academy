import { Crown, Users, BookOpen, CreditCard, Shield, TrendingUp, Activity, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const platformData = [
  { month:'Aug', students:180, revenue:820 }, { month:'Sep', students:198, revenue:1100 },
  { month:'Oct', students:210, revenue:960 }, { month:'Nov', students:225, revenue:1340 },
  { month:'Dec', students:235, revenue:1120 }, { month:'Jan', students:247, revenue:1580 },
]

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-7">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-ink-900"><Crown size={18}/></div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Super Admin</h1>
          <p className="text-slate-500 text-sm">Full platform control & oversight</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Users', value:'260', delta:'+12 this month', icon:Users, color:'text-brand-400 bg-brand-600/15' },
          { label:'Total Revenue', value:'₦7.92M', delta:'All time', icon:CreditCard, color:'text-emerald-400 bg-emerald-600/15' },
          { label:'Active Courses', value:'5', delta:'2 modes', icon:BookOpen, color:'text-cyan-400 bg-cyan-600/15' },
          { label:'Audit Events', value:'1,247', delta:'Last 30 days', icon:Shield, color:'text-amber-400 bg-amber-600/15' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}><s.icon size={17}/></div>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="text-xs text-slate-500">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-display font-semibold text-white mb-4">Platform Growth</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={platformData}>
              <defs>
                <linearGradient id="studGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip contentStyle={{background:'#0F1A2E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',color:'#f1f5f9',fontSize:12}}/>
              <Area type="monotone" dataKey="students" name="Students" stroke="#F59E0B" fill="url(#studGrad)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h2 className="font-display font-semibold text-white">Portal Access</h2>
          {[
            { label:'Admin Portal', desc:'Student, course & payment management', to:'/admin/dashboard', icon:Shield, color:'text-amber-400 bg-amber-600/15' },
            { label:'Instructor Portal', desc:'Course content & grading', to:'/instructor/dashboard', icon:BookOpen, color:'text-cyan-400 bg-cyan-600/15' },
            { label:'All Users', desc:'Manage every user on the platform', to:'/superadmin/users', icon:Users, color:'text-brand-400 bg-brand-600/15' },
            { label:'Platform Settings', desc:'Global configuration & system settings', to:'/superadmin/settings', icon:Activity, color:'text-emerald-400 bg-emerald-600/15' },
          ].map(item => (
            <Link key={item.label} to={item.to} className="flex items-center gap-3 p-4 card-hover rounded-xl">
              <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}><item.icon size={16}/></div>
              <div><div className="text-sm font-medium text-white">{item.label}</div><div className="text-xs text-slate-500 mt-0.5">{item.desc}</div></div>
            </Link>
          ))}
        </div>
      </div>

      <div className="card p-5 bg-gradient-to-r from-brand-600/10 to-cyan-600/5 border-brand-600/20">
        <div className="flex items-start gap-3">
          <Globe size={16} className="text-brand-400 mt-0.5 flex-shrink-0"/>
          <div>
            <p className="text-sm font-semibold text-white mb-1">Platform Status: All Systems Operational</p>
            <p className="text-xs text-slate-400">API · Database · Storage · Payment Gateway · Email — all running normally.</p>
          </div>
          <div className="ml-auto flex-shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"/></div>
        </div>
      </div>
    </div>
  )
}
