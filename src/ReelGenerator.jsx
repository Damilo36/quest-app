// ReelGenerator.jsx
// Creates an animated MP4 reel from session photos using Canvas + MediaRecorder

import { useState, useRef, useEffect } from 'react'

const REEL_W = 1080
const REEL_H = 1920
const FPS = 30
const PHOTO_DURATION = 2.5  // seconds per photo
const TRANSITION_DURATION = 0.4  // seconds crossfade
const OUTRO_DURATION = 3.0  // seconds for branding outro

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => {
      // If CORS fails, try without
      const img2 = new Image()
      img2.onload = () => resolve(img2)
      img2.onerror = reject
      img2.src = src
    }
    img.src = src
  })
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawFrame(ctx, photo, nextPhoto, progress, task, playerName, photoIndex, totalPhotos, transitionProgress, lang) {
  const W = REEL_W, H = REEL_H

  // Background
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)

  // Draw current photo with Ken Burns effect
  if (photo) {
    ctx.save()
    const scale = 1 + progress * 0.06
    const imgAspect = photo.width / photo.height
    const canvasAspect = W / H

    let drawW, drawH
    if (imgAspect > canvasAspect) {
      drawH = H * scale
      drawW = drawH * imgAspect
    } else {
      drawW = W * scale
      drawH = drawW / imgAspect
    }

    const x = (W - drawW) / 2 - progress * 30
    const y = (H - drawH) / 2 - progress * 20

    ctx.globalAlpha = transitionProgress < 0.5 ? 1 : 1 - (transitionProgress - 0.5) * 2
    ctx.drawImage(photo, x, y, drawW, drawH)
    ctx.restore()
  }

  // Draw next photo fading in
  if (nextPhoto && transitionProgress > 0.5) {
    ctx.save()
    const alpha = (transitionProgress - 0.5) * 2
    const imgAspect = nextPhoto.width / nextPhoto.height
    const canvasAspect = W / H

    let drawW, drawH
    if (imgAspect > canvasAspect) {
      drawH = H
      drawW = drawH * imgAspect
    } else {
      drawW = W
      drawH = drawW / imgAspect
    }

    const x = (W - drawW) / 2
    const y = (H - drawH) / 2

    ctx.globalAlpha = alpha
    ctx.drawImage(nextPhoto, x, y, drawW, drawH)
    ctx.restore()
  }

  // Dark gradient overlay bottom
  const gradBottom = ctx.createLinearGradient(0, H * 0.5, 0, H)
  gradBottom.addColorStop(0, 'rgba(0,0,0,0)')
  gradBottom.addColorStop(0.6, 'rgba(0,0,0,0.7)')
  gradBottom.addColorStop(1, 'rgba(0,0,0,0.95)')
  ctx.fillStyle = gradBottom
  ctx.fillRect(0, 0, W, H)

  // Dark gradient overlay top
  const gradTop = ctx.createLinearGradient(0, 0, 0, H * 0.25)
  gradTop.addColorStop(0, 'rgba(0,0,0,0.6)')
  gradTop.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradTop
  ctx.fillRect(0, 0, W, H)

  // Top: Memofox branding
  ctx.save()
  ctx.font = 'bold 48px Syne, sans-serif'
  ctx.fillStyle = '#C6FF00'
  ctx.fillText('Memo', 72, 90)
  ctx.fillStyle = '#EFF1F5'
  ctx.fillText('fox', 72 + ctx.measureText('Memo').width, 90)
  ctx.restore()

  // Progress dots
  const dotSize = 16
  const dotGap = 12
  const totalDots = totalPhotos
  const dotsW = totalDots * dotSize + (totalDots - 1) * dotGap
  const dotsX = W / 2 - dotsW / 2
  for (let i = 0; i < totalDots; i++) {
    ctx.beginPath()
    ctx.arc(dotsX + i * (dotSize + dotGap) + dotSize / 2, 130, dotSize / 2, 0, Math.PI * 2)
    ctx.fillStyle = i === photoIndex ? '#C6FF00' : 'rgba(255,255,255,0.25)'
    ctx.fill()
  }

  // Bottom content
  const bottomY = H - 320

  // Player name chip
  ctx.save()
  ctx.font = 'bold 36px Syne, sans-serif'
  const nameW = ctx.measureText(playerName).width
  const chipPad = 24
  const chipH = 64
  const chipW = nameW + chipPad * 2
  const chipX = 72

  ctx.fillStyle = 'rgba(198,255,0,0.15)'
  drawRoundRect(ctx, chipX, bottomY, chipW, chipH, chipH / 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(198,255,0,0.4)'
  ctx.lineWidth = 2
  drawRoundRect(ctx, chipX, bottomY, chipW, chipH, chipH / 2)
  ctx.stroke()

  ctx.fillStyle = '#C6FF00'
  ctx.fillText(playerName, chipX + chipPad, bottomY + chipH * 0.67)
  ctx.restore()

  // Task text
  ctx.save()
  ctx.font = '500 52px DM Sans, sans-serif'
  ctx.fillStyle = '#EFF1F5'

  // Word wrap
  const maxW = W - 144
  const words = task.split(' ')
  let lines = []
  let currentLine = ''

  words.forEach(word => {
    const test = currentLine ? currentLine + ' ' + word : word
    if (ctx.measureText(test).width > maxW && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = test
    }
  })
  if (currentLine) lines.push(currentLine)
  lines = lines.slice(0, 3) // max 3 lines

  lines.forEach((line, i) => {
    ctx.fillText(line, 72, bottomY + chipH + 72 + i * 68)
  })
  ctx.restore()

  // Photo counter
  ctx.save()
  ctx.font = 'bold 36px Syne, sans-serif'
  ctx.fillStyle = 'rgba(239,241,245,0.4)'
  ctx.textAlign = 'right'
  ctx.fillText(`${photoIndex + 1} / ${totalPhotos}`, W - 72, 90)
  ctx.restore()
}

function drawOutro(ctx, progress, sessionInfo, lang) {
  const W = REEL_W, H = REEL_H

  // Black background
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)

  // Subtle lime glow
  const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7)
  glow.addColorStop(0, 'rgba(198,255,0,0.08)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // Animate in
  const logoScale = progress < 0.3 ? progress / 0.3 : 1
  const textAlpha = progress < 0.4 ? 0 : Math.min(1, (progress - 0.4) / 0.3)
  const subAlpha = progress < 0.6 ? 0 : Math.min(1, (progress - 0.6) / 0.3)

  ctx.save()
  ctx.translate(W / 2, H / 2 - 120)
  ctx.scale(logoScale, logoScale)

  // Fox emoji as placeholder (in real canvas we'd draw the SVG)
  ctx.font = `${240}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🦊', 0, 0)

  ctx.restore()

  // Memofox wordmark
  ctx.save()
  ctx.globalAlpha = textAlpha
  ctx.textAlign = 'center'
  ctx.font = 'bold 120px Syne, sans-serif'
  ctx.fillStyle = '#C6FF00'
  ctx.fillText('Memo', W / 2 - 120, H / 2 + 160)
  ctx.fillStyle = '#EFF1F5'
  ctx.fillText('fox', W / 2 + 120, H / 2 + 160)
  ctx.restore()

  // Tagline
  ctx.save()
  ctx.globalAlpha = subAlpha
  ctx.textAlign = 'center'
  ctx.font = '400 56px DM Sans, sans-serif'
  ctx.fillStyle = 'rgba(239,241,245,0.5)'
  ctx.fillText(lang === 'de' ? 'Make memories. Prove it happened.' : 'Make memories. Prove it happened.', W / 2, H / 2 + 280)
  ctx.restore()

  // Session info bottom
  ctx.save()
  ctx.globalAlpha = subAlpha * 0.7
  ctx.textAlign = 'center'
  ctx.font = 'bold 44px Syne, sans-serif'
  ctx.fillStyle = 'rgba(239,241,245,0.3)'
  ctx.fillText('memofox.app', W / 2, H - 180)
  ctx.restore()

  // Bottom lime line
  ctx.save()
  ctx.globalAlpha = textAlpha
  const lineW = 200 * progress
  ctx.strokeStyle = '#C6FF00'
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(W / 2 - lineW / 2, H / 2 + 220)
  ctx.lineTo(W / 2 + lineW / 2, H / 2 + 220)
  ctx.stroke()
  ctx.restore()
}

export default function ReelGenerator({ completions, sessionInfo, lang = 'de', onClose }) {
  const [status, setStatus] = useState('idle') // idle | loading | recording | done | error
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(null)
  const canvasRef = useRef()
  const animFrameRef = useRef()

  const photosOnly = completions.filter(c => c.photo_url).slice(0, 12) // max 12 photos

  const generateReel = async () => {
    if (photosOnly.length === 0) return
    setStatus('loading')
    setProgress(0)

    try {
      // Load all images
      const images = []
      for (let i = 0; i < photosOnly.length; i++) {
        try {
          const img = await loadImage(photosOnly[i].photo_url)
          images.push(img)
        } catch (e) {
          images.push(null)
        }
        setProgress((i + 1) / photosOnly.length * 30)
      }

      const canvas = canvasRef.current
      canvas.width = REEL_W
      canvas.height = REEL_H
      const ctx = canvas.getContext('2d')

      // Setup MediaRecorder
      const stream = canvas.captureStream(FPS)
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm')
        ? 'video/webm'
        : 'video/webm'

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 })
      const chunks = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType })
        const url = URL.createObjectURL(blob)
        setVideoUrl(url)
        setStatus('done')
        setProgress(100)
      }

      recorder.start(100)
      setStatus('recording')

      // Animation loop
      const totalFrames = Math.ceil(
        (photosOnly.length * (PHOTO_DURATION + TRANSITION_DURATION) + OUTRO_DURATION) * FPS
      )
      const framesPerPhoto = Math.ceil(PHOTO_DURATION * FPS)
      const framesTransition = Math.ceil(TRANSITION_DURATION * FPS)
      const framesOutro = Math.ceil(OUTRO_DURATION * FPS)
      const framesContent = photosOnly.length * (framesPerPhoto + framesTransition)

      let frame = 0

      const tick = () => {
        if (frame >= totalFrames) {
          recorder.stop()
          return
        }

        if (frame < framesContent) {
          // Photo frames
          const photoTotal = framesPerPhoto + framesTransition
          const photoIdx = Math.min(Math.floor(frame / photoTotal), photosOnly.length - 1)
          const frameInPhoto = frame % photoTotal

          const inTransition = frameInPhoto >= framesPerPhoto
          const progress = inTransition ? 1 : frameInPhoto / framesPerPhoto
          const transitionProgress = inTransition
            ? (frameInPhoto - framesPerPhoto) / framesTransition
            : 0

          const photo = images[photoIdx]
          const nextPhoto = images[photoIdx + 1] || null
          const task = photosOnly[photoIdx]

          drawFrame(
            ctx,
            photo,
            nextPhoto,
            progress,
            task?.text || '',
            task?.claimed_by_nickname || 'Anonym',
            photoIdx,
            photosOnly.length,
            transitionProgress,
            lang
          )
        } else {
          // Outro
          const outroFrame = frame - framesContent
          const outroProgress = outroFrame / framesOutro
          drawOutro(ctx, Math.min(outroProgress, 1), sessionInfo, lang)
        }

        frame++
        setProgress(30 + (frame / totalFrames) * 70)
        animFrameRef.current = requestAnimationFrame(tick)
      }

      animFrameRef.current = requestAnimationFrame(tick)

    } catch (err) {
      console.error('Reel error:', err)
      setStatus('error')
    }
  }

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [])

  const download = () => {
    const a = document.createElement('a')
    a.href = videoUrl
    a.download = 'memofox-reel.webm'
    a.click()
  }

  const share = async () => {
    if (!videoUrl) return
    try {
      const resp = await fetch(videoUrl)
      const blob = await resp.blob()
      const file = new File([blob], 'memofox-reel.webm', { type: blob.type })
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Memofox Reel 🦊' })
      } else {
        download()
      }
    } catch (e) {
      download()
    }
  }

  const S = `
    .reel-bg{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:ov .3s ease}
    @keyframes ov{from{opacity:0}to{opacity:1}}
    .reel-box{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 48px;animation:shu .35s cubic-bezier(.16,1,.3,1)}
    @keyframes shu{from{transform:translateY(100%)}to{transform:translateY(0)}}
    .reel-prog{height:6px;background:#1E2128;border-radius:100px;overflow:hidden;margin:16px 0}
    .reel-prog-fill{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .3s ease}
    .reel-preview{width:100%;aspect-ratio:9/16;background:#07080A;border-radius:16px;overflow:hidden;margin:16px 0}
    .reel-preview video{width:100%;height:100%;object-fit:cover}
    .reel-preview canvas{width:100%;height:100%;object-fit:cover}
    .btn-r{width:100%;padding:16px;border-radius:20px;font-family:'Syne',sans-serif;font-weight:700;font-size:15px;cursor:pointer;border:none;transition:all .2s;margin-bottom:10px}
    .btn-rp{background:#C6FF00;color:#07080A}.btn-rp:hover{transform:translateY(-2px)}
    .btn-rs{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.13)}.btn-rs:hover{background:#16191F}
  `

  return (
    <div className="reel-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{S}</style>
      <div className="reel-box">
        <div style={{ width: 36, height: 4, background: '#1E2128', borderRadius: 100, margin: '16px auto 24px' }} />

        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
          {lang === 'de' ? '🎬 Euer Reel erstellen' : '🎬 Create your Reel'}
        </div>
        <p style={{ color: 'rgba(239,241,245,.4)', fontSize: 13, marginBottom: 16 }}>
          {photosOnly.length} {lang === 'de' ? 'Fotos' : 'photos'} · ~{Math.ceil(photosOnly.length * (PHOTO_DURATION + TRANSITION_DURATION) + OUTRO_DURATION)}s · {lang === 'de' ? 'mit Memofox Branding' : 'with Memofox branding'}
        </p>

        {/* Canvas (hidden during recording, shown as preview) */}
        <div className="reel-preview" style={{ display: status === 'idle' ? 'none' : 'block' }}>
          {status === 'done' && videoUrl ? (
            <video src={videoUrl} controls autoPlay loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>

        {/* Hidden canvas always mounted for recording */}
        {status === 'idle' && <canvas ref={canvasRef} style={{ display: 'none' }} />}

        {/* Progress */}
        {(status === 'loading' || status === 'recording') && (
          <>
            <div className="reel-prog">
              <div className="reel-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <p style={{ color: 'rgba(239,241,245,.5)', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
              {status === 'loading'
                ? (lang === 'de' ? `Fotos laden… ${Math.round(progress)}%` : `Loading photos… ${Math.round(progress)}%`)
                : (lang === 'de' ? `Reel wird gerendert… ${Math.round(progress)}%` : `Rendering reel… ${Math.round(progress)}%`)
              }
            </p>
          </>
        )}

        {/* No photos */}
        {photosOnly.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(239,241,245,.4)', fontSize: 14, marginBottom: 16 }}>
            {lang === 'de' ? 'Keine Fotos vorhanden für das Reel.' : 'No photos available for the reel.'}
          </div>
        )}

        {/* Actions */}
        {status === 'idle' && photosOnly.length > 0 && (
          <button className="btn-r btn-rp" onClick={generateReel}>
            🎬 {lang === 'de' ? 'Reel generieren' : 'Generate Reel'}
          </button>
        )}

        {status === 'done' && (
          <>
            <button className="btn-r btn-rp" onClick={share}>
              📤 {lang === 'de' ? 'Reel teilen / speichern' : 'Share / Save Reel'}
            </button>
            <button className="btn-r btn-rs" onClick={() => { setStatus('idle'); setVideoUrl(null); setProgress(0) }}>
              {lang === 'de' ? 'Neu erstellen' : 'Regenerate'}
            </button>
          </>
        )}

        {status === 'error' && (
          <div style={{ color: '#FF4040', fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
            {lang === 'de' ? 'Fehler beim Erstellen. Bitte erneut versuchen.' : 'Error creating reel. Please try again.'}
          </div>
        )}

        <button className="btn-r btn-rs" onClick={onClose} style={{ marginTop: status === 'idle' ? 0 : 4 }}>
          {lang === 'de' ? 'Schließen' : 'Close'}
        </button>
      </div>
    </div>
  )
}
