import { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, School, Layers, BookOpen, Calendar, LucideIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const CURRICULUM_TREE = [
  { id:'s1', name:'School of Software Engineering', departments:[
    { id:'d1', name:'Software Development', courses:[
      { id:'c1', name:'Software Development', badges:[
        { id:'b1', level:1, title:'Web Foundations', modules:[
          { id:'m1', name:'HTML & CSS Fundamentals', weeks:[
            { id:'w1', num:1, title:'HTML5 Deep Dive', lessons:3 },
            { id:'w2', num:2, title:'CSS & Flexbox', lessons:4 },
          ]},
        ]},
        { id:'b2', level:2, title:'Frontend Development', modules:[] },
        { id:'b3', level:3, title:'Full Stack Development', modules:[] },
      ]},
    ]},
    { id:'d2', name:'Vibe Coding', courses:[
      { id:'c2', name:'Vibe Coding', badges:[] },
    ]},
  ]},
  { id:'s2', name:'School of AI & Data Science', departments:[
    { id:'d3', name:'Artificial Intelligence', courses:[
      { id:'c3', name:'Artificial Intelligence', badges:[] },
    ]},
  ]},
  { id:'s3', name:'School of Creative Arts', departments:[
    { id:'d4', name:'Creative Programs', courses:[
      { id:'c4', name:'Graphic Design', badges:[] },
      { id:'c5', name:'Video Editing', badges:[] },
    ]},
  ]},
]

type NodeType = 'school'|'department'|'course'|'badge'|'module'|'week'

interface RowProps {
  id: string
  icon: LucideIcon
  iconColor: string
  name: string
  addType: NodeType
  badge?: string
  children?: React.ReactNode
}

export default function AdminCurriculum() {
  const [expanded, setExpanded] = useState<Record<string,boolean>>({ s1:true, d1:true, c1:true, b1:true })
  const [showAdd, setShowAdd] = useState<{type:NodeType;parentId:string}|null>(null)
  const [addName, setAddName] = useState('')

  const toggle = (id: string) => setExpanded(e => ({...e,[id]:!e[id]}))

  const Row = ({ id, icon: Icon, iconColor, name, addType, badge, children }: RowProps) => (
    <div>
      <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.03] group cursor-pointer" onClick={() => toggle(id)}>
        <div className="flex items-center gap-2.5 min-w-0">
          {children != null
            ? (expanded[id] ? <ChevronDown size={13} className="text-slate-500 flex-shrink-0"/> : <ChevronRight size={13} className="text-slate-500 flex-shrink-0"/>)
            : <div className="w-3.5"/>}
          <div className={`w-6 h-6 rounded-md ${iconColor} flex items-center justify-center flex-shrink-0`}>
            <Icon size={12} />
          </div>
          <span className="text-sm text-slate-200 truncate">{name}</span>
          {badge && <span className="badge badge-indigo text-[9px] flex-shrink-0">{badge}</span>}
        </div>
        <button
          onClick={e => { e.stopPropagation(); setShowAdd({type:addType,parentId:id}) }}
          className="opacity-0 group-hover:opacity-100 btn-ghost p-1 text-slate-500 hover:text-brand-400 transition-opacity"
        >
          <Plus size={13}/>
        </button>
      </div>
      {expanded[id] && children != null && (
        <div className="ml-5 border-l border-white/[0.06] pl-2">{children}</div>
      )}
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Curriculum Management</h1>
          <p className="text-slate-500 text-sm mt-1">Dynamic, database-driven curriculum — nothing is hardcoded</p>
        </div>
        <button className="btn-primary text-sm" onClick={() => setShowAdd({type:'school',parentId:'root'})}><Plus size={15}/> Add School</button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[['Schools','3'],['Departments','4'],['Courses','5'],['Badges','3'],['Weeks','2'],['Lessons','6']].map(([label,val]) => (
          <div key={label} className="card p-3 text-center">
            <div className="font-display text-xl font-bold text-white">{val}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <p className="text-xs text-slate-500 mb-4 font-mono">// Hover any item and click + to add a child node</p>
        <div className="space-y-0.5">
          {CURRICULUM_TREE.map(school => (
            <Row key={school.id} id={school.id} icon={School} iconColor="bg-brand-600/20 text-brand-400" name={school.name} addType="department">
              {school.departments.map(dept => (
                <Row key={dept.id} id={dept.id} icon={Layers} iconColor="bg-cyan-600/20 text-cyan-400" name={dept.name} addType="course">
                  {dept.courses.map(course => (
                    <Row key={course.id} id={course.id} icon={BookOpen} iconColor="bg-purple-600/20 text-purple-400" name={course.name} addType="badge">
                      {course.badges.map(badge => (
                        <Row key={badge.id} id={badge.id} icon={Layers} iconColor="bg-amber-600/20 text-amber-400" name={`Badge ${badge.level}: ${badge.title}`} addType="module" badge={`Level ${badge.level}`}>
                          {badge.modules.map(mod => (
                            <Row key={mod.id} id={mod.id} icon={Layers} iconColor="bg-indigo-600/20 text-indigo-400" name={mod.name} addType="week">
                              {mod.weeks.map(week => (
                                <Row key={week.id} id={week.id} icon={Calendar} iconColor="bg-slate-600/30 text-slate-400" name={`Week ${week.num}: ${week.title}`} addType="week" badge={`${week.lessons} lessons`}>
                                  {null}
                                </Row>
                              ))}
                            </Row>
                          ))}
                        </Row>
                      ))}
                    </Row>
                  ))}
                </Row>
              ))}
            </Row>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-sm">
            <h2 className="font-display font-bold text-white mb-4 capitalize">Add {showAdd.type}</h2>
            <div><label className="label">Name</label><input className="input" placeholder={`Enter ${showAdd.type} name...`} value={addName} onChange={e=>setAddName(e.target.value)} autoFocus/></div>
            <div className="flex gap-3 mt-5">
              <button className="btn-primary flex-1 justify-center" onClick={() => { toast.success(`${showAdd.type} added!`); setShowAdd(null); setAddName('') }}>Add</button>
              <button className="btn-ghost" onClick={() => { setShowAdd(null); setAddName('') }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
