import { useState } from 'react'
import { Plus, Calendar, MapPin, ExternalLink, Edit3, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const EVENTS = [
  { id:'1', title:'Cohort 8 Orientation', description:'Welcome ceremony and campus tour for all new Cohort 8 students.', startDate:'2025-02-03T10:00', endDate:'2025-02-03T13:00', location:'Masterview Campus, Port Harcourt', isOnline:false, isPublished:true },
  { id:'2', title:'Free React Workshop', description:'A free 2-hour public workshop open to all aspiring developers.', startDate:'2025-01-25T14:00', endDate:'2025-01-25T16:00', location:'Online (Zoom)', isOnline:true, isPublished:true },
  { id:'3', title:'Cohort 7 Demo Day', description:'Graduating students present their capstone projects to industry guests.', startDate:'2025-01-18T15:00', endDate:'2025-01-18T18:00', location:'Masterview Campus', isOnline:false, isPublished:true },
]

export default function AdminEvents() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title:'', description:'', startDate:'', endDate:'', location:'', isOnline:false, registrationLink:'' })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Events</h1>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}><Plus size={15}/> New Event</button>
      </div>

      {showAdd && (
        <div className="card p-6 border-brand-600/30">
          <h2 className="font-display font-semibold text-white mb-4">Create Event</h2>
          <div className="space-y-3">
            <div><label className="label">Title</label><input className="input" placeholder="Event title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div><label className="label">Description</label><textarea className="input h-20 resize-none" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Start Date & Time</label><input type="datetime-local" className="input" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></div>
              <div><label className="label">End Date & Time</label><input type="datetime-local" className="input" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></div>
            </div>
            <div>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" checked={form.isOnline} onChange={e=>setForm({...form,isOnline:e.target.checked})} className="rounded"/>
                <span className="text-sm text-slate-300">Online event</span>
              </label>
              <input className="input" placeholder={form.isOnline ? 'Meeting URL (Zoom, Google Meet...)' : 'Physical location...'} value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
            </div>
            <div><label className="label">Registration Link (optional)</label><input className="input" placeholder="https://..." value={form.registrationLink} onChange={e=>setForm({...form,registrationLink:e.target.value})}/></div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary" onClick={() => { toast.success('Event created!'); setShowAdd(false) }}><Calendar size={14}/> Create Event</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {EVENTS.map(e => (
          <div key={e.id} className="card-hover p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${e.isOnline ? 'badge-indigo' : 'badge-cyan'}`}>{e.isOnline ? 'Online' : 'Physical'}</span>
                  <span className={`badge ${e.isPublished ? 'badge-green' : 'badge-amber'}`}>{e.isPublished ? 'Published' : 'Draft'}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{e.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{e.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Calendar size={11}/> {new Date(e.startDate).toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={11}/> {e.location}</span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button className="btn-ghost p-1.5"><Edit3 size={13}/></button>
                <button onClick={()=>toast.success('Deleted')} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10"><Trash2 size={13}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
