import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase, generateCode, randomColor, avatarLetter } from './supabase'
import { OCCASIONS, VIBES, COUNTS, FLASH_CHALLENGES, QUOTES, buildTaskList } from './data'

/* ─── STYLES ─────────────────────────────────────────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07080A;--s1:#0F1115;--s2:#16191F;--s3:#1E2128;
  --bdr:rgba(255,255,255,0.07);--bdr2:rgba(255,255,255,0.13);
  --lime:#C6FF00;--ld:rgba(198,255,0,0.09);--lg:rgba(198,255,0,0.2);
  --gold:#FFB300;--gd:rgba(255,179,0,0.1);
  --red:#FF4040;--rd:rgba(255,64,64,0.1);
  --cyan:#00CFFF;--cd:rgba(0,207,255,0.09);
  --white:#EFF1F5;--muted:rgba(239,241,245,0.38);
  --r:20px;--rs:13px;--rxs:8px;
}
html,body,#root{height:100%;background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;overscroll-behavior:none}
.app{max-width:430px;margin:0 auto;min-height:100vh;position:relative;background:var(--bg)}
::-webkit-scrollbar{width:0}
.disp{font-family:'Syne',sans-serif;font-weight:800}
.head{font-family:'Syne',sans-serif;font-weight:700}
.lbl{font-family:'Syne',sans-serif;font-weight:600;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.btn{width:100%;padding:17px 24px;border-radius:var(--r);font-family:'Syne',sans-serif;font-weight:700;font-size:15px;cursor:pointer;border:none;transition:all .2s;letter-spacing:.02em}
.bp{background:var(--lime);color:var(--bg)}.bp:hover{transform:translateY(-2px);box-shadow:0 14px 40px var(--lg)}.bp:active{transform:translateY(0)}.bp:disabled{opacity:.3;transform:none;box-shadow:none;cursor:not-allowed}
.bs{background:transparent;color:var(--white);border:1.5px solid var(--bdr2)}.bs:hover{background:var(--s2)}
.bi{width:44px;height:44px;border-radius:50%;background:var(--s2);border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0;color:var(--white)}.bi:hover{background:var(--s3);border-color:var(--bdr2)}
.inp{width:100%;padding:15px 18px;background:var(--s2);border:1.5px solid var(--bdr);border-radius:var(--rs);color:var(--white);font-family:'DM Sans',sans-serif;font-size:16px;outline:none;transition:border-color .2s}.inp::placeholder{color:var(--muted)}.inp:focus{border-color:var(--lime)}
.card{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:20px}
.chip{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:100px;background:var(--s2);border:1px solid var(--bdr);font-size:11px;color:var(--muted);font-family:'DM Sans',sans-serif;white-space:nowrap}
.cl{background:var(--ld);border-color:rgba(198,255,0,.3);color:var(--lime)}
.cg{background:var(--gd);border-color:rgba(255,179,0,.3);color:var(--gold)}
.cr{background:var(--rd);border-color:rgba(255,64,64,.3);color:var(--red)}
.cc{background:var(--cd);border-color:rgba(0,207,255,.3);color:var(--cyan)}
.av{border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;flex-shrink:0}
.prog{height:3px;background:var(--s3);border-radius:100px;overflow:hidden}
.pf{height:100%;background:var(--lime);border-radius:100px;transition:width .55s cubic-bezier(.16,1,.3,1)}
.tog{position:relative;width:48px;height:28px;cursor:pointer;display:block;flex-shrink:0}
.tog input{opacity:0;width:0;height:0;position:absolute}
.tsl{position:absolute;inset:0;background:var(--s3);border:1px solid var(--bdr);border-radius:100px;transition:.2s}
.tsl::after{content:'';position:absolute;left:3px;top:3px;width:20px;height:20px;background:var(--muted);border-radius:50%;transition:.2s}
.tog input:checked+.tsl{background:var(--lime);border-color:var(--lime)}
.tog input:checked+.tsl::after{transform:translateX(20px);background:var(--bg)}
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.si{padding:14px 8px;background:var(--s2);border:1.5px solid var(--bdr);border-radius:var(--rs);text-align:center;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:6px}.si:hover{border-color:var(--bdr2)}.si.on{background:var(--ld);border-color:rgba(198,255,0,.4)}.si .ico{font-size:22px}.si .stx{font-size:11px;color:var(--muted);font-family:'Syne',sans-serif;font-weight:600}.si.on .stx{color:var(--lime)}
.pill{padding:10px 18px;background:var(--s2);border:1.5px solid var(--bdr);border-radius:100px;cursor:pointer;font-family:'Syne',sans-serif;font-weight:700;font-size:15px;color:var(--muted);transition:all .2s;white-space:nowrap}.pill:hover{color:var(--white);border-color:var(--bdr2)}.pill.on{background:var(--lime);border-color:var(--lime);color:var(--bg)}
.ldot{width:7px;height:7px;background:var(--lime);border-radius:50%;animation:ldot 2s infinite;display:inline-block;flex-shrink:0}
@keyframes ldot{0%,100%{box-shadow:0 0 0 0 var(--lg)}50%{box-shadow:0 0 0 9px transparent}}
.tc{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:18px 20px;cursor:pointer;transition:all .22s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;user-select:none}
.tc::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;opacity:0;transition:.2s;border-radius:0 2px 2px 0;background:var(--lime)}
.tc:hover:not(.tdone):not(.tlock):not(.tact){border-color:rgba(198,255,0,.22);transform:translateX(3px)}.tc:hover::before{opacity:1}
.tdone{border-color:rgba(198,255,0,.18);background:rgba(198,255,0,.03);cursor:default}.tdone::before{opacity:1}
.tlock{opacity:.28;cursor:not-allowed;pointer-events:none}
.tgold:not(.tdone){border-color:rgba(255,179,0,.3)!important;background:rgba(255,179,0,.04)!important}.tgold:not(.tdone)::before{background:var(--gold)!important;opacity:1!important}
.tact{border-color:rgba(0,207,255,.3)!important;background:var(--cd)!important;cursor:default}.tact::before{background:var(--cyan)!important;opacity:1!important}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:80;animation:ov .25s ease}
@keyframes ov{from{opacity:0}to{opacity:1}}
.sheet{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:var(--s1);border-radius:24px 24px 0 0;z-index:81;padding:0 24px 44px;animation:shu .35s cubic-bezier(.16,1,.3,1)}
@keyframes shu{from{transform:translateX(-50%) translateY(100%)}to{transform:translateX(-50%) translateY(0)}}
.sh{width:36px;height:4px;background:var(--s3);border-radius:100px;margin:16px auto 24px}
.toast-wrap{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:100;width:calc(100% - 48px);max-width:382px;display:flex;flex-direction:column;gap:8px;pointer-events:none;padding-top:56px}
.toast{background:var(--s1);border:1px solid var(--bdr2);border-radius:var(--rs);padding:11px 14px;display:flex;align-items:center;gap:10px;animation:tin .38s cubic-bezier(.16,1,.3,1) both;font-size:13px;box-shadow:0 8px 32px rgba(0,0,0,.55)}
@keyframes tin{from{opacity:0;transform:translateY(-10px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.toast.dy{animation:tout .28s ease forwards}
@keyframes tout{to{opacity:0;transform:translateY(-6px) scale(.97)}}
.flash-bg{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.88);animation:ov .3s ease}
.flash-box{background:var(--s1);border:2px solid var(--cyan);border-radius:var(--r);padding:32px 28px;text-align:center;animation:pop .38s cubic-bezier(.16,1,.3,1);max-width:380px;width:100%}
@keyframes pop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
.zeug-bg{position:fixed;inset:0;z-index:95;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.92);animation:ov .3s ease;overflow-y:auto;padding:20px 0 0}
.zeug-inner{background:var(--s1);border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 60px;animation:shu .4s cubic-bezier(.16,1,.3,1)}
.zeug-card{background:linear-gradient(135deg,#0F1A00 0%,#0A1400 40%,#111800 100%);border:1px solid rgba(198,255,0,.2);border-radius:20px;padding:28px 24px;position:relative;overflow:hidden;margin-bottom:20px}
.zeug-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top right,rgba(198,255,0,.08) 0%,transparent 60%)}
.zeug-card::after{content:'QUEST';position:absolute;bottom:-12px;right:-8px;font-family:'Syne',sans-serif;font-weight:800;font-size:80px;color:rgba(198,255,0,.04);letter-spacing:-.02em;pointer-events:none}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.stat{background:var(--s2);border-radius:var(--rs);padding:14px 10px;text-align:center;border:1px solid var(--bdr)}
.sn{font-family:'Syne',sans-serif;font-weight:800;font-size:24px;color:var(--lime);line-height:1;margin-bottom:4px}
.sl{font-size:10px;color:var(--muted);font-family:'Syne',sans-serif;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.mem{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden}
.mem-img{width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.mem-img img{width:100%;height:100%;object-fit:cover}
.mem-tag{position:absolute;top:12px;left:12px;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);padding:5px 10px;border-radius:100px;font-size:11px;font-family:'Syne',sans-serif;font-weight:600}
.hcard{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:18px 20px;cursor:pointer;transition:all .2s}.hcard:hover{border-color:var(--bdr2);transform:translateX(3px)}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fu .45s cubic-bezier(.16,1,.3,1) both}
.f1{animation-delay:.05s}.f2{animation-delay:.1s}.f3{animation-delay:.15s}.f4{animation-delay:.2s}
.noise-layer{position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");pointer-events:none;z-index:999;opacity:.4}
@keyframes cf{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
.err{color:var(--red);font-size:13px;margin-top:8px;font-family:'DM Sans',sans-serif}
.spin{animation:spin 1s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
`

/* ─── SMALL HELPERS ──────────────────────────────────────────────────── */
function BackIcon(){return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}

function Spinner(){return <span className="spin">⟳</span>}

function QRCode({code}){
  // Simple visual QR - in production use a real QR library
  const p=Array.from({length:21},(_,r)=>Array.from({length:21},(_,c)=>{
    const corner=(r<7&&c<7)||(r<7&&c>13)||(r>13&&c<7)
    const inner=(r>=2&&r<=4&&c>=2&&c<=4)||(r>=2&&r<=4&&c>=16&&c<=18)||(r>=16&&r<=18&&c>=2&&c<=4)
    return(corner||inner)?1:Math.random()>.48?1:0
  }))
  return(
    <div style={{width:176,height:176,background:'white',borderRadius:14,padding:11,margin:'0 auto',flexShrink:0}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(21,1fr)',gap:1,width:'100%',height:'100%'}}>
        {p.flat().map((c,i)=><div key={i} style={{background:c?'#07080A':'transparent',borderRadius:1}}/>)}
      </div>
    </div>
  )
}

function Confetti({on}){
  if(!on)return null
  return(
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:200,overflow:'hidden'}}>
      {Array.from({length:44},(_,i)=>(
        <div key={i} style={{position:'absolute',left:`${Math.random()*100}%`,top:-20,
          width:6+Math.random()*8,height:6+Math.random()*8,
          background:['#C6FF00','#EC4899','#3B82F6','#FFB300','#8B5CF6'][i%5],
          borderRadius:2,animation:`cf ${2+Math.random()*2.5}s ${Math.random()*1.5}s linear forwards`}}/>
      ))}
    </div>
  )
}

function Toast({toasts}){
  return(
    <div className="toast-wrap">
      {toasts.map(t=>(
        <div key={t.id} className={`toast${t.dying?' dy':''}`}>
          <div className="av" style={{width:26,height:26,fontSize:10,background:t.color+'25',border:`1.5px solid ${t.color}40`,color:t.color}}>{t.av}</div>
          <span style={{opacity:.92}}>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}

function useToast(){
  const[toasts,setToasts]=useState([])
  const tid=useRef(0)
  const add=useCallback((msg,av='?',color='#C6FF00')=>{
    const id=++tid.current
    setToasts(t=>[...t,{id,msg,av,color,dying:false}])
    setTimeout(()=>setToasts(t=>t.map(x=>x.id===id?{...x,dying:true}:x)),2800)
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200)
  },[])
  return{toasts,add}
}

/* ─── SCREEN: HOME ───────────────────────────────────────────────────── */
function HomeScreen({onHost,onJoin,onHistory,histCount}){
  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'0 24px',position:'relative',overflow:'hidden'}}>
      <div className="orb" style={{width:300,height:300,background:'rgba(198,255,0,.07)',top:-120,right:-80}}/>
      <div className="orb" style={{width:160,height:160,background:'rgba(198,255,0,.04)',bottom:100,left:-50}}/>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',paddingTop:80}}>
        <div className="fu" style={{marginBottom:12}}>
          <span className="chip cl"><span className="ldot"/>&nbsp;Live Challenges</span>
        </div>
        <div className="fu f1 disp" style={{fontSize:48,lineHeight:1.05,letterSpacing:'-.02em',marginBottom:14}}>
          Pick a task.<br/><span style={{color:'var(--lime)'}}>Make it real.</span>
        </div>
        <p className="fu f2" style={{color:'var(--muted)',fontSize:15,lineHeight:1.7,marginBottom:50,maxWidth:265}}>
          Photo-Challenges die Menschen zusammenbringen — nicht ans Handy fesseln.
        </p>
        <div className="fu f3" style={{display:'flex',flexDirection:'column',gap:11}}>
          <button className="btn bp" onClick={onHost}>Session starten →</button>
          <button className="btn bs" onClick={onJoin}>Session beitreten</button>
        </div>
      </div>
      <div className="fu f4" style={{paddingBottom:44}}>
        {histCount>0?(
          <button onClick={onHistory} style={{width:'100%',padding:'13px',background:'transparent',border:'1px solid var(--bdr)',borderRadius:'var(--rs)',cursor:'pointer',color:'var(--muted)',fontSize:13,fontFamily:'Syne',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'all .2s'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--bdr2)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--bdr)'}>
            🗂&nbsp; Vergangene Sessions ({histCount})
          </button>
        ):(
          <div style={{display:'flex',gap:20,justifyContent:'center',opacity:.35}}>
            {['🎂','🏕️','🎪','💍','🤝','🎓'].map((e,i)=><span key={i} style={{fontSize:20}}>{e}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── SCREEN: SETUP ──────────────────────────────────────────────────── */
function SetupScreen({onStart,onBack}){
  const[step,setStep]=useState(0)
  const[occ,setOcc]=useState(null)
  const[vibe,setVibe]=useState(null)
  const[count,setCount]=useState(20)
  const[multi,setMulti]=useState(false)
  const[loading,setLoading]=useState(false)
  const[err,setErr]=useState('')
  const prog=[25,50,75,100][step]
  const ok=[!!occ,!!vibe,true,true][step]

  const handleStart=async()=>{
    setLoading(true);setErr('')
    try{await onStart({occ,vibe,count,multi})}
    catch(e){setErr('Fehler beim Erstellen. Bitte erneut versuchen.');console.error(e)}
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'52px 24px 0',display:'flex',alignItems:'center',gap:14,marginBottom:26}}>
        <button className="bi" onClick={step===0?onBack:()=>setStep(s=>s-1)}><BackIcon/></button>
        <div style={{flex:1}}>
          <div className="lbl" style={{marginBottom:6}}>Schritt {step+1} von 4</div>
          <div className="prog"><div className="pf" style={{width:`${prog}%`}}/></div>
        </div>
      </div>
      <div style={{flex:1,padding:'0 24px',overflowY:'auto',paddingBottom:20}}>
        {step===0&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>Welcher Anlass?</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>Passt die Aufgaben automatisch an.</p>
          <div className="sg fu f2">
            {OCCASIONS.map(o=>(
              <div key={o.id} className={`si ${occ===o.id?'on':''}`} onClick={()=>setOcc(o.id)}>
                <span className="ico">{o.icon}</span><span className="stx">{o.label}</span>
              </div>
            ))}
          </div>
        </div>}
        {step===1&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>Welcher Vibe?</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>Bestimmt wie wild die Aufgaben werden.</p>
          <div style={{display:'flex',flexDirection:'column',gap:11}} className="fu f2">
            {VIBES.map(v=>(
              <div key={v.id} onClick={()=>setVibe(v.id)} style={{padding:'18px 20px',background:vibe===v.id?'var(--ld)':'var(--s1)',border:`1.5px solid ${vibe===v.id?'rgba(198,255,0,.4)':'var(--bdr)'}`,borderRadius:'var(--r)',cursor:'pointer',transition:'all .2s',display:'flex',alignItems:'center',gap:14}}>
                <span style={{fontSize:24}}>{v.icon}</span>
                <div style={{flex:1}}>
                  <div className="head" style={{fontSize:15,color:vibe===v.id?'var(--lime)':'var(--white)'}}>{v.label}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{v.desc}</div>
                </div>
                {vibe===v.id&&<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 9L7 12.5L14.5 5" stroke="#C6FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            ))}
          </div>
        </div>}
        {step===2&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>Wie viele Tasks?</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>Für ~2h Abend empfehlen wir 20.</p>
          <div className="fu f2" style={{display:'flex',flexWrap:'wrap',gap:9,marginBottom:22}}>
            {COUNTS.map(n=><div key={n} className={`pill ${count===n?'on':''}`} onClick={()=>setCount(n)}>{n}</div>)}
          </div>
          <div className="fu f3 card" style={{fontSize:13,color:'var(--muted)',lineHeight:1.7,padding:'14px 18px'}}>
            💡 <strong style={{color:'var(--white)'}}>{count} Aufgaben</strong> bei 5 Spielern → ca. <strong style={{color:'var(--lime)'}}>{Math.ceil(count/5)} Tasks pro Person.</strong><br/>+ 1 goldene Sonder-Aufgabe ist immer dabei ⭐
          </div>
        </div>}
        {step===3&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>Spielregeln</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:22,fontSize:14}}>Mach die Experience zu deiner.</p>
          <div className="card fu f2" style={{marginBottom:12}}>
            {[
              {l:'Aufgaben mehrfach lösbar',d:'Sonst ist jede Task nur 1× verfügbar',v:multi,s:setMulti},
            ].map((row,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0'}}>
                <div style={{paddingRight:16}}>
                  <div style={{fontWeight:500,fontSize:14,marginBottom:3}}>{row.l}</div>
                  <div style={{fontSize:12,color:'var(--muted)'}}>{row.d}</div>
                </div>
                <label className="tog"><input type="checkbox" checked={row.v} onChange={e=>row.s(e.target.checked)}/><span className="tsl"/></label>
              </div>
            ))}
          </div>
          <div className="card fu f3" style={{padding:'14px 18px'}}>
            <div className="lbl" style={{marginBottom:11}}>Zusammenfassung</div>
            {[
              {l:'Anlass',v:(OCCASIONS.find(o=>o.id===occ)||{icon:'—',label:'—'}).icon+' '+(OCCASIONS.find(o=>o.id===occ)||{label:'—'}).label},
              {l:'Vibe',v:(VIBES.find(v=>v.id===vibe)||{icon:'—',label:'—'}).icon+' '+(VIBES.find(v=>v.id===vibe)||{label:'—'}).label},
              {l:'Aufgaben',v:`${count} + ⭐`},
              {l:'Mehrfach lösbar',v:multi?'Ja':'Nein'},
            ].map(row=>(
              <div key={row.l} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--bdr)',fontSize:13}}>
                <span style={{color:'var(--muted)'}}>{row.l}</span>
                <span style={{fontWeight:500}}>{row.v}</span>
              </div>
            ))}
          </div>
          {err&&<div className="err">{err}</div>}
        </div>}
      </div>
      <div style={{padding:'14px 24px 44px'}}>
        {step<3
          ?<button className="btn bp" onClick={()=>setStep(s=>s+1)} disabled={!ok} style={{opacity:ok?1:.3}}>Weiter →</button>
          :<button className="btn bp" onClick={handleStart} disabled={loading||!ok}>{loading?<><Spinner/> Erstelle Session…</>:'🚀 Session starten'}</button>
        }
      </div>
    </div>
  )
}

/* ─── SCREEN: LOBBY ──────────────────────────────────────────────────── */
function LobbyScreen({sessionCode,sessionId,onPlay,onBack}){
  const[parts,setParts]=useState([])
  const[copied,setCopied]=useState(false)
  const appUrl=window.location.origin

  useEffect(()=>{
    if(!sessionId)return
    // Load existing participants
    supabase.from('participants').select('*').eq('session_id',sessionId)
      .then(({data})=>{ if(data)setParts(data) })

    // Realtime: new participants joining
    const ch=supabase.channel(`lobby-${sessionId}`)
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'participants',filter:`session_id=eq.${sessionId}`},
        payload=>setParts(p=>[...p,payload.new]))
      .subscribe()
    return()=>supabase.removeChannel(ch)
  },[sessionId])

  const copyLink=()=>{
    navigator.clipboard.writeText(`${appUrl}?join=${sessionCode}`)
    setCopied(true);setTimeout(()=>setCopied(false),2000)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'52px 24px 44px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
        <button className="bi" onClick={onBack}><BackIcon/></button>
        <div>
          <div className="head" style={{fontSize:19}}>Lobby</div>
          <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>Jederzeit beitreten möglich</div>
        </div>
        <span className="chip cl" style={{marginLeft:'auto'}}><span className="ldot"/>&nbsp;{parts.length+1} dabei</span>
      </div>
      <div className="card fu" style={{textAlign:'center',padding:'26px 20px',marginBottom:14,position:'relative'}}>
        <div style={{position:'absolute',top:-1,left:'50%',transform:'translateX(-50%)',background:'var(--lime)',color:'var(--bg)',fontSize:10,fontFamily:'Syne',fontWeight:700,padding:'4px 12px',borderRadius:'0 0 8px 8px',letterSpacing:'.1em',textTransform:'uppercase'}}>QR scannen</div>
        <div style={{marginBottom:14}}><QRCode code={sessionCode}/></div>
        <div className="disp" style={{fontSize:28,letterSpacing:'.14em',color:'var(--lime)',marginBottom:5}}>{sessionCode}</div>
        <div style={{fontSize:12,color:'var(--muted)'}}>oder Code manuell eingeben</div>
      </div>
      <button onClick={copyLink} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px',background:'var(--s2)',border:`1px solid ${copied?'rgba(198,255,0,.3)':'var(--bdr)'}`,borderRadius:'var(--rs)',cursor:'pointer',color:copied?'var(--lime)':'var(--muted)',fontSize:12,fontFamily:'Syne',fontWeight:600,marginBottom:22,transition:'all .2s'}}>
        {copied?'✓ Link kopiert!':'⎘  Party-Link teilen'}
      </button>
      <div className="lbl" style={{marginBottom:9}}>Teilnehmer</div>
      <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
        {/* Host */}
        <div className="card" style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:11}}>
          <div className="av" style={{width:32,height:32,fontSize:11,background:'rgba(198,255,0,.18)',border:'1.5px solid rgba(198,255,0,.35)',color:'var(--lime)'}}>Du</div>
          <span style={{fontWeight:500,fontSize:14,flex:1}}>Du (Host)</span>
          <span className="chip cl" style={{fontSize:10}}>Host</span>
        </div>
        {parts.map((p,i)=>(
          <div key={p.id} className="card" style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:11,animation:`fu .4s ${i*.07}s cubic-bezier(.16,1,.3,1) both`}}>
            <div className="av" style={{width:32,height:32,fontSize:11,background:(p.avatar_color||'#555')+'22',border:`1.5px solid ${p.avatar_color||'#555'}44`,color:p.avatar_color||'#aaa'}}>{avatarLetter(p.nickname)}</div>
            <span style={{fontWeight:500,fontSize:14,flex:1}}>{p.nickname}</span>
            <span style={{color:'var(--lime)',fontSize:16}}>✓</span>
          </div>
        ))}
      </div>
      <div style={{paddingTop:18}}>
        <button className="btn bp" onClick={onPlay}>Los geht's ({parts.length+1}) 🚀</button>
        <p style={{textAlign:'center',fontSize:11,color:'var(--muted)',marginTop:9}}>Weitere Leute können auch während des Spiels joinen</p>
      </div>
    </div>
  )
}

/* ─── SCREEN: JOIN ───────────────────────────────────────────────────── */
function JoinScreen({prefillCode,onJoined,onBack}){
  const[step,setStep]=useState(prefillCode?1:0)
  const[code,setCode]=useState(prefillCode||'')
  const[name,setName]=useState('')
  const[loading,setLoading]=useState(false)
  const[err,setErr]=useState('')

  const join=async()=>{
    setLoading(true);setErr('')
    try{
      // Find session by code
      const{data:sess,error:sessErr}=await supabase.from('sessions').select('id,status').eq('code',code.toUpperCase()).in('status',['lobby','active']).single()
      if(sessErr||!sess){setErr('Session nicht gefunden. Bitte prüfe den Code.');setLoading(false);return}
      // Create participant
      const color=randomColor()
      const{data:part,error:partErr}=await supabase.from('participants').insert({session_id:sess.id,nickname:name.trim(),avatar_color:color}).select().single()
      if(partErr||!part){setErr('Beitreten fehlgeschlagen. Bitte erneut versuchen.');setLoading(false);return}
      localStorage.setItem('quest_participant_id',part.id)
      localStorage.setItem('quest_participant_nickname',name.trim())
      localStorage.setItem('quest_participant_color',color)
      onJoined({sessionId:sess.id,participantId:part.id,nickname:name.trim(),color})
    }catch(e){setErr('Fehler. Bitte erneut versuchen.');console.error(e)}
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'52px 24px 44px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:36}}>
        <button className="bi" onClick={step===0?onBack:()=>setStep(0)}><BackIcon/></button>
        <div className="head" style={{fontSize:21}}>Session beitreten</div>
      </div>
      {step===0&&<div className="fu" style={{flex:1}}>
        <div className="head" style={{fontSize:26,marginBottom:7}}>Session-Code</div>
        <p style={{color:'var(--muted)',marginBottom:28,fontSize:14}}>Den Code bekommst du vom Host.</p>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <label className="lbl">Code</label>
          <input className="inp" placeholder="XTRA-7829" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} style={{fontFamily:'Syne',fontWeight:700,fontSize:22,letterSpacing:'.12em',textAlign:'center'}}/>
        </div>
      </div>}
      {step===1&&<div className="fu" style={{flex:1}}>
        <div className="head" style={{fontSize:26,marginBottom:7}}>Dein Nickname</div>
        <p style={{color:'var(--muted)',marginBottom:28,fontSize:14}}>Wie sollen dich die anderen nennen?</p>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <label className="lbl">Name</label>
          <input className="inp" placeholder="z.B. Jonas 🎉" value={name} onChange={e=>setName(e.target.value)} autoFocus/>
          {err&&<div className="err">{err}</div>}
        </div>
      </div>}
      <div>
        {step===0
          ?<button className="btn bp" onClick={()=>setStep(1)} disabled={code.length<4} style={{opacity:code.length<4?.3:1}}>Weiter →</button>
          :<button className="btn bp" onClick={join} disabled={!name.trim()||loading} style={{opacity:(!name.trim()||loading)?.3:1}}>{loading?<><Spinner/> Beitreten…</>:'Beitreten 🙌'}</button>
        }
      </div>
    </div>
  )
}

/* ─── SCREEN: GAME ───────────────────────────────────────────────────── */
function GameScreen({sessionId,sessionCode,myParticipantId,myNickname,myColor,isHost,showQRGlobal,setShowQRGlobal,onEnd}){
  const[tasks,setTasks]=useState([])
  const[parts,setParts]=useState([])
  const[activeId,setActiveId]=useState(null)
  const[phase,setPhase]=useState('list') // list | active | upload
  const[uploading,setUploading]=useState(false)
  const[flash,setFlash]=useState(null)
  const[streak,setStreak]=useState(0)
  const[endConfirm,setEndConfirm]=useState(false)
  const fileRef=useRef()
  const{toasts,add:addToast}=useToast()

  // Load tasks + participants
  useEffect(()=>{
    if(!sessionId)return
    supabase.from('tasks').select('*').eq('session_id',sessionId).order('sort_order')
      .then(({data})=>{ if(data)setTasks(data) })
    supabase.from('participants').select('*').eq('session_id',sessionId)
      .then(({data})=>{ if(data)setParts(data) })

    // Realtime
    const ch=supabase.channel(`game-${sessionId}`)
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'tasks',filter:`session_id=eq.${sessionId}`},
        payload=>{
          setTasks(prev=>prev.map(t=>t.id===payload.new.id?payload.new:t))
          // Toast when someone else completes
          if(payload.new.status==='done'&&payload.new.claimed_by!==myParticipantId){
            addToast(`${payload.new.claimed_by_nickname||'Jemand'} hat "${(payload.new.text||'').slice(0,24)}…" erledigt ✓`,
              avatarLetter(payload.new.claimed_by_nickname||'?'),'#C6FF00')
          }
        })
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'participants',filter:`session_id=eq.${sessionId}`},
        payload=>{
          setParts(prev=>[...prev,payload.new])
          addToast(`${payload.new.nickname} ist beigetreten 👋`,avatarLetter(payload.new.nickname),payload.new.avatar_color||'#C6FF00')
        })
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'sessions',filter:`id=eq.${sessionId}`},
        payload=>{ if(payload.new.status==='ended')onEnd() })
      .subscribe()

    // Flash challenge after ~3min
    const ft=setTimeout(()=>{
      const f=FLASH_CHALLENGES[Math.floor(Math.random()*FLASH_CHALLENGES.length)]
      setFlash(f)
    },180000) // 3 minutes

    return()=>{supabase.removeChannel(ch);clearTimeout(ft)}
  },[sessionId])

  const activeTask=tasks.find(t=>t.id===activeId)
  const myActive=tasks.find(t=>t.claimed_by===myParticipantId&&t.status==='active')

  const pickTask=async(task)=>{
    if(task.status!=='open'||myActive)return
    // Optimistic
    setTasks(prev=>prev.map(t=>t.id===task.id?{...t,status:'active',claimed_by:myParticipantId,claimed_by_nickname:myNickname}:t))
    setActiveId(task.id);setPhase('active')
    // Supabase
    const{data,error}=await supabase.from('tasks')
      .update({status:'active',claimed_by:myParticipantId,claimed_by_nickname:myNickname})
      .eq('id',task.id).eq('status','open').select().single()
    if(error||!data){
      // Revert - someone else got it
      setTasks(prev=>prev.map(t=>t.id===task.id?{...t,status:'open',claimed_by:null,claimed_by_nickname:null}:t))
      setActiveId(null);setPhase('list')
      addToast('Aufgabe wurde gerade vergeben 😅','!','#FF4040')
    }
  }

  const cancelTask=async()=>{
    if(!activeId)return
    await supabase.from('tasks').update({status:'open',claimed_by:null,claimed_by_nickname:null}).eq('id',activeId)
    setTasks(prev=>prev.map(t=>t.id===activeId?{...t,status:'open',claimed_by:null,claimed_by_nickname:null}:t))
    setActiveId(null);setPhase('list')
  }

  const completeTask=async(file)=>{
    if(!activeId)return
    setUploading(true)
    let photoUrl=null
    try{
      if(file){
        const ext=file.name.split('.').pop()||'jpg'
        const path=`${sessionId}/${activeId}.${ext}`
        const{error:upErr}=await supabase.storage.from('proofs').upload(path,file,{upsert:true})
        if(!upErr){
          const{data:{publicUrl}}=supabase.storage.from('proofs').getPublicUrl(path)
          photoUrl=publicUrl
        }
      }
      await supabase.from('tasks').update({status:'done',photo_url:photoUrl,completed_at:new Date().toISOString()}).eq('id',activeId)
      setTasks(prev=>prev.map(t=>t.id===activeId?{...t,status:'done',photo_url:photoUrl}:t))
      const ns=streak+1;setStreak(ns)
      addToast(ns>=3?`🔥 ${ns}er Streak! Unaufhaltbar!`:`"${(activeTask?.text||'').slice(0,26)}…" erledigt ✓`,'D',myColor||'#C6FF00')
      setActiveId(null);setPhase('list')
    }catch(e){console.error(e)}
    setUploading(false)
  }

  const endSession=async()=>{
    await supabase.from('sessions').update({status:'ended'}).eq('id',sessionId)
    onEnd()
  }

  const done=tasks.filter(t=>t.status==='done').length
  const total=tasks.length

  return(
    <div style={{minHeight:'100vh',paddingBottom:100}}>
      <Toast toasts={toasts}/>

      {/* Header */}
      <div style={{position:'sticky',top:0,zIndex:20,background:'var(--bg)',padding:'50px 24px 13px',borderBottom:'1px solid var(--bdr)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:13}}>
          <div>
            <div className="head" style={{fontSize:20}}>Aufgaben</div>
            <div style={{display:'flex',alignItems:'center',gap:7,marginTop:3}}>
              <span className="ldot"/><span style={{fontSize:12,color:'var(--muted)'}}>Läuft · {parts.length+1} Spieler</span>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {streak>=2&&<div style={{display:'flex',alignItems:'center',gap:5,padding:'7px 11px',background:'var(--gd)',border:'1px solid rgba(255,179,0,.22)',borderRadius:'var(--rxs)'}}>
              <span style={{fontSize:13}}>🔥</span><span style={{fontFamily:'Syne',fontWeight:700,fontSize:12,color:'var(--gold)'}}>{streak}x</span>
            </div>}
            <div style={{display:'flex'}}>
              {parts.slice(0,3).map((p,i)=>(
                <div key={p.id} className="av" style={{width:26,height:26,fontSize:9,background:(p.avatar_color||'#555')+'22',border:`1.5px solid ${p.avatar_color||'#555'}40`,color:p.avatar_color||'#aaa',marginLeft:i?-7:0,zIndex:3-i}}>{avatarLetter(p.nickname)}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div className="prog" style={{flex:1}}><div className="pf" style={{width:total?`${(done/total)*100}%`:'0%'}}/></div>
          <span style={{fontSize:12,fontFamily:'Syne',fontWeight:700,color:'var(--lime)',whiteSpace:'nowrap'}}>{done}/{total}</span>
        </div>
      </div>

      {/* Task list */}
      <div style={{padding:'14px 24px',display:'flex',flexDirection:'column',gap:9}}>
        {tasks.map((task,idx)=>{
          const isMyActive=task.claimed_by===myParticipantId&&task.status==='active'
          const isOtherActive=task.status==='active'&&task.claimed_by!==myParticipantId
          const isDone=task.status==='done'
          const hasMyActive=!!myActive
          return(
            <div key={task.id}
              className={`tc ${isDone?'tdone':''} ${isOtherActive?'tlock':''} ${task.is_golden&&!isDone?'tgold':''} ${isMyActive?'tact':''}`}
              onClick={()=>task.status==='open'&&!hasMyActive?pickTask(task):null}
              style={{cursor:task.status==='open'&&!hasMyActive?'pointer':'default',animation:`fu .4s ${idx*.03}s cubic-bezier(.16,1,.3,1) both`}}>
              {task.is_golden&&!isDone&&<div style={{position:'absolute',top:10,right:10}}><span className="chip cg" style={{fontSize:10,padding:'3px 8px'}}>⭐ Golden Task</span></div>}
              <div style={{display:'flex',alignItems:'flex-start',gap:13}}>
                <span style={{fontSize:24,flexShrink:0,marginTop:1}}>{task.emoji}</span>
                <div style={{flex:1,paddingRight:task.is_golden&&!isDone?60:0}}>
                  <div style={{fontSize:13,fontWeight:500,lineHeight:1.45,marginBottom:7,textDecoration:isDone?'line-through':'none',color:isDone?'var(--muted)':'var(--white)'}}>{task.text}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    <span className="chip" style={{fontSize:10,padding:'3px 8px'}}>{task.type}</span>
                    {isDone&&<span className="chip cl" style={{fontSize:10,padding:'3px 8px'}}>✓ {task.claimed_by_nickname||'Erledigt'}</span>}
                    {isOtherActive&&<span className="chip cr" style={{fontSize:10,padding:'3px 8px'}}>🔒 {task.claimed_by_nickname}</span>}
                    {isMyActive&&<span className="chip cc" style={{fontSize:10,padding:'3px 8px'}}>⚡ Du gerade</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* End session */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,padding:'12px 24px 34px',background:'linear-gradient(to top,var(--bg) 60%,transparent)',zIndex:22}}>
        {isHost&&<button onClick={()=>setEndConfirm(true)} style={{width:'100%',padding:'13px',background:'transparent',border:'1px solid rgba(255,64,64,.22)',borderRadius:'var(--rs)',color:'var(--red)',fontFamily:'Syne',fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--rd)';e.currentTarget.style.borderColor='rgba(255,64,64,.45)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,64,64,.22)'}}>
          Session beenden
        </button>}
      </div>

      {/* Active task sheet */}
      {phase==='active'&&myActive&&(
        <>
          <div className="overlay" onClick={cancelTask}/>
          <div className="sheet">
            <div className="sh"/>
            <span className="chip cc" style={{fontSize:10,marginBottom:14,display:'inline-flex'}}>⚡ Aktive Aufgabe</span>
            <div style={{fontSize:30,margin:'10px 0 8px'}}>{myActive.emoji}</div>
            <div style={{fontSize:16,fontWeight:500,lineHeight:1.5,marginBottom:22}}>{myActive.text}</div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setPhase('upload')} className="btn bp" style={{flex:1,padding:'14px'}}>📸 Beweis hochladen</button>
              <button onClick={cancelTask} style={{padding:'14px 16px',background:'var(--rd)',border:'1px solid rgba(255,64,64,.28)',borderRadius:'var(--rs)',color:'var(--red)',cursor:'pointer',fontSize:13,fontFamily:'Syne',fontWeight:700,whiteSpace:'nowrap'}}>Abbruch</button>
            </div>
          </div>
        </>
      )}

      {/* Upload sheet */}
      {phase==='upload'&&(
        <>
          <div className="overlay" onClick={()=>setPhase('active')}/>
          <div className="sheet">
            <div className="sh"/>
            <div className="head" style={{fontSize:21,marginBottom:5}}>Beweis hochladen</div>
            <p style={{color:'var(--muted)',fontSize:13,marginBottom:22}}>Ein Foto oder kurzes Video reicht.</p>
            {/* Hidden file input - opens camera on mobile */}
            <input ref={fileRef} type="file" accept="image/*,video/*" capture="environment" style={{display:'none'}}
              onChange={e=>{const f=e.target.files?.[0];if(f)completeTask(f)}}/>
            <div onClick={()=>fileRef.current?.click()} style={{border:'2px dashed rgba(198,255,0,.22)',borderRadius:'var(--r)',padding:'32px',textAlign:'center',marginBottom:18,cursor:'pointer',background:'var(--ld)',transition:'all .2s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(198,255,0,.45)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(198,255,0,.22)'}>
              <div style={{fontSize:40,marginBottom:9}}>📷</div>
              <div style={{fontFamily:'Syne',fontWeight:700,marginBottom:3,fontSize:14}}>{uploading?<><Spinner/> Hochladen…</>:'Kamera öffnen'}</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>Foto · Galerie · Video</div>
            </div>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setPhase('active')} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>Zurück</button>
              <button onClick={()=>completeTask(null)} disabled={uploading} className="btn bp" style={{flex:1,padding:'13px',opacity:uploading?.5:1}}>✓ Ohne Foto</button>
            </div>
          </div>
        </>
      )}

      {/* Flash Challenge */}
      {flash&&(
        <div className="flash-bg">
          <div className="flash-box">
            <div style={{fontSize:40,marginBottom:11}}>⚡</div>
            <span className="chip cc" style={{marginBottom:13,display:'inline-flex'}}>FLASH CHALLENGE — alle gleichzeitig</span>
            <div className="head" style={{fontSize:19,marginBottom:11,lineHeight:1.45}}>{flash.t}</div>
            <div style={{fontSize:12,color:'var(--muted)',marginBottom:22}}>{flash.dur} Sekunden</div>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setFlash(null)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>Skip</button>
              <button onClick={()=>setFlash(null)} className="btn bp" style={{flex:1,padding:'13px'}}>Los! ⚡</button>
            </div>
          </div>
        </div>
      )}

      {/* QR Join Sheet */}
      {showQRGlobal&&(
        <>
          <div className="overlay" onClick={()=>setShowQRGlobal(false)}/>
          <div className="sheet">
            <div className="sh"/>
            <div className="head" style={{fontSize:19,marginBottom:4,textAlign:'center'}}>Noch jemand dabei?</div>
            <p style={{color:'var(--muted)',fontSize:12,textAlign:'center',marginBottom:20}}>QR scannen — auch während des Spiels</p>
            <div style={{marginBottom:18}}><QRCode code={sessionCode}/></div>
            <div className="disp" style={{fontSize:26,letterSpacing:'.14em',color:'var(--lime)',textAlign:'center',marginBottom:18}}>{sessionCode}</div>
            <button onClick={()=>setShowQRGlobal(false)} className="btn bp">Schließen</button>
          </div>
        </>
      )}

      {/* End confirm */}
      {endConfirm&&(
        <>
          <div className="overlay" onClick={()=>setEndConfirm(false)}/>
          <div className="sheet">
            <div className="sh"/>
            <div style={{fontSize:34,textAlign:'center',marginBottom:11}}>🏁</div>
            <div className="head" style={{fontSize:21,textAlign:'center',marginBottom:7}}>Session beenden?</div>
            <p style={{color:'var(--muted)',fontSize:13,textAlign:'center',marginBottom:26,lineHeight:1.6}}>
              {done} Aufgaben erledigt. Das Album wird für alle gespeichert.
            </p>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setEndConfirm(false)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>Weiter feiern</button>
              <button onClick={endSession} style={{flex:1,padding:'13px',background:'var(--rd)',border:'1px solid rgba(255,64,64,.28)',borderRadius:'var(--r)',color:'var(--red)',fontFamily:'Syne',fontWeight:700,fontSize:14,cursor:'pointer'}}>Beenden</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ─── SCREEN: END ────────────────────────────────────────────────────── */
function EndScreen({sessionId,sessionData,onHome}){
  const[conf,setConf]=useState(true)
  const[completions,setCompletions]=useState([])
  const[showZeugnis,setShowZeugnis]=useState(false)
  const[parts,setParts]=useState([])

  useEffect(()=>{
    setTimeout(()=>setConf(false),4200)
    setTimeout(()=>setShowZeugnis(true),2000)
    if(!sessionId)return
    supabase.from('tasks').select('*').eq('session_id',sessionId).eq('status','done').order('completed_at')
      .then(({data})=>{ if(data)setCompletions(data) })
    supabase.from('participants').select('*').eq('session_id',sessionId)
      .then(({data})=>{ if(data)setParts(data) })
  },[sessionId])

  const occ=OCCASIONS.find(o=>o.id===sessionData?.config?.occ)||{icon:'🎉',label:'Party'}
  const vib=VIBES.find(v=>v.id===sessionData?.config?.vibe)||{icon:'🔥',label:'Party'}
  const dateStr=new Date(sessionData?.created_at||Date.now()).toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'})
  const quote=QUOTES[Math.floor(Math.random()*QUOTES.length)]

  return(
    <div style={{minHeight:'100vh',padding:'52px 24px 60px',overflowY:'auto'}}>
      <Confetti on={conf}/>
      <div className="fu" style={{textAlign:'center',marginBottom:32}}>
        <div style={{fontSize:52,marginBottom:13}}>🎉</div>
        <div className="disp" style={{fontSize:38,marginBottom:7}}>Was ein Abend.</div>
        <p style={{color:'var(--muted)',fontSize:15}}>Eure Erinnerungen sind gespeichert.</p>
      </div>
      <div className="fu f1" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9,marginBottom:28}}>
        <div className="stat"><div className="sn">{completions.length}</div><div className="sl">Tasks</div></div>
        <div className="stat"><div className="sn">{parts.length+1}</div><div className="sl">Leute</div></div>
        <div className="stat"><div className="sn">{occ.icon}</div><div className="sl">{occ.label}</div></div>
      </div>
      <div className="fu f2" style={{marginBottom:28}}>
        <div className="lbl" style={{marginBottom:13}}>Die Momente 📸</div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {completions.length===0&&<div style={{textAlign:'center',padding:'32px',color:'var(--muted)',fontSize:14}}>Die Fotos laden…</div>}
          {completions.map((c,i)=>(
            <div key={c.id} className="mem" style={{animation:`fu .45s ${i*.06}s cubic-bezier(.16,1,.3,1) both`}}>
              <div className="mem-img" style={{background:'#0A0D1A',minHeight:200}}>
                {c.photo_url
                  ?<img src={c.photo_url} alt={c.text} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  :<span style={{fontSize:64}}>{c.emoji}</span>}
                <div className="mem-tag">{c.claimed_by_nickname||'Anonym'}</div>
              </div>
              <div style={{padding:'13px 17px'}}>
                <div style={{fontSize:11,color:'var(--lime)',fontFamily:'Syne',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>{c.claimed_by_nickname||'Anonym'}</div>
                <div style={{fontSize:13,fontWeight:500,lineHeight:1.4}}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fu f4" style={{display:'flex',flexDirection:'column',gap:10}}>
        <button className="btn bp">🔗 Album teilen · Link erstellen</button>
        <button className="btn bs" onClick={onHome} style={{border:'1px solid var(--bdr2)'}}>Zurück zur Übersicht</button>
      </div>

      {/* ABEND-ZEUGNIS (Surprise) */}
      {showZeugnis&&(
        <div className="zeug-bg" onClick={e=>e.target===e.currentTarget&&setShowZeugnis(false)}>
          <div className="zeug-inner">
            <div className="sh"/>
            <div style={{marginBottom:7}}><span className="chip cl" style={{fontSize:10}}>✨ Abend-Zeugnis</span></div>
            <div className="head" style={{fontSize:20,marginBottom:18}}>Dein Abend in einem Bild</div>
            <div className="zeug-card">
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
                <div>
                  <div style={{fontSize:10,fontFamily:'Syne',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(198,255,0,.5)',marginBottom:5}}>QUEST · ABEND-ZEUGNIS</div>
                  <div className="disp" style={{fontSize:26,color:'var(--lime)',lineHeight:1.1}}>{occ.icon} {occ.label}</div>
                </div>
                <div style={{fontSize:32}}>{vib.icon}</div>
              </div>
              <div style={{height:1,background:'rgba(198,255,0,.12)',marginBottom:18}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:18}}>
                {[
                  {l:'Datum',v:dateStr},
                  {l:'Vibe',v:vib.label},
                  {l:'Tasks erledigt',v:`${completions.length} von ${sessionData?.config?.count||20}`},
                  {l:'Spieler',v:`${parts.length+1} Leute`},
                ].map(r=>(
                  <div key={r.l} style={{background:'rgba(198,255,0,.05)',borderRadius:10,padding:'10px 12px',border:'1px solid rgba(198,255,0,.1)'}}>
                    <div style={{fontSize:10,color:'rgba(198,255,0,.5)',fontFamily:'Syne',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>{r.l}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--white)'}}>{r.v}</div>
                  </div>
                ))}
              </div>
              {parts.length>0&&(
                <div style={{marginBottom:18}}>
                  <div style={{fontSize:10,fontFamily:'Syne',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(198,255,0,.4)',marginBottom:10}}>Wer dabei war</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {[{nickname:'Du',avatar_color:'#C6FF00'},...parts].map((p,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',background:'rgba(255,255,255,.04)',borderRadius:100,border:'1px solid rgba(255,255,255,.07)'}}>
                        <div className="av" style={{width:18,height:18,fontSize:8,background:(p.avatar_color||'#555')+'22',color:p.avatar_color||'#aaa'}}>{avatarLetter(p.nickname)}</div>
                        <span style={{fontSize:11,fontWeight:500}}>{p.nickname}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{borderTop:'1px solid rgba(198,255,0,.1)',paddingTop:14}}>
                <div style={{fontSize:12,color:'rgba(198,255,0,.55)',fontStyle:'italic',lineHeight:1.55}}>"{quote}"</div>
              </div>
            </div>
            <p style={{fontSize:12,color:'var(--muted)',textAlign:'center',marginBottom:18,lineHeight:1.6}}>Dein persönliches Zeugnis — sichern oder teilen.</p>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setShowZeugnis(false)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>Schließen</button>
              <button className="btn bp" style={{flex:1,padding:'13px'}}>💾 Sichern</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── SCREEN: HISTORY ────────────────────────────────────────────────── */
function HistoryScreen({onBack,onView}){
  const[sessions,setSessions]=useState([])
  useEffect(()=>{
    const raw=localStorage.getItem('quest_sessions')
    if(raw)setSessions(JSON.parse(raw))
  },[])
  return(
    <div style={{minHeight:'100vh',padding:'52px 24px 48px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
        <button className="bi" onClick={onBack}><BackIcon/></button>
        <div className="head" style={{fontSize:21}}>Vergangene Sessions</div>
      </div>
      {sessions.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'var(--muted)'}}>
          <div style={{fontSize:44,marginBottom:14}}>🗂</div>
          <div style={{fontFamily:'Syne',fontWeight:600,marginBottom:7}}>Noch keine Sessions</div>
          <div style={{fontSize:13}}>Starte deine erste Session!</div>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:11}}>
          {sessions.map((s,i)=>{
            const o=OCCASIONS.find(x=>x.id===s.config?.occ)||{icon:'🎉',label:'Party'}
            const v=VIBES.find(x=>x.id===s.config?.vibe)||{icon:'😎',label:'Chill'}
            const d=new Date(s.created_at||Date.now()).toLocaleDateString('de-DE',{day:'2-digit',month:'short',year:'numeric'})
            return(
              <div key={i} className="hcard" onClick={()=>onView(s)} style={{animation:`fu .4s ${i*.06}s cubic-bezier(.16,1,.3,1) both`}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:11}}>
                    <span style={{fontSize:24}}>{o.icon}</span>
                    <div>
                      <div style={{fontFamily:'Syne',fontWeight:700,fontSize:14}}>{o.label}</div>
                      <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{d}</div>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{color:'var(--muted)'}}><path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                  <span className="chip cl" style={{fontSize:10}}>✓ {s.tasksCompleted||0} Tasks</span>
                  <span className="chip" style={{fontSize:10}}>{v.icon} {v.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── MAIN APP ───────────────────────────────────────────────────────── */
export default function App(){
  const[screen,setScreen]=useState('home')
  const[setupKey,setSetupKey]=useState(0)
  const[sessionId,setSessionId]=useState(null)
  const[sessionCode,setSessionCode]=useState(null)
  const[sessionData,setSessionData]=useState(null)
  const[myParticipantId,setMyParticipantId]=useState(null)
  const[myNickname,setMyNickname]=useState('Du')
  const[myColor,setMyColor]=useState('#C6FF00')
  const[isHost,setIsHost]=useState(false)
  const[showQR,setShowQR]=useState(false)
  const[prefillCode,setPrefillCode]=useState(null)

  // Check for ?join=CODE in URL (QR scan)
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search)
    const code=params.get('join')
    if(code){setPrefillCode(code);setScreen('join');window.history.replaceState({},'',window.location.pathname)}
  },[])

  const go=(s)=>{ setScreen(s);window.scrollTo(0,0) }

  const handleHostStart=async(config)=>{
    const code=generateCode()
    // Create session in Supabase
    const{data:sess,error}=await supabase.from('sessions').insert({code,config,status:'lobby'}).select().single()
    if(error)throw error
    // Insert tasks
    const taskList=buildTaskList(config.vibe,config.count)
    const taskRows=taskList.map((t,i)=>({
      session_id:sess.id,emoji:t.e,text:t.t,type:t.ty,
      is_golden:t.isGold||false,status:'open',sort_order:i
    }))
    await supabase.from('tasks').insert(taskRows)
    // Save to history
    const history=JSON.parse(localStorage.getItem('quest_sessions')||'[]')
    localStorage.setItem('quest_sessions',JSON.stringify([{...sess,config},...history].slice(0,20)))

    setSessionId(sess.id)
    setSessionCode(code)
    setSessionData(sess)
    setIsHost(true)
    go('lobby')
  }

  const handleGuestJoined=({sessionId:sid,participantId,nickname,color})=>{
    setSessionId(sid)
    setMyParticipantId(participantId)
    setMyNickname(nickname)
    setMyColor(color)
    setIsHost(false)
    // Load session data
    supabase.from('sessions').select('*').eq('id',sid).single().then(({data})=>{ if(data){setSessionData(data);setSessionCode(data.code)} })
    go('game')
  }

  const handleSessionEnd=()=>{
    // Update history
    const history=JSON.parse(localStorage.getItem('quest_sessions')||'[]')
    const updated=history.map(s=>s.id===sessionId?{...s,status:'ended'}:s)
    localStorage.setItem('quest_sessions',JSON.stringify(updated))
    go('end')
  }

  return(
    <>
      <style>{S}</style>
      <div className="app">
        <div className="noise-layer"/>

        {/* FAB — rendered at app root so it never scrolls */}
        {screen==='game'&&(
          <button onClick={()=>setShowQR(true)} style={{
            position:'fixed',bottom:28,
            right:`max(20px, calc(50% - 195px))`,
            width:48,height:48,borderRadius:'50%',
            background:'var(--s2)',border:'1.5px solid var(--bdr2)',
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',zIndex:30,transition:'all .2s',
            boxShadow:'0 6px 24px rgba(0,0,0,.55)',color:'var(--white)'
          }}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="11" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="2" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M11 11h2v2h-2zM15 11h2M11 15h2M15 15v2M17 15h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {screen==='home'&&<HomeScreen key="home" onHost={()=>{setSetupKey(k=>k+1);go('setup')}} onJoin={()=>go('join')} onHistory={()=>go('history')} histCount={JSON.parse(localStorage.getItem('quest_sessions')||'[]').length}/>}
        {screen==='setup'&&<SetupScreen key={setupKey} onStart={handleHostStart} onBack={()=>go('home')}/>}
        {screen==='lobby'&&<LobbyScreen sessionCode={sessionCode} sessionId={sessionId} onPlay={()=>go('game')} onBack={()=>go('setup')}/>}
        {screen==='join'&&<JoinScreen prefillCode={prefillCode} onJoined={handleGuestJoined} onBack={()=>go('home')}/>}
        {screen==='game'&&<GameScreen sessionId={sessionId} sessionCode={sessionCode} myParticipantId={myParticipantId} myNickname={myNickname} myColor={myColor} isHost={isHost} showQRGlobal={showQR} setShowQRGlobal={setShowQR} onEnd={handleSessionEnd}/>}
        {screen==='end'&&<EndScreen sessionId={sessionId} sessionData={sessionData} onHome={()=>{setSessionId(null);setSessionCode(null);setSessionData(null);go('home')}}/>}
        {screen==='history'&&<HistoryScreen onBack={()=>go('home')} onView={s=>{setSessionId(s.id);setSessionData(s);go('end')}}/>}
      </div>
    </>
  )
}
