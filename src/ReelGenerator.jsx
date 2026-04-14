// ReelGenerator.jsx — No intro text, longer cuts, task text on trick reveal
import { useState, useRef, useEffect } from 'react'

const W = 1080, H = 1920
const FPS = 30
const CUT_DUR = 1.4        // Longer cuts so photos breathe
const TRICK_DUR = 3.5      // Longer trick reveal
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

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

// ─── ACT 1: PHOTO CUT ────────────────────────────────────────────────────────
// NO text intro. First frame = first photo. Clean.
function drawPhotoCut(ctx, img, p, playerName) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  if (!img) return

  // Photo with gentle Ken Burns
  const scale = 1 + p * 0.04
  ctx.save()
  drawImg(ctx, img, scale, 0, -p * 10)
  ctx.restore()

  // Subtle bottom gradient for text readability
  const g = ctx.createLinearGradient(0, H * 0.72, 0, H)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(0,0,0,0.78)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // Top brand — always visible
  const topG = ctx.createLinearGradient(0, 0, 0, H * 0.18)
  topG.addColorStop(0, 'rgba(0,0,0,0.55)')
  topG.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = topG
  ctx.fillRect(0, 0, W, H)

  ctx.save()
  const bFs = Math.round(H * 0.028)
  ctx.font = `bold ${bFs}px Arial`
  ctx.fillStyle = '#C6FF00'
  ctx.fillText('🦊 Memo', 52, 72)
  ctx.fillStyle = '#FFF'
  ctx.fillText('fox', 52 + ctx.measureText('🦊 Memo').width, 72)
  ctx.restore()

  // Player name chip — fades in
  const nameA = easeOut(Math.min(1, p / 0.25))
  if (playerName) {
    const nFs = Math.round(H * 0.024)
    ctx.save()
    ctx.globalAlpha = nameA * 0.9
    ctx.font = `bold ${nFs}px Arial`
    const nW = ctx.measureText(playerName).width
    const cH = nFs * 1.85, cP = nFs * 0.9, cW = nW + cP * 2
    const cY = H - 160
    ctx.fillStyle = 'rgba(198,255,0,0.15)'
    if (ctx.roundRect) ctx.roundRect(52, cY, cW, cH, cH / 2)
    else ctx.rect(52, cY, cW, cH)
    ctx.fill()
    ctx.strokeStyle = 'rgba(198,255,0,0.4)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.fillStyle = '#C6FF00'
    ctx.fillText(playerName, 52 + cP, cY + cH * 0.68)
    ctx.restore()
  }

  // Flash effect on cut-in
  if (p < 0.06) {
    const flashA = (1 - p / 0.06) * 0.4
    ctx.fillStyle = `rgba(255,255,255,${flashA})`
    ctx.fillRect(0, 0, W, H)
  }
}

// ─── ACT 2: TRICK REVEAL ────────────────────────────────────────────────────
// Show the task text — not "had no idea"
function drawTrick(ctx, img, trickName, taskText, p, lang) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  if (img) {
    ctx.save()
    ctx.globalAlpha = Math.min(0.6, easeOut(p) * 0.7)
    drawImg(ctx, img, 1.05)
    ctx.restore()
    ctx.fillStyle = 'rgba(0,0,0,0.72)'
    ctx.fillRect(0, 0, W, H)
  }

  const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7)
  g.addColorStop(0, 'rgba(255,179,0,0.09)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // 🎭 emoji
  const l1p = easeOut(Math.min(1, p / 0.2))
  ctx.save()
  ctx.globalAlpha = l1p
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${Math.round(H * 0.09)}px serif`
  ctx.fillText('🎭', W / 2, H * 0.35)
  ctx.restore()

  // Name — who got pranked
  const l2p = easeOut(Math.max(0, Math.min(1, (p - 0.25) / 0.3)))
  ctx.save()
  ctx.globalAlpha = l2p
  ctx.textAlign = 'center'
  ctx.font = `bold ${Math.round(H * 0.065)}px Arial`
  ctx.fillStyle = '#FFB300'
  ctx.fillText(trickName || '?', W / 2, H * 0.48)
  ctx.restore()

  // The actual task text — word wrap
  const l3p = easeOut(Math.max(0, Math.min(1, (p - 0.45) / 0.3)))
  if (taskText) {
    ctx.save()
    ctx.globalAlpha = l3p
    ctx.textAlign = 'center'
    const tFs = Math.round(H * 0.032)
    ctx.font = `${tFs}px Arial`
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    const maxW = W - 120
    const words = taskText.split(' ')
    let lines = [], cur = ''
    words.forEach(w => {
      const test = cur ? cur + ' ' + w : w
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w }
      else cur = test
    })
    if (cur) lines.push(cur)
    lines = lines.slice(0, 4)
    const totalH = lines.length * tFs * 1.4
    const startY = H * 0.565 - totalH / 2
    lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * tFs * 1.4))
    ctx.restore()
  }

  // 😂
  const l4p = easeOut(Math.max(0, Math.min(1, (p - 0.7) / 0.25)))
  ctx.save()
  ctx.globalAlpha = l4p * 0.75
  ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.055)}px serif`
  ctx.fillText('😂', W / 2, H * 0.74)
  ctx.restore()
}

// ─── ACT 3: BRAND ────────────────────────────────────────────────────────────
function drawBrand(ctx, p) {
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)

  const pulse = 0.07 + Math.sin(p * Math.PI * 2) * 0.02
  const g = ctx.createRadialGradient(W / 2, H * 0.44, 0, W / 2, H * 0.44, W * 0.65)
  g.addColorStop(0, `rgba(198,255,0,${pulse})`)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
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

  const tagP = easeOut(Math.max(0, Math.min(1, (p - 0.48) / 0.28)))
  ctx.save()
  ctx.globalAlpha = tagP
  ctx.textAlign = 'center'
  ctx.font = `${Math.round(H * 0.028)}px Arial`
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.fillText('Make memories. Prove it happened.', W / 2, H * 0.615)
  ctx.restore()

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
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ReelGenerator({ completions, lang = 'de', onClose }) {
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)
  const [errMsg, setErrMsg] = useState('')
  const canvasRef = useRef()
  const rafRef = useRef()

  const photos = completions.filter(c => c.photo_url && !c.is_trick).slice(0, 15)
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
      let trickImg = null, trickName = '', trickText = ''
      if (hasTrick) {
        try { trickImg = await loadImg(tricks[0].photo_url) } catch {}
        trickName = tricks[0].claimed_by_nickname || ''
        trickText = tricks[0].text || ''
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

      // No hook — straight into photos
      const fCut = Math.ceil(CUT_DUR * FPS)
      const fContent = photos.length * fCut
      const fTrick = hasTrick ? Math.ceil(TRICK_DUR * FPS) : 0
      const fBrand = Math.ceil(BRAND_DUR * FPS)
      const fTotal = fContent + fTrick + fBrand
      let frame = 0

      const tick = () => {
        if (frame >= fTotal) { rec.stop(); return }
        const r = frame

        if (r < fContent) {
          const pI = Math.floor(r / fCut)
          const fInCut = r % fCut
          drawPhotoCut(ctx, imgs[pI], fInCut / fCut, photos[pI]?.claimed_by_nickname || '')
        } else if (hasTrick && r < fContent + fTrick) {
          drawTrick(ctx, trickImg, trickName, trickText, (r - fContent) / fTrick, lang)
        } else {
          drawBrand(ctx, Math.min((r - fContent - fTrick) / fBrand, 1))
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

  const approx = Math.ceil(photos.length * CUT_DUR + (hasTrick ? TRICK_DUR : 0) + BRAND_DUR)

  const S = `.rb{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:rfade .3s ease}@keyframes rfade{from{opacity:0}to{opacity:1}}.rbox{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 52px;animation:rslide .35s cubic-bezier(.16,1,.3,1);max-height:92vh;overflow-y:auto}@keyframes rslide{from{transform:translateY(100%)}to{transform:translateY(0)}}.rh{width:36px;height:4px;background:#1E2128;border-radius:100px;margin:16px auto 22px}.rprog{height:4px;background:#1E2128;border-radius:100px;overflow:hidden;margin:12px 0 8px}.rprogf{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .15s}.rprev{width:100%;aspect-ratio:9/16;background:#000;border-radius:12px;overflow:hidden;margin:14px 0}.rprev video,.rprev canvas{width:100%;height:100%;object-fit:cover;display:block}.rbtn{width:100%;padding:15px;border-radius:18px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;border:none;margin-bottom:10px;transition:all .2s;letter-spacing:.01em}.rbtnp{background:#C6FF00;color:#07080A}.rbtns{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.12)}`

  return (
    <div className="rb" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{S}</style>
      <div className="rbox">
        <div className="rh" />
        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, marginBottom: 3 }}>
          🎬 {lang === 'de' ? 'Reel erstellen' : 'Create Reel'}
        </div>
        <p style={{ color: 'rgba(239,241,245,.38)', fontSize: 12, marginBottom: hasTrick ? 6 : 16 }}>
          {photos.length} {lang === 'de' ? 'Fotos' : 'photos'} · ~{approx}s
        </p>
        {hasTrick && (
          <div style={{ background: 'rgba(255,179,0,.08)', border: '1px solid rgba(255,179,0,.22)', borderRadius: 10, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: 'rgba(255,179,0,.85)' }}>
            🎭 {lang === 'de' ? `Streich-Enthüllung von ${tricks[0].claimed_by_nickname || '?'}` : `Prank reveal: ${tricks[0].claimed_by_nickname || '?'}`}
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
              {status === 'loading' ? `${lang === 'de' ? 'Fotos laden' : 'Loading'}… ${progress}%` : `Rendering… ${progress}%`}
            </p>
          </>
        )}

        {status === 'error' && (
          <div style={{ background: 'rgba(255,64,64,.07)', border: '1px solid rgba(255,64,64,.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 12, color: '#FF7070', lineHeight: 1.6 }}>
            ⚠️ {lang === 'de' ? 'Fotos konnten nicht geladen werden. In Chrome versuchen.' : 'Photos could not be loaded. Try in Chrome.'}
            {errMsg && <div style={{ opacity: .4, fontSize: 10, marginTop: 3 }}>{errMsg}</div>}
          </div>
        )}

        {photos.length === 0 && (
          <p style={{ textAlign: 'center', color: 'rgba(239,241,245,.35)', fontSize: 13, padding: '16px 0 20px' }}>
            {lang === 'de' ? 'Keine Fotos vorhanden.' : 'No photos available.'}
          </p>
        )}

        {status === 'idle' && photos.length > 0 && <button className="rbtn rbtnp" onClick={generate}>▶ {lang === 'de' ? 'Reel generieren' : 'Generate Reel'}</button>}
        {status === 'done' && <>
          <button className="rbtn rbtnp" onClick={share}>📤 {lang === 'de' ? 'Reel teilen' : 'Share Reel'}</button>
          <button className="rbtn rbtns" onClick={download}>💾 {lang === 'de' ? 'Herunterladen' : 'Download'}</button>
          <button className="rbtn rbtns" onClick={() => { setStatus('idle'); setVideoUrl(null); setProgress(0) }}>{lang === 'de' ? 'Neu erstellen' : 'Regenerate'}</button>
        </>}
        {status === 'error' && <button className="rbtn rbtnp" onClick={generate}>{lang === 'de' ? 'Erneut versuchen' : 'Try Again'}</button>}
        <button className="rbtn rbtns" onClick={onClose}>{lang === 'de' ? 'Schließen' : 'Close'}</button>
      </div>
    </div>
  )
}
