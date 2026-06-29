import { useState } from 'react'
import { ChevronRight, ChevronDown, Play, Lock, CheckCircle2, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const CURRICULUM = [
  { id:'1', title:'Software Development', badge:'Badge 2 — Frontend Development', progress:67, color:'from-blue-600 to-indigo-600',
    weeks:[
      { id:'w1', num:1, title:'React Fundamentals', completed:true, lessons:[
        { id:'l1', title:'Introduction to React', duration:'18 min', completed:true },
        { id:'l2', title:'JSX & Components', duration:'22 min', completed:true },
        { id:'l3', title:'Props & State', duration:'28 min', completed:true },
      ]},
      { id:'w2', num:2, title:'Hooks & State Management', completed:true, lessons:[
        { id:'l4', title:'useState Hook', duration:'20 min', completed:true },
        { id:'l5', title:'useEffect Hook', duration:'25 min', completed:true },
        { id:'l6', title:'Custom Hooks', duration:'30 min', completed:false },
      ]},
      { id:'w3', num:3, title:'React Router & API', completed:false, lessons:[
        { id:'l7', title:'React Router v6', duration:'22 min', completed:false },
        { id:'l8', title:'Fetching Data with Axios', duration:'18 min', completed:false },
        { id:'l9', title:'Error Handling', duration:'15 min', completed:false },
      ]},
      { id:'w4', num:4, title:'TypeScript with React', completed:false, lessons:[
        { id:'l10', title:'TypeScript Basics', duration:'28 min', completed:false },
        { id:'l11', title:'Typing Components & Props', duration:'25 min', completed:false },
        { id:'l12', title:'Generics in React', duration:'30 min', completed:false },
      ]},
    ]
  },
]

export default function StudentCourses() {
  const [expanded, setExpanded] = useState<Record<string,boolean>>({ w1:true })

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">My Courses</h1>
      {CURRICULUM.map(course => (
        <div key={course.id} className="card overflow-hidden">
          <div className={`h-1 bg-gradient-to-r ${course.color}`}/>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{course.title}</h2>
                <span className="badge badge-indigo mt-1">{course.badge}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-brand-400">{course.progress}%</div>
                  <div className="text-[10px] text-slate-500">complete</div>
                </div>
                <div className="w-20">
                  <div className="progress-track"><div className="progress-fill" style={{width:`${course.progress}%`}}/></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {course.weeks.map(week => (
                <div key={week.id} className="border border-white/[0.07] rounded-xl overflow-hidden">
                  <button onClick={() => setExpanded(e => ({...e,[week.id]:!e[week.id]}))}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center gap-3">
                      {week.completed
                        ? <CheckCircle2 size={16} className="text-emerald-400"/>
                        : <div className="w-4 h-4 rounded-full border border-slate-600"/>}
                      <span className="text-sm font-medium text-white">Week {week.num}: {week.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{week.lessons.filter(l=>l.completed).length}/{week.lessons.length} lessons</span>
                      {expanded[week.id] ? <ChevronDown size={14} className="text-slate-500"/> : <ChevronRight size={14} className="text-slate-500"/>}
                    </div>
                  </button>
                  {expanded[week.id] && (
                    <div className="border-t border-white/[0.07] divide-y divide-white/[0.05]">
                      {week.lessons.map(lesson => (
                        <Link key={lesson.id} to={`/student/courses/${course.id}/lesson/${lesson.id}`}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.03] transition-colors group">
                          <div className="flex-shrink-0">
                            {lesson.completed
                              ? <CheckCircle2 size={15} className="text-emerald-400"/>
                              : week.completed || week.num <= 2
                                ? <Play size={14} className="text-brand-400"/>
                                : <Lock size={13} className="text-slate-600"/>}
                          </div>
                          <span className={`text-sm flex-1 ${lesson.completed ? 'text-slate-400 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                            {lesson.title}
                          </span>
                          <span className="text-xs text-slate-600">{lesson.duration}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="card p-8 text-center border-dashed">
        <BookOpen size={32} className="text-slate-600 mx-auto mb-3"/>
        <h3 className="font-semibold text-white mb-1">Enroll in another program</h3>
        <p className="text-slate-500 text-sm mb-4">Expand your skills with a second track</p>
        <Link to="/programs" className="btn-outline text-sm">Browse Programs</Link>
      </div>
    </div>
  )
}
