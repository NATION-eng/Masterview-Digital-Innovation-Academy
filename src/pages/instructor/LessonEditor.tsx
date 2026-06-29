import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
export default function InstructorLessonEditor() {
  const nav = useNavigate(); const { courseId } = useParams()
  const [form, setForm] = useState({ title:'', videoUrl:'', notes:'', codeSnippets:'', isFree:false, isPublished:false })
  const handleSave = () => { toast.success('Lesson saved!'); nav(`/instructor/courses`) }
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={()=>nav('/instructor/courses')} className="btn-ghost p-2"><ArrowLeft size={17}/></button>
        <h1 className="font-display text-xl font-bold text-white">New Lesson</h1>
      </div>
      <div className="card p-6 space-y-4">
        <div><label className="label">Lesson Title</label><input className="input" placeholder="e.g. Introduction to React Hooks" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
        <div><label className="label">Video URL (YouTube or direct link)</label><input className="input" placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={e=>setForm({...form,videoUrl:e.target.value})}/></div>
        <div><label className="label">Lesson Notes (Markdown supported)</label><textarea className="input h-48 resize-none font-mono text-sm" placeholder="## Introduction&#10;&#10;Write your lesson notes here..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></div>
        <div><label className="label">Code Snippets</label><textarea className="input h-32 resize-none font-mono text-sm" placeholder="// Paste code examples here..." value={form.codeSnippets} onChange={e=>setForm({...form,codeSnippets:e.target.value})}/></div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isFree} onChange={e=>setForm({...form,isFree:e.target.checked})} className="rounded"/><span className="text-sm text-slate-300">Free preview lesson</span></label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isPublished} onChange={e=>setForm({...form,isPublished:e.target.checked})} className="rounded"/><span className="text-sm text-slate-300">Publish immediately</span></label>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="btn-primary" onClick={handleSave}><Save size={14}/> Save Lesson</button>
          <button className="btn-ghost" onClick={()=>nav('/instructor/courses')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
