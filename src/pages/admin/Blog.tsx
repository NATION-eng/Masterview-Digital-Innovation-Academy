import { useState } from 'react'
import { Plus, Edit3, Trash2, Eye, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

const POSTS = [
  { id:'1', title:'How to Get Hired as a Developer in Nigeria in 2025', slug:'how-to-get-hired', author:'Ngozi Adeleke', category:'Career', isPublished:true, views:842, publishedAt:'2025-01-10' },
  { id:'2', title:'Why We Use Badge-Based Learning (And Why It Works)', slug:'badge-based-learning', author:'Dr. Emeka Okafor', category:'Education', isPublished:true, views:561, publishedAt:'2025-01-05' },
  { id:'3', title:'Vibe Coding Has Arrived in Nigeria', slug:'vibe-coding-nigeria', author:'Tunde Balogun', category:'Technology', isPublished:false, views:0, publishedAt:null },
]

export default function AdminBlog() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title:'', excerpt:'', content:'', category:'Technology', isPublished:false })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Blog</h1>
        <button className="btn-primary text-sm" onClick={() => setShowAdd(true)}><Plus size={15}/> New Post</button>
      </div>

      {showAdd && (
        <div className="card p-6 border-brand-600/30">
          <h2 className="font-display font-semibold text-white mb-4">Create Blog Post</h2>
          <div className="space-y-3">
            <div><label className="label">Title</label><input className="input" placeholder="Post title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div><label className="label">Excerpt (shown in listings)</label><textarea className="input h-16 resize-none" placeholder="Brief summary..." value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})}/></div>
            <div><label className="label">Content</label><textarea className="input h-48 resize-none" placeholder="Full post content (Markdown supported)..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="label">Category</label>
                <select className="input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  {['Technology','Career','Education','Announcements','Student Stories'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isPublished} onChange={e=>setForm({...form,isPublished:e.target.checked})} className="rounded"/>
                  <span className="text-sm text-slate-300">Publish immediately</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary" onClick={() => { toast.success('Post saved!'); setShowAdd(false) }}><FileText size={14}/> Save Post</button>
            <button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="tbl w-full">
          <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Views</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {POSTS.map(p => (
              <tr key={p.id}>
                <td className="max-w-xs"><div className="font-medium text-white text-sm truncate">{p.title}</div><div className="text-xs text-slate-500 mt-0.5 font-mono">{p.publishedAt ?? 'Draft'}</div></td>
                <td className="text-sm text-slate-300">{p.author}</td>
                <td><span className="badge badge-indigo">{p.category}</span></td>
                <td><span className="font-mono text-sm text-slate-400">{p.views.toLocaleString()}</span></td>
                <td><span className={`badge ${p.isPublished?'badge-green':'badge-amber'}`}>{p.isPublished?'Published':'Draft'}</span></td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="btn-ghost p-1.5"><Edit3 size={13}/></button>
                    {p.isPublished && <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="btn-ghost p-1.5 text-brand-400"><Eye size={13}/></a>}
                    <button onClick={()=>toast.success('Deleted')} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10"><Trash2 size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
