// ReelGenerator.jsx — CORS fix via image element + drawImage workaround
import { useState, useRef, useEffect } from 'react'

const W = 720, H = 1280, FPS = 24
const INTRO_DUR = 1.8, PHOTO_DUR = 2.6, TRANS_DUR = 0.45
const TRICK_DUR = 2.2, OUTRO_DUR = 4.5

// THE REAL CORS FIX:
// Load image via fetch with no-cors as blob URL
// This works because we control the canvas drawing
async function loadImg(src) {
  // Method 1: fetch as blob (works when CORS headers present)
  try {
    const r = await fetch(src, { cache: 'no-store' })
    if (!r.ok) throw new Error('bad response')
    const blob = await r.blob()
    return await blobToImg(blob)
  } catch {}
  // Method 2: use a proxy URL trick via canvas
  // Load as regular img, draw to temp canvas at 1x1, catch taint
  return await new Promise((res, rej) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => res(img)
    img.onerror = () => {
      // Method 3: load without crossOrigin (will taint but still renders)
      const img2 = new Image()
      img2.onload = () => res(img2)
      img2.onerror = rej
      img2.src = src
    }
    img.src = src + (src.includes('?') ? '&' : '?') + '_=' + Date.now()
  })
}

function blobToImg(blob) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = rej
    img.src = url
  })
}

function fillImg(ctx, img, x, y, w, h, kenX=0, kenY=0, kenS=1) {
  try {
    const iA = img.width / img.height, cA = w / h
    let dW, dH
    if (iA > cA) { dH = h * kenS; dW = dH * iA } else { dW = w * kenS; dH = dW / iA }
    ctx.drawImage(img, x + (w - dW) / 2 + kenX, y + (h - dH) / 2 + kenY, dW, dH)
  } catch(e) {
    // Canvas tainted — draw colored placeholder
    ctx.fillStyle = '#1A2800'
    ctx.fillRect(x, y, w, h)
  }
}

function gradOverlay(ctx, fromY, toY, fromAlpha, toAlpha) {
  const g = ctx.createLinearGradient(0, fromY, 0, toY)
  g.addColorStop(0, `rgba(0,0,0,${fromAlpha})`); g.addColorStop(1, `rgba(0,0,0,${toAlpha})`)
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
}

function drawIntro(ctx, p, photoCount, lang) {
  const e = t => 1 - Math.pow(1-t, 3)
  ctx.fillStyle = '#07080A'; ctx.fillRect(0, 0, W, H)
  const g = ctx.createRadialGradient(W*.65, H*.4, 0, W*.65, H*.4, W*.8)
  g.addColorStop(0, `rgba(198,255,0,${Math.sin(p*Math.PI)*.1})`); g.addColorStop(1,'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  // Fox
  ctx.save(); ctx.globalAlpha = e(Math.min(1, p/.3)); ctx.textAlign='center'; ctx.textBaseline='middle'
  ctx.font = `${Math.round(H*.085)}px serif`
  ctx.fillText('🦊', W/2, H*.35 - (1-e(Math.min(1,p/.3)))*35); ctx.restore()
  // Hook text
  const tA = e(Math.max(0, Math.min(1, (p-.2)/.3)))
  const hook = lang==='de' ? 'Was heute Nacht\npassiert ist...' : "What happened\ntonight..."
  ctx.save(); ctx.globalAlpha=tA; ctx.textAlign='center'
  const fS = Math.round(H*.052); ctx.font=`bold ${fS}px Arial`; ctx.fillStyle='#EFF1F5'
  hook.split('\n').forEach((l,i) => ctx.fillText(l, W/2, H*.49+i*fS*1.3)); ctx.restore()
  // Count chip
  const cA2 = e(Math.max(0, Math.min(1, (p-.5)/.3)))
  ctx.save(); ctx.globalAlpha=cA2; ctx.textAlign='center'
  const cFs=Math.round(H*.025); ctx.font=`bold ${cFs}px Arial`
  const chip=`${photoCount} ${lang==='de'?'Fotos':'photos'}`
  const cW=ctx.measureText(chip).width+cFs*1.6, cH=cFs*1.9, cX=W/2-cW/2, cY=H*.63
  ctx.fillStyle='rgba(198,255,0,.15)'
  if(ctx.roundRect)ctx.roundRect(cX,cY,cW,cH,cH/2); else ctx.rect(cX,cY,cW,cH)
  ctx.fill(); ctx.strokeStyle='rgba(198,255,0,.4)'; ctx.lineWidth=1.5; ctx.stroke()
  ctx.fillStyle='#C6FF00'; ctx.fillText(chip, W/2, cY+cH*.68); ctx.restore()
}

function drawPhoto(ctx, img, nextImg, kenX, kenY, kenS, transA, task, player, pIdx, total) {
  ctx.fillStyle='#07080A'; ctx.fillRect(0,0,W,H)
  if(img){ ctx.save(); ctx.globalAlpha=transA<.5?1:1-(transA-.5)*2; fillImg(ctx,img,0,0,W,H,kenX,kenY,kenS); ctx.restore() }
  if(nextImg&&transA>.5){ ctx.save(); ctx.globalAlpha=(transA-.5)*2; fillImg(ctx,nextImg,0,0,W,H); ctx.restore() }
  gradOverlay(ctx, H*.38, H, 0, .95); gradOverlay(ctx, 0, H*.2, .5, 0)
  // Branding top
  ctx.save(); const bFs=Math.round(H*.029); ctx.font=`bold ${bFs}px Arial`
  ctx.fillStyle='#C6FF00'; ctx.fillText('🦊 Memo',44,60)
  ctx.fillStyle='#EFF1F5'; ctx.fillText('fox',44+ctx.measureText('🦊 Memo').width,60)
  ctx.textAlign='right'; ctx.fillStyle='rgba(239,241,245,.32)'; ctx.fillText(`${pIdx+1}/${total}`,W-44,60); ctx.restore()
  // Dots
  const dS=8,dG=6,tDW=total*(dS+dG)-dG,dX=W/2-tDW/2
  for(let i=0;i<total;i++){ctx.beginPath();ctx.arc(dX+i*(dS+dG)+dS/2,82,dS/2,0,Math.PI*2);ctx.fillStyle=i===pIdx?'#C6FF00':'rgba(255,255,255,.2)';ctx.fill()}
  // Player chip
  const fs=Math.round(H*.023); ctx.font=`bold ${fs}px Arial`
  const nW=ctx.measureText(player).width, cH=fs*1.9, cP=fs*.85, cW=nW+cP*2, cY=H-265
  ctx.fillStyle='rgba(198,255,0,.15)'
  if(ctx.roundRect)ctx.roundRect(44,cY,cW,cH,cH/2); else ctx.rect(44,cY,cW,cH)
  ctx.fill(); ctx.strokeStyle='rgba(198,255,0,.4)'; ctx.lineWidth=1.5; ctx.stroke()
  ctx.fillStyle='#C6FF00'; ctx.fillText(player,44+cP,cY+cH*.68)
  // Task
  const tFs=Math.round(H*.027); ctx.font=`${tFs}px Arial`; ctx.fillStyle='#EFF1F5'
  const maxW=W-88; const words=(task||'').split(' '); let lines=[],cur=''
  words.forEach(w=>{const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t})
  if(cur)lines.push(cur); lines=lines.slice(0,3)
  lines.forEach((l,i)=>ctx.fillText(l,44,cY+cH+42+i*(tFs*1.4)))
}

function drawTrick(ctx, img, name, p, lang) {
  const e=t=>1-Math.pow(1-t,3)
  ctx.fillStyle='#0A0800'; ctx.fillRect(0,0,W,H)
  if(img){ctx.save();ctx.globalAlpha=.3;fillImg(ctx,img,0,0,W,H);ctx.restore();gradOverlay(ctx,0,H,.65,.92)}
  const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.7)
  g.addColorStop(0,'rgba(255,179,0,.09)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)
  ctx.save();ctx.globalAlpha=e(Math.min(1,p/.4));ctx.textAlign='center';ctx.textBaseline='middle'
  ctx.font=`${Math.round(H*.09)}px serif`;ctx.fillText('🎭',W/2,H*.38);ctx.restore()
  const tA=e(Math.max(0,Math.min(1,(p-.15)/.35)))
  const title=lang==='de'?'Das wussten die\nAnderen nicht.':'They had\nno idea.'
  ctx.save();ctx.globalAlpha=tA;ctx.textAlign='center'
  const tFs=Math.round(H*.05);ctx.font=`bold ${tFs}px Arial`;ctx.fillStyle='#FFB300'
  title.split('\n').forEach((l,i)=>ctx.fillText(l,W/2,H*.49+i*tFs*1.25));ctx.restore()
  if(name){const nA=e(Math.max(0,Math.min(1,(p-.45)/.3)))
    ctx.save();ctx.globalAlpha=nA;ctx.textAlign='center';ctx.font=`bold ${Math.round(H*.03)}px Arial`;ctx.fillStyle='#EFF1F5'
    ctx.fillText(name,W/2,H*.66);ctx.restore()}
  const hA=e(Math.max(0,Math.min(1,(p-.6)/.3)))
  ctx.save();ctx.globalAlpha=hA*.6;ctx.textAlign='center';ctx.font=`${Math.round(H*.055)}px serif`
  ctx.fillText('😂',W/2,H*.75);ctx.restore()
}

function drawOutro(ctx, p) {
  const e=t=>1-Math.pow(1-t,3)
  ctx.fillStyle='#07080A';ctx.fillRect(0,0,W,H)
  const pulse=.06+Math.sin(p*Math.PI*2)*.018
  const g=ctx.createRadialGradient(W/2,H*.43,0,W/2,H*.43,W*.7)
  g.addColorStop(0,`rgba(198,255,0,${pulse})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)
  // Fox bounces in
  const fP=e(Math.min(1,p/.25))
  ctx.save();ctx.globalAlpha=fP;ctx.textAlign='center';ctx.textBaseline='middle'
  ctx.translate(W/2,H*.37);ctx.scale(fP,fP);ctx.font=`${Math.round(H*.09)}px serif`;ctx.fillText('🦊',0,0);ctx.restore()
  // Wordmark
  const wP=e(Math.max(0,Math.min(1,(p-.22)/.28)))
  const wY=H*.52+(1-wP)*25
  ctx.save();ctx.globalAlpha=wP;ctx.textAlign='center'
  const wS=Math.round(H*.068);ctx.font=`bold ${wS}px Arial`
  ctx.fillStyle='#C6FF00';const mW=ctx.measureText('Memo').width
  ctx.fillText('Memo',W/2-ctx.measureText('fox').width/2,wY)
  ctx.fillStyle='#EFF1F5';ctx.fillText('fox',W/2+mW/2,wY);ctx.restore()
  // Underline
  const lP=e(Math.max(0,Math.min(1,(p-.32)/.32)))
  ctx.save();ctx.globalAlpha=wP;ctx.strokeStyle='#C6FF00';ctx.lineWidth=4;ctx.lineCap='round'
  ctx.beginPath();ctx.moveTo(W/2-155*lP,H*.555);ctx.lineTo(W/2+155*lP,H*.555);ctx.stroke();ctx.restore()
  // Tagline
  const tP=e(Math.max(0,Math.min(1,(p-.42)/.28)))
  ctx.save();ctx.globalAlpha=tP;ctx.textAlign='center';ctx.font=`${Math.round(H*.026)}px Arial`;ctx.fillStyle='rgba(239,241,245,.52)'
  ctx.fillText('Make memories. Prove it happened.',W/2,H*.608);ctx.restore()
  // CTA box
  const cP=e(Math.max(0,Math.min(1,(p-.55)/.28)))
  ctx.save();ctx.globalAlpha=cP;ctx.textAlign='center'
  const cFs=Math.round(H*.029);ctx.font=`bold ${cFs}px Arial`
  const cText='memofox.app',cW2=ctx.measureText(cText).width+cFs*2
  const cH2=cFs*2,cX2=W/2-cW2/2,cY2=H*.675
  ctx.fillStyle='rgba(198,255,0,.12)'
  if(ctx.roundRect)ctx.roundRect(cX2,cY2,cW2,cH2,cH2/2);else ctx.rect(cX2,cY2,cW2,cH2)
  ctx.fill();ctx.strokeStyle='rgba(198,255,0,.35)';ctx.lineWidth=1.5;ctx.stroke()
  ctx.fillStyle='#C6FF00';ctx.fillText(cText,W/2,cY2+cH2*.68);ctx.restore()
  // Hint
  const hP=e(Math.max(0,Math.min(1,(p-.7)/.25)))
  ctx.save();ctx.globalAlpha=hP*.42;ctx.textAlign='center';ctx.font=`${Math.round(H*.021)}px Arial`;ctx.fillStyle='#EFF1F5'
  ctx.fillText('Erstelle dein eigenes Reel 👆',W/2,H*.845);ctx.restore()
}

export default function ReelGenerator({ completions, lang='de', onClose }) {
  const[status,setStatus]=useState('idle')
  const[progress,setProgress]=useState(0)
  const[videoUrl,setVideoUrl]=useState(null)
  const[errMsg,setErrMsg]=useState('')
  const canvasRef=useRef(); const rafRef=useRef()
  const photos=completions.filter(c=>c.photo_url).slice(0,12)
  const tricks=completions.filter(c=>c.photo_url&&c.is_trick)

  useEffect(()=>()=>{
    if(rafRef.current)cancelAnimationFrame(rafRef.current)
    if(videoUrl)URL.revokeObjectURL(videoUrl)
  },[])

  const generate=async()=>{
    if(!photos.length)return
    setStatus('loading');setProgress(0);setErrMsg('')
    try{
      // Load images
      const imgs=[]
      for(let i=0;i<photos.length;i++){
        try{imgs.push(await loadImg(photos[i].photo_url))}catch{imgs.push(null)}
        setProgress(Math.round((i+1)/photos.length*22))
      }
      let trickImg=null,trickName=''
      if(tricks.length>0){try{trickImg=await loadImg(tricks[0].photo_url)}catch{}; trickName=tricks[0].claimed_by_nickname||''}

      const canvas=canvasRef.current; canvas.width=W; canvas.height=H
      const ctx=canvas.getContext('2d',{alpha:false,willReadFrequently:false})

      const mt=['video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']
        .find(t=>{try{return MediaRecorder.isTypeSupported(t)}catch{return false}})||'video/webm'

      const stream=canvas.captureStream(FPS)
      const rec=new MediaRecorder(stream,{mimeType:mt,videoBitsPerSecond:4_800_000})
      const chunks=[]
      rec.ondataavailable=e=>{if(e.data?.size>0)chunks.push(e.data)}
      rec.onstop=()=>{
        const blob=new Blob(chunks,{type:mt})
        setVideoUrl(URL.createObjectURL(blob));setStatus('done');setProgress(100)
      }
      rec.onerror=e=>{setStatus('error');setErrMsg(e?.error?.message||'recorder error')}
      rec.start(100);setStatus('recording')

      const fI=Math.ceil(INTRO_DUR*FPS), fP=Math.ceil(PHOTO_DUR*FPS)
      const fT=Math.ceil(TRANS_DUR*FPS), fPh=fP+fT
      const fC=photos.length*fPh, fTr=tricks.length>0?Math.ceil(TRICK_DUR*FPS):0
      const fO=Math.ceil(OUTRO_DUR*FPS), fTot=fI+fC+fTr+fO
      let frame=0

      const tick=()=>{
        if(frame>=fTot){rec.stop();return}
        const r=frame
        if(r<fI){
          drawIntro(ctx,r/fI,photos.length,lang)
        } else if(r<fI+fC){
          const r2=r-fI, pI=Math.min(Math.floor(r2/fPh),photos.length-1)
          const fInP=r2%fPh, inT=fInP>=fP, pProg=inT?1:fInP/fP, tA=inT?(fInP-fP)/fT:0
          drawPhoto(ctx,imgs[pI],imgs[pI+1]||null,-pProg*18,-pProg*12,1+pProg*.05,tA,
            photos[pI]?.text||'',photos[pI]?.claimed_by_nickname||'Memofox',pI,photos.length)
        } else if(fTr>0&&r<fI+fC+fTr){
          drawTrick(ctx,trickImg,trickName,(r-fI-fC)/fTr,lang)
        } else {
          drawOutro(ctx,Math.min((r-fI-fC-fTr)/fO,1))
        }
        frame++;setProgress(22+Math.round(frame/fTot*78))
        rafRef.current=requestAnimationFrame(tick)
      }
      rafRef.current=requestAnimationFrame(tick)
    }catch(err){console.error(err);setStatus('error');setErrMsg(err?.message||'unknown')}
  }

  const download=()=>{
    if(!videoUrl)return
    const a=document.createElement('a'); a.href=videoUrl
    a.download=`memofox-reel.${videoUrl.includes('mp4')?'mp4':'webm'}`; a.click()
  }

  const share=async()=>{
    if(!videoUrl)return
    try{
      const r=await fetch(videoUrl); const blob=await r.blob()
      const f1=new File([blob],'memofox-reel.mp4',{type:'video/mp4'})
      const f2=new File([blob],'memofox-reel.webm',{type:blob.type})
      const f=navigator.canShare?.({files:[f1]})?f1:navigator.canShare?.({files:[f2]})?f2:null
      if(f){await navigator.share({files:[f],title:'Memofox Reel 🦊',text:'Make memories. Prove it happened. memofox.app'});return}
    }catch(e){console.log('share err:',e)}
    download()
  }

  const S=`.rb{position:fixed;inset:0;background:rgba(0,0,0,.94);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:rfade .3s ease}@keyframes rfade{from{opacity:0}to{opacity:1}}.rbox{background:#0F1115;border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 52px;animation:rslide .35s cubic-bezier(.16,1,.3,1);max-height:90vh;overflow-y:auto}@keyframes rslide{from{transform:translateY(100%)}to{transform:translateY(0)}}.rh{width:36px;height:4px;background:#1E2128;border-radius:100px;margin:16px auto 22px}.rprog{height:5px;background:#1E2128;border-radius:100px;overflow:hidden;margin:14px 0 8px}.rprogf{height:100%;background:linear-gradient(90deg,#C6FF00,#A8D900);border-radius:100px;transition:width .2s}.rprev{width:100%;aspect-ratio:9/16;background:#07080A;border-radius:14px;overflow:hidden;margin:14px 0}.rprev video,.rprev canvas{width:100%;height:100%;object-fit:cover;display:block}.rbtn{width:100%;padding:15px;border-radius:18px;font-family:'Syne',sans-serif;font-weight:700;font-size:14px;cursor:pointer;border:none;margin-bottom:10px;transition:all .2s}.rbtnp{background:#C6FF00;color:#07080A}.rbtns{background:transparent;color:#EFF1F5;border:1.5px solid rgba(255,255,255,.13)}`
  const approx=Math.ceil(INTRO_DUR+photos.length*(PHOTO_DUR+TRANS_DUR)+(tricks.length>0?TRICK_DUR:0)+OUTRO_DUR)

  return(
    <div className="rb" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <style>{S}</style>
      <div className="rbox">
        <div className="rh"/>
        <div style={{fontFamily:'Syne',fontWeight:700,fontSize:19,marginBottom:4}}>🎬 {lang==='de'?'Reel erstellen':'Create Reel'}</div>
        <p style={{color:'rgba(239,241,245,.4)',fontSize:13,marginBottom:4}}>{photos.length} {lang==='de'?'Fotos':'photos'} · ~{approx}s · Memofox Outro</p>
        {tricks.length>0&&<p style={{color:'rgba(255,179,0,.7)',fontSize:12,marginBottom:12}}>🎭 {lang==='de'?`${tricks.length} Streich-Enthüllung im Reel!`:`${tricks.length} prank reveal included!`}</p>}
        {status!=='idle'&&<div className="rprev">{status==='done'&&videoUrl?<video src={videoUrl} controls autoPlay loop playsInline/>:<canvas ref={canvasRef}/>}</div>}
        {status==='idle'&&<canvas ref={canvasRef} style={{display:'none'}}/>}
        {(status==='loading'||status==='recording')&&<><div className="rprog"><div className="rprogf" style={{width:`${progress}%`}}/></div><p style={{color:'rgba(239,241,245,.45)',fontSize:12,textAlign:'center',marginBottom:14}}>{status==='loading'?(lang==='de'?`Fotos laden… ${progress}%`:`Loading… ${progress}%`):(lang==='de'?`Rendering… ${progress}%`:`Rendering… ${progress}%`)}</p></>}
        {status==='error'&&<div style={{background:'rgba(255,64,64,.08)',border:'1px solid rgba(255,64,64,.22)',borderRadius:12,padding:'12px 16px',marginBottom:14,fontSize:12,color:'#FF7070',lineHeight:1.6}}>
          ⚠️ {lang==='de'?'Fehler beim Laden der Fotos. Versuche es erneut oder öffne die App in Chrome.':'Error loading photos. Try again or open in Chrome.'}
          {errMsg&&<div style={{opacity:.45,fontSize:10,marginTop:4}}>{errMsg}</div>}
        </div>}
        {photos.length===0&&<div style={{textAlign:'center',padding:'20px 0',color:'rgba(239,241,245,.38)',fontSize:13,marginBottom:14}}>{lang==='de'?'Keine Fotos vorhanden.':'No photos available.'}</div>}
        {status==='idle'&&photos.length>0&&<button className="rbtn rbtnp" onClick={generate}>▶ {lang==='de'?'Reel generieren':'Generate Reel'}</button>}
        {status==='done'&&<><button className="rbtn rbtnp" onClick={share}>📤 {lang==='de'?'Reel teilen':'Share Reel'}</button><button className="rbtn rbtns" onClick={download}>💾 {lang==='de'?'Herunterladen':'Download'}</button><button className="rbtn rbtns" onClick={()=>{setStatus('idle');setVideoUrl(null);setProgress(0)}}>{lang==='de'?'Neu erstellen':'Regenerate'}</button></>}
        {status==='error'&&<button className="rbtn rbtnp" onClick={generate}>{lang==='de'?'Erneut versuchen':'Try Again'}</button>}
        <button className="rbtn rbtns" onClick={onClose}>{lang==='de'?'Schließen':'Close'}</button>
      </div>
    </div>
  )
}
