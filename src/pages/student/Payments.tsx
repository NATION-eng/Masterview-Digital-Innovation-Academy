import { CreditCard, Download, CheckCircle2, Clock, AlertCircle, LucideIcon } from 'lucide-react'

interface StatusConfig { label:string; color:string; Icon: LucideIcon }
const statusConfig: Record<string, StatusConfig> = {
  paid:    { label:'Fully Paid',   color:'badge-green',  Icon: CheckCircle2 },
  partial: { label:'Partial',      color:'badge-amber',  Icon: Clock },
  pending: { label:'Pending',      color:'badge-indigo', Icon: Clock },
  overdue: { label:'Overdue',      color:'badge-red',    Icon: AlertCircle },
}

const PAYMENTS = [
  { id:'1', course:'Software Development', totalAmount:150000, amountPaid:90000, balance:60000, status:'partial',
    transactions:[{ ref:'MV-PAY-001', amount:90000, gateway:'Paystack', date:'2025-01-10', status:'success' }]
  },
]

export default function StudentPayments() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Payments</h1>
      {PAYMENTS.map(p => {
        const cfg = statusConfig[p.status]
        const pct = Math.round((p.amountPaid / p.totalAmount) * 100)
        return (
          <div key={p.id} className="card overflow-hidden">
            <div className="p-6 border-b border-white/[0.07]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display font-semibold text-white">{p.course}</h3>
                  <span className={`badge ${cfg.color} mt-1.5 flex items-center gap-1 w-fit`}>
                    <cfg.Icon size={11}/> {cfg.label}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white text-lg">₦{p.amountPaid.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">of ₦{p.totalAmount.toLocaleString()}</div>
                </div>
              </div>
              <div className="progress-track mb-1.5"><div className="progress-fill" style={{width:`${pct}%`}}/></div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{pct}% paid</span>
                {p.balance > 0 && <span className="text-amber-400 font-medium">Balance: ₦{p.balance.toLocaleString()}</span>}
              </div>
            </div>
            {p.balance > 0 && (
              <div className="p-5 bg-ink-700/50 border-b border-white/[0.07]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">Outstanding Balance</p>
                    <p className="text-xs text-slate-500 mt-0.5">Due before program completion</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm py-2">Pay ₦{p.balance.toLocaleString()} via Paystack</button>
                    <button className="btn-outline text-sm py-2">Flutterwave</button>
                  </div>
                </div>
              </div>
            )}
            <div className="p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Transaction History</h4>
              <div className="space-y-2">
                {p.transactions.map(t => (
                  <div key={t.ref} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-emerald-400"/>
                      <div>
                        <div className="text-white font-medium">₦{t.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{t.date} · via {t.gateway}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-600">{t.ref}</span>
                      <button className="btn-ghost text-xs p-1.5"><Download size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
