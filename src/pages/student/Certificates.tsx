import { Trophy, Download, Shield, QrCode, ExternalLink } from 'lucide-react'

const CERTS = [
  { id:'1', title:'Badge 1: Web Foundations', course:'Software Development', certNumber:'MVAC-2024-A1B2C3D4', issuedAt:'2024-11-15', qrPlaceholder:true },
]

export default function StudentCertificates() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Certificates</h1>
      {CERTS.length === 0 ? (
        <div className="card p-12 text-center">
          <Trophy size={40} className="text-slate-600 mx-auto mb-3"/>
          <h3 className="font-semibold text-white mb-1">No certificates yet</h3>
          <p className="text-slate-500 text-sm">Complete a badge level to earn your first certificate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CERTS.map(cert => (
            <div key={cert.id} className="card overflow-hidden">
              {/* Certificate visual */}
              <div className="bg-gradient-to-br from-brand-900 via-ink-800 to-cyan-900 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(rgba(99,149,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,149,255,0.1) 1px,transparent 1px)',backgroundSize:'24px 24px'}}/>
                <Trophy size={36} className="text-amber-400 mx-auto mb-3 relative z-10"/>
                <p className="text-xs text-slate-400 mb-1 relative z-10">MASTERVIEW DIGITAL INNOVATION ACADEMY</p>
                <h3 className="font-display text-xl font-bold text-white relative z-10">{cert.title}</h3>
                <p className="text-brand-300 text-sm mt-1 relative z-10">{cert.course}</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Certificate Number</span>
                  <span className="font-mono text-slate-300">{cert.certNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Issued</span>
                  <span className="text-slate-300">{new Date(cert.issuedAt).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="btn-primary flex-1 text-xs py-2 justify-center"><Download size={13}/> Download PDF</button>
                  <a href={`/verify/${cert.certNumber}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"><Shield size={12}/> Verify</a>
                  <button className="btn-ghost text-xs py-2 px-3"><QrCode size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="card p-5 bg-brand-600/8 border-brand-600/20">
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-brand-400 mt-0.5 flex-shrink-0"/>
          <div>
            <p className="text-sm font-medium text-white mb-1">Certificates are publicly verifiable</p>
            <p className="text-xs text-slate-400">Each certificate has a unique QR code and verification URL. Employers can verify authenticity at <span className="text-brand-400">masterviewacademy.com/verify</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
