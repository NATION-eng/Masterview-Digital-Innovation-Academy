import { useState } from 'react'
import { MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  return (
    <div className="bg-ink-900 pt-20">
      <section className="section-pad">
        <div className="page-container max-w-5xl">
          <div className="section-eyebrow">Get in Touch</div>
          <h1 className="font-display text-4xl font-bold text-white mb-10">Contact Us</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="card p-8">
                {sent ? (
                  <div className="text-center py-6">
                    <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4"/>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                    <div><label className="label">Name</label><input className="input" placeholder="Your name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/></div>
                    <div><label className="label">Email</label><input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required/></div>
                    <div><label className="label">Subject</label><input className="input" placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} required/></div>
                    <div><label className="label">Message</label><textarea className="input h-28 resize-none" placeholder="Tell us more..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} required/></div>
                    <button type="submit" className="btn-primary w-full justify-center py-3">Send Message</button>
                  </form>
                )}
              </div>
            </div>
            <div className="space-y-5">
              <div className="card p-6">
                <h3 className="font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {[{ icon:MapPin, label:'Address', val:'24 Ada George Road, Port Harcourt, Rivers State' }, { icon:Mail, label:'Email', val:'hello@masterviewacademy.com' }, { icon:Phone, label:'Phone', val:'+234 (0) 800 000 0000' }].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex gap-3 text-sm">
                      <Icon size={16} className="text-brand-400 flex-shrink-0 mt-0.5"/>
                      <div><div className="text-slate-500 text-xs mb-0.5">{label}</div><div className="text-slate-300">{val}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6 h-48 bg-ink-700 flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <MapPin size={32} className="mx-auto mb-2"/>
                  <p className="text-sm">Map — Port Harcourt, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
