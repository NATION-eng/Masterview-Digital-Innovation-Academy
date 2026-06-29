import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
export default function BlogPost() {
  return <div className="bg-ink-900 pt-24 section-pad"><div className="page-container max-w-3xl"><Link to="/blog" className="btn-ghost mb-8 inline-flex"><ArrowLeft size={16}/> Back to Blog</Link><div className="section-eyebrow">Academy Blog</div><h1 className="font-display text-4xl font-bold text-white mt-2 mb-6">Blog Post</h1><div className="prose prose-invert max-w-none text-slate-400"><p>Full blog post content will be loaded from the API based on the slug parameter.</p></div></div></div>
}
