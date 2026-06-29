import { Calendar, MapPin, ExternalLink } from 'lucide-react'

const EVENTS = [
  { title:'Cohort 8 Orientation — Software Dev & Vibe Coding', date:'Feb 3, 2025', location:'Masterview Campus, Port Harcourt', type:'Physical', desc:'Welcome ceremony, campus tour, and orientation for new students in the Feb cohort.' },
  { title:'Free Workshop: Build Your First React App', date:'Jan 25, 2025', location:'Online (Zoom)', type:'Online', desc:'A free 2-hour workshop open to the public. Bring your laptop and curiosity.' },
  { title:'Demo Day: Cohort 7 Project Showcase', date:'Jan 18, 2025', location:'Masterview Campus', type:'Physical', desc:'Watch graduating students present their capstone projects to industry guests.' },
  { title:'AI Career Panel: Breaking Into the Industry', date:'Feb 15, 2025', location:'Online (Google Meet)', type:'Online', desc:'A conversation with 4 AI engineers on breaking into the field, salaries, and trends.' },
]

export default function EventsPage() {
  return (
    <div className="bg-ink-900 pt-20">
      <section className="section-pad">
        <div className="page-container max-w-4xl">
          <div className="section-eyebrow">Events & Workshops</div>
          <h1 className="font-display text-4xl font-bold text-white mb-10">Upcoming Events</h1>
          <div className="space-y-4">
            {EVENTS.map(e => (
              <div key={e.title} className="card-hover p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`badge ${e.type === 'Online' ? 'badge-indigo' : 'badge-cyan'}`}>{e.type}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">{e.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{e.desc}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar size={12}/> {e.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12}/> {e.location}</span>
                    </div>
                  </div>
                  <button className="btn-outline text-xs py-2 px-4 flex-shrink-0 flex items-center gap-1.5">Register <ExternalLink size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
