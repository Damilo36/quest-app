// ReelGenerator.jsx — Viral 3-Act Structure
// Act 1: Hook (2s black screen, one punch line)
// Act 2: Fast cuts (0.8s per photo, no fluff)
// Act 3: Twist (trick reveal if exists)  
// Act 4: Brand (Memofox outro)

import { useState, useRef, useEffect } from 'react'

const W = 1080, H = 1920  // Full 9:16
const FPS = 30
const HOOK_DUR = 2.2
const CUT_DUR = 0.85       // Fast cuts — this is the key
const TRICK_DUR = 2.5
const BRAND_DUR = 3.5

async function loadImg(src) {
  try {
    const r = await fetch(src, { cache: 'no-store' })
    if (!r.ok) throw new Error()
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    return await new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url
    })
  } catch {
    return await new Promise((res, rej) => {
      const i = new Image()
      i.crossOrigin = 'anonymous'
      i.onload = () => res(i)
      i.onerror = () => rej(new Error('load failed'))
      i.src = src + (src.includes('?') ? '&' : '?') + 't=' + Date.now()
    })
  }
}

function drawImg(ctx, img, scale = 1, ox = 0, oy = 0) {
  if (!img) return
  try {
    const iA = img.width / img.height, cA = W / H
    let dW, dH
    if (iA > cA) { dH = H * scale; dW = dH * iA } else { dW = W * scale; dH = dW / iA }
    ctx.drawImage(img, (W - dW) / 2 + ox, (H - dH) / 2 + oy, dW, dH)
  } catch {}
}

function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

// ─── ACT 1: HOOK ─────────────────────────────────────────────────────────────
// Pure black. One line. Stops the scroll.
function drawHook(ctx, p, photoCount, hasTrick, lang) {
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, W, H)

  const lines = hasTrick
    ? (lang === 'de'
      ? ['Die haben', 'keine Ahnung', 'was heute passiert ist.']
      : ['They have', 'no idea', 'what happened tonight.'])
    : (lang === 'de'
      ? ['Was heute', 'passiert ist,', 'bleibt nicht geheim.']
      : ['What happened', 'tonight', 'won\'t stay secret.'])

  // Each line reveals staggered
  const fS = Math.round(H * 0.072)
  ctx.font = `bold ${fS}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const totalH = lines.length * fS * 1.35
  const startY = H / 2 - totalH / 2

  lines.forEach((line, i) => {
    const lineDelay = i * 0.28
    const lineP = Math.max(0, Math.min(1, (p - lineDelay) / 0.35))
    const alpha = easeOut(lineP)
    const yOff = (1 - easeOut(lineP)) * 24

    ctx.save()
    ctx.globalAlpha = alpha

    // Last line in lime
    if (i === lines.length - 1) {
      ctx.fillStyle = '#C6FF00'
    } else {
      ctx.fillStyle = '#FFFFFF'
    }
    ctx.fillText(line, W / 2, startY + i * fS * 1.35 + yOff)
    ctx.restore()
  })

  // Small fox top right, fades in late
  const foxA = easeOut(Math.max(0, (p - 0.7) / 0.25))
  ctx.save()
  ctx.globalAlpha = foxA * 0.6
  ctx.font = `${Math.round(H * 0.032)}px serif`
  ctx.textAlign = 'right'
  ctx.fillText('🦊', W - 52, 80)
  ctx.restore()
}

// ─── ACT 2: PHOTO CUT ────────────────────────────────────────────────────────
// Hard cuts. Fast. The photo fills the frame. Player name in corner. That's it.
function drawPhotoCut(ctx, img, p, playerName, isLast) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  if (!img) {
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, W, H)
    return
  }

  // Photo with very slight zoom
  const scale = 1 + p * 0.03
  ctx.save()
  drawImg(ctx, img, scale, 0, -p * 8)
  ctx.restore()

  // Very subtle dark vignette bottom — just enough for text
  const g = ctx.createLinearGradient(0, H * 0.75, 0, H)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(0,0,0,0.72)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // Top-left: player name — small, clean
  const nFs = Math.round(H * 0.022)
  const nameAlpha = easeOut(Math.min(1, p / 0.2))
  ctx.save()
  ctx.globalAlpha = nameAlpha * 0.85
  ctx.font = `bold ${nFs}px Arial`
  ctx.fillStyle = '#C6FF00'
  ctx.textAlign = 'left'
  ctx.fillText(playerName, 52, 68)
  ctx.restore()

  // Flash effect on cut-in (first 8%)
  if (p < 0.08) {
    const flashA = (1 - p / 0.08) * 0.35
    ctx.fillStyle = `rgba(255,255,255,${flashA})`
    ctx.fillRect(0, 0, W, H)
  }
}

// ─── ACT 3: TRICK REVEAL ─────────────────────────────────────────────────────
// The twist. Black → photo blurs in → text overlay
function drawTrick(ctx, img, trickName, p, lang) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  // Photo blurs in from dark
  if (img) {
    ctx.save()
    ctx.globalAlpha = Math.min(1, easeOut(p) * 0.75)
    drawImg(ctx, img, 1.05)
    ctx.restore()

    // Strong overlay so text reads
    ctx.fillStyle = 'rgba(0,0,0,0.68)'
    ctx.fillRect(0, 0, W, H)
  }

  // Line 1: "Wait."
  const l1p = easeOut(Math.min(1, p / 0.2))
  ctx.save()
  ctx.globalAlpha = l1p
  ctx.font = `bold ${Math.round(H * 0.055)}px Arial`
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(lang === 'de' ? 'Moment mal.' : 'Wait.', W / 2, H * 0.38)
  ctx.restore()

  // Line 2: name + "hatte keine Ahnung"
  const l2p = easeOut(Math.max(0, Math.min(1, (p - 0.3) / 0.25)))
  ctx.save()
  ctx.globalAlpha = l2p
  ctx.font = `bold ${Math.round(H * 0.068)}px Arial`
  ctx.fillStyle = '#C6FF00'
  ctx.textAlign = 'center'
  ctx.fillText(trickName || '?', W / 2, H * 0.49)
  ctx.font = `${Math.round(H * 0.038)}px Arial`
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText(lang === 'de' ? 'hatte keine Ahnung.' : 'had no idea.', W / 2, H * 0.56)
  ctx.restore()

  // Emoji 
  const l3p = easeOut(Math.max(0, Math.min(1, (p - 0.6) / 0.25)))
  ctx.save()
  ctx.globalAlpha = l3p
  ctx.font = `${Math.round(H * 0.075)}px serif`
  ctx.textAlign = 'center'
  ctx.fillText('😂', W / 2, H * 0.68)
  ctx.restore()
}

// ─── ACT 4: BRAND ────────────────────────────────────────────────────────────
// Clean. Fox. Name. URL. Done.
function drawBrand(ctx, p) {
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)

  // Lime glow
  const glow = ctx.createRadialGradient(W / 2, H * 0.44, 0, W / 2, H * 0.44, W * 0.65)
  glow.addColorStop(0, `rgba(198,255,0,${0.07 + Math.sin(p * Math.PI * 1.5) * 0.025})`)
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  const foxP = easeOut(Math.min(1, p / 0.3))
  ctx.save()
  ctx.globalAlpha = foxP
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(W / 2, H * 0.38)
  ctx.scale(foxP, foxP)
  ctx.font = `${Math.round(H * 0.11)}px serif`
  ctx.fillText('🦊', 0, 0)
  ctx.restore()

  // MEMOFOX wordmark — big
  const wordP = easeOut(Math.max(0, Math.min(1, (p - 0.25) / 0.3)))
  const wordY = H * 0.53 + (1 - wordP) * 30
  ctx.save()
  ctx.globalAlpha = wordP
  ctx.textAlign = 'center'
  const wS = Math.round(H * 0.082)
  ctx.font = `900 ${wS}px Arial`
  ctx.fillStyle = '#C6FF00'
  const mW = ctx.measureText('MEMO').width
  ctx.fillText('MEMO', W / 2 - ctx.measureText('FOX').width / 2, wordY)
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('FOX', W / 2 + mW / 2, wordY)
  ctx.restore()

  // Animated line
  const lineP = easeOut(Math.max(0, Math.min(1, (p - 0.35) / 0.3)))
  ctx.save()
  ctx.globalAlpha = wordP
  ctx.strokeStyle = '#C6FF00'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(W / 2 - 180 * lineP, H * 0.57)
  ctx.lineTo(W / 2 + 180 * lineP, H * 0.57)
  ctx.stroke()
  ctx.restore()

  // Tagline
  const tagP = easeOut(Math.max(0, Math.min(1, (p - 0.48) / 0.28)))
  ctx.save()
  ctx.globalAlpha = tagP
  ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.028)}px Arial`
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.fillText('Make memories. Prove it happened.', W / 2, H * 0.615)
  ctx.restore()

  // URL — clean pill
  const urlP = easeOut(Math.max(0, Math.min(1, (p - 0.6) / 0.28)))
  ctx.save()
  ctx.globalAlpha = urlP
  ctx.textAlign = 'center'
  const uFs = Math.round(H * 0.03)
  ctx.font = `bold ${uFs}px Arial`
  const uText = 'memofox.app'
  const uW = ctx.measureText(uText).width + uFs * 2.2
  const uH = uFs * 2.1
  const uX = W / 2 - uW / 2, uY = H * 0.67
  ctx.fillStyle = 'rgba(198,255,0,0.14)'
  if (ctx.roundRect) ctx.roundRect(uX, uY, uW, uH, uH / 2)
  else ctx.rect(uX, uY, uW, uH)
  ctx.fill()
  ctx.strokeStyle = 'rgba(198,255,0,0.38)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = '#C6FF00'
  ctx.fillText(uText, W / 2, uY + uH * 0.68)
  ctx.restore()

  // Subtle CTA
  const ctaP = easeOut(Math.max(0, Math.min(1, (p - 0.75) / 0.22)))
  ctx.save()
  ctx.globalAlpha = ctaP * 0.38
  ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.021)}px Arial`
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText('Erstelle deins → memofox.app', W / 2, H * 0.845)
  ctx.restore()
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ReelGenerator({ completions, lang = 'de', onClose }) {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)
  const [errMsg, setErrMsg] = useState('')
  const canvasRef = useRef()
  const rafRef = useRef()

  const photos = completions.filter(c => c.photo_url).slice(0, 15)
  const tricks = completions.filter(c => c.photo_url && c.is_trick)
  const hasTrick = tricks.length > 0

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (videoUrl) URL.revokeObjectURL(videoUrl)
  }, [])

  const generate = async () => {
    if (!photos.length) return
    setStatus('loading'); setProgress(0); setErrMsg('')
    try {
      const imgs = []
      for (let i = 0; i < photos.length; i++) {
        try { imgs.push(await loadImg(photos[i].photo_url)) } catch { imgs.push(null) }
        setProgress(Math.round((i + 1) / photos.length * 20))
      }
      let trickImg = null, trickName = ''
      if (hasTrick) {
        try { trickImg = await loadImg(tricks[0].photo_url) } catch {}
        trickName = tricks[0].claimed_by_nickname || ''
      }

      const canvas = canvasRef.current
      canvas.width = W; canvas.height = H
      const ctx = canvas.getContext('2d', { alpha: false })

      const mt = ['video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
        .find(t => { try { return MediaRecorder.isTypeSupported(t) } catch { return false } }) || 'video/webm'

      const stream = canvas.captureStream(FPS)
      const rec = new MediaRecorder(stream, { mimeType: mt, videoBitsPerSecond: 8_000_000 })
      const chunks = []
      rec.ondataavailable = e => { if (e.data?.size > 0) chunks.push(e.data) }
      rec.onstop = () => {
        setVideoUrl(URL.createObjectURL(new Blob(chunks, { type: mt })))
        setStatus('done'); setProgress(100)
      }
      rec.onerror = e => { setStatus('error'); setErrMsg(e?.error?.message || '') }
      rec.start(100); setStatus('recording')

      const fHook = Math.ceil(HOOK_DUR * FPS)
      const fCut = Math.ceil(CUT_DUR * FPS)
      const fContent = photos.length * fCut
      const fTrick = hasTrick ? Math.ceil(TRICK_DUR * FPS) : 0
      const fBrand = Math.ceil(BRAND_DUR * FPS)
      const fTotal = fHook + fContent + fTrick + fBrand
      let frame = 0

      const tick = () => {
        if (frame >= fTotal) { rec.stop(); return }
        const r = frame

        if (r < fHook) {
          drawHook(ctx, r / fHook, photos.length, hasTrick, lang)
        } else if (r < fHook + fContent) {
          const r2 = r - fHook
          const pI = Math.floor(r2 / fCut)
          const fInCut = r2 % fCut
          drawPhotoCut(ctx, imgs[pI], fInCut / fCut, photos[pI]?.claimed_by_nickname || '', pI === photos.length - 1)
        } else if (hasTrick && r < fHook + fContent + fTrick) {
          drawTrick(ctx, trickImg, trickName, (r - fHook - fContent) / fTrick, lang)
        } else {
          drawBrand(ctx, Math.min((r - fHook - fContent - fTrick) / fBrand, 1))
        }

        frame++
        setProgress(20 + Math.round(frame / fTotal * 80))
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    } catch (err) {
      setStatus('error'); setErrMsg(err?.message || 'error')
    }
  }

  const download = () => {
    if (!videoUrl) return
    const a = document.createElement('a')
    a.href = videoUrl
    a.download = 'memofox-reel.webm'
    a.click()
  }

  const share = async () => {
    if (!videoUrl) return
    try {
      const r = await fetch(videoUrl); const blob = await r.blob()
      const f = new File([blob], 'memofox-reel.mp4', { type: 'video/mp4' })
      const f2 = new File([blob], 'memofox-reel.webm', { type: blob.type })
      const toShare = navigator.canShare?.({ files: [f] }) ? f : navigator.canShare?.({ files: [f2] }) ? f2 : null
      if (toShare) { await navigator.share({ files: [toShare], title: 'Memofox 🦊', text: 'memofox.app' }); return }
    } catch {}
    download()
  }

  const approx = Math.ceil(HOOK_DUR + photos.length * CUT_DUR + (hasTrick ? TRICK_DUR : 0) + BRAND_DUR)

  const S = `.rb{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:rfade .3s ease}@keyframes rfade{from{opacity:0}to{opacity:1}}.rbox{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 52px;animation:rslide .35s cubic-bezier(.16,1,.3,1);max-height:92vh;overflow-y:auto}@keyframes rslide{from{transform:translateY(100%)}to{transform:translateY(0)}}.rh{width:36px;height:4px;background:#1E2128;border-radius:100px;margin:16px auto 22px}.rprog{height:4px;background:#1E2128;border-radius:100px;overflow:hidden;margin:12px 0 8px}.rprogf{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .15s}.rprev{width:100%;aspect-ratio:9/16;background:#000;border-radius:12px;overflow:hidden;margin:14px 0}.rprev video,.rprev canvas{width:100%;height:100%;object-fit:cover;display:block}.rbtn{width:100%;padding:15px;border-radius:18px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;border:none;margin-bottom:10px;transition:all .2s;letter-spacing:.01em}.rbtnp{background:#C6FF00;color:#07080A}.rbtns{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.12)}`

  return (
    <div className="rb" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{S}</style>
      <div className="rbox">
        <div className="rh" />
        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, marginBottom: 3 }}>
          🎬 {lang === 'de' ? 'Reel erstellen' : 'Create Reel'}
        </div>
        <p style={{ color: 'rgba(239,241,245,.38)', fontSize: 12, marginBottom: hasTrick ? 6 : 16, lineHeight: 1.5 }}>
          {photos.length} {lang === 'de' ? 'Fotos' : 'photos'} · ~{approx}s · Hook → Cuts → {hasTrick ? 'Twist → ' : ''}Brand
        </p>
        {hasTrick && (
          <div style={{ background: 'rgba(255,179,0,.08)', border: '1px solid rgba(255,179,0,.22)', borderRadius: 10, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: 'rgba(255,179,0,.85)' }}>
            🎭 {lang === 'de' ? `Streich-Twist von ${tricks[0].claimed_by_nickname || '?'} ist dabei!` : `Prank twist from ${tricks[0].claimed_by_nickname || '?'} included!`}
          </div>
        )}

        {status !== 'idle' && (
          <div className="rprev">
            {status === 'done' && videoUrl
              ? <video src={videoUrl} controls autoPlay loop playsInline />
              : <canvas ref={canvasRef} />
            }
          </div>
        )}
        {status === 'idle' && <canvas ref={canvasRef} style={{ display: 'none' }} />}

        {(status === 'loading' || status === 'recording') && (
          <>
            <div className="rprog"><div className="rprogf" style={{ width: `${progress}%` }} /></div>
            <p style={{ color: 'rgba(239,241,245,.4)', fontSize: 11, textAlign: 'center', marginBottom: 14 }}>
              {status === 'loading'
                ? (lang === 'de' ? `Fotos laden… ${progress}%` : `Loading photos… ${progress}%`)
                : (lang === 'de' ? `Reel wird gerendert… ${progress}%` : `Rendering… ${progress}%`)}
            </p>
          </>
        )}

        {status === 'error' && (
          <div style={{ background: 'rgba(255,64,64,.07)', border: '1px solid rgba(255,64,64,.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 12, color: '#FF7070', lineHeight: 1.6 }}>
            ⚠️ {lang === 'de'
              ? 'Fotos konnten nicht geladen werden. Versuche es nochmal oder öffne die App in Chrome.'
              : 'Photos could not be loaded. Try again or open in Chrome.'}
            {errMsg && <div style={{ opacity: .4, fontSize: 10, marginTop: 3 }}>{errMsg}</div>}
          </div>
        )}

        {photos.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(239,241,245,.35)', fontSize: 13, padding: '16px 0 20px' }}>
            {lang === 'de' ? 'Keine Fotos vorhanden.' : 'No photos available.'}
          </p>
        )}

        {status === 'idle' && photos.length > 0 && (
          <button className="rbtn rbtnp" onClick={generate}>
            ▶ {lang === 'de' ? 'Reel generieren' : 'Generate Reel'}
          </button>
        )}
        {status === 'done' && <>
          <button className="rbtn rbtnp" onClick={share}>📤 {lang === 'de' ? 'Reel teilen' : 'Share Reel'}</button>
          <button className="rbtn rbtns" onClick={download}>💾 {lang === 'de' ? 'Herunterladen' : 'Download'}</button>
          <button className="rbtn rbtns" onClick={() => { setStatus('idle'); setVideoUrl(null); setProgress(0) }}>
            {lang === 'de' ? 'Neu erstellen' : 'Regenerate'}
          </button>
        </>}
        {status === 'error' && <button className="rbtn rbtnp" onClick={generate}>{lang === 'de' ? 'Erneut versuchen' : 'Try Again'}</button>}
        <button className="rbtn rbtns" onClick={onClose}>{lang === 'de' ? 'Schließen' : 'Close'}</button>
      </div>
    </div>
  )
}
