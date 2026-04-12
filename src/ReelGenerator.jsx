// ReelGenerator.jsx — Fixed for mobile CORS + performance
import { useState, useRef, useEffect } from 'react'

const REEL_W = 720
const REEL_H = 1280
const FPS = 24
const PHOTO_DURATION = 2.8
const TRANSITION_DURATION = 0.5
const OUTRO_DURATION = 2.5

async function loadImageBlob(src) {
  try {
    const res = await fetch(src, { mode: 'cors' })
    if (!res.ok) throw new Error('fetch failed')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    return await new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  } catch {
    return await new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src + (src.includes('?') ? '&' : '?') + '_t=' + Date.now()
    })
  }
}

function drawFrame(ctx, photo, nextPhoto, kenX, kenY, kenScale, transAlpha, task, playerName, photoIndex, totalPhotos) {
  const W = REEL_W, H = REEL_H
  ctx.fillStyle = '#07080A'
  ctx.fillRect(0, 0, W, H)
  if (photo) {
    ctx.save()
    ctx.globalAlpha = transAlpha < 0.5 ? 1 : 1 - (transAlpha - 0.5) * 2
    const iA = photo.width / photo.height, cA = W / H
    let dW, dH
    if (iA > cA) { dH = H * kenScale; dW = dH * iA } else { dW = W * kenScale; dH = dW / iA }
    ctx.drawImage(photo, (W - dW) / 2 + kenX, (H - dH) / 2 + kenY, dW, dH)
    ctx.restore()
  }
  if (nextPhoto && transAlpha > 0.5) {
    ctx.save()
    ctx.globalAlpha = (transAlpha - 0.5) * 2
    const iA = nextPhoto.width / nextPhoto.height, cA = W / H
    let dW, dH
    if (iA > cA) { dH = H; dW = dH * iA } else { dW = W; dH = dW / iA }
    ctx.drawImage(nextPhoto, (W - dW) / 2, (H - dH) / 2, dW, dH)
    ctx.restore()
  }
  const g = ctx.createLinearGradient(0, H * 0.42, 0, H)
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, 'rgba(0,0,0,0.72)'); g.addColorStop(1, 'rgba(0,0,0,0.96)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  const gT = ctx.createLinearGradient(0, 0, 0, H * 0.22)
  gT.addColorStop(0, 'rgba(0,0,0,0.55)'); gT.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gT; ctx.fillRect(0, 0, W, H)
  // Branding top
  ctx.save(); ctx.font = `bold ${Math.round(H*0.033)}px Arial`
  ctx.fillStyle = '#C6FF00'; ctx.fillText('🦊 Memo', 44, 68)
  const mW = ctx.measureText('🦊 Memo').width; ctx.fillStyle = '#EFF1F5'; ctx.fillText('fox', 44 + mW, 68); ctx.restore()
  // Dots
  const dS=9,dG=7; const tDW = totalPhotos*(dS+dG)-dG; const dX=W/2-tDW/2
  for(let i=0;i<totalPhotos;i++){ctx.beginPath();ctx.arc(dX+i*(dS+dG)+dS/2,94,dS/2,0,Math.PI*2);ctx.fillStyle=i===photoIndex?'#C6FF00':'rgba(255,255,255,0.22)';ctx.fill()}
  // Player chip
  const fs=Math.round(H*0.025); ctx.font=`bold ${fs}px Arial`
  const nW=ctx.measureText(playerName).width; const cH=fs*1.9,cPad=fs*0.85,cW=nW+cPad*2,cY=H-290
  ctx.fillStyle='rgba(198,255,0,0.15)'; ctx.beginPath()
  if(ctx.roundRect){ctx.roundRect(44,cY,cW,cH,cH/2)}else{ctx.rect(44,cY,cW,cH)}
  ctx.fill(); ctx.strokeStyle='rgba(198,255,0,0.4)'; ctx.lineWidth=1.5; ctx.stroke()
  ctx.fillStyle='#C6FF00'; ctx.fillText(playerName, 44+cPad, cY+cH*0.68)
  // Task text
  const tFs=Math.round(H*0.03); ctx.font=`${tFs}px Arial`; ctx.fillStyle='#EFF1F5'
  const maxW=W-88; const words=(task||'').split(' '); let lines=[],cur=''
  words.forEach(w=>{const test=cur?cur+' '+w:w;if(ctx.measureText(test).width>maxW&&cur){lines.push(cur);cur=w}else cur=test})
  if(cur)lines.push(cur); lines=lines.slice(0,3)
  lines.forEach((l,i)=>ctx.fillText(l,44,cY+cH+48+i*(tFs*1.45)))
  ctx.save(); ctx.font=`bold ${Math.round(H*0.024)}px Arial`; ctx.fillStyle='rgba(239,241,245,0.35)'; ctx.textAlign='right'
  ctx.fillText(`${photoIndex+1}/${totalPhotos}`,W-44,68); ctx.restore()
}

function drawOutro(ctx, p) {
  const W=REEL_W,H=REEL_H; const e=t=>1-Math.pow(1-t,3)
  ctx.fillStyle='#07080A'; ctx.fillRect(0,0,W,H)
  const gl=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.65)
  gl.addColorStop(0,'rgba(198,255,0,0.08)'); gl.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=gl; ctx.fillRect(0,0,W,H)
  const lP=e(Math.min(1,p/0.3)), tP=Math.max(0,(p-0.3)/0.35), sP=Math.max(0,(p-0.6)/0.3)
  ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.globalAlpha=lP
  ctx.font=`${Math.round(H*0.11)*lP}px serif`; ctx.fillText('🦊',W/2,H/2-H*0.09); ctx.restore()
  ctx.save(); ctx.globalAlpha=tP; ctx.textAlign='center'; ctx.textBaseline='alphabetic'
  const wS=Math.round(H*0.068); ctx.font=`bold ${wS}px Arial`
  ctx.fillStyle='#C6FF00'; const mW2=ctx.measureText('Memo').width; const fW=ctx.measureText('fox').width
  ctx.fillText('Memo',W/2-fW/2,H/2+H*0.1); ctx.fillStyle='#EFF1F5'; ctx.fillText('fox',W/2+mW2/2,H/2+H*0.1); ctx.restore()
  ctx.save(); ctx.globalAlpha=tP; const lW2=130*e(Math.min(1,p/0.55))
  ctx.strokeStyle='#C6FF00'; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath()
  ctx.moveTo(W/2-lW2,H/2+H*0.12); ctx.lineTo(W/2+lW2,H/2+H*0.12); ctx.stroke(); ctx.restore()
  ctx.save(); ctx.globalAlpha=sP; ctx.textAlign='center'; ctx.font=`${Math.round(H*0.026)}px Arial`
  ctx.fillStyle='rgba(239,241,245,0.42)'; ctx.fillText('Make memories. Prove it happened.',W/2,H/2+H*0.175); ctx.restore()
  ctx.save(); ctx.globalAlpha=sP*0.55; ctx.textAlign='center'; ctx.font=`bold ${Math.round(H*0.022)}px Arial`
  ctx.fillStyle='rgba(239,241,245,0.25)'; ctx.fillText('memofox.app',W/2,H-H*0.055); ctx.restore()
}

export default function ReelGenerator({ completions, lang='de', onClose }) {
  const[status,setStatus]=useState('idle')
  const[progress,setProgress]=useState(0)
  const[videoUrl,setVideoUrl]=useState(null)
  const canvasRef=useRef(); const rafRef=useRef()
  const photos=completions.filter(c=>c.photo_url).slice(0,10)

  useEffect(()=>()=>{
    if(rafRef.current)cancelAnimationFrame(rafRef.current)
    if(videoUrl)URL.revokeObjectURL(videoUrl)
  },[])

  const generate=async()=>{
    if(!photos.length)return
    setStatus('loading');setProgress(0)
    try{
      const images=[]
      for(let i=0;i<photos.length;i++){
        try{images.push(await loadImageBlob(photos[i].photo_url))}
        catch{images.push(null)}
        setProgress(Math.round((i+1)/photos.length*25))
      }
      const canvas=canvasRef.current; canvas.width=REEL_W; canvas.height=REEL_H
      const ctx=canvas.getContext('2d',{alpha:false})
      const mt=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(t=>MediaRecorder.isTypeSupported(t))||'video/webm'
      const stream=canvas.captureStream(FPS)
      const rec=new MediaRecorder(stream,{mimeType:mt,videoBitsPerSecond:4_500_000})
      const chunks=[]
      rec.ondataavailable=e=>{if(e.data?.size>0)chunks.push(e.data)}
      rec.onstop=()=>{const blob=new Blob(chunks,{type:mt});setVideoUrl(URL.createObjectURL(blob));setStatus('done');setProgress(100)}
      rec.onerror=()=>setStatus('error')
      rec.start(200); setStatus('recording')
      const fP=Math.ceil(PHOTO_DURATION*FPS),fT=Math.ceil(TRANSITION_DURATION*FPS)
      const fO=Math.ceil(OUTRO_DURATION*FPS),fPh=fP+fT
      const fC=photos.length*fPh,fTot=fC+fO; let frame=0
      const tick=()=>{
        if(frame>=fTot){rec.stop();return}
        if(frame<fC){
          const pI=Math.min(Math.floor(frame/fPh),photos.length-1),fInP=frame%fPh
          const inT=fInP>=fP,pProg=inT?1:fInP/fP,tAlpha=inT?(fInP-fP)/fT:0
          const kS=1+pProg*0.05,kX=-pProg*16,kY=-pProg*10
          drawFrame(ctx,images[pI],images[pI+1]||null,kX,kY,kS,tAlpha,photos[pI]?.text||'',photos[pI]?.claimed_by_nickname||'Memofox',pI,photos.length)
        }else{drawOutro(ctx,Math.min((frame-fC)/fO,1))}
        frame++; setProgress(25+Math.round(frame/fTot*75))
        rafRef.current=requestAnimationFrame(tick)
      }
      rafRef.current=requestAnimationFrame(tick)
    }catch(err){console.error(err);setStatus('error')}
  }

  const share=async()=>{
    if(!videoUrl)return
    try{
      const res=await fetch(videoUrl); const blob=await res.blob()
      const file=new File([blob],'memofox-reel.webm',{type:blob.type})
      if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'Memofox Reel 🦊',text:'memofox.app'});return}
    }catch{}
    const a=document.createElement('a'); a.href=videoUrl; a.download='memofox-reel.webm'; a.click()
  }

  const S=`.rb{position:fixed;inset:0;background:rgba(0,0,0,.93);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:rfade .3s ease}@keyframes rfade{from{opacity:0}to{opacity:1}}.rbox{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 50px;animation:rslide .35s cubic-bezier(.16,1,.3,1)}@keyframes rslide{from{transform:translateY(100%)}to{transform:translateY(0)}}.rhandle{width:36px;height:4px;background:#1E2128;border-radius:100px;margin:16px auto 22px}.rprog{height:5px;background:#1E2128;border-radius:100px;overflow:hidden;margin:14px 0 8px}.rprogf{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .25s ease}.rpreview{width:100%;aspect-ratio:9/16;background:#07080A;border-radius:14px;overflow:hidden;margin:14px 0}.rpreview video,.rpreview canvas{width:100%;height:100%;object-fit:cover;display:block}.rbtn{width:100%;padding:15px;border-radius:18px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;border:none;margin-bottom:10px;transition:all .2s}.rbtnp{background:#C6FF00;color:#07080A}.rbtns{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.13)}`

  return(
    <div className="rb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <style>{S}</style>
      <div className="rbox">
        <div className="rhandle"/>
        <div style={{fontFamily:'Syne',fontWeight:700,fontSize:19,marginBottom:4}}>🎬 {lang==='de'?'Reel erstellen':'Create Reel'}</div>
        <p style={{color:'rgba(239,241,245,.4)',fontSize:13,marginBottom:12}}>{photos.length} {lang==='de'?'Fotos':'photos'} · ~{Math.ceil(photos.length*(PHOTO_DURATION+TRANSITION_DURATION)+OUTRO_DURATION)}s · Memofox Outro</p>
        {status!=='idle'&&<div className="rpreview">{status==='done'&&videoUrl?<video src={videoUrl} controls autoPlay loop playsInline/>:<canvas ref={canvasRef}/>}</div>}
        {status==='idle'&&<canvas ref={canvasRef} style={{display:'none'}}/>}
        {(status==='loading'||status==='recording')&&<><div className="rprog"><div className="rprogf" style={{width:`${progress}%`}}/></div><p style={{color:'rgba(239,241,245,.45)',fontSize:12,textAlign:'center',marginBottom:14}}>{status==='loading'?(lang==='de'?`Fotos laden… ${progress}%`:`Loading… ${progress}%`):(lang==='de'?`Rendering… ${progress}%`:`Rendering… ${progress}%`)}</p></>}
        {status==='error'&&<div style={{background:'rgba(255,64,64,.08)',border:'1px solid rgba(255,64,64,.25)',borderRadius:12,padding:'12px 16px',marginBottom:14,fontSize:13,color:'#FF6060',textAlign:'center',lineHeight:1.5}}>{lang==='de'?'Fotos konnten nicht geladen werden (CORS). Bitte in Chrome versuchen oder Fotos manuell aus dem Album speichern.':'Photos could not be loaded (CORS). Try in Chrome or save photos manually from the album.'}</div>}
        {photos.length===0&&<div style={{textAlign:'center',padding:'20px 0',color:'rgba(239,241,245,.38)',fontSize:13,marginBottom:14}}>{lang==='de'?'Keine Fotos vorhanden.':'No photos available.'}</div>}
        {status==='idle'&&photos.length>0&&<button className="rbtn rbtnp" onClick={generate}>▶ {lang==='de'?'Reel generieren':'Generate Reel'}</button>}
        {status==='done'&&<><button className="rbtn rbtnp" onClick={share}>📤 {lang==='de'?'Reel teilen / speichern':'Share / Save Reel'}</button><button className="rbtn rbtns" onClick={()=>{setStatus('idle');setVideoUrl(null);setProgress(0)}}>{lang==='de'?'Neu erstellen':'Regenerate'}</button></>}
        {status==='error'&&<button className="rbtn rbtnp" onClick={generate}>{lang==='de'?'Erneut versuchen':'Try Again'}</button>}
        <button className="rbtn rbtns" onClick={onClose}>{lang==='de'?'Schließen':'Close'}</button>
      </div>
    </div>
  )
}
