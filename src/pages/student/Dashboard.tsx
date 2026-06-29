import { BookOpen, FileText, CheckSquare, Trophy, TrendingUp, Clock, Bell, ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

const mockCourses = [
  { id:'1', title:'Software Development', badge:'Badge 2 — Frontend Dev', progress:67, nextLesson:'React Hooks Deep Dive', week:'Week 4' },
  { id:'2', title:'Vibe Coding', badge:'Badge 1 — AI Foundations', progress:30, nextLesson:'Prompt Engineering 101', week:'Week 2' },
]
const mockActivity = [
  { icon:CheckSquare, text:'Submitted: Week 3 React Assignment', time:'2 hours ago', color:'text-emerald-400' },
  { icon:Trophy, text:'Quiz passed: JavaScript Fundamentals (88%)', time:'1 day ago', color:'text-amber-400' },
  { icon:BookOpen, text:'Completed lesson: useState & useEffect', time:'2 days ago', color:'text-brand-400' },
  { icon:Bell, text:'New announcement: Cohort 8 schedule update', time:'3 days ago', color:'text-cyan-400' },
]
const mockAssignments = [
  { title:'Build a REST API with Express', course:'Software Dev', due:'Tomorrow', urgent:true },
  { title:'Prompt Engineering Exercise', course:'Vibe Coding', due:'In 3 days', urgent:false },
  { title:'Portfolio Website Redesign', course:'Software Dev', due:'In 5 days', urgent:false },
]

export default function StudentDashboard() {
  const { user } = useAuthStore()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-500 text-sm">{greeting} 👋</p>
          <h1 className="font-display text-2xl font-bold text-white mt-0.5">{user?.firstName} {user?.lastName}</h1>
        </div>
        <Link to="/student/courses" className="btn-primary text-sm self-start sm:self-auto">Continue Learning <ArrowRight size={15}/></Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Courses Enrolled',value:'2',icon:BookOpen,color:'text-brand-400 bg-brand-600/15'},{label:'Avg. Progress',value:'67%',icon:TrendingUp,color:'text-emerald-400 bg-emerald-600/15'},{label:'Assignments Due',value:'3',icon:FileText,color:'text-amber-400 bg-amber-600/15'},{label:'Certificates',value:'1',icon:Trophy,color:'text-cyan-400 bg-cyan-600/15'}].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}><s.icon size={17}/></div>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-white">My Courses</h2>
            <Link to="/student/courses" className="text-xs text-brand-400 hover:text-brand-300 font-medium">View all →</Link>
          </div>
          {mockCourses.map(course => (
            <div key={course.id} className="card-hover p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div><h3 className="font-semibold text-white">{course.title}</h3><span className="badge badge-indigo mt-1">{course.badge}</span></div>
                <span className="font-mono text-sm font-bold text-brand-400">{course.progress}%</span>
              </div>
              <div className="progress-track mb-4"><div className="progress-fill" style={{width:`${course.progress}%`}}/></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500"><Clock size={12}/> {course.week} · Next: {course.nextLesson}</div>
                <Link to="/student/courses" className="flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-medium"><Play size={11}/> Continue</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-semibold text-white text-sm">Assignments Due</h2>
              <Link to="/student/assignments" className="text-xs text-brand-400 hover:text-brand-300">View all →</Link>
            </div>
            <div className="space-y-2">
              {mockAssignments.map(a => (
                <div key={a.title} className="card p-3.5 flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.urgent ? 'bg-red-400':'bg-slate-600'}`}/>
                  <div className="min-w-0"><p className="text-xs font-medium text-white leading-snug">{a.title}</p><p className="text-[10px] text-slate-500 mt-0.5">{a.course} · <span className={a.urgent?'text-red-400':'text-slate-500'}>{a.due}</span></p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-semibold text-white text-sm mb-3">Recent Activity</h2>
            <div className="space-y-1">
              {mockActivity.map((a,i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                  <a.icon size={13} className={`${a.color} flex-shrink-0 mt-0.5`}/>
                  <div><p className="text-xs text-slate-300 leading-snug">{a.text}</p><p className="text-[10px] text-slate-600 mt-0.5">{a.time}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
