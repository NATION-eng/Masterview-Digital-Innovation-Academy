import { Users, BookOpen, CheckSquare, TrendingUp, Clock, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

const myCourses = [
  { title:'Software Development', cohort:'Cohort 8', students:24, avgProgress:58, nextSession:'Monday 10am' },
  { title:'Vibe Coding', cohort:'Cohort 8', students:18, avgProgress:42, nextSession:'Wednesday 2pm' },
]
const pendingGrades = [
  { student:'Emeka Obi', assignment:'REST API Project', course:'Software Dev', submitted:'2 hours ago' },
  { student:'Adaeze Nwosu', assignment:'React Portfolio', course:'Software Dev', submitted:'5 hours ago' },
  { student:'Tunde Adeyemi', assignment:'Prompt Exercises', course:'Vibe Coding', submitted:'1 day ago' },
]

export default function InstructorDashboard() {
  const { user } = useAuthStore()
  return (
    <div className="space-y-7">
      <div>
        <p className="text-slate-500 text-sm">Welcome back 👋</p>
        <h1 className="font-display text-2xl font-bold text-white mt-0.5">{user?.firstName} {user?.lastName}</h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Students',value:'42',icon:Users,color:'text-brand-400 bg-brand-600/15'},{label:'Active Courses',value:'2',icon:BookOpen,color:'text-cyan-400 bg-cyan-600/15'},{label:'Pending Grades',value:'3',icon:CheckSquare,color:'text-amber-400 bg-amber-600/15'},{label:'Avg Progress',value:'51%',icon:TrendingUp,color:'text-emerald-400 bg-emerald-600/15'}].map(s=>(
          <div key={s.label} className="stat-card"><div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}><s.icon size={17}/></div><div className="stat-num">{s.value}</div><div className="stat-label">{s.label}</div></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><h2 className="font-display font-semibold text-white">My Courses</h2><Link to="/instructor/courses" className="text-xs text-brand-400">View all →</Link></div>
          {myCourses.map(c=>(
            <div key={c.title} className="card-hover p-5">
              <div className="flex justify-between items-start mb-3"><div><h3 className="font-semibold text-white">{c.title}</h3><p className="text-xs text-slate-500 mt-0.5">{c.cohort} · {c.students} students</p></div><Link to="/instructor/courses" className="btn-primary text-xs py-1.5 px-3">Manage</Link></div>
              <div className="flex items-center gap-3"><div className="flex-1"><div className="progress-track"><div className="progress-fill" style={{width:`${c.avgProgress}%`}}/></div></div><span className="text-xs font-mono text-slate-400">{c.avgProgress}%</span></div>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500"><Clock size={11}/> Next: {c.nextSession}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-3"><h2 className="font-display font-semibold text-white">Pending Grades</h2><Link to="/instructor/grades" className="text-xs text-brand-400">View all →</Link></div>
          <div className="space-y-2">
            {pendingGrades.map((g,i)=>(
              <div key={i} className="card p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 text-xs font-bold">{g.student[0]}</div><div><p className="text-sm font-medium text-white">{g.student}</p><p className="text-xs text-slate-500">{g.assignment} · {g.course}</p></div></div>
                <div className="flex items-center gap-2 flex-shrink-0"><span className="text-xs text-slate-600">{g.submitted}</span><Link to="/instructor/grades" className="btn-primary text-xs py-1 px-2.5"><Star size={11}/> Grade</Link></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
