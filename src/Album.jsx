import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { OCCASIONS, VIBES, getQuote } from './data'

const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07080A;--s1:#0F1115;--s2:#16191F;--bdr:rgba(255,255,255,0.07);--bdr2:rgba(255,255,255,0.13);--lime:#C6FF00;--ld:rgba(198,255,0,0.09);--white:#EFF1F5;--muted:rgba(239,241,245,0.38);--r:20px;--rs:13px;--gold:#FFB300;--gd:rgba(255,179,0,0.1)}
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
.cg{background:var(--gd);border-color:rgba(255,179,0,.3);color:var(--gold)}
.warn{background:rgba(255,179,0,.08);border:1px solid rgba(255,179,0,.25);border-radius:var(--rs);padding:14px 18px;display:flex;align-items:flex-start;gap:10px;font-size:13px;color:rgba(255,179,0,.9);line-height:1.5}
.mem{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden}
.mem-img{width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#0A0D1A;cursor:pointer}
.mem-img img{width:100%;height:100%;object-fit:cover;transition:transform .3s}.mem-img img:hover{transform:scale(1.03)}
.mem-tag{position:absolute;top:10px;left:10px;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);padding:4px 10px;border-radius:100px;font-size:11px;font-family:'Syne',sans-serif;font-weight:600}
.trick-badge{position:absolute;top:10px;right:10px;background:rgba(255,179,0,.88);padding:4px 10px;border-radius:100px;font-size:10px;font-family:'Syne',sans-serif;font-weight:700;color:#000}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;max-width:900px;margin:0 auto}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .2s ease}
@keyframes fade{from{opacity:0}to{opacity:1}}
.lb-img{max-width:100%;max-height:88vh;border-radius:12px;object-fit:contain}
.lb-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:none;color:white;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}.lb-close:hover{background:rgba(255,255,255,.2)}
.lb-caption{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.75);backdrop-filter:blur(8px);padding:10px 18px;border-radius:100px;font-size:13px;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fu .45s cubic-bezier(.16,1,.3,1) both}
.f1{animation-delay:.05s}.f2{animation-delay:.1s}.f3{animation-delay:.15s}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.back-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:var(--s2);border:1px solid var(--bdr);border-radius:100px;color:var(--muted);font-size:13px;font-family:'Syne',sans-serif;font-weight:600;cursor:pointer;margin-bottom:28px;transition:all .2s;text-decoration:none}.back-btn:hover{color:var(--white);border-color:var(--bdr2)}
`

function FoxLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ab" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1A2800"/><stop offset="100%" stopColor="#07080A"/></radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#ab)" rx="112"/>
      <polygon points="108,260 168,108 228,230" fill="#C6FF00"/>
      <polygon points="132,248 171,138 218,232" fill="#07080A"/>
      <polygon points="404,260 344,108 284,230" fill="#C6FF00"/>
      <polygon points="380,248 341,138 294,232" fill="#07080A"/>
      <path d="M 256 148 L 310 168 L 368 222 L 388 296 L 360 372 L 256 410 L 152 372 L 124 296 L 144 222 L 202 168 Z" fill="#C6FF00"/>
      <path d="M 256 195 L 300 215 L 320 268 L 308 332 L 256 360 L 204 332 L 192 268 L 212 215 Z" fill="#F5FFD0"/>
      <ellipse cx="256" cy="312" rx="18" ry="12" fill="#07080A"/>
      <ellipse cx="218" cy="248" rx="14" ry="13" fill="#C6FF00"/><ellipse cx="218" cy="248" rx="7" ry="7" fill="#07080A"/><circle cx="222" cy="244" r="3.5" fill="white" opacity="0.9"/>
      <ellipse cx="294" cy="248" rx="14" ry="13" fill="#C6FF00"/><ellipse cx="294" cy="248" rx="7" ry="7" fill="#07080A"/><circle cx="298" cy="244" r="3.5" fill="white" opacity="0.9"/>
    </svg>
  )
}

export default function Album({ sessionId, lang = 'de', onBack }) {
  const [session, setSession] = useState(null)
  const [completions, setCompletions] = useState([])
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [daysLeft, setDaysLeft] = useState(30)

  useEffect(() => {
    if (!sessionId) { setLoading(false); return }
    const load = async () => {
      const [{ data: sess }, { data: tasks }, { data: participants }] = await Promise.all([
        supabase.from('sessions').select('*').eq('id', sessionId).single(),
        supabase.from('tasks').select('*').eq('session_id', sessionId).eq('status', 'done').order('completed_at'),
        supabase.from('participants').select('*').eq('session_id', sessionId),
      ])
      if (sess) {
        setSession(sess)
        const expires = new Date(new Date(sess.created_at).getTime() + 30 * 24 * 60 * 60 * 1000)
        setDaysLeft(Math.max(0, Math.ceil((expires - new Date()) / (24 * 60 * 60 * 1000))))
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <FoxLogo size={48} />
        <div style={{ color: 'var(--muted)', fontFamily: 'Syne', fontWeight: 600, marginTop: 8 }}>
          {lang === 'de' ? 'Album wird geladen…' : 'Loading album…'}
        </div>
      </div>
    </>
  )

  if (!session) return (
    <>
      <style>{S}</style>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <div className="head" style={{ fontSize: 22 }}>{lang === 'de' ? 'Album nicht gefunden' : 'Album not found'}</div>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>{lang === 'de' ? 'Dieser Link ist abgelaufen oder ungültig.' : 'This link has expired or is invalid.'}</p>
        {onBack && <button className="btn bs" onClick={onBack} style={{ marginTop: 16, maxWidth: 300, border: '1px solid var(--bdr2)' }}>← {lang === 'de' ? 'Zurück' : 'Back'}</button>}
      </div>
    </>
  )

  const occ = OCCASIONS.find(o => o.id === session.config?.occ) || { icon: '🎉', label: { de: 'Party', en: 'Party' } }
  const vib = VIBES.find(v => v.id === session.config?.vibe) || { icon: '🔥', label: { de: 'Party', en: 'Party' } }
  const occLabel = typeof occ.label === 'object' ? occ.label[lang] || occ.label.de : occ.label
  const vibLabel = typeof vib.label === 'object' ? vib.label[lang] || vib.label.de : vib.label
  const dateStr = new Date(session.created_at).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  const photosOnly = completions.filter(c => c.photo_url)
  const noPhotos = completions.filter(c => !c.photo_url)
  const quote = getQuote(lang)

  const downloadPhoto = async (url, name) => {
    try {
      const res = await fetch(url, { mode: 'cors' })
      const blob = await res.blob()
      const bUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = bUrl; a.download = name || 'memofox-foto.jpg'; a.click()
      setTimeout(() => URL.revokeObjectURL(bUrl), 2000)
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank')
    }
  }

  const downloadAll = async () => {
    for (let i = 0; i < photosOnly.length; i++) {
      await downloadPhoto(photosOnly[i].photo_url, `memofox-${i + 1}.jpg`)
      await new Promise(r => setTimeout(r, 400)) // Stagger downloads
    }
  }
    const url = `${window.location.origin}?album=${sessionId}`
    if (navigator.share) {
      try { await navigator.share({ title: 'Memofox Album 🦊', text: lang === 'de' ? 'Schaut euch unser Memofox Album an! 30 Tage verfügbar 🦊' : 'Check out our Memofox album! Available for 30 days 🦊', url }); return } catch (e) {}
    }
    navigator.clipboard.writeText(url)
  }

  return (
    <>
      <style>{S}</style>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          <button onClick={() => downloadPhoto(lightbox.url, 'memofox-foto.jpg')} style={{ position: 'absolute', top: 20, right: 72, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>💾</button>
          <img className="lb-img" src={lightbox.url} alt="" onClick={e => e.stopPropagation()} />
          <div className="lb-caption">{lightbox.caption}</div>
        </div>
      )}

      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 300, height: 300, background: 'rgba(198,255,0,.06)', top: -100, right: -80 }} />

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px 80px' }}>

          {/* Back button — only shown when coming from app */}
          {onBack && (
            <button className="back-btn" onClick={onBack}>
              ← {lang === 'de' ? 'Zurück' : 'Back'}
            </button>
          )}

          {/* Header */}
          <div className="fu" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <FoxLogo size={36} />
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22 }}><span style={{ color: 'var(--lime)' }}>Memo</span>fox</span>
            </div>
            <div className="disp" style={{ fontSize: 36, marginBottom: 8 }}>{lang === 'de' ? 'Das Album' : 'The Album'}</div>
            <div style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 14 }}>{occ.icon} {occLabel} · {dateStr}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="chip cl">{photosOnly.length} {lang === 'de' ? 'Fotos' : 'Photos'}</span>
              <span className="chip">{parts.length + 1} {lang === 'de' ? 'Teilnehmer' : 'Participants'}</span>
              <span className="chip">{vib.icon} {vibLabel}</span>
            </div>
          </div>

          {/* 30-day warning */}
          <div className="fu warn" style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⏰</span>
            <div>
              <strong>{lang === 'de' ? `Dieses Album wird in ${daysLeft} Tagen automatisch gelöscht.` : `This album will be automatically deleted in ${daysLeft} days.`}</strong><br />
              {lang === 'de' ? 'Lade deine Lieblingsfotos vorher herunter — Foto antippen und gedrückt halten.' : 'Download your favorite photos before then — tap and hold a photo.'}
            </div>
          </div>

          {/* Share button */}
          <button className="btn bp" onClick={share} style={{ maxWidth: 400, marginBottom: 10, padding: '13px' }}>
            📤 {lang === 'de' ? 'Album teilen' : 'Share Album'}
          </button>
          {photosOnly.length > 0 && (
            <button onClick={downloadAll} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', background: 'var(--s2)', border: '1px solid var(--bdr2)', borderRadius: 'var(--rs)', color: 'var(--muted)', fontSize: 13, fontFamily: 'Syne', fontWeight: 600, cursor: 'pointer', marginBottom: 28, width: '100%', maxWidth: 400, transition: 'all .2s' }}>
              💾 {lang === 'de' ? `Alle ${photosOnly.length} Fotos herunterladen` : `Download all ${photosOnly.length} photos`}
            </button>
          )}

          {/* Photos */}
          {photosOnly.length > 0 ? (
            <div>
              <div className="lbl" style={{ marginBottom: 16 }}>{lang === 'de' ? 'Die Momente' : 'The Moments'} 📸</div>
              <div className="grid" style={{ marginBottom: 32 }}>
                {photosOnly.map((c, i) => (
                  <div key={c.id} className="mem" style={{ animation: `fu .45s ${i * .05}s cubic-bezier(.16,1,.3,1) both` }}>
                    <div className="mem-img" onClick={() => setLightbox({ url: c.photo_url, caption: `${c.claimed_by_nickname || 'Anonym'} — ${c.text}` })}>
                      <img src={c.photo_url} alt={c.text} />
                      <div className="mem-tag">{c.claimed_by_nickname || 'Anonym'}</div>
                      {c.is_trick && <div className="trick-badge">🎭 {lang === 'de' ? 'Streich' : 'Prank'}</div>}
                      {/* Download button */}
                      <button
                        onClick={e => { e.stopPropagation(); downloadPhoto(c.photo_url, `memofox-${c.claimed_by_nickname || 'foto'}.jpg`) }}
                        style={{ position: 'absolute', bottom: 10, right: 10, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.65)', border: '1px solid rgba(255,255,255,.2)', color: 'white', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
                      >💾</button>
                    </div>
                    <div style={{ padding: '13px 16px' }}>
                      <div style={{ fontSize: 11, color: 'var(--lime)', fontFamily: 'Syne', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5 }}>{c.claimed_by_nickname || 'Anonym'}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.45 }}>{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
              <div style={{ fontFamily: 'Syne', fontWeight: 600, marginBottom: 8 }}>{lang === 'de' ? 'Noch keine Fotos' : 'No photos yet'}</div>
              <div style={{ fontSize: 13 }}>{lang === 'de' ? 'Fotos erscheinen hier sobald Aufgaben abgeschlossen werden.' : 'Photos will appear here as tasks are completed.'}</div>
            </div>
          )}

          {/* Tasks without photo */}
          {noPhotos.length > 0 && (
            <div style={{ maxWidth: 600, margin: '0 auto 32px' }}>
              <div className="lbl" style={{ marginBottom: 12 }}>{lang === 'de' ? `Aufgaben ohne Foto (${noPhotos.length})` : `Tasks without photo (${noPhotos.length})`}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {noPhotos.map(c => (
                  <div key={c.id} className="card" style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{c.emoji}</span>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--lime)', fontFamily: 'Syne', fontWeight: 600, marginBottom: 3 }}>{c.claimed_by_nickname}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quote & Footer */}
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 16 }}>
            <div style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>"{quote}"</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: .3 }}>
              <FoxLogo size={20} />
              <span style={{ fontSize: 11, fontFamily: 'Syne', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Memofox</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
