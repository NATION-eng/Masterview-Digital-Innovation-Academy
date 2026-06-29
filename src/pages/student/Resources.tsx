import { useState } from 'react'
import { FileText, Code2, Presentation, Download, Search, Filter } from 'lucide-react'

const RESOURCES = [
  { id:'1', title:'HTML & CSS Cheat Sheet', type:'cheatsheet', course:'Software Dev', week:'Week 1', size:'340 KB', icon:FileText, color:'text-blue-400 bg-blue-500/10' },
  { id:'2', title:'JavaScript ES6+ Reference', type:'pdf', course:'Software Dev', week:'Week 1', size:'1.2 MB', icon:FileText, color:'text-amber-400 bg-amber-500/10' },
  { id:'3', title:'React Fundamentals Slides', type:'slide', course:'Software Dev', week:'Week 2', size:'5.6 MB', icon:Presentation, color:'text-purple-400 bg-purple-500/10' },
  { id:'4', title:'Express.js Starter Template', type:'sourcecode', course:'Software Dev', week:'Week 3', size:'24 KB', icon:Code2, color:'text-emerald-400 bg-emerald-500/10' },
  { id:'5', title:'MongoDB Schema Examples', type:'sourcecode', course:'Software Dev', week:'Week 3', size:'18 KB', icon:Code2, color:'text-emerald-400 bg-emerald-500/10' },
  { id:'6', title:'Prompt Engineering Handbook', type:'pdf', course:'Vibe Coding', week:'Week 1', size:'2.1 MB', icon:FileText, color:'text-cyan-400 bg-cyan-500/10' },
  { id:'7', title:'Tailwind CSS Component Library', type:'template', course:'Software Dev', week:'Week 2', size:'890 KB', icon:Code2, color:'text-brand-400 bg-brand-500/10' },
]

const typeLabels: Record<string,string> = { pdf:'PDF', slide:'Slide', cheatsheet:'Cheat Sheet', sourcecode:'Source Code', template:'Template', projectfile:'Project File' }

export default function StudentResources() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const filtered = RESOURCES.filter(r =>
    (filter === 'all' || r.type === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-bold text-white">Resources</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input className="input pl-9" placeholder="Search resources..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="input sm:w-44" value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="pdf">PDFs</option><option value="slide">Slides</option>
          <option value="cheatsheet">Cheat Sheets</option><option value="sourcecode">Source Code</option>
          <option value="template">Templates</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="card-hover p-4 flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center flex-shrink-0`}><r.icon size={17}/></div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white leading-snug mb-1">{r.title}</h3>
              <p className="text-[11px] text-slate-500">{r.course} · {r.week}</p>
              <div className="flex items-center justify-between mt-2.5">
                <span className="badge badge-indigo text-[10px]">{typeLabels[r.type]}</span>
                <button className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 font-medium"><Download size={11}/> {r.size}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="card p-10 text-center"><FileText size={32} className="text-slate-600 mx-auto mb-3"/><p className="text-slate-500 text-sm">No resources match your search.</p></div>
      )}
    </div>
  )
}
