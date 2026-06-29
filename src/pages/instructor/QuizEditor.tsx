import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
interface Question { id:string; type:string; question:string; options:string[]; correctAnswer:string; points:number }
export default function InstructorQuizEditor() {
  const nav = useNavigate()
  const [quiz, setQuiz] = useState({ title:'', duration:30, passingScore:70, maxAttempts:3 })
  const [questions, setQuestions] = useState<Question[]>([{ id:'1', type:'mcq', question:'', options:['','','',''], correctAnswer:'', points:1 }])
  const addQuestion = () => setQuestions(q=>[...q,{id:Date.now().toString(),type:'mcq',question:'',options:['','','',''],correctAnswer:'',points:1}])
  const removeQuestion = (id:string) => setQuestions(q=>q.filter(x=>x.id!==id))
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3"><button onClick={()=>nav('/instructor/courses')} className="btn-ghost p-2"><ArrowLeft size={17}/></button><h1 className="font-display text-xl font-bold text-white">New Quiz</h1></div>
      <div className="card p-5 space-y-4">
        <div><label className="label">Quiz Title</label><input className="input" placeholder="Quiz title..." value={quiz.title} onChange={e=>setQuiz({...quiz,title:e.target.value})}/></div>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="label">Duration (min)</label><input type="number" className="input" value={quiz.duration} onChange={e=>setQuiz({...quiz,duration:+e.target.value})}/></div>
          <div><label className="label">Passing Score %</label><input type="number" className="input" value={quiz.passingScore} onChange={e=>setQuiz({...quiz,passingScore:+e.target.value})}/></div>
          <div><label className="label">Max Attempts</label><input type="number" className="input" value={quiz.maxAttempts} onChange={e=>setQuiz({...quiz,maxAttempts:+e.target.value})}/></div>
        </div>
      </div>
      <div className="space-y-3">
        {questions.map((q,i)=>(
          <div key={q.id} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-500">Question {i+1}</span>
              {questions.length > 1 && <button onClick={()=>removeQuestion(q.id)} className="btn-ghost p-1.5 text-red-400 hover:bg-red-500/10"><Trash2 size={13}/></button>}
            </div>
            <select className="input mb-3 text-sm" value={q.type} onChange={e=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,type:e.target.value}:x))}>
              <option value="mcq">Multiple Choice</option><option value="true_false">True / False</option><option value="short_answer">Short Answer</option>
            </select>
            <input className="input mb-3" placeholder="Question text..." value={q.question} onChange={e=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,question:e.target.value}:x))}/>
            {(q.type==='mcq'||q.type==='true_false') && (
              <div className="space-y-2">
                {(q.type==='true_false'?['True','False']:q.options).map((opt,oi)=>(
                  <div key={oi} className="flex items-center gap-2">
                    <input type="radio" name={`correct-${q.id}`} checked={q.correctAnswer===opt} onChange={()=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,correctAnswer:opt}:x))} className="text-brand-500"/>
                    {q.type==='mcq'
                      ? <input className="input text-sm py-2" placeholder={`Option ${oi+1}`} value={opt} onChange={e=>{const opts=[...q.options];opts[oi]=e.target.value;setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,options:opts}:x))}}/>
                      : <span className="text-sm text-slate-300">{opt}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="btn-outline text-sm w-full justify-center" onClick={addQuestion}><Plus size={14}/> Add Question</button>
      </div>
      <div className="flex gap-3">
        <button className="btn-primary" onClick={()=>{toast.success('Quiz saved!');nav('/instructor/courses')}}><Save size={14}/> Save Quiz</button>
        <button className="btn-ghost" onClick={()=>nav('/instructor/courses')}>Cancel</button>
      </div>
    </div>
  )
}
