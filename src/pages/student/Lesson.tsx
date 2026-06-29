import { useState } from 'react'
import { ChevronLeft, Download, FileText, Code2, Presentation, CheckCircle2, Play } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function StudentLesson() {
  const { courseId, lessonId } = useParams()
  const [activeTab, setActiveTab] = useState<'notes'|'slides'|'code'|'downloads'>('notes')
  const [marked, setMarked] = useState(false)

  const lesson = { title:'React Hooks Deep Dive', week:'Week 3', course:'Software Development', videoUrl:'https://www.youtube.com/embed/dpw9EHDh2bM',
    notes:`## React Hooks Overview\n\nHooks let you use state and other React features without writing a class component.\n\n### useState\n\nThe most basic hook. It returns a stateful value and a function to update it.\n\n\`\`\`jsx\nconst [count, setCount] = useState(0)\n\`\`\`\n\n### useEffect\n\nPerform side effects in function components — data fetching, subscriptions, DOM mutations.\n\n\`\`\`jsx\nuseEffect(() => {\n  document.title = \`Count: \${count}\`\n}, [count])\n\`\`\``,
    code:`import { useState, useEffect } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n\n  useEffect(() => {\n    document.title = \`Count: \${count}\`\n  }, [count])\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>Increment</button>\n    </div>\n  )\n}\n\nexport default Counter`,
    downloads:[ { name:'Week 3 Slides.pdf', size:'2.4 MB' }, { name:'Code Examples.zip', size:'890 KB' }, { name:'Cheat Sheet.pdf', size:'340 KB' } ]
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/student/courses" className="btn-ghost p-2"><ChevronLeft size={17}/></Link>
        <div>
          <p className="text-xs text-slate-500">{lesson.course} · {lesson.week}</p>
          <h1 className="font-display text-xl font-bold text-white">{lesson.title}</h1>
        </div>
      </div>

      {/* Video */}
      <div className="card overflow-hidden">
        <div className="aspect-video bg-ink-900 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-brand-600/20 border border-brand-600/40 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-brand-600/30 transition-colors">
              <Play size={24} className="text-brand-400 ml-1"/>
            </div>
            <p className="text-slate-400 text-sm">Click to play lesson video</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-white/[0.07]">
          {([['notes','Notes',FileText],['slides','Slides',Presentation],['code','Code',Code2],['downloads','Downloads',Download]] as const).map(([id,label,Icon]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab===id ? 'border-brand-500 text-brand-400' : 'border-transparent text-slate-400 hover:text-white'}`}>
              <Icon size={14}/>{label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'notes' && (
            <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed text-sm">{lesson.notes}</div>
          )}
          {activeTab === 'slides' && (
            <div className="aspect-video bg-ink-700 rounded-xl flex items-center justify-center">
              <div className="text-center text-slate-500"><Presentation size={32} className="mx-auto mb-2"/><p className="text-sm">Slides will be displayed here</p></div>
            </div>
          )}
          {activeTab === 'code' && (
            <pre className="bg-[#060C1A] rounded-xl p-5 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed border border-white/[0.06]">{lesson.code}</pre>
          )}
          {activeTab === 'downloads' && (
            <div className="space-y-2">
              {lesson.downloads.map(d => (
                <div key={d.name} className="flex items-center justify-between p-4 bg-ink-700 rounded-xl">
                  <div className="flex items-center gap-3"><FileText size={16} className="text-brand-400"/><span className="text-sm text-white">{d.name}</span><span className="text-xs text-slate-500">{d.size}</span></div>
                  <button className="btn-ghost text-xs py-1.5 px-3"><Download size={13}/> Download</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mark complete */}
      <div className="flex items-center justify-between card p-4">
        <p className="text-sm text-slate-400">Finished with this lesson?</p>
        <button onClick={() => setMarked(true)} className={`btn-primary text-sm py-2 ${marked ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
          {marked ? <><CheckCircle2 size={14}/> Marked Complete</> : 'Mark as Complete'}
        </button>
      </div>
    </div>
  )
}
