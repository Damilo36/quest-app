// ReelGenerator.jsx — Viral-optimized with hook intro, trick reveal, extended outro
import { useState, useRef, useEffect } from 'react'

const W = 720
const H = 1280
const FPS = 24
const INTRO_DUR = 1.8    // "Was heute Nacht passiert ist..."
const PHOTO_DUR = 2.6
const TRANS_DUR = 0.45
const TRICK_DUR = 2.2    // Streich reveal card (if tricks exist)
const OUTRO_DUR = 4.5    // Extended Memofox branding

// Load image as blob to bypass CORS
async function loadImg(src) {
  try {
    const r = await fetch(src, { mode: 'cors', cache: 'no-store' })
    if (!r.ok) throw new Error()
    const blob = await r.blob()
    const url = URL.createObjectURL(blob)
    return await new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url
    })
  } catch {
    return await new Promise((res, rej) => {
      const i = new Image(); i.crossOrigin = 'anonymous'
      i.onload = () => res(i); i.onerror = rej
      i.src = src + (src.includes('?') ? '&' : '?') + 'cb=' + Date.now()
    })
  }
}

function fillImg(ctx, img, x, y, w, h) {
  const iA = img.width / img.height, cA = w / h
  let dW, dH, dx, dy
  if (iA > cA) { dH = h; dW = dH * iA; dx = x + (w - dW) / 2; dy = y }
  else { dW = w; dH = dW / iA; dx = x; dy = y + (h - dH) / 2 }
  ctx.drawImage(img, dx, dy, dW, dH)
}

// ─── DRAW INTRO CARD ─────────────────────────────────────────────────────────
function drawIntro(ctx, progress, photoCount, lang) {
  const e = t => 1 - Math.pow(1 - t, 4)
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)

  // Animated lime orb
  const orbAlpha = Math.sin(progress * Math.PI) * 0.12
  const g = ctx.createRadialGradient(W * 0.7, H * 0.4, 0, W * 0.7, H * 0.4, W * 0.8)
  g.addColorStop(0, `rgba(198,255,0,${orbAlpha})`)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

  // Fox icon slides in
  const foxY = H * 0.35 - (1 - e(Math.min(1, progress / 0.3))) * 40
  ctx.save(); ctx.globalAlpha = e(Math.min(1, progress / 0.3))
  ctx.font = `${Math.round(H * 0.09)}px serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('🦊', W / 2, foxY); ctx.restore()

  // Main hook text
  const textAlpha = e(Math.max(0, Math.min(1, (progress - 0.2) / 0.35)))
  const hookText = lang === 'de' ? 'Was heute Nacht\npassiert ist...' : "What happened\ntonight..."
  ctx.save(); ctx.globalAlpha = textAlpha; ctx.textAlign = 'center'
  const fS = Math.round(H * 0.055); ctx.font = `bold ${fS}px Arial`
  ctx.fillStyle = '#EFF1F5'
  hookText.split('\n').forEach((line, i) => {
    ctx.fillText(line, W / 2, H * 0.5 + i * fS * 1.3)
  }); ctx.restore()

  // Photo count chip
  const chipAlpha = e(Math.max(0, Math.min(1, (progress - 0.5) / 0.3)))
  ctx.save(); ctx.globalAlpha = chipAlpha; ctx.textAlign = 'center'
  const chip = `${photoCount} ${lang === 'de' ? 'Fotos' : 'photos'}`
  const cFs = Math.round(H * 0.026); ctx.font = `bold ${cFs}px Arial`
  const cW2 = ctx.measureText(chip).width + cFs * 1.6
  const cH2 = cFs * 1.9; const cX = W / 2 - cW2 / 2; const cY = H * 0.65
  ctx.fillStyle = 'rgba(198,255,0,0.15)'
  if (ctx.roundRect) ctx.roundRect(cX, cY, cW2, cH2, cH2 / 2)
  else ctx.rect(cX, cY, cW2, cH2)
  ctx.fill(); ctx.strokeStyle = 'rgba(198,255,0,0.4)'; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = '#C6FF00'; ctx.fillText(chip, W / 2, cY + cH2 * 0.68); ctx.restore()
}

// ─── DRAW PHOTO FRAME ────────────────────────────────────────────────────────
function drawPhoto(ctx, img, nextImg, kenX, kenY, kenS, transAlpha, task, playerName, photoIdx, total) {
  ctx.fillStyle = '#07080A'; ctx.fillRect(0, 0, W, H)
  if (img) {
    ctx.save(); ctx.globalAlpha = transAlpha < 0.5 ? 1 : 1 - (transAlpha - 0.5) * 2
    ctx.save()
    const iA = img.width / img.height, cA = W / H
    let dW, dH
    if (iA > cA) { dH = H * kenS; dW = dH * iA } else { dW = W * kenS; dH = dW / iA }
    ctx.drawImage(img, (W - dW) / 2 + kenX, (H - dH) / 2 + kenY, dW, dH)
    ctx.restore(); ctx.restore()
  }
  if (nextImg && transAlpha > 0.5) {
    ctx.save(); ctx.globalAlpha = (transAlpha - 0.5) * 2
    fillImg(ctx, nextImg, 0, 0, W, H); ctx.restore()
  }
  // Gradients
  const gb = ctx.createLinearGradient(0, H * 0.4, 0, H)
  gb.addColorStop(0, 'rgba(0,0,0,0)'); gb.addColorStop(0.5, 'rgba(0,0,0,0.68)'); gb.addColorStop(1, 'rgba(0,0,0,0.95)')
  ctx.fillStyle = gb; ctx.fillRect(0, 0, W, H)
  const gt = ctx.createLinearGradient(0, 0, 0, H * 0.2)
  gt.addColorStop(0, 'rgba(0,0,0,0.52)'); gt.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gt; ctx.fillRect(0, 0, W, H)

  // Top: branding
  ctx.save(); ctx.font = `bold ${Math.round(H * 0.03)}px Arial`
  ctx.fillStyle = '#C6FF00'; ctx.fillText('🦊 Memo', 44, 62)
  const mW = ctx.measureText('🦊 Memo').width; ctx.fillStyle = '#EFF1F5'; ctx.fillText('fox', 44 + mW, 62); ctx.restore()

  // Progress dots
  const dS = 8, dG = 6, tDW = total * (dS + dG) - dG, dX = W / 2 - tDW / 2
  for (let i = 0; i < total; i++) {
    ctx.beginPath(); ctx.arc(dX + i * (dS + dG) + dS / 2, 84, dS / 2, 0, Math.PI * 2)
    ctx.fillStyle = i === photoIdx ? '#C6FF00' : 'rgba(255,255,255,0.22)'; ctx.fill()
  }

  // Counter
  ctx.save(); ctx.font = `bold ${Math.round(H * 0.023)}px Arial`; ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(239,241,245,0.35)'; ctx.fillText(`${photoIdx + 1}/${total}`, W - 44, 62); ctx.restore()

  // Player chip
  const fs = Math.round(H * 0.024); ctx.font = `bold ${fs}px Arial`
  const nW = ctx.measureText(playerName).width; const cH = fs * 1.9, cP = fs * 0.85
  const cW2 = nW + cP * 2, cY = H - 275
  ctx.fillStyle = 'rgba(198,255,0,0.15)'
  if (ctx.roundRect) ctx.roundRect(44, cY, cW2, cH, cH / 2)
  else ctx.rect(44, cY, cW2, cH)
  ctx.fill(); ctx.strokeStyle = 'rgba(198,255,0,0.4)'; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = '#C6FF00'; ctx.fillText(playerName, 44 + cP, cY + cH * 0.68)

  // Task text
  const tFs = Math.round(H * 0.028); ctx.font = `${tFs}px Arial`; ctx.fillStyle = '#EFF1F5'
  const maxW = W - 88; const words = (task || '').split(' '); let lines = [], cur = ''
  words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w } else cur = t })
  if (cur) lines.push(cur); lines = lines.slice(0, 3)
  lines.forEach((l, i) => ctx.fillText(l, 44, cY + cH + 44 + i * (tFs * 1.4)))
}

// ─── DRAW TRICK CARD ─────────────────────────────────────────────────────────
function drawTrickCard(ctx, trickImg, trickName, progress, lang) {
  const e = t => 1 - Math.pow(1 - t, 3)
  ctx.fillStyle = '#0A0800'; ctx.fillRect(0, 0, W, H)

  // Warm glow
  const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7)
  g.addColorStop(0, 'rgba(255,179,0,0.1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

  // Photo if available
  if (trickImg) {
    ctx.save(); ctx.globalAlpha = 0.35; fillImg(ctx, trickImg, 0, 0, W, H); ctx.restore()
    const overlay = ctx.createLinearGradient(0, 0, 0, H)
    overlay.addColorStop(0, 'rgba(10,8,0,0.7)'); overlay.addColorStop(0.5, 'rgba(10,8,0,0.5)'); overlay.addColorStop(1, 'rgba(10,8,0,0.9)')
    ctx.fillStyle = overlay; ctx.fillRect(0, 0, W, H)
  }

  const textIn = e(Math.min(1, progress / 0.4))

  // Emoji reveal
  ctx.save(); ctx.globalAlpha = textIn; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `${Math.round(H * 0.1)}px serif`; ctx.fillText('🎭', W / 2, H * 0.38); ctx.restore()

  // Title
  const title = lang === 'de' ? 'Das wussten die\nAnderen nicht.' : "They had\nno idea."
  ctx.save(); ctx.globalAlpha = e(Math.max(0, Math.min(1, (progress - 0.15) / 0.35)))
  ctx.textAlign = 'center'; const tFs = Math.round(H * 0.054)
  ctx.font = `bold ${tFs}px Arial`; ctx.fillStyle = '#FFB300'
  title.split('\n').forEach((l, i) => ctx.fillText(l, W / 2, H * 0.5 + i * tFs * 1.25))
  ctx.restore()

  // Name
  if (trickName) {
    const nA = e(Math.max(0, Math.min(1, (progress - 0.45) / 0.3)))
    ctx.save(); ctx.globalAlpha = nA; ctx.textAlign = 'center'
    ctx.font = `bold ${Math.round(H * 0.032)}px Arial`; ctx.fillStyle = '#EFF1F5'
    ctx.fillText(trickName, W / 2, H * 0.67); ctx.restore()
  }

  // Bottom hint
  const hA = e(Math.max(0, Math.min(1, (progress - 0.6) / 0.3)))
  ctx.save(); ctx.globalAlpha = hA * 0.55; ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.024)}px Arial`; ctx.fillStyle = '#EFF1F5'
  ctx.fillText('😂', W / 2, H * 0.76); ctx.restore()
}

// ─── DRAW OUTRO ──────────────────────────────────────────────────────────────
function drawOutro(ctx, progress) {
  const e = t => 1 - Math.pow(1 - t, 3)
  ctx.fillStyle = '#07080A'; ctx.fillRect(0, 0, W, H)

  // Lime glow — pulses
  const pulse = 0.06 + Math.sin(progress * Math.PI * 2) * 0.02
  const g = ctx.createRadialGradient(W / 2, H * 0.45, 0, W / 2, H * 0.45, W * 0.7)
  g.addColorStop(0, `rgba(198,255,0,${pulse})`); g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

  // Fox — bounces in
  const foxP = e(Math.min(1, progress / 0.25))
  const foxScale = foxP; const foxY = H * 0.38
  ctx.save(); ctx.globalAlpha = foxP; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.translate(W / 2, foxY); ctx.scale(foxScale, foxScale)
  ctx.font = `${Math.round(H * 0.1)}px serif`; ctx.fillText('🦊', 0, 0); ctx.restore()

  // Wordmark slides up
  const wordP = e(Math.max(0, Math.min(1, (progress - 0.2) / 0.3)))
  const wordY = H * 0.53 + (1 - wordP) * 30
  ctx.save(); ctx.globalAlpha = wordP; ctx.textAlign = 'center'
  const wS = Math.round(H * 0.072); ctx.font = `bold ${wS}px Arial`
  ctx.fillStyle = '#C6FF00'
  const memoW = ctx.measureText('Memo').width
  ctx.fillText('Memo', W / 2 - ctx.measureText('fox').width / 2, wordY)
  ctx.fillStyle = '#EFF1F5'
  ctx.fillText('fox', W / 2 + memoW / 2, wordY)
  ctx.restore()

  // Animated underline grows
  const lineP = e(Math.max(0, Math.min(1, (progress - 0.3) / 0.35)))
  const lineW = 160 * lineP
  ctx.save(); ctx.globalAlpha = wordP
  ctx.strokeStyle = '#C6FF00'; ctx.lineWidth = 4; ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(W / 2 - lineW, H * 0.565); ctx.lineTo(W / 2 + lineW, H * 0.565); ctx.stroke()
  ctx.restore()

  // Tagline fades in
  const tagP = e(Math.max(0, Math.min(1, (progress - 0.45) / 0.3)))
  ctx.save(); ctx.globalAlpha = tagP; ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.027)}px Arial`; ctx.fillStyle = 'rgba(239,241,245,0.55)'
  ctx.fillText('Make memories. Prove it happened.', W / 2, H * 0.62); ctx.restore()

  // CTA box
  const ctaP = e(Math.max(0, Math.min(1, (progress - 0.6) / 0.3)))
  ctx.save(); ctx.globalAlpha = ctaP; ctx.textAlign = 'center'
  const ctaFs = Math.round(H * 0.03); ctx.font = `bold ${ctaFs}px Arial`
  const ctaText = 'memofox.app'
  const ctaW = ctx.measureText(ctaText).width + ctaFs * 2
  const ctaH = ctaFs * 2; const ctaX = W / 2 - ctaW / 2; const ctaY = H * 0.7
  ctx.fillStyle = 'rgba(198,255,0,0.12)'
  if (ctx.roundRect) ctx.roundRect(ctaX, ctaY, ctaW, ctaH, ctaH / 2)
  else ctx.rect(ctaX, ctaY, ctaW, ctaH)
  ctx.fill(); ctx.strokeStyle = 'rgba(198,255,0,0.35)'; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = '#C6FF00'; ctx.fillText(ctaText, W / 2, ctaY + ctaH * 0.68); ctx.restore()

  // "Erstelle dein eigenes" hint
  const hintP = e(Math.max(0, Math.min(1, (progress - 0.72) / 0.25)))
  ctx.save(); ctx.globalAlpha = hintP * 0.45; ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.022)}px Arial`; ctx.fillStyle = '#EFF1F5'
  ctx.fillText('Erstelle dein eigenes Reel 👆', W / 2, H * 0.85); ctx.restore()
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ReelGenerator({ completions, lang = 'de', onClose }) {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)
  const [errMsg, setErrMsg] = useState('')
  const canvasRef = useRef()
  const rafRef = useRef()

  const photos = completions.filter(c => c.photo_url).slice(0, 12)
  const tricks = completions.filter(c => c.photo_url && c.is_trick)

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (videoUrl) URL.revokeObjectURL(videoUrl)
  }, [])

  const generate = async () => {
    if (!photos.length) return
    setStatus('loading'); setProgress(0); setErrMsg('')
    try {
      // Load images
      const imgs = []
      for (let i = 0; i < photos.length; i++) {
        try { imgs.push(await loadImg(photos[i].photo_url)) } catch { imgs.push(null) }
        setProgress(Math.round((i + 1) / photos.length * 22))
      }

      // Load trick image if exists
      let trickImg = null, trickName = ''
      if (tricks.length > 0) {
        try { trickImg = await loadImg(tricks[0].photo_url) } catch {}
        trickName = tricks[0].claimed_by_nickname || ''
      }

      const canvas = canvasRef.current
      canvas.width = W; canvas.height = H
      const ctx = canvas.getContext('2d', { alpha: false })

      // Find best supported format
      const mimeType = ['video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
        .find(t => { try { return MediaRecorder.isTypeSupported(t) } catch { return false } }) || 'video/webm'

      const stream = canvas.captureStream(FPS)
      const rec = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5_000_000 })
      const chunks = []
      rec.ondataavailable = e => { if (e.data?.size > 0) chunks.push(e.data) }
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType })
        setVideoUrl(URL.createObjectURL(blob))
        setStatus('done'); setProgress(100)
      }
      rec.onerror = (e) => { setStatus('error'); setErrMsg(e?.error?.message || 'Recording error') }
      rec.start(100); setStatus('recording')

      // Frame counts
      const fIntro = Math.ceil(INTRO_DUR * FPS)
      const fPhoto = Math.ceil(PHOTO_DUR * FPS)
      const fTrans = Math.ceil(TRANS_DUR * FPS)
      const fPh = fPhoto + fTrans
      const fContent = photos.length * fPh
      const fTrick = tricks.length > 0 ? Math.ceil(TRICK_DUR * FPS) : 0
      const fOutro = Math.ceil(OUTRO_DUR * FPS)
      const fTotal = fIntro + fContent + fTrick + fOutro
      let frame = 0

      const tick = () => {
        if (frame >= fTotal) { rec.stop(); return }
        const rel = frame // absolute frame
        let drawn = false

        if (rel < fIntro) {
          // INTRO
          drawIntro(ctx, rel / fIntro, photos.length, lang)
          drawn = true
        }

        if (!drawn) {
          const r2 = rel - fIntro
          if (r2 < fContent) {
            // PHOTOS
            const pI = Math.min(Math.floor(r2 / fPh), photos.length - 1)
            const fInP = r2 % fPh
            const inT = fInP >= fPhoto
            const pProg = inT ? 1 : fInP / fPhoto
            const transA = inT ? (fInP - fPhoto) / fTrans : 0
            const kS = 1 + pProg * 0.05
            const kX = -pProg * 18, kY = -pProg * 12
            drawPhoto(ctx, imgs[pI], imgs[pI + 1] || null, kX, kY, kS, transA,
              photos[pI]?.text || '', photos[pI]?.claimed_by_nickname || 'Memofox', pI, photos.length)
            drawn = true
          }
        }

        if (!drawn && fTrick > 0) {
          const r3 = rel - fIntro - fContent
          if (r3 < fTrick) {
            drawTrickCard(ctx, trickImg, trickName, r3 / fTrick, lang)
            drawn = true
          }
        }

        if (!drawn) {
          const r4 = rel - fIntro - fContent - fTrick
          drawOutro(ctx, Math.min(r4 / fOutro, 1))
        }

        frame++
        setProgress(22 + Math.round(frame / fTotal * 78))
        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrMsg(err?.message || 'Unknown error')
    }
  }

  const download = () => {
    if (!videoUrl) return
    const ext = videoUrl.includes('mp4') ? 'mp4' : 'webm'
    const a = document.createElement('a')
    a.href = videoUrl; a.download = `memofox-reel.${ext}`; a.click()
  }

  const share = async () => {
    if (!videoUrl) return
    try {
      const r = await fetch(videoUrl); const blob = await r.blob()
      // Try mp4 first for iOS compatibility
      const fileName = 'memofox-reel.mp4'
      const file = new File([blob], fileName, { type: 'video/mp4' })
      const file2 = new File([blob], 'memofox-reel.webm', { type: blob.type })
      const toShare = navigator.canShare?.({ files: [file] }) ? file
        : navigator.canShare?.({ files: [file2] }) ? file2 : null
      if (toShare) {
        await navigator.share({ files: [toShare], title: 'Memofox Reel 🦊', text: 'Make memories. Prove it happened. memofox.app' })
        return
      }
    } catch (e) { console.log('Share failed:', e) }
    download()
  }

  const S = `.rb{position:fixed;inset:0;background:rgba(0,0,0,.94);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:rfade .3s ease}@keyframes rfade{from{opacity:0}to{opacity:1}}.rbox{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 52px;animation:rslide .35s cubic-bezier(.16,1,.3,1)}@keyframes rslide{from{transform:translateY(100%)}to{transform:translateY(0)}}.rh{width:36px;height:4px;background:#1E2128;border-radius:100px;margin:16px auto 22px}.rprog{height:5px;background:#1E2128;border-radius:100px;overflow:hidden;margin:14px 0 8px}.rprogf{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .2s ease}.rprev{width:100%;aspect-ratio:9/16;background:#07080A;border-radius:14px;overflow:hidden;margin:14px 0}.rprev video,.rprev canvas{width:100%;height:100%;object-fit:cover;display:block}.rbtn{width:100%;padding:15px;border-radius:18px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;border:none;margin-bottom:10px;transition:all .2s}.rbtnp{background:#C6FF00;color:#07080A}.rbtnp:hover{transform:translateY(-1px)}.rbtns{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.13)}.rbtns:hover{background:#16191F}`

  const hasTrick = tricks.length > 0
  const approxSec = Math.ceil(INTRO_DUR + photos.length * (PHOTO_DUR + TRANS_DUR) + (hasTrick ? TRICK_DUR : 0) + OUTRO_DUR)

  return (
    <div className="rb" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{S}</style>
      <div className="rbox">
        <div className="rh" />
        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 19, marginBottom: 4 }}>
          🎬 {lang === 'de' ? 'Reel erstellen' : 'Create Reel'}
        </div>
        <p style={{ color: 'rgba(239,241,245,.4)', fontSize: 13, marginBottom: 4 }}>
          {photos.length} {lang === 'de' ? 'Fotos' : 'photos'} · ~{approxSec}s · Memofox Outro
        </p>
        {hasTrick && (
          <p style={{ color: 'rgba(255,179,0,.7)', fontSize: 12, marginBottom: 12 }}>
            🎭 {lang === 'de' ? `${tricks.length} Streich-Enthüllung im Reel!` : `${tricks.length} prank reveal included!`}
          </p>
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
            <p style={{ color: 'rgba(239,241,245,.45)', fontSize: 12, textAlign: 'center', marginBottom: 14 }}>
              {status === 'loading'
                ? (lang === 'de' ? `Fotos laden… ${progress}%` : `Loading… ${progress}%`)
                : (lang === 'de' ? `Rendering… ${progress}%` : `Rendering… ${progress}%`)}
            </p>
          </>
        )}

        {status === 'error' && (
          <div style={{ background: 'rgba(255,64,64,.08)', border: '1px solid rgba(255,64,64,.25)', borderRadius: 12, padding: '12px 16px', marginBottom: 14, fontSize: 12, color: '#FF7070', lineHeight: 1.6 }}>
            {lang === 'de'
              ? '⚠️ Fotos konnten nicht geladen werden. Das passiert manchmal wegen Browser-Einschränkungen. Bitte in Chrome versuchen oder Fotos einzeln aus dem Album speichern.'
              : '⚠️ Photos could not be loaded due to browser restrictions. Please try in Chrome or save photos individually from the album.'}
            {errMsg && <div style={{ opacity: 0.5, fontSize: 10, marginTop: 4 }}>{errMsg}</div>}
          </div>
        )}

        {photos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(239,241,245,.38)', fontSize: 13, marginBottom: 14 }}>
            {lang === 'de' ? 'Keine Fotos vorhanden.' : 'No photos available.'}
          </div>
        )}

        {status === 'idle' && photos.length > 0 && (
          <button className="rbtn rbtnp" onClick={generate}>
            ▶ {lang === 'de' ? 'Reel generieren' : 'Generate Reel'}
          </button>
        )}

        {status === 'done' && (
          <>
            <button className="rbtn rbtnp" onClick={share}>
              📤 {lang === 'de' ? 'Reel teilen' : 'Share Reel'}
            </button>
            <button className="rbtn rbtns" onClick={download}>
              💾 {lang === 'de' ? 'Herunterladen' : 'Download'}
            </button>
            <button className="rbtn rbtns" onClick={() => { setStatus('idle'); setVideoUrl(null); setProgress(0) }}>
              {lang === 'de' ? 'Neu erstellen' : 'Regenerate'}
            </button>
          </>
        )}

        {status === 'error' && (
          <button className="rbtn rbtnp" onClick={generate}>
            {lang === 'de' ? 'Erneut versuchen' : 'Try Again'}
          </button>
        )}

        <button className="rbtn rbtns" onClick={onClose}>
          {lang === 'de' ? 'Schließen' : 'Close'}
        </button>
      </div>
    </div>
  )
}
