import { useState } from 'react'
import { Brain, Clock, Trophy, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'

const QUIZZES = [
  { id:'1', title:'JavaScript Fundamentals', course:'Software Dev', week:'Week 1', questions:15, duration:30, passingScore:70, attempts:2, maxAttempts:3, bestScore:88, status:'passed' },
  { id:'2', title:'React Components & Props', course:'Software Dev', week:'Week 2', questions:12, duration:20, passingScore:70, attempts:1, maxAttempts:3, bestScore:62, status:'failed' },
  { id:'3', title:'CSS Flexbox & Grid', course:'Software Dev', week:'Week 1', questions:10, duration:15, passingScore:70, attempts:0, maxAttempts:3, bestScore:null, status:'available' },
  { id:'4', title:'Prompt Engineering Basics', course:'Vibe Coding', week:'Week 1', questions:8, duration:15, passingScore:60, attempts:0, maxAttempts:3, bestScore:null, status:'available' },
]

const SAMPLE_QUESTIONS = [
  { id:'q1', question:'What does JSX stand for?', type:'mcq', options:['JavaScript XML','Java Syntax Extension','JSON XML','JavaScript Extension'], answer:0 },
  { id:'q2', question:'Which hook is used for side effects in React?', type:'mcq', options:['useState','useEffect','useContext','useRef'], answer:1 },
  { id:'q3', question:'React components must return a single root element.', type:'true_false', options:['True','False'], answer:0 },
]

export default function StudentQuizzes() {
  const [taking, setTaking] = useState<string|null>(null)
  const [answers, setAnswers] = useState<Record<string,number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [current, setCurrent] = useState(0)

  const quiz = QUIZZES.find(q => q.id === taking)
  const score = submitted ? Math.round((Object.entries(answers).filter(([k,v]) => SAMPLE_QUESTIONS.findIndex(q=>q.id===k) >= 0 && SAMPLE_QUESTIONS.find(q=>q.id===k)?.answer === v).length / SAMPLE_QUESTIONS.length) * 100) : 0

  if (taking && !submitted) {
    const q = SAMPLE_QUESTIONS[current]
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-white">{quiz?.title}</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400"><Clock size={14}/> {quiz?.duration} min</div>
        </div>
        <div className="progress-track mb-1"><div className="progress-fill" style={{width:`${((current+1)/SAMPLE_QUESTIONS.length)*100}%`}}/></div>
        <p className="text-xs text-slate-500">Question {current+1} of {SAMPLE_QUESTIONS.length}</p>
        <div className="card p-7">
          <p className="font-semibold text-white text-lg mb-6">{q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt,i) => (
              <button key={i} onClick={() => setAnswers(a=>({...a,[q.id]:i}))}
                className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all ${answers[q.id]===i ? 'border-brand-500 bg-brand-600/15 text-white' : 'border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-white/[0.03]'}`}>
                <span className="font-mono text-xs text-slate-500 mr-3">{String.fromCharCode(65+i)}.</span> {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setCurrent(c=>Math.max(0,c-1))} disabled={current===0} className="btn-ghost">← Previous</button>
            {current < SAMPLE_QUESTIONS.length-1
              ? <button onClick={() => setCurrent(c=>c+1)} disabled={answers[q.id]===undefined} className="btn-primary">Next →</button>
              : <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < SAMPLE_QUESTIONS.length} className="btn-accent">Submit Quiz</button>
            }
          </div>
        </div>
      </div>
    )
  }

  if (taking && submitted) {
    const passed = score >= (quiz?.passingScore ?? 70)
    return (
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className={`card p-8 ${passed ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
          {passed ? <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4"/> : <XCircle size={48} className="text-red-400 mx-auto mb-4"/>}
          <h2 className="font-display text-2xl font-bold text-white mb-2">{passed ? '🎉 Quiz Passed!' : 'Not Quite'}</h2>
          <div className="text-5xl font-bold font-mono my-4" style={{color: passed ? '#34d399' : '#f87171'}}>{score}%</div>
          <p className="text-slate-400 text-sm">Passing score: {quiz?.passingScore}%</p>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={() => {setTaking(null);setSubmitted(false);setAnswers({});setCurrent(0)}} className="btn-outline">Back to Quizzes</button>
            {!passed && <button onClick={() => {setSubmitted(false);setAnswers({});setCurrent(0)}} className="btn-primary">Try Again</button>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUIZZES.map(q => (
          <div key={q.id} className="card-hover p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div><h3 className="font-semibold text-white">{q.title}</h3><p className="text-xs text-slate-500 mt-1">{q.course} · {q.week}</p></div>
              <span className={`badge flex-shrink-0 ${q.status==='passed'?'badge-green':q.status==='failed'?'badge-red':'badge-indigo'}`}>
                {q.status==='passed'?'Passed':q.status==='failed'?'Failed':'Available'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              {[['Questions',q.questions],['Duration',`${q.duration}m`],['Pass',`${q.passingScore}%`]].map(([l,v]) => (
                <div key={l} className="bg-ink-700 rounded-lg p-2"><div className="font-mono font-bold text-white text-sm">{v}</div><div className="text-[10px] text-slate-500">{l}</div></div>
              ))}
            </div>
            {q.bestScore && <div className="flex items-center gap-2 mb-4 text-sm"><Trophy size={13} className="text-amber-400"/><span className="text-slate-400">Best score: <span className="text-white font-medium">{q.bestScore}%</span></span><span className="text-slate-600">({q.attempts}/{q.maxAttempts} attempts)</span></div>}
            <button onClick={() => { if (q.attempts < q.maxAttempts) setTaking(q.id) }}
              disabled={q.attempts >= q.maxAttempts}
              className={`w-full flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl font-medium transition-all ${q.attempts >= q.maxAttempts ? 'bg-white/5 text-slate-600 cursor-not-allowed' : 'btn-primary'}`}>
              {q.status==='available' ? <><Brain size={14}/> Start Quiz</> : q.attempts < q.maxAttempts ? <><Brain size={14}/> Retake</> : 'Max Attempts Reached'}
              {q.attempts < q.maxAttempts && <ChevronRight size={14}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
