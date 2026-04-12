import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { OCCASIONS, VIBES, QUOTES } from './data'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07080A;--s1:#0F1115;--s2:#16191F;--bdr:rgba(255,255,255,0.07);--bdr2:rgba(255,255,255,0.13);--lime:#C6FF00;--ld:rgba(198,255,0,0.09);--white:#EFF1F5;--muted:rgba(239,241,245,0.38);--r:20px;--rs:13px}
html,body{min-height:100%;background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:0}
.disp{font-family:'Syne',sans-serif;font-weight:800}
.head{font-family:'Syne',sans-serif;font-weight:700}
.lbl{font-family:'Syne',sans-serif;font-weight:600;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.btn{width:100%;padding:16px 24px;border-radius:var(--r);font-family:'Syne',sans-serif;font-weight:700;font-size:15px;cursor:pointer;border:none;transition:all .2s;letter-spacing:.02em}
.bp{background:var(--lime);color:var(--bg)}.bp:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(198,255,0,0.2)}
.bs{background:transparent;color:var(--white);border:1.5px solid var(--bdr2)}.bs:hover{background:var(--s2)}
.card{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:20px}
.chip{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:100px;background:var(--s2);border:1px solid var(--bdr);font-size:11px;color:var(--muted);font-family:'DM Sans',sans-serif;white-space:nowrap}
.cl{background:var(--ld);border-color:rgba(198,255,0,.3);color:var(--lime)}
.cr{background:rgba(255,64,64,.1);border-color:rgba(255,64,64,.3);color:#FF4040}
.mem{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden;break-inside:avoid}
.mem-img{width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#0A0D1A}
.mem-img img{width:100%;height:100%;object-fit:cover;cursor:pointer;transition:transform .3s}.mem-img img:hover{transform:scale(1.02)}
.mem-tag{position:absolute;top:10px;left:10px;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);padding:4px 10px;border-radius:100px;font-size:11px;font-family:'Syne',sans-serif;font-weight:600}
.trick-badge{position:absolute;top:10px;right:10px;background:rgba(255,179,0,.85);backdrop-filter:blur(8px);padding:4px 10px;border-radius:100px;font-size:10px;font-family:'Syne',sans-serif;font-weight:700;color:#000}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;max-width:1200px;margin:0 auto}
.warn{background:rgba(255,179,0,.08);border:1px solid rgba(255,179,0,.25);border-radius:var(--rs);padding:14px 18px;display:flex;align-items:flex-start;gap:10px;font-size:13px;color:rgba(255,179,0,.9);line-height:1.5}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .2s ease}
@keyframes fade{from{opacity:0}to{opacity:1}}
.lb-img{max-width:100%;max-height:90vh;border-radius:12px;object-fit:contain}
.lb-close{position:absolute;top:20px;right:20px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.1);border:none;color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.lb-caption{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.7);backdrop-filter:blur(8px);padding:10px 18px;border-radius:100px;font-size:13px;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fu .45s cubic-bezier(.16,1,.3,1) both}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
`

export default function Album({sessionId}) {
  const [session, setSession] = useState(null)
  const [completions, setCompletions] = useState([])
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [daysLeft, setDaysLeft] = useState(30)

  useEffect(() => {
    if (!sessionId) return
    const load = async () => {
      const [{data: sess}, {data: tasks}, {data: participants}] = await Promise.all([
        supabase.from('sessions').select('*').eq('id', sessionId).single(),
        supabase.from('tasks').select('*').eq('session_id', sessionId).eq('status', 'done').order('completed_at'),
        supabase.from('participants').select('*').eq('session_id', sessionId),
      ])
      if (sess) {
        setSession(sess)
        const created = new Date(sess.created_at)
        const expires = new Date(created.getTime() + 30 * 24 * 60 * 60 * 1000)
        const left = Math.max(0, Math.ceil((expires - new Date()) / (24 * 60 * 60 * 1000)))
        setDaysLeft(left)
      }
      if (tasks) setCompletions(tasks)
      if (participants) setParts(participants)
      setLoading(false)
    }
    load()
  }, [sessionId])

  if (loading) return (
    <>
      <style>{S}</style>
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
        <div style={{fontSize:40}}>⏳</div>
        <div style={{color:'var(--muted)',fontFamily:'Syne',fontWeight:600}}>Album wird geladen…</div>
      </div>
    </>
  )

  if (!session) return (
    <>
      <style>{S}</style>
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:24}}>
        <div style={{fontSize:48}}>🔍</div>
        <div className="head" style={{fontSize:22}}>Album nicht gefunden</div>
        <p style={{color:'var(--muted)',textAlign:'center',fontSize:14}}>Dieser Link ist abgelaufen oder ungültig.</p>
      </div>
    </>
  )

  const occ = OCCASIONS.find(o => o.id === session.config?.occ) || {icon:'🎉', label:'Party'}
  const vib = VIBES.find(v => v.id === session.config?.vibe) || {icon:'🔥', label:'Party'}
  const dateStr = new Date(session.created_at).toLocaleDateString('de-DE', {day:'2-digit', month:'long', year:'numeric'})
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
  const photosOnly = completions.filter(c => c.photo_url)
  const noPhotos = completions.filter(c => !c.photo_url)

  return (
    <>
      <style>{S}</style>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          <img className="lb-img" src={lightbox.url} alt="" onClick={e => e.stopPropagation()}/>
          <div className="lb-caption">{lightbox.caption}</div>
        </div>
      )}

      <div style={{minHeight:'100vh',position:'relative',overflow:'hidden'}}>
        <div className="orb" style={{width:300,height:300,background:'rgba(198,255,0,.06)',top:-100,right:-80}}/>

        <div style={{maxWidth:1200,margin:'0 auto',padding:'40px 20px 80px'}}>

          {/* Header */}
          <div className="fu" style={{marginBottom:32,textAlign:'center'}}>
            <div style={{fontSize:52,marginBottom:12}}>{occ.icon}</div>
            <div className="disp" style={{fontSize:40,marginBottom:8}}>Das Album</div>
            <div style={{color:'var(--muted)',fontSize:15,marginBottom:16}}>{occ.label} · {dateStr}</div>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <span className="chip cl">{photosOnly.length} Fotos</span>
              <span className="chip">{parts.length + 1} Teilnehmer</span>
              <span className="chip">{vib.icon} {vib.label}</span>
            </div>
          </div>

          {/* 30-Tage Warnung */}
          <div className="fu warn" style={{marginBottom:28, maxWidth:600, margin:'0 auto 28px'}}>
            <span style={{fontSize:18,flexShrink:0}}>⏰</span>
            <div>
              <strong>Dieses Album wird in {daysLeft} Tagen automatisch gelöscht.</strong><br/>
              Lade deine Lieblingsfotos vorher herunter — klicke dazu auf ein Foto und halte es gedrückt (Handy) oder Rechtsklick → Speichern (PC).
            </div>
          </div>

          {/* Fotos */}
          {photosOnly.length > 0 ? (
            <div className="grid" style={{marginBottom:32}}>
              {photosOnly.map((c, i) => (
                <div key={c.id} className="mem" style={{animation:`fu .45s ${i*.05}s cubic-bezier(.16,1,.3,1) both`}}>
                  <div className="mem-img">
                    <img
                      src={c.photo_url}
                      alt={c.text}
                      onClick={() => setLightbox({url: c.photo_url, caption: `${c.claimed_by_nickname || 'Anonym'} — ${c.text}`})}
                    />
                    <div className="mem-tag">{c.claimed_by_nickname || 'Anonym'}</div>
                    {c.is_trick && <div className="trick-badge">🎭 Streich</div>}
                  </div>
                  <div style={{padding:'13px 16px'}}>
                    <div style={{fontSize:11,color:'var(--lime)',fontFamily:'Syne',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:5}}>{c.claimed_by_nickname || 'Anonym'}</div>
                    <div style={{fontSize:13,fontWeight:500,lineHeight:1.45,color:'var(--white)'}}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{textAlign:'center',padding:'60px 20px',color:'var(--muted)'}}>
              <div style={{fontSize:44,marginBottom:12}}>📭</div>
              <div style={{fontFamily:'Syne',fontWeight:600,marginBottom:8}}>Noch keine Fotos</div>
              <div style={{fontSize:13}}>Fotos erscheinen hier sobald Aufgaben abgeschlossen werden.</div>
            </div>
          )}

          {/* Aufgaben ohne Foto */}
          {noPhotos.length > 0 && (
            <div style={{maxWidth:600,margin:'0 auto',marginBottom:32}}>
              <div className="lbl" style={{marginBottom:12}}>Aufgaben ohne Foto ({noPhotos.length})</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {noPhotos.map(c => (
                  <div key={c.id} className="card" style={{padding:'12px 16px',display:'flex',gap:12,alignItems:'flex-start'}}>
                    <span style={{fontSize:20,flexShrink:0}}>{c.emoji}</span>
                    <div>
                      <div style={{fontSize:12,color:'var(--lime)',fontFamily:'Syne',fontWeight:600,marginBottom:3}}>{c.claimed_by_nickname}</div>
                      <div style={{fontSize:13,color:'var(--muted)'}}>{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quote & Footer */}
          <div style={{maxWidth:600,margin:'0 auto',textAlign:'center'}}>
            <div style={{fontStyle:'italic',color:'var(--muted)',fontSize:14,lineHeight:1.7,marginBottom:24}}>"{quote}"</div>
            <div style={{fontSize:12,color:'rgba(239,241,245,.2)',fontFamily:'Syne',fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase'}}>
              Erstellt mit Quest · quest-app.vercel.app
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
