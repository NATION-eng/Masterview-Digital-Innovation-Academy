import { useState } from 'react'
import { Plus, Github, Globe, Star, Users, Layers, LucideIcon } from 'lucide-react'

const PROJECTS = [
  { id:'1', title:'E-Commerce Platform', type:'capstone', status:'completed', tech:['React','Node.js','MongoDB'], githubUrl:'https://github.com/user/ecommerce', liveUrl:'https://ecommerce.vercel.app', description:'A full-stack e-commerce platform with cart, payments, and admin dashboard.', grade:92 },
  { id:'2', title:'Weather Dashboard', type:'personal', status:'completed', tech:['React','TypeScript','OpenWeather API'], githubUrl:'https://github.com/user/weather', liveUrl:'https://weather.netlify.app', description:'Real-time weather dashboard with 5-day forecast and location search.', grade: undefined },
  { id:'3', title:'Team Task Manager', type:'team', status:'in_progress', tech:['React','Supabase','Tailwind'], githubUrl: undefined, liveUrl: undefined, description:'Collaborative task management app built with my cohort team.', grade: undefined },
]

interface TypeCfg { label:string; color:string; Icon: LucideIcon }
const typeConfig: Record<string, TypeCfg> = {
  personal: { label:'Personal', color:'badge-indigo', Icon: Star },
  team:     { label:'Team',     color:'badge-purple', Icon: Users },
  capstone: { label:'Capstone', color:'badge-amber',  Icon: Layers },
}
const statusColor: Record<string,string> = { completed:'badge-green', in_progress:'badge-blue', under_review:'badge-amber' }

export default function StudentProjects() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title:'', description:'', type:'personal', githubUrl:'', liveUrl:'', technologies:'' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
        <button className="btn-primary text-sm" onClick={() => setShowForm(true)}><Plus size={15}/> Add Project</button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="font-display font-semibold text-white mb-5">Add New Project</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Project Title</label><input className="input" placeholder="My Awesome Project" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div>
              <label className="label">Type</label>
              <select className="input" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="personal">Personal</option>
                <option value="team">Team</option>
                <option value="capstone">Capstone</option>
              </select>
            </div>
            <div className="sm:col-span-2"><label className="label">Description</label><textarea className="input h-20 resize-none" placeholder="What does this project do?" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
            <div><label className="label flex items-center gap-1.5"><Github size={13}/> GitHub URL</label><input className="input" placeholder="https://github.com/..." value={form.githubUrl} onChange={e=>setForm({...form,githubUrl:e.target.value})}/></div>
            <div><label className="label flex items-center gap-1.5"><Globe size={13}/> Live URL</label><input className="input" placeholder="https://..." value={form.liveUrl} onChange={e=>setForm({...form,liveUrl:e.target.value})}/></div>
            <div className="sm:col-span-2"><label className="label">Technologies (comma separated)</label><input className="input" placeholder="React, Node.js, MongoDB" value={form.technologies} onChange={e=>setForm({...form,technologies:e.target.value})}/></div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary text-sm" onClick={() => setShowForm(false)}>Save Project</button>
            <button className="btn-ghost text-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map(p => {
          const typeCfg = typeConfig[p.type]
          return (
            <div key={p.id} className="card-hover p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-white mb-1.5">{p.title}</h3>
                  <div className="flex gap-2">
                    <span className={`badge ${typeCfg.color} flex items-center gap-1`}>
                      <typeCfg.Icon size={10}/> {typeCfg.label}
                    </span>
                    <span className={`badge ${statusColor[p.status]}`}>{p.status.replace('_',' ')}</span>
                  </div>
                </div>
                {p.grade !== undefined && (
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-400">{p.grade}%</div>
                    <div className="text-[10px] text-slate-500">Grade</div>
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map(t => <span key={t} className="badge badge-indigo text-[10px]">{t}</span>)}
              </div>
              <div className="flex gap-2">
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1"><Github size={12}/> Code</a>}
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1"><Globe size={12}/> Live</a>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
