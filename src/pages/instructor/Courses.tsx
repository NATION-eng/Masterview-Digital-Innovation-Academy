import { Link } from 'react-router-dom'
import { Plus, Video, FileText, Brain, Users } from 'lucide-react'

const COURSES = [
  { id:'1', title:'Software Development', cohort:'Cohort 8', students:24, badge:'Badge 2 — Frontend Dev',
    weeks:[
      { num:1, title:'React Fundamentals', lessons:3, published:true },
      { num:2, title:'Hooks & State', lessons:3, published:true },
      { num:3, title:'Router & API', lessons:3, published:false },
    ]
  },
]

export default function InstructorCourses() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">My Courses</h1>
      {COURSES.map(course => (
        <div key={course.id} className="card overflow-hidden">
          <div className="p-5 border-b border-white/[0.07] flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">{course.title}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{course.cohort} · <span className="text-brand-400">{course.students} students</span> · {course.badge}</p>
            </div>
            <Link to={`/instructor/courses/${course.id}/lessons/new`} className="btn-primary text-sm"><Plus size={15}/> Add Lesson</Link>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {course.weeks.map(week => (
                <div key={week.num} className="flex items-center justify-between p-4 bg-ink-700/50 rounded-xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">{week.num}</div>
                    <div><p className="text-sm font-medium text-white">Week {week.num}: {week.title}</p><p className="text-xs text-slate-500">{week.lessons} lessons</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${week.published ? 'badge-green' : 'badge-amber'}`}>{week.published ? 'Published' : 'Draft'}</span>
                    <Link to={`/instructor/courses/${course.id}/lessons/new`} className="btn-ghost text-xs"><Video size={12}/> + Lesson</Link>
                    <Link to={`/instructor/courses/${course.id}/assignments/new`} className="btn-ghost text-xs"><FileText size={12}/> + Assignment</Link>
                    <Link to={`/instructor/courses/${course.id}/quizzes/new`} className="btn-ghost text-xs"><Brain size={12}/> + Quiz</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
