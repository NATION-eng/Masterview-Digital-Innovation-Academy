import { Link } from 'react-router-dom'
import { Clock, User } from 'lucide-react'

const POSTS = [
  { slug:'how-to-get-hired-as-a-developer-in-nigeria', title:'How to Get Hired as a Developer in Nigeria in 2025', excerpt:'The job market has changed. Here\'s what Nigerian tech companies are actually hiring for right now.', author:'Ngozi Adeleke', date:'Jan 10, 2025', readTime:7, category:'Career' },
  { slug:'badge-based-learning-explained', title:'Why We Use Badge-Based Learning (And Why It Works)', excerpt:'Most bootcamps rush you through content. We slow down to build real mastery at each level. Here\'s why.', author:'Dr. Emeka Okafor', date:'Jan 5, 2025', readTime:5, category:'Education' },
  { slug:'vibe-coding-nigeria', title:'Vibe Coding Has Arrived in Nigeria — What It Means for Developers', excerpt:'AI-assisted development isn\'t replacing developers. It\'s creating a new tier of them.', author:'Tunde Balogun', date:'Dec 28, 2024', readTime:6, category:'Technology' },
]

export default function BlogPage() {
  return (
    <div className="bg-ink-900 pt-20">
      <section className="section-pad">
        <div className="page-container max-w-5xl">
          <div className="section-eyebrow">Academy Blog</div>
          <h1 className="font-display text-4xl font-bold text-white mb-10">Insights & Stories</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map(p => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card-hover p-6 group flex flex-col">
                <span className={`badge badge-indigo mb-4 self-start`}>{p.category}</span>
                <h2 className="font-display font-semibold text-white mb-3 group-hover:text-brand-300 transition-colors">{p.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{p.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-white/[0.06]">
                  <span className="flex items-center gap-1"><User size={11}/> {p.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11}/> {p.readTime}m read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
