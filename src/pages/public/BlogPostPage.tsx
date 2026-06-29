import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'

interface Post {
  slug: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  readTime: number
  category: string
  body: string[]
}

const POSTS: Post[] = [
  {
    slug: 'how-to-get-hired-as-a-developer-in-nigeria',
    title: 'How to Get Hired as a Developer in Nigeria in 2025',
    excerpt: "The job market has changed. Here's what Nigerian tech companies are actually hiring for right now.",
    author: 'Ngozi Adeleke',
    authorRole: 'Head of Curriculum',
    date: 'Jan 10, 2025',
    readTime: 7,
    category: 'Career',
    body: [
      "The Nigerian tech hiring market has shifted dramatically over the past two years. Companies like Paystack, Flutterwave, and Moniepoint are no longer just looking for developers who can write code — they want people who can ship production-ready features from day one.",
      "Here's what we're consistently hearing from hiring managers: junior developers who can demonstrate a real portfolio of deployed projects get interviews faster than those with only certificates. This is exactly why every Masterview badge level ends with a project you actually build and deploy, not a quiz you memorize answers for.",
      "The second biggest factor is communication. Technical interviews increasingly include a pairing exercise where you talk through your reasoning out loud. Practicing this with instructors and fellow students during cohort sessions is one of the most underrated parts of our program.",
      "Finally, don't underestimate the power of a clean GitHub profile. Recruiters look at commit history, README quality, and whether your repos look like something a team could actually maintain. We walk through this explicitly in Badge 1 of the Software Development track.",
      "If you're job hunting right now, focus on three things: a portfolio with 2-3 polished projects, the ability to explain your technical decisions clearly, and consistent practice with mock interviews. The skills gap is real, but it's closeable — and that's exactly what we built this academy to do.",
    ],
  },
  {
    slug: 'badge-based-learning-explained',
    title: 'Why We Use Badge-Based Learning (And Why It Works)',
    excerpt: "Most bootcamps rush you through content. We slow down to build real mastery at each level. Here's why.",
    author: 'Dr. Emeka Okafor',
    authorRole: 'Founder & CEO',
    date: 'Jan 5, 2025',
    readTime: 5,
    category: 'Education',
    body: [
      "When we designed the Masterview curriculum, we made a deliberate choice that goes against most bootcamp norms: students cannot advance to the next badge level until they've demonstrated real competency at the current one.",
      "This might sound slower than a traditional fixed-schedule bootcamp, and in some ways it is. But it solves the single biggest problem we saw in our own early cohorts — students who completed a 12-week program but couldn't actually build anything independently afterward.",
      "Badge-based progression means a student moving from Badge 1 (Web Foundations) to Badge 2 (Frontend Development) has actually built functioning HTML/CSS/JavaScript projects, not just watched videos about them. Each badge has a capstone project that must be reviewed and approved by an instructor before progression.",
      "The data backs this up. Our Cohort 5 and 6 graduates, who went through the full badge system, have a 92% job placement rate within 6 months. That's not because we have lower standards — it's because the standards are enforced at every step, not just at the final exam.",
      "This is also why our curriculum is fully dynamic in the backend. Instructors can adjust what's required for a badge to be marked complete based on real-time feedback from how students are performing, rather than being locked into a rigid syllabus written once and never revisited.",
    ],
  },
  {
    slug: 'vibe-coding-nigeria',
    title: 'Vibe Coding Has Arrived in Nigeria — What It Means for Developers',
    excerpt: "AI-assisted development isn't replacing developers. It's creating a new tier of them.",
    author: 'Tunde Balogun',
    authorRole: 'Lead Instructor, AI & Vibe Coding',
    date: 'Dec 28, 2024',
    readTime: 6,
    category: 'Technology',
    body: [
      "There's a lot of anxiety in developer communities right now about AI replacing programming jobs. Having taught both traditional software development and our new Vibe Coding track, I want to offer a different perspective based on what I'm actually seeing in the Nigerian market.",
      "AI coding tools like GitHub Copilot, Cursor, and Claude haven't eliminated the need for developers — they've raised the bar for what a single developer can ship. The companies hiring in Lagos and Port Harcourt right now aren't looking for people who refuse to use AI tools. They're looking for people who can use them well and still understand what the generated code is actually doing.",
      "This is precisely the gap our Vibe Coding track fills. Badge 1 teaches prompt engineering and AI-assisted workflows, but Badge 2 and 3 go deeper into agentic coding, building actual products, and — critically — debugging and reviewing AI-generated code, which is a skill most self-taught 'vibe coders' skip entirely.",
      "The developers who will struggle in the next five years aren't the ones using AI tools. They're the ones who can't explain why a piece of code works, can't debug it when the AI gets something wrong, and can't architect a system beyond what a single prompt can generate.",
      "Our advice to every student, whether you're in the Software Development or Vibe Coding track: learn the fundamentals first. AI tools are force multipliers, not substitutes for understanding. That's the philosophy behind everything we teach at Masterview.",
    ],
  },
]

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = POSTS.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="bg-ink-900 pt-20">
      <article className="section-pad">
        <div className="page-container max-w-3xl">
          <Link to="/blog" className="btn-ghost mb-8 inline-flex"><ArrowLeft size={16}/> Back to Blog</Link>

          <span className="badge badge-indigo mb-4">{post.category}</span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-5 text-sm text-slate-500 mb-10 pb-8 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                {post.author[0]}
              </div>
              <div>
                <div className="text-slate-300 font-medium text-sm">{post.author}</div>
                <div className="text-xs text-slate-500">{post.authorRole}</div>
              </div>
            </div>
            <span className="flex items-center gap-1.5"><Calendar size={13}/> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13}/> {post.readTime} min read</span>
          </div>

          <div className="space-y-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-[15px]">{para}</p>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/[0.07]">
              <h2 className="font-display text-lg font-semibold text-white mb-5">More from the Academy Blog</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="card-hover p-5 group">
                    <span className="badge badge-indigo mb-3">{r.category}</span>
                    <h3 className="font-display font-semibold text-white text-sm mb-2 group-hover:text-brand-300 transition-colors leading-snug">{r.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                      <span className="flex items-center gap-1"><User size={10}/> {r.author}</span>
                      <span className="flex items-center gap-1"><Clock size={10}/> {r.readTime}m</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
