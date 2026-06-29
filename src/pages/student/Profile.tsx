import { useState } from 'react'
import { User, Github, Linkedin, Globe, Camera, Save } from 'lucide-react'
import { useAuthStore } from '../../store/auth.store'
import toast from 'react-hot-toast'

export default function StudentProfile() {
  const { user } = useAuthStore()
  const [form, setForm] = useState({ firstName:user?.firstName||'', lastName:user?.lastName||'', email:user?.email||'', phone:'08012345678', bio:'Passionate software developer learning full-stack development at Masterview.', skills:'React, JavaScript, Node.js, MongoDB', githubUrl:'https://github.com/student', linkedinUrl:'', portfolioUrl:'' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Profile updated')
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-white">Profile</h1>
      <div className="card p-6">
        <div className="flex items-start gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-ink-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Camera size={13}/>
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">{user?.firstName} {user?.lastName}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
            <span className="badge badge-indigo mt-1.5">Student</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">First Name</label><input className="input" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/></div>
          <div><label className="label">Last Name</label><input className="input" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/></div>
          <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
          <div><label className="label">Phone</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
          <div className="sm:col-span-2"><label className="label">Bio</label><textarea className="input h-20 resize-none" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}/></div>
          <div className="sm:col-span-2"><label className="label">Skills (comma separated)</label><input className="input" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></div>
          <div><label className="label flex items-center gap-1.5"><Github size={13}/> GitHub URL</label><input className="input" placeholder="https://github.com/..." value={form.githubUrl} onChange={e=>setForm({...form,githubUrl:e.target.value})}/></div>
          <div><label className="label flex items-center gap-1.5"><Linkedin size={13}/> LinkedIn URL</label><input className="input" placeholder="https://linkedin.com/in/..." value={form.linkedinUrl} onChange={e=>setForm({...form,linkedinUrl:e.target.value})}/></div>
          <div className="sm:col-span-2"><label className="label flex items-center gap-1.5"><Globe size={13}/> Portfolio URL</label><input className="input" placeholder="https://yourportfolio.com" value={form.portfolioUrl} onChange={e=>setForm({...form,portfolioUrl:e.target.value})}/></div>
        </div>
        <div className="flex justify-end mt-5 pt-5 border-t border-white/[0.07]">
          <button className="btn-primary" onClick={handleSave} disabled={saving}><Save size={14}/>{saving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </div>
    </div>
  )
}
