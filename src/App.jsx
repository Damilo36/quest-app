import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase, generateCode, randomColor, avatarLetter } from './supabase'
import { OCCASIONS, VIBES, COUNTS, buildTaskList, getQuote } from './data'
import ReelGenerator from './ReelGenerator'
import { t as tr } from './i18n'
import Album from './Album'
import Legal from './Legal'

/* ─── FOX LOGO SVG ─────────────────────────────────────────────────────────── */
function FoxLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fxbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A2800"/>
          <stop offset="100%" stopColor="#07080A"/>
        </radialGradient>
        <radialGradient id="fxgl" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#D4FF1A" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#C6FF00" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#fxbg)" rx="112"/>
      <ellipse cx="256" cy="290" rx="160" ry="140" fill="url(#fxgl)"/>
      <polygon points="108,260 168,108 228,230" fill="#C6FF00"/>
      <polygon points="132,248 171,138 218,232" fill="#07080A"/>
      <polygon points="404,260 344,108 284,230" fill="#C6FF00"/>
      <polygon points="380,248 341,138 294,232" fill="#07080A"/>
      <path d="M 256 148 L 310 168 L 368 222 L 388 296 L 360 372 L 256 410 L 152 372 L 124 296 L 144 222 L 202 168 Z" fill="#C6FF00"/>
      <path d="M 256 148 L 310 168 L 318 200 L 256 188 L 194 200 L 202 168 Z" fill="#A8D900"/>
      <path d="M 256 195 L 300 215 L 320 268 L 308 332 L 256 360 L 204 332 L 192 268 L 212 215 Z" fill="#F5FFD0"/>
      <path d="M 256 260 L 238 300 L 256 312 L 274 300 Z" fill="#0A1400"/>
      <ellipse cx="256" cy="312" rx="18" ry="12" fill="#07080A"/>
      <ellipse cx="250" cy="308" rx="5" ry="3.5" fill="#C6FF00" opacity="0.6"/>
      <ellipse cx="218" cy="248" rx="22" ry="20" fill="#07080A"/>
      <ellipse cx="218" cy="248" rx="14" ry="13" fill="#C6FF00"/>
      <ellipse cx="218" cy="248" rx="7" ry="7" fill="#07080A"/>
      <circle cx="222" cy="244" r="3.5" fill="white" opacity="0.9"/>
      <ellipse cx="294" cy="248" rx="22" ry="20" fill="#07080A"/>
      <ellipse cx="294" cy="248" rx="14" ry="13" fill="#C6FF00"/>
      <ellipse cx="294" cy="248" rx="7" ry="7" fill="#07080A"/>
      <circle cx="298" cy="244" r="3.5" fill="white" opacity="0.9"/>
      <path d="M 175 290 L 198 278 L 195 300 Z" fill="#A8D900" opacity="0.7"/>
      <path d="M 337 290 L 314 278 L 317 300 Z" fill="#A8D900" opacity="0.7"/>
      <path d="M 242 336 Q 256 348 270 336" stroke="#0A1400" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── STYLES ───────────────────────────────────────────────────────────────── */
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
@keyframes pop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
.alldone-bg{position:fixed;inset:0;z-index:88;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.85);animation:ov .3s ease}
.alldone-box{background:var(--s1);border:2px solid var(--lime);border-radius:var(--r);padding:32px 28px;text-align:center;animation:pop .4s cubic-bezier(.16,1,.3,1);max-width:380px;width:100%}
.zeug-bg{position:fixed;inset:0;z-index:95;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.92);animation:ov .3s ease;overflow-y:auto;padding:20px 0 0}
.zeug-inner{background:var(--s1);border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:0 24px 60px;animation:shu .4s cubic-bezier(.16,1,.3,1)}
.zeug-card{background:linear-gradient(135deg,#0F1A00 0%,#0A1400 40%,#111800 100%);border:1px solid rgba(198,255,0,.2);border-radius:20px;padding:28px 24px;position:relative;overflow:hidden;margin-bottom:20px}
.zeug-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top right,rgba(198,255,0,.08) 0%,transparent 60%)}
.zeug-card::after{content:'🦊';position:absolute;bottom:-4px;right:12px;font-size:72px;opacity:.07;pointer-events:none}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.stat{background:var(--s2);border-radius:var(--rs);padding:14px 10px;text-align:center;border:1px solid var(--bdr)}
.sn{font-family:'Syne',sans-serif;font-weight:800;font-size:24px;color:var(--lime);line-height:1;margin-bottom:4px}
.sl{font-size:10px;color:var(--muted);font-family:'Syne',sans-serif;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.hcard{background:var(--s1);border:1px solid var(--bdr);border-radius:var(--r);padding:18px 20px;cursor:pointer;transition:all .2s}.hcard:hover{border-color:var(--bdr2);transform:translateX(3px)}
.warn{background:rgba(255,179,0,.08);border:1px solid rgba(255,179,0,.22);border-radius:var(--rs);padding:12px 16px;display:flex;align-items:flex-start;gap:10px;font-size:12px;color:rgba(255,179,0,.85);line-height:1.5}
.consent-bg{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:200;display:flex;align-items:flex-end;justify-content:center}
.consent-box{background:var(--s1);border-radius:24px 24px 0 0;width:100%;max-width:430px;padding:28px 24px 48px;animation:shu .4s cubic-bezier(.16,1,.3,1)}
.lang-sw{display:flex;gap:8px}
.lang-btn{padding:7px 16px;border-radius:100px;border:1.5px solid var(--bdr);background:transparent;color:var(--muted);font-family:'Syne',sans-serif;font-weight:700;font-size:12px;cursor:pointer;transition:all .2s;letter-spacing:.06em}
.lang-btn.on{background:var(--ld);border-color:rgba(198,255,0,.35);color:var(--lime)}
@keyframes fu{from{opacity:0;transform:translateY(13px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fu .45s cubic-bezier(.16,1,.3,1) both}
.f1{animation-delay:.05s}.f2{animation-delay:.1s}.f3{animation-delay:.15s}.f4{animation-delay:.2s}
.noise-layer{position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");pointer-events:none;z-index:999;opacity:.4}
@keyframes cf{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
.spin{animation:spin 1s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.err{color:var(--red);font-size:13px;margin-top:8px}
.qr-scan video{width:220px;height:220px;object-fit:cover;border-radius:16px}
/* Wrapped */
.wrapped-card{background:linear-gradient(135deg,var(--s1),var(--s2));border:1px solid var(--bdr);border-radius:var(--r);padding:20px;margin-bottom:12px}
.wrapped-big{font-family:'Syne',sans-serif;font-weight:800;font-size:36px;color:var(--lime);line-height:1;margin-bottom:4px}
/* Trick reveal */
.trick-reveal{background:linear-gradient(135deg,#1A0F00,#0F0800);border:1.5px solid rgba(255,179,0,.3);border-radius:var(--r);overflow:hidden}
.trick-header{background:rgba(255,179,0,.1);padding:12px 16px;border-bottom:1px solid rgba(255,179,0,.2);display:flex;align-items:center;gap:8px}
`

/* ─── HELPERS ──────────────────────────────────────────────────────────────── */
function BackIcon(){return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
function Spinner(){return <span className="spin">⟳</span>}

function QRCodeDisplay({code}){
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
      {Array.from({length:50},(_,i)=>(
        <div key={i} style={{position:'absolute',left:`${Math.random()*100}%`,top:-20,
          width:6+Math.random()*8,height:6+Math.random()*8,
          background:['#C6FF00','#EC4899','#3B82F6','#FFB300','#8B5CF6','#10B981'][i%6],
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

function LangSwitch({lang,setLang}){
  return(
    <div className="lang-sw">
      {['de','en'].map(l=>(
        <button key={l} className={`lang-btn${lang===l?' on':''}`} onClick={()=>setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function ConsentScreen({lang,onAccept,onLegal}){
  const T=(k,...a)=>tr(k,lang,...a)
  return(
    <div className="consent-bg">
      <div className="consent-box">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <FoxLogo size={36}/>
            <span style={{fontFamily:'Syne',fontWeight:800,fontSize:18}}><span style={{color:'var(--lime)'}}>Memo</span>fox</span>
          </div>
        </div>
        <div style={{fontSize:32,textAlign:'center',marginBottom:12}}>📸</div>
        <div className="head" style={{fontSize:20,textAlign:'center',marginBottom:8}}>{T('consentTitle')}</div>
        <p style={{color:'var(--muted)',fontSize:13,textAlign:'center',lineHeight:1.7,marginBottom:20}}>{T('consentText')}</p>
        <div className="warn" style={{marginBottom:20}}>
          <span>⚠️</span><span>{T('consentWarn')}</span>
        </div>
        <button className="btn bp" onClick={onAccept} style={{marginBottom:10}}>{T('consentAccept')}</button>
        <button onClick={onLegal} style={{width:'100%',background:'none',border:'none',color:'var(--muted)',fontSize:12,cursor:'pointer',padding:'8px',fontFamily:'DM Sans'}}>
          {T('consentLegal')}
        </button>
      </div>
    </div>
  )
}

/* ─── HOME ─────────────────────────────────────────────────────────────────── */
function HomeScreen({lang,setLang,onHost,onJoin,onHistory,histCount,onLegal}){
  const T=(k,...a)=>tr(k,lang,...a)
  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'0 24px',position:'relative',overflow:'hidden'}}>
      <div className="orb" style={{width:300,height:300,background:'rgba(198,255,0,.07)',top:-120,right:-80}}/>
      <div style={{position:'absolute',top:52,right:24,zIndex:10}}><LangSwitch lang={lang} setLang={setLang}/></div>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',paddingTop:80}}>
        <div className="fu" style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
          <FoxLogo size={44}/>
          <span className="disp" style={{fontSize:28,letterSpacing:'-.01em'}}><span style={{color:'var(--lime)'}}>Memo</span>fox</span>
        </div>
        <div className="fu f1 disp" style={{fontSize:46,lineHeight:1.05,letterSpacing:'-.02em',marginBottom:14}}>
          {T('tagline').split('\n').map((l,i)=><div key={i} style={i===1?{color:'var(--lime)'}:{}}>{l}</div>)}
        </div>
        <p className="fu f2" style={{color:'var(--muted)',fontSize:15,lineHeight:1.7,marginBottom:50,maxWidth:280}}>
          {T('sub')}
        </p>
        <div className="fu f3" style={{display:'flex',flexDirection:'column',gap:11}}>
          <button className="btn bp" onClick={onHost}>{T('startSession')}</button>
          <button className="btn bs" onClick={onJoin}>{T('joinSession')}</button>
        </div>
      </div>
      <div className="fu f4" style={{paddingBottom:44,display:'flex',flexDirection:'column',gap:12}}>
        {histCount>0&&(
          <button onClick={onHistory} style={{width:'100%',padding:'13px',background:'transparent',border:'1px solid var(--bdr)',borderRadius:'var(--rs)',cursor:'pointer',color:'var(--muted)',fontSize:13,fontFamily:'Syne',fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'all .2s'}}>
            🗂&nbsp;{T('pastSessions')} ({histCount})
          </button>
        )}
        <button onClick={onLegal} style={{background:'none',border:'none',color:'rgba(239,241,245,.2)',fontSize:11,cursor:'pointer',fontFamily:'Syne',fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase'}}>
          Impressum & Datenschutz
        </button>
      </div>
    </div>
  )
}

/* ─── SETUP ────────────────────────────────────────────────────────────────── */
function SetupScreen({lang,onStart,onBack}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[step,setStep]=useState(0)
  const[occ,setOcc]=useState(null)
  const[vibe,setVibe]=useState(null)
  const[count,setCount]=useState(20)
  const[multi,setMulti]=useState(false)
  const[customTasks,setCustomTasks]=useState(['','',''])
  const[loading,setLoading]=useState(false)
  const[err,setErr]=useState('')
  const prog=[20,40,60,80,100][step]
  const ok=[!!occ,!!vibe,true,true,true][step]

  const handleStart=async()=>{
    setLoading(true);setErr('')
    try{await onStart({occ,vibe,count,customTasks:customTasks.filter(t=>t.trim())})}
    catch(e){setErr(e.message||'Error');console.error(e)}
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'52px 24px 0',display:'flex',alignItems:'center',gap:14,marginBottom:26}}>
        <button className="bi" onClick={step===0?onBack:()=>setStep(s=>s-1)}><BackIcon/></button>
        <div style={{flex:1}}>
          <div className="lbl" style={{marginBottom:6}}>{T('step')} {step+1} {T('of')} 5</div>
          <div className="prog"><div className="pf" style={{width:`${prog}%`}}/></div>
        </div>
      </div>
      <div style={{flex:1,padding:'0 24px',overflowY:'auto',paddingBottom:20}}>
        {step===0&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>{T('whichOccasion')}</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>{T('occasionSub')}</p>
          <div className="fu f2" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:11}}>
            {OCCASIONS.map(o=>(
              <div key={o.id} className={`si ${occ===o.id?'on':''}`} onClick={()=>setOcc(o.id)} style={{padding:'18px 12px',borderRadius:'var(--r)'}}>
                <span className="ico" style={{fontSize:26}}>{o.icon}</span>
                <span className="stx" style={{fontSize:12}}>{typeof o.label==='object'?o.label[lang]||o.label.de:o.label}</span>
              </div>
            ))}
          </div>
        </div>}
        {step===1&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>{T('whichVibe')}</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>{T('vibeSub')}</p>
          <div style={{display:'flex',flexDirection:'column',gap:11}} className="fu f2">
            {VIBES.map(v=>(
              <div key={v.id} onClick={()=>setVibe(v.id)} style={{padding:'18px 20px',background:vibe===v.id?(v.id==='bold'?'rgba(255,79,0,0.08)':'var(--ld)'):'var(--s1)',border:`1.5px solid ${vibe===v.id?(v.id==='bold'?'rgba(255,79,0,0.4)':'rgba(198,255,0,.4)'):'var(--bdr)'}`,borderRadius:'var(--r)',cursor:'pointer',transition:'all .2s',display:'flex',alignItems:'center',gap:14}}>
                <span style={{fontSize:24}}>{v.icon}</span>
                <div style={{flex:1}}>
                  <div className="head" style={{fontSize:15,color:vibe===v.id?(v.id==='bold'?'#FF8C42':'var(--lime)'):'var(--white)'}}>{typeof v.label==='object'?v.label[lang]||v.label.de:v.label}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{typeof v.desc==='object'?v.desc[lang]||v.desc.de:v.desc}</div>
                </div>
                {vibe===v.id&&<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 9L7 12.5L14.5 5" stroke={v.id==='bold'?'#FF8C42':'#C6FF00'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            ))}
          </div>
          {vibe==='bold'&&(
            <div className="fu" style={{marginTop:14,background:'rgba(255,79,0,0.07)',border:'1px solid rgba(255,79,0,0.22)',borderRadius:'var(--rs)',padding:'12px 16px',fontSize:12,color:'rgba(255,140,66,0.9)',lineHeight:1.6}}>
              🌶️ {lang==='de'?'Dieser Vibe ist für Erwachsene. Alle Aufgaben sind freiwillig — niemand muss etwas machen das er nicht möchte.':'This vibe is for adults. All tasks are optional — nobody has to do anything they\'re not comfortable with.'}
            </div>
          )}
        </div>}
        {step===2&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>{T('howMany')}</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>{T('howManySub')}</p>
          <div className="fu f2" style={{display:'flex',flexWrap:'wrap',gap:9,marginBottom:22}}>
            {COUNTS.map(n=><div key={n} className={`pill ${count===n?'on':''}`} onClick={()=>setCount(n)}>{n}</div>)}
          </div>
          <div className="fu f3 card" style={{fontSize:13,color:'var(--muted)',lineHeight:1.7,padding:'14px 18px'}}>
            💡 {count} {T('tasks')} → ~{Math.ceil(count/5)} {lang==='de'?'pro Person':'per person'} + ⭐
          </div>
        </div>}
        {step===3&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>{T('ownTasks')}</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:26,fontSize:14}}>{T('ownTasksSub')}</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}} className="fu f2">
            {customTasks.map((ct,i)=>(
              <input key={i} className="inp" placeholder={T('ownTaskPlaceholder',i+1)} value={ct}
                onChange={e=>{const n=[...customTasks];n[i]=e.target.value;setCustomTasks(n)}}/>
            ))}
          </div>
          <p className="fu f3" style={{color:'var(--muted)',fontSize:12,marginTop:12,lineHeight:1.6}}>{T('ownTaskNote')}</p>
        </div>}
        {step===4&&<div>
          <div className="head fu" style={{fontSize:26,marginBottom:7}}>{T('rules')}</div>
          <p className="fu f1" style={{color:'var(--muted)',marginBottom:22,fontSize:14}}>{T('rulesSub')}</p>
          <div className="card fu f2" style={{padding:'14px 18px'}}>
            <div className="lbl" style={{marginBottom:11}}>{T('summary')}</div>
            {[
              {l:T('occasion'),v:(OCCASIONS.find(o=>o.id===occ)||{icon:'—',label:{de:'—',en:'—'}}).icon+' '+(typeof(OCCASIONS.find(o=>o.id===occ)||{label:{de:'—',en:'—'}}).label==='object'?(OCCASIONS.find(o=>o.id===occ)||{label:{de:'—'}}).label[lang]||(OCCASIONS.find(o=>o.id===occ)||{label:{de:'—'}}).label.de:'—')},
              {l:T('vibe'),v:(VIBES.find(v=>v.id===vibe)||{icon:'—',label:{de:'—',en:'—'}}).icon+' '+(typeof(VIBES.find(v=>v.id===vibe)||{label:{de:'—',en:'—'}}).label==='object'?(VIBES.find(v=>v.id===vibe)||{label:{de:'—'}}).label[lang]||(VIBES.find(v=>v.id===vibe)||{label:{de:'—'}}).label.de:'—')},
              {l:T('tasks'),v:`${count} + ⭐`},
            ].map(row=>(
              <div key={row.l} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--bdr)',fontSize:13}}>
                <span style={{color:'var(--muted)'}}>{row.l}</span><span style={{fontWeight:500}}>{row.v}</span>
              </div>
            ))}
          </div>
          {err&&<div className="err">{err}</div>}
        </div>}
      </div>
      <div style={{padding:'14px 24px 44px'}}>
        {step<4
          ?<button className="btn bp" onClick={()=>setStep(s=>s+1)} disabled={!ok} style={{opacity:ok?1:.3}}>{T('next')}</button>
          :<button className="btn bp" onClick={handleStart} disabled={loading}>{loading?<><Spinner/> {T('creating')}</>:T('startNow')}</button>
        }
      </div>
    </div>
  )
}

/* ─── LOBBY ────────────────────────────────────────────────────────────────── */
function LobbyScreen({lang,sessionCode,sessionId,onPlay,onBack}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[parts,setParts]=useState([])
  const[copied,setCopied]=useState(false)
  const appUrl=window.location.origin

  useEffect(()=>{
    if(!sessionId)return
    supabase.from('participants').select('*').eq('session_id',sessionId).then(({data})=>{if(data)setParts(data)})
    const ch=supabase.channel(`lobby-${sessionId}`)
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'participants',filter:`session_id=eq.${sessionId}`},
        p=>setParts(prev=>[...prev,p.new]))
      .subscribe()
    return()=>supabase.removeChannel(ch)
  },[sessionId])

  const copyLink=async()=>{
    const url=`${appUrl}?join=${sessionCode}`
    if(navigator.share){
      try{await navigator.share({title:'Memofox 🦊',text:`Komm zu meiner Memofox Session! Code: ${sessionCode}`,url});return}catch(e){}
    }
    navigator.clipboard.writeText(url)
    setCopied(true);setTimeout(()=>setCopied(false),2000)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'52px 24px 44px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
        <button className="bi" onClick={onBack}><BackIcon/></button>
        <div>
          <div className="head" style={{fontSize:19}}>{T('lobby')}</div>
          <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{T('joinAnytime')}</div>
        </div>
        <span className="chip cl" style={{marginLeft:'auto'}}><span className="ldot"/>&nbsp;{parts.length+1}</span>
      </div>
      <div className="card fu" style={{textAlign:'center',padding:'26px 20px',marginBottom:14,position:'relative'}}>
        <div style={{position:'absolute',top:-1,left:'50%',transform:'translateX(-50%)',background:'var(--lime)',color:'var(--bg)',fontSize:10,fontFamily:'Syne',fontWeight:700,padding:'4px 12px',borderRadius:'0 0 8px 8px',letterSpacing:'.1em',textTransform:'uppercase'}}>{T('scanQR')}</div>
        <div style={{marginBottom:14}}>
          <div style={{width:176,height:176,background:'white',borderRadius:14,padding:8,margin:'0 auto'}}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(window.location.origin+'?join='+sessionCode)}&color=07080A&bgcolor=ffffff`}
              alt="QR Code"
              width={160}
              height={160}
              style={{display:'block',borderRadius:8}}
            />
          </div>
        </div>
        <div className="disp" style={{fontSize:28,letterSpacing:'.14em',color:'var(--lime)',marginBottom:5}}>{sessionCode}</div>
        <div style={{fontSize:12,color:'var(--muted)'}}>{T('orEnterCode')}</div>
      </div>
      <button onClick={copyLink} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px',background:'var(--s2)',border:`1px solid ${copied?'rgba(198,255,0,.3)':'var(--bdr)'}`,borderRadius:'var(--rs)',cursor:'pointer',color:copied?'var(--lime)':'var(--muted)',fontSize:12,fontFamily:'Syne',fontWeight:600,marginBottom:22,transition:'all .2s'}}>
        {copied?T('linkCopied'):T('shareLink')}
      </button>
      <div className="lbl" style={{marginBottom:9}}>{T('participants')}</div>
      <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
        <div className="card" style={{padding:'12px 16px',display:'flex',alignItems:'center',gap:11}}>
          <div className="av" style={{width:32,height:32,fontSize:11,background:'rgba(198,255,0,.18)',border:'1.5px solid rgba(198,255,0,.35)',color:'var(--lime)'}}>Du</div>
          <span style={{fontWeight:500,fontSize:14,flex:1}}>Du (Host)</span>
          <span className="chip cl" style={{fontSize:10}}>{T('host')}</span>
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
        <button className="btn bp" onClick={()=>onPlay(parts)}>{T('letsGo',parts.length+1)}</button>
        <p style={{textAlign:'center',fontSize:11,color:'var(--muted)',marginTop:9}}>{T('joinDuringGame')}</p>
      </div>
    </div>
  )
}

/* ─── JOIN ─────────────────────────────────────────────────────────────────── */
function JoinScreen({lang,prefillCode,onJoined,onBack}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[step,setStep]=useState(prefillCode?1:0)
  const[code,setCode]=useState(prefillCode||'')
  const[name,setName]=useState('')
  const[loading,setLoading]=useState(false)
  const[err,setErr]=useState('')
  const[scanning,setScanning]=useState(false)
  const videoRef=useRef()
  const streamRef=useRef()

  const stopScan=()=>{
    if(streamRef.current){streamRef.current.getTracks().forEach(t=>t.stop());streamRef.current=null}
    setScanning(false)
  }
  const startScan=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}})
      streamRef.current=stream
      if(videoRef.current){videoRef.current.srcObject=stream}
      setScanning(true)
      setTimeout(()=>{stopScan()},10000)
    }catch(e){setErr('Kamera nicht verfügbar. Code manuell eingeben.')}
  }
  useEffect(()=>()=>stopScan(),[])

  const join=async()=>{
    setLoading(true);setErr('')
    try{
      const{data:sess,error}=await supabase.from('sessions').select('id,status').eq('code',code.toUpperCase()).in('status',['lobby','active']).single()
      if(error||!sess){setErr(T('sessionNotFound'));setLoading(false);return}
      const color=randomColor()
      const{data:part,error:pErr}=await supabase.from('participants').insert({session_id:sess.id,nickname:name.trim(),avatar_color:color}).select().single()
      if(pErr||!part){setErr(T('joinFailed'));setLoading(false);return}
      localStorage.setItem('quest_pid',part.id)
      localStorage.setItem('quest_pname',name.trim())
      localStorage.setItem('quest_pcolor',color)
      onJoined({sessionId:sess.id,participantId:part.id,nickname:name.trim(),color})
    }catch(e){setErr('Fehler.');console.error(e)}
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',padding:'52px 24px 44px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:36}}>
        <button className="bi" onClick={step===0?onBack:()=>{setStep(0);stopScan()}}><BackIcon/></button>
        <div className="head" style={{fontSize:21}}>{T('joinTitle')}</div>
      </div>
      {step===0&&<div className="fu" style={{flex:1}}>
        <div className="head" style={{fontSize:26,marginBottom:7}}>{T('sessionCode')}</div>
        <p style={{color:'var(--muted)',marginBottom:24,fontSize:14}}>{T('sessionCodeSub')}</p>
        {scanning?(
          <div style={{marginBottom:20,textAlign:'center'}}>
            <div className="qr-scan" style={{position:'relative',display:'inline-block'}}>
              <video ref={videoRef} autoPlay playsInline muted style={{width:220,height:220,objectFit:'cover',borderRadius:16,display:'block'}}/>
              {/* Corner markers */}
              {[['top:8px','left:8px','borderWidth:3px 0 0 3px','borderRadius:4px 0 0 0'],
                ['top:8px','right:8px','borderWidth:3px 3px 0 0','borderRadius:0 4px 0 0'],
                ['bottom:8px','left:8px','borderWidth:0 0 3px 3px','borderRadius:0 0 0 4px'],
                ['bottom:8px','right:8px','borderWidth:0 3px 3px 0','borderRadius:0 0 4px 0'],
              ].map((pos,i)=>(
                <div key={i} style={{position:'absolute',width:24,height:24,borderColor:'var(--lime)',borderStyle:'solid',
                  ...Object.fromEntries(pos.map(p=>{const[k,v]=p.split(':');return[k,v]}))}}/>
              ))}
            </div>
            <button onClick={stopScan} style={{display:'block',margin:'12px auto 0',padding:'10px 20px',background:'var(--s2)',border:'1px solid var(--bdr)',borderRadius:'var(--rs)',color:'var(--muted)',fontSize:13,fontFamily:'Syne',fontWeight:600,cursor:'pointer'}}>
              {T('close')}
            </button>
          </div>
        ):(
          <button onClick={startScan} style={{width:'100%',padding:'14px',background:'var(--ld)',border:'1px solid rgba(198,255,0,.25)',borderRadius:'var(--rs)',color:'var(--lime)',fontSize:14,fontFamily:'Syne',fontWeight:700,cursor:'pointer',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            {T('scanQRBtn')}
          </button>
        )}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
          <div style={{flex:1,height:1,background:'var(--bdr)'}}/><span style={{fontSize:12,color:'var(--muted)'}}>{T('or')}</span><div style={{flex:1,height:1,background:'var(--bdr)'}}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <label className="lbl">{T('enterCode')}</label>
          <input className="inp" placeholder={T('codePlaceholder')} value={code} onChange={e=>setCode(e.target.value.toUpperCase())} style={{fontFamily:'Syne',fontWeight:700,fontSize:22,letterSpacing:'.12em',textAlign:'center'}}/>
          {err&&<div className="err">{err}</div>}
        </div>
      </div>}
      {step===1&&<div className="fu" style={{flex:1}}>
        <div className="head" style={{fontSize:26,marginBottom:7}}>{T('nickname')}</div>
        <p style={{color:'var(--muted)',marginBottom:28,fontSize:14}}>{T('nicknameSub')}</p>
        <input className="inp" placeholder={T('nicknamePlaceholder')} value={name} onChange={e=>setName(e.target.value)} autoFocus/>
        {err&&<div className="err">{err}</div>}
      </div>}
      <div>
        {step===0
          ?<button className="btn bp" onClick={()=>setStep(1)} disabled={code.length<4} style={{opacity:code.length<4?.3:1}}>{T('next')}</button>
          :<button className="btn bp" onClick={join} disabled={!name.trim()||loading} style={{opacity:(!name.trim()||loading)?.3:1}}>{loading?<><Spinner/> {T('joining')}</>:T('joinBtn')}</button>
        }
      </div>
    </div>
  )
}

/* ─── GAME ─────────────────────────────────────────────────────────────────── */
function GameScreen({lang,sessionId,sessionCode,sessionConfig,myParticipantId,myNickname,myColor,isHost,showQRGlobal,setShowQRGlobal,onEnd,onSaveSession}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[tasks,setTasks]=useState([])
  const[parts,setParts]=useState([])
  const[activeId,setActiveId]=useState(null)
  const[phase,setPhase]=useState('list')
  const[uploading,setUploading]=useState(false)
  const[streak,setStreak]=useState(0)
  const[endConfirm,setEndConfirm]=useState(false)
  const[allDone,setAllDone]=useState(false)
  const fileRef=useRef()
  const cameraRef=useRef()
  const videoRef=useRef()
  const{toasts,add}=useToast()
  const multiAllowed=false // Feature removed

  useEffect(()=>{
    if(!sessionId)return
    supabase.from('tasks').select('*').eq('session_id',sessionId).order('sort_order').then(({data})=>{if(data)setTasks(data)})
    supabase.from('participants').select('*').eq('session_id',sessionId).then(({data})=>{if(data)setParts(data)})
    const ch=supabase.channel(`game-${sessionId}`)
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'tasks',filter:`session_id=eq.${sessionId}`},
        p=>{
          setTasks(prev=>{
            const updated=prev.map(t=>t.id===p.new.id?p.new:t)
            if(updated.every(t=>t.status==='done'))setTimeout(()=>setAllDone(true),500)
            return updated
          })
          if(p.new.status==='done'&&p.new.claimed_by!==myParticipantId)
            add(`${p.new.claimed_by_nickname||'?'}: ${(p.new.text||'').slice(0,30)}…`,avatarLetter(p.new.claimed_by_nickname||'?'),'#C6FF00')
        })
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'participants',filter:`session_id=eq.${sessionId}`},
        p=>{setParts(prev=>[...prev,p.new]);add(T('joinedMsg',p.new.nickname),avatarLetter(p.new.nickname),p.new.avatar_color||'#C6FF00')})
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'sessions',filter:`id=eq.${sessionId}`},
        p=>{if(p.new.status==='ended')onEnd()})
      .subscribe()
    return()=>{supabase.removeChannel(ch)}
  },[sessionId])

  const myActive=tasks.find(t=>t.claimed_by===myParticipantId&&t.status==='active')

  const pickTask=async(task)=>{
    if(task.status!=='open'||myActive)return
    // Optimistic update
    setTasks(prev=>prev.map(t=>t.id===task.id?{...t,status:'active',claimed_by:myParticipantId,claimed_by_nickname:myNickname}:t))
    setActiveId(task.id);setPhase('active')
    // Atomic update — only succeeds if still open
    const{data,error}=await supabase.from('tasks')
      .update({status:'active',claimed_by:myParticipantId,claimed_by_nickname:myNickname})
      .eq('id',task.id).eq('status','open').select().single()
    if(error||!data){
      // Race condition — someone else got it first
      setTasks(prev=>prev.map(t=>t.id===task.id?{...t,status:'open',claimed_by:null,claimed_by_nickname:null}:t))
      setActiveId(null);setPhase('list')
      add(lang==='de'?'Aufgabe bereits vergeben — wähle eine andere':'Task taken — choose another','!','#FF4040')
    }
  }

  const cancelTask=async()=>{
    if(!activeId)return
    // Update without claimed_by condition — just reset by ID
    const{error}=await supabase.from('tasks')
      .update({status:'open',claimed_by:null,claimed_by_nickname:null})
      .eq('id',activeId)
    if(!error){
      setTasks(prev=>prev.map(t=>t.id===activeId?{...t,status:'open',claimed_by:null,claimed_by_nickname:null}:t))
    } else {
      // Force local reset even if DB update failed
      setTasks(prev=>prev.map(t=>t.id===activeId?{...t,status:'open',claimed_by:null,claimed_by_nickname:null}:t))
    }
    setActiveId(null);setPhase('list')
  }

  const completeTask=async(file)=>{
    if(!activeId||!file)return
    setUploading(true)
    let photoUrl=null
    try{
      const ext=file.name?.split('.').pop()||'jpg'
      const path=`${sessionId}/${activeId}_${Date.now()}.${ext}`
      const{error:upErr}=await supabase.storage.from('proofs').upload(path,file,{upsert:true})
      if(!upErr){
        const{data:{publicUrl}}=supabase.storage.from('proofs').getPublicUrl(path)
        photoUrl=publicUrl
      }
      const task=tasks.find(t=>t.id===activeId)
      await supabase.from('tasks').update({
        status:'done',photo_url:photoUrl,
        completed_at:new Date().toISOString(),
        claimed_by:myParticipantId,
        claimed_by_nickname:myNickname
      }).eq('id',activeId)
      setTasks(prev=>prev.map(t=>t.id===activeId?{...t,status:'done',photo_url:photoUrl,claimed_by_nickname:myNickname}:t))
      const ns=streak+1;setStreak(ns)
      add(ns>=3?T('streakMsg',ns):T('completedMsg',(task?.text||'').slice(0,26)),avatarLetter(myNickname),myColor||'#C6FF00')
      setActiveId(null);setPhase('list')
    }catch(e){console.error(e);add(lang==='de'?'Upload fehlgeschlagen':'Upload failed','✗','#FF4040')}
    setUploading(false)
  }

  const endSession=async()=>{
    await supabase.from('sessions').update({status:'ended'}).eq('id',sessionId)
    onSaveSession(sessionId)
    onEnd()
  }

  // Share session QR
  const shareSession=async()=>{
    const url=`${window.location.origin}?join=${sessionCode}`
    if(navigator.share){
      try{await navigator.share({title:T('shareTitle'),text:T('shareText'),url})}catch(e){}
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  const done=tasks.filter(t=>t.status==='done').length
  const total=tasks.length

  return(
    <div style={{minHeight:'100vh',paddingBottom:100}}>
      <Toast toasts={toasts}/>

      {/* Header */}
      <div style={{position:'sticky',top:0,zIndex:20,background:'var(--bg)',padding:'50px 24px 13px',borderBottom:'1px solid var(--bdr)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:13}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <FoxLogo size={28}/>
            <div>
              <div className="head" style={{fontSize:18}}>{T('tasks_label')}</div>
              <div style={{display:'flex',alignItems:'center',gap:7,marginTop:2}}>
                <span className="ldot"/><span style={{fontSize:11,color:'var(--muted)'}}>{T('running')} · {parts.length+1} {T('players')}</span>
              </div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            {streak>=2&&<div style={{display:'flex',alignItems:'center',gap:5,padding:'6px 10px',background:'var(--gd)',border:'1px solid rgba(255,179,0,.22)',borderRadius:'var(--rxs)'}}>
              <span style={{fontSize:12}}>🔥</span><span style={{fontFamily:'Syne',fontWeight:700,fontSize:11,color:'var(--gold)'}}>{streak}x</span>
            </div>}
            <div style={{display:'flex'}}>
              {parts.slice(0,3).map((p,i)=>(
                <div key={p.id} className="av" style={{width:24,height:24,fontSize:9,background:(p.avatar_color||'#555')+'22',border:`1.5px solid ${p.avatar_color||'#555'}40`,color:p.avatar_color||'#aaa',marginLeft:i?-6:0,zIndex:3-i}}>{avatarLetter(p.nickname)}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div className="prog" style={{flex:1}}><div className="pf" style={{width:total?`${(done/total)*100}%`:'0%'}}/></div>
          <span style={{fontSize:12,fontFamily:'Syne',fontWeight:700,color:'var(--lime)',whiteSpace:'nowrap'}}>{done}/{total}</span>
        </div>
      </div>

      {/* Tasks */}
      <div style={{padding:'14px 24px',display:'flex',flexDirection:'column',gap:9,paddingBottom:100}}>
        {tasks.map((task,idx)=>{
          const isMyAct=task.claimed_by===myParticipantId&&task.status==='active'
          const isOtherAct=task.status==='active'&&task.claimed_by!==myParticipantId
          const isDone=task.status==='done'
          const hasMyAct=!!myActive
          return(
            <div key={task.id}
              className={`tc ${isDone?'tdone':''} ${isOtherAct?'tlock':''} ${task.is_golden&&!isDone?'tgold':''} ${isMyAct?'tact':''}`}
              onClick={()=>task.status==='open'&&!hasMyAct?pickTask(task):null}
              style={{cursor:task.status==='open'&&!hasMyAct?'pointer':'default',animation:`fu .4s ${idx*.025}s cubic-bezier(.16,1,.3,1) both`}}>
              {task.is_golden&&!isDone&&<div style={{position:'absolute',top:10,right:10}}><span className="chip cg" style={{fontSize:10,padding:'3px 8px'}}>{T('goldenTask')}</span></div>}
              {task.is_custom&&!isDone&&<div style={{position:'absolute',top:10,right:10}}><span className="chip cc" style={{fontSize:10,padding:'3px 8px'}}>{T('customTask')}</span></div>}
              {task.is_video&&!isDone&&!task.is_golden&&!task.is_custom&&<div style={{position:'absolute',top:10,right:10}}><span className="chip" style={{fontSize:10,padding:'3px 8px',background:'rgba(255,79,0,0.1)',borderColor:'rgba(255,79,0,0.3)',color:'#FF8C42'}}>🎬 Video</span></div>}
              <div style={{display:'flex',alignItems:'flex-start',gap:13}}>
                <span style={{fontSize:24,flexShrink:0,marginTop:1}}>{task.emoji}</span>
                <div style={{flex:1,paddingRight:(task.is_golden||task.is_custom)&&!isDone?70:0}}>
                  <div style={{fontSize:13,fontWeight:500,lineHeight:1.45,marginBottom:7,textDecoration:isDone?'line-through':'none',color:isDone?'var(--muted)':'var(--white)'}}>{task.text}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    <span className="chip" style={{fontSize:10,padding:'3px 8px'}}>{T('photo')}</span>
                    {isDone&&<span className="chip cl" style={{fontSize:10,padding:'3px 8px'}}>✓ {task.claimed_by_nickname||''}</span>}
                    {isOtherAct&&<span className="chip cr" style={{fontSize:10,padding:'3px 8px'}}>{T('locked')} {task.claimed_by_nickname}</span>}
                    {isMyAct&&<span className="chip cc" style={{fontSize:10,padding:'3px 8px'}}>{T('myTurn')}</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* End button */}
      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,padding:'12px 24px 34px',background:'linear-gradient(to top,var(--bg) 60%,transparent)',zIndex:22}}>
        {isHost&&<button onClick={()=>setEndConfirm(true)} style={{width:'100%',padding:'13px',background:'transparent',border:'1px solid rgba(255,64,64,.22)',borderRadius:'var(--rs)',color:'var(--red)',fontFamily:'Syne',fontWeight:700,fontSize:13,cursor:'pointer',transition:'all .2s'}}>
          {T('endSession')}
        </button>}
      </div>

      {/* Active task sheet */}
      {phase==='active'&&myActive&&(
        <>
          <div className="overlay" onClick={cancelTask}/>
          <div className="sheet">
            <div className="sh"/>
            <span className="chip cc" style={{fontSize:10,marginBottom:14,display:'inline-flex'}}>{T('activeTask')}</span>
            <div style={{fontSize:30,margin:'10px 0 8px'}}>{myActive.emoji}</div>
            <div style={{fontSize:16,fontWeight:500,lineHeight:1.5,marginBottom:22}}>{myActive.text}</div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>setPhase('upload')} className="btn bp" style={{flex:1,padding:'14px'}}>{T('uploadProof')}</button>
              <button onClick={cancelTask} style={{padding:'14px 16px',background:'var(--rd)',border:'1px solid rgba(255,64,64,.28)',borderRadius:'var(--rs)',color:'var(--red)',cursor:'pointer',fontSize:13,fontFamily:'Syne',fontWeight:700,whiteSpace:'nowrap'}}>{T('cancel')}</button>
            </div>
          </div>
        </>
      )}

      {/* Upload sheet — Photo or Video */}
      {phase==='upload'&&(
        <>
          <div className="overlay" onClick={()=>setPhase('active')}/>
          <div className="sheet">
            <div className="sh"/>
            {myActive?.isVideo
              ?<><div className="head" style={{fontSize:21,marginBottom:5}}>🎬 {lang==='de'?'Video aufnehmen':'Record Video'}</div>
                <p style={{color:'var(--muted)',fontSize:13,marginBottom:20}}>{lang==='de'?'Max. 30 Sekunden. Beweis dass es passiert ist.':'Max. 30 seconds. Proof that it happened.'}</p></>
              :<><div className="head" style={{fontSize:21,marginBottom:5}}>{T('uploadTitle')}</div>
                <p style={{color:'var(--muted)',fontSize:13,marginBottom:20}}>{T('uploadSub')}</p></>
            }
            {/* Photo inputs */}
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{display:'none'}}
              onChange={e=>{const f=e.target.files?.[0];if(f)completeTask(f)}}/>
            <input ref={fileRef} type="file" accept="image/*,video/*" style={{display:'none'}}
              onChange={e=>{const f=e.target.files?.[0];if(f)completeTask(f)}}/>
            {/* Video input */}
            <input ref={videoRef} type="file" accept="video/*" capture="environment" style={{display:'none'}}
              onChange={e=>{const f=e.target.files?.[0];if(f)completeTask(f)}}/>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
              {myActive?.isVideo?(
                <>
                  <button onClick={()=>videoRef.current?.click()} style={{padding:'18px',background:'rgba(255,79,0,0.1)',border:'2px solid rgba(255,79,0,0.35)',borderRadius:'var(--r)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,color:'#FF8C42',fontFamily:'Syne',fontWeight:700,fontSize:15,transition:'all .2s'}}>
                    {uploading?<><span className="spin">⟳</span> {T('uploading')}</>:<><span style={{fontSize:24}}>🎬</span> {lang==='de'?'Video aufnehmen':'Record Video'}</>}
                  </button>
                  <button onClick={()=>fileRef.current?.click()} style={{padding:'14px',background:'var(--s2)',border:'1.5px solid var(--bdr2)',borderRadius:'var(--r)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,color:'var(--muted)',fontFamily:'Syne',fontWeight:600,fontSize:13}}>
                    <span>🖼️</span> {lang==='de'?'Aus Galerie':'From Gallery'}
                  </button>
                </>
              ):(
                <>
                  <button onClick={()=>cameraRef.current?.click()} style={{padding:'18px',background:'var(--ld)',border:'2px solid rgba(198,255,0,.25)',borderRadius:'var(--r)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,color:'var(--lime)',fontFamily:'Syne',fontWeight:700,fontSize:15,transition:'all .2s'}}>
                    {uploading?<><span className="spin">⟳</span> {T('uploading')}</>:<><span style={{fontSize:24}}>📷</span> {lang==='de'?'Kamera öffnen':'Open Camera'}</>}
                  </button>
                  <button onClick={()=>fileRef.current?.click()} style={{padding:'16px',background:'var(--s2)',border:'1.5px solid var(--bdr2)',borderRadius:'var(--r)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,color:'var(--white)',fontFamily:'Syne',fontWeight:600,fontSize:14,transition:'all .2s'}}>
                    <span style={{fontSize:20}}>🖼️</span> {lang==='de'?'Aus Galerie wählen':'Choose from Gallery'}
                  </button>
                </>
              )}
            </div>
            <button onClick={()=>setPhase('active')} className="btn bs" style={{padding:'13px',border:'1px solid var(--bdr2)'}}>{T('back')}</button>
          </div>
        </>
      )}

      {/* All done celebration */}
      {allDone&&(
        <div className="alldone-bg">
          <div className="alldone-box">
            <Confetti on={true}/>
            <div style={{fontSize:52,marginBottom:12}}>🎉</div>
            <div className="head" style={{fontSize:22,marginBottom:8}}>{T('allDoneTitle')}</div>
            <p style={{color:'var(--muted)',fontSize:13,marginBottom:24,lineHeight:1.6}}>{T('allDoneSub')}</p>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setAllDone(false)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>{T('keepPartying')}</button>
              {isHost&&<button onClick={()=>{setAllDone(false);setEndConfirm(true)}} className="btn bp" style={{flex:1,padding:'13px'}}>🏁</button>}
            </div>
          </div>
        </div>
      )}

      {/* QR Sheet — real join link */}
      {showQRGlobal&&(
        <>
          <div className="overlay" onClick={()=>setShowQRGlobal(false)}/>
          <div className="sheet">
            <div className="sh"/>
            <div className="head" style={{fontSize:19,marginBottom:4,textAlign:'center'}}>{T('qrTitle')}</div>
            <p style={{color:'var(--muted)',fontSize:12,textAlign:'center',marginBottom:16}}>{T('qrSub')}</p>
            {/* Real QR Code via Google Charts API */}
            <div style={{width:200,height:200,margin:'0 auto 16px',borderRadius:16,overflow:'hidden',background:'white',padding:8}}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=184x184&data=${encodeURIComponent(window.location.origin+'?join='+sessionCode)}&color=07080A&bgcolor=ffffff`}
                alt="QR Code"
                width={184}
                height={184}
                style={{display:'block',borderRadius:8}}
              />
            </div>
            <div className="disp" style={{fontSize:26,letterSpacing:'.14em',color:'var(--lime)',textAlign:'center',marginBottom:6}}>{sessionCode}</div>
            <p style={{textAlign:'center',fontSize:12,color:'var(--muted)',marginBottom:16}}>{window.location.origin}?join={sessionCode}</p>
            <button onClick={()=>{
              const url=`${window.location.origin}?join=${sessionCode}`
              if(navigator.share){navigator.share({title:T('shareTitle'),text:T('shareText'),url}).catch(()=>{})}
              else{navigator.clipboard.writeText(url)}
            }} className="btn bs" style={{marginBottom:10,border:'1px solid var(--bdr2)'}}>
              📤 {lang==='de'?'Link teilen':'Share Link'}
            </button>
            <button onClick={()=>setShowQRGlobal(false)} className="btn bp">{T('close')}</button>
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
            <div className="head" style={{fontSize:21,textAlign:'center',marginBottom:7}}>{T('endConfirmTitle')}</div>
            <p style={{color:'var(--muted)',fontSize:13,textAlign:'center',marginBottom:26,lineHeight:1.6}}>{T('endConfirmSub',done)}</p>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setEndConfirm(false)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>{T('keepPartying')}</button>
              <button onClick={endSession} style={{flex:1,padding:'13px',background:'var(--rd)',border:'1px solid rgba(255,64,64,.28)',borderRadius:'var(--r)',color:'var(--red)',fontFamily:'Syne',fontWeight:700,fontSize:14,cursor:'pointer'}}>{T('endBtn')}</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ─── END SCREEN ───────────────────────────────────────────────────────────── */
function EndScreen({lang,sessionId,sessionData,onHome}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[conf,setConf]=useState(true)
  const[completions,setCompletions]=useState([])
  const[parts,setParts]=useState([])
  const[showZeugnis,setShowZeugnis]=useState(false)
  const[showReel,setShowReel]=useState(false)
  const[copied,setCopied]=useState(false)

  useEffect(()=>{
    setTimeout(()=>setConf(false),4200)
    setTimeout(()=>setShowZeugnis(true),2000)
    if(!sessionId)return
    supabase.from('tasks').select('*').eq('session_id',sessionId).eq('status','done').order('completed_at').then(({data})=>{if(data)setCompletions(data)})
    supabase.from('participants').select('*').eq('session_id',sessionId).then(({data})=>{if(data)setParts(data)})
  },[sessionId])

  const albumUrl=`${window.location.origin}?album=${sessionId}`

  const shareAlbum=async()=>{
    if(navigator.share){
      try{
        await navigator.share({
          title:'Memofox Album 🦊',
          text:lang==='de'?`Schaut euch unser Memofox Album an! Die Fotos sind 30 Tage verfügbar.`:`Check out our Memofox album! Photos available for 30 days.`,
          url:albumUrl
        })
        return
      }catch(e){}
    }
    navigator.clipboard.writeText(albumUrl)
    setCopied(true);setTimeout(()=>setCopied(false),2500)
  }

  const occ=OCCASIONS.find(o=>o.id===sessionData?.config?.occ)||{icon:'🎉',label:{de:'Party',en:'Party'}}
  const vib=VIBES.find(v=>v.id===sessionData?.config?.vibe)||{icon:'🔥',label:{de:'Party',en:'Party'}}
  const dateStr=new Date(sessionData?.created_at||Date.now()).toLocaleDateString(lang==='de'?'de-DE':'en-GB',{day:'2-digit',month:'long',year:'numeric'})
  const quote=getQuote(lang)
  const photosOnly=completions.filter(c=>c.photo_url)
  const trickCompletions=completions.filter(c=>c.is_trick)

  // Wrapped stats — only count entries with real nicknames
  const playerStats={}
  completions.forEach(c=>{
    const n=c.claimed_by_nickname
    if(n&&n.trim()&&n!=='?')playerStats[n]=(playerStats[n]||0)+1
  })
  const topPlayer=Object.entries(playerStats).sort((a,b)=>b[1]-a[1])[0]

  const occLabel=typeof occ.label==='object'?occ.label[lang]||occ.label.de:occ.label
  const vibLabel=typeof vib.label==='object'?vib.label[lang]||vib.label.de:vib.label

  return(
    <div style={{minHeight:'100vh',padding:'52px 24px 60px',overflowY:'auto'}}>
      <Confetti on={conf}/>
      <div className="fu" style={{textAlign:'center',marginBottom:32}}>
        <FoxLogo size={48}/>
        <div className="disp" style={{fontSize:38,marginTop:12,marginBottom:7}}>{T('whatANight')}</div>
        <p style={{color:'var(--muted)',fontSize:15}}>{T('albumReady')}</p>
      </div>

      {/* Stats */}
      <div className="fu f1" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9,marginBottom:24}}>
        <div className="stat"><div className="sn">{completions.length}</div><div className="sl">{T('tasks_label')}</div></div>
        <div className="stat"><div className="sn">{photosOnly.length}</div><div className="sl">{T('photoCount')}</div></div>
        <div className="stat"><div className="sn">{parts.length+1}</div><div className="sl">{T('people')}</div></div>
      </div>

      {/* REEL BUTTON — viral feature */}
      {photosOnly.length>=2&&(
        <div className="fu f2" style={{marginBottom:20}}>
          <button onClick={()=>setShowReel(true)} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#0F1A00,#1A2800)',border:'2px solid rgba(198,255,0,.3)',borderRadius:'var(--r)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:12,transition:'all .2s',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 60% 50%,rgba(198,255,0,.07) 0%,transparent 70%)'}}/>
            <span style={{fontSize:28}}>🎬</span>
            <div style={{textAlign:'left'}}>
              <div style={{fontFamily:'Syne',fontWeight:800,fontSize:15,color:'var(--lime)'}}>{lang==='de'?'Reel erstellen':'Create Reel'}</div>
              <div style={{fontSize:12,color:'rgba(239,241,245,.5)',marginTop:2}}>{lang==='de'?`${photosOnly.length} Fotos · Memofox Outro · TikTok/Reels ready`:`${photosOnly.length} photos · Memofox outro · TikTok/Reels ready`}</div>
            </div>
            <span style={{marginLeft:'auto',color:'var(--lime)',fontSize:18}}>→</span>
          </button>
        </div>
      )}

      {/* CHAMPION BANNER */}
      {topPlayer&&topPlayer[0]&&(
        <div className="fu f2" style={{marginBottom:20,background:'linear-gradient(135deg,rgba(255,179,0,.08),rgba(255,179,0,.04))',border:'1px solid rgba(255,179,0,.25)',borderRadius:'var(--r)',padding:'18px 20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-10,right:-10,fontSize:80,opacity:.06}}>🏆</div>
          <div className="lbl" style={{color:'rgba(255,179,0,.7)',marginBottom:8}}>🏆 {lang==='de'?'Champion des Abends':'Champion of the Night'}</div>
          <div style={{fontFamily:'Syne',fontWeight:800,fontSize:28,color:'var(--gold)',marginBottom:4}}>{topPlayer[0]}</div>
          <div style={{fontSize:13,color:'var(--muted)'}}>{topPlayer[1]} {lang==='de'?'Aufgaben erledigt':'tasks completed'}</div>
        </div>
      )}

      {showReel&&<ReelGenerator completions={completions} sessionInfo={sessionData} lang={lang} onClose={()=>setShowReel(false)}/>}

      {/* TRICK REVEAL — only if photo exists */}
      {trickCompletions.filter(c=>c.photo_url).length>0&&(
        <div className="fu f2 trick-reveal" style={{marginBottom:20}}>
          <div className="trick-header">
            <span style={{fontSize:18}}>🎭</span>
            <span style={{fontFamily:'Syne',fontWeight:700,fontSize:13,color:'var(--gold)'}}>
              {lang==='de'?`${trickCompletions.filter(c=>c.photo_url).length} Streich${trickCompletions.filter(c=>c.photo_url).length>1?'e':''} enthüllt!`:`${trickCompletions.filter(c=>c.photo_url).length} prank${trickCompletions.filter(c=>c.photo_url).length>1?'s':''} revealed!`}
            </span>
          </div>
          <div style={{padding:'12px 16px',display:'flex',flexDirection:'column',gap:12}}>
            {trickCompletions.filter(c=>c.photo_url).map((c,i)=>(
              <div key={i}>
                <div style={{borderRadius:12,overflow:'hidden',aspectRatio:'4/3',marginBottom:8}}>
                  <img src={c.photo_url} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.5}}>
                  <strong style={{color:'var(--gold)'}}>{c.claimed_by_nickname||'Anonym'}</strong> — {lang==='de'?'hatte keine Ahnung 😂':'had no idea 😂'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Album share */}
      <div className="fu f2 card" style={{marginBottom:20,padding:'18px 20px'}}>
        <div className="lbl" style={{marginBottom:10}}>{T('shareAlbum')}</div>
        <div className="warn" style={{marginBottom:14}}>
          <span>⏰</span><span>{T('albumWarning')}</span>
        </div>
        <button onClick={shareAlbum} className="btn bp" style={{padding:'13px',fontSize:14,marginBottom:10}}>
          {copied?T('copiedAlbum'):T('copyAlbumLink')}
        </button>
        <a href={albumUrl} target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',color:'var(--muted)',fontSize:12,textDecoration:'none'}}>
          {T('openAlbum')}
        </a>
      </div>

      {/* Photo preview */}
      {photosOnly.length>0&&(
        <div className="fu f3" style={{marginBottom:24}}>
          <div className="lbl" style={{marginBottom:12}}>{T('photosLabel',photosOnly.length)}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
            {photosOnly.slice(0,4).map((c,i)=>(
              <div key={c.id} style={{borderRadius:12,overflow:'hidden',aspectRatio:'4/3',background:'var(--s2)',position:'relative'}}>
                <img src={c.photo_url} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',bottom:6,left:6,background:'rgba(0,0,0,.6)',borderRadius:100,padding:'3px 8px',fontSize:10,fontFamily:'Syne',fontWeight:600}}>{c.claimed_by_nickname}</div>
                {c.is_trick&&<div style={{position:'absolute',top:6,right:6,background:'rgba(255,179,0,.85)',borderRadius:100,padding:'2px 7px',fontSize:9,fontFamily:'Syne',fontWeight:700,color:'#000'}}>🎭</div>}
              </div>
            ))}
          </div>
          {photosOnly.length>4&&<div style={{textAlign:'center',color:'var(--muted)',fontSize:12,marginTop:8}}>{T('morePhotos',photosOnly.length-4)}</div>}
        </div>
      )}

      <div className="fu f4" style={{display:'flex',flexDirection:'column',gap:10}}>
        <button className="btn bs" onClick={onHome} style={{border:'1px solid var(--bdr2)'}}>{T('backToHome')}</button>
      </div>

      {/* ABEND-ZEUGNIS */}
      {showZeugnis&&(
        <div className="zeug-bg" onClick={e=>e.target===e.currentTarget&&setShowZeugnis(false)}>
          <div className="zeug-inner">
            <div className="sh"/>
            <div style={{marginBottom:7}}><span className="chip cl" style={{fontSize:10}}>{T('zeugnisTag')}</span></div>
            <div className="head" style={{fontSize:20,marginBottom:18}}>{T('zeugnisTitle')}</div>
            <div className="zeug-card">
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20}}>
                <div>
                  <div style={{fontSize:10,fontFamily:'Syne',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(198,255,0,.5)',marginBottom:5}}>{T('zeugnisLabel')}</div>
                  <div className="disp" style={{fontSize:26,color:'var(--lime)',lineHeight:1.1}}>{occ.icon} {occLabel}</div>
                </div>
                <div style={{fontSize:32}}>{vib.icon}</div>
              </div>
              <div style={{height:1,background:'rgba(198,255,0,.12)',marginBottom:18}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:18}}>
                {[
                  {l:T('dateLabel'),v:dateStr},
                  {l:T('vibeLabel'),v:vibLabel},
                  {l:T('tasksLabel'),v:`${completions.length}/${sessionData?.config?.count||20}`},
                  {l:T('photosLabel2'),v:photosOnly.length},
                ].map(r=>(
                  <div key={r.l} style={{background:'rgba(198,255,0,.05)',borderRadius:10,padding:'10px 12px',border:'1px solid rgba(198,255,0,.1)'}}>
                    <div style={{fontSize:10,color:'rgba(198,255,0,.5)',fontFamily:'Syne',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>{r.l}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--white)'}}>{r.v}</div>
                  </div>
                ))}
              </div>
              {parts.length>0&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:10,fontFamily:'Syne',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(198,255,0,.4)',marginBottom:8}}>{T('whoWasThere')}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {[{nickname:'Du',avatar_color:'#C6FF00'},...parts].map((p,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'center',gap:5,padding:'4px 9px',background:'rgba(255,255,255,.04)',borderRadius:100,border:'1px solid rgba(255,255,255,.07)'}}>
                        <div className="av" style={{width:16,height:16,fontSize:7,background:(p.avatar_color||'#555')+'22',color:p.avatar_color||'#aaa'}}>{avatarLetter(p.nickname)}</div>
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
            <p style={{fontSize:12,color:'var(--muted)',textAlign:'center',marginBottom:18,lineHeight:1.6}}>
              {lang==='de'?'Dein persönliches Zeugnis — teilen oder sichern.':'Your personal certificate — share or save.'}
            </p>
            <div style={{display:'flex',gap:9}}>
              <button onClick={()=>setShowZeugnis(false)} className="btn bs" style={{flex:1,padding:'13px',border:'1px solid var(--bdr2)'}}>{T('close')}</button>
              <button onClick={shareAlbum} className="btn bp" style={{flex:1,padding:'13px'}}>
                📤 {T('shareAlbum')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── HISTORY ──────────────────────────────────────────────────────────────── */
function HistoryScreen({lang,onBack,onView}){
  const T=(k,...a)=>tr(k,lang,...a)
  const[sessions,setSessions]=useState([])
  useEffect(()=>{
    const raw=localStorage.getItem('quest_sessions')
    if(raw)setSessions(JSON.parse(raw))
  },[])
  return(
    <div style={{minHeight:'100vh',padding:'52px 24px 48px'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
        <button className="bi" onClick={onBack}><BackIcon/></button>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <FoxLogo size={28}/>
          <div className="head" style={{fontSize:21}}>{T('historyTitle')}</div>
        </div>
      </div>
      {sessions.length===0?(
        <div style={{textAlign:'center',padding:'60px 0',color:'var(--muted)'}}>
          <div style={{fontSize:44,marginBottom:14}}>🗂</div>
          <div style={{fontFamily:'Syne',fontWeight:600,marginBottom:7}}>{T('noHistory')}</div>
          <div style={{fontSize:13}}>{T('noHistorySub')}</div>
        </div>
      ):(
        <div style={{display:'flex',flexDirection:'column',gap:11}}>
          {sessions.map((s,i)=>{
            const o=OCCASIONS.find(x=>x.id===s.config?.occ)||{icon:'🎉',label:{de:'Party',en:'Party'}}
            const v=VIBES.find(x=>x.id===s.config?.vibe)||{icon:'😎',label:{de:'Chill',en:'Chill'}}
            const d=new Date(s.created_at||Date.now()).toLocaleDateString(lang==='de'?'de-DE':'en-GB',{day:'2-digit',month:'short',year:'numeric'})
            const oLabel=typeof o.label==='object'?o.label[lang]||o.label.de:o.label
            const vLabel=typeof v.label==='object'?v.label[lang]||v.label.de:v.label
            return(
              <div key={i} className="hcard" onClick={()=>onView(s)} style={{animation:`fu .4s ${i*.06}s cubic-bezier(.16,1,.3,1) both`}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:11}}>
                    <span style={{fontSize:24}}>{o.icon}</span>
                    <div>
                      <div style={{fontFamily:'Syne',fontWeight:700,fontSize:14}}>{oLabel}</div>
                      <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{d}</div>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{color:'var(--muted)'}}><path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                  <span className="chip cl" style={{fontSize:10}}>{T('openAlbumArrow')}</span>
                  <span className="chip" style={{fontSize:10}}>{v.icon} {vLabel}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── MAIN APP ─────────────────────────────────────────────────────────────── */
export default function App(){
  const[screen,setScreen]=useState('home')
  const[setupKey,setSetupKey]=useState(0)
  const[lang,setLang]=useState(()=>localStorage.getItem('mf_lang')||'de')
  const[sessionId,setSessionId]=useState(null)
  const[sessionCode,setSessionCode]=useState(null)
  const[sessionData,setSessionData]=useState(null)
  const[myParticipantId,setMyParticipantId]=useState(null)
  const[myNickname,setMyNickname]=useState('Du')
  const[myColor,setMyColor]=useState('#C6FF00')
  const[isHost,setIsHost]=useState(false)
  const[showQR,setShowQR]=useState(false)
  const[prefillCode,setPrefillCode]=useState(null)
  const[albumId,setAlbumId]=useState(null)
  const[consentDone,setConsentDone]=useState(()=>!!localStorage.getItem('mf_consent'))

  const setAndSaveLang=(l)=>{setLang(l);localStorage.setItem('mf_lang',l)}

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search)
    const join=params.get('join')
    const album=params.get('album')
    if(join){setPrefillCode(join);setScreen('join');window.history.replaceState({},'',window.location.pathname)}
    if(album){setAlbumId(album);setScreen('album');window.history.replaceState({},'',window.location.pathname)}
  },[])

  const go=(s)=>{setScreen(s);window.scrollTo(0,0)}

  const handleHostStart=async(config)=>{
    const code=generateCode()
    const{data:sess,error}=await supabase.from('sessions').insert({code,config,status:'lobby'}).select().single()
    if(error)throw error
    const taskList=buildTaskList(config.vibe,config.count,config.customTasks||[],lang,config.occ)
    const taskRows=taskList.map((t,i)=>({
      session_id:sess.id,emoji:t.e,text:t.t,type:'Foto',
      is_golden:t.isGold||false,is_custom:t.isCustom||false,is_trick:t.isTrick||false,is_video:t.isVideo||false,
      status:'open',sort_order:i
    }))
    await supabase.from('tasks').insert(taskRows)
    const history=JSON.parse(localStorage.getItem('quest_sessions')||'[]')
    localStorage.setItem('quest_sessions',JSON.stringify([{...sess,config},...history].slice(0,20)))
    setSessionId(sess.id);setSessionCode(code);setSessionData(sess);setIsHost(true)
    go('lobby')
  }

  const handleGuestJoined=({sessionId:sid,participantId,nickname,color})=>{
    setSessionId(sid);setMyParticipantId(participantId);setMyNickname(nickname);setMyColor(color);setIsHost(false)
    supabase.from('sessions').select('*').eq('id',sid).single().then(({data})=>{if(data){setSessionData(data);setSessionCode(data.code)}})
    go('game')
  }

  const saveSession=(sid)=>{
    const history=JSON.parse(localStorage.getItem('quest_sessions')||'[]')
    const updated=history.map(s=>s.id===sid?{...s,status:'ended'}:s)
    localStorage.setItem('quest_sessions',JSON.stringify(updated))
  }

  const acceptConsent=()=>{localStorage.setItem('mf_consent','1');setConsentDone(true)}

  if(screen==='album')return <Album sessionId={albumId} lang={lang}/>
  if(screen==='legal')return <Legal onBack={()=>go('home')} lang={lang}/>

  return(
    <>
      <style>{S}</style>
      <div className="app">
        <div className="noise-layer"/>
        {!consentDone&&screen!=='join'&&<ConsentScreen lang={lang} onAccept={acceptConsent} onLegal={()=>go('legal')}/>}
        {screen==='game'&&(
          <button onClick={()=>setShowQR(true)} style={{
            position:'fixed',bottom:28,right:`max(20px, calc(50% - 195px))`,
            width:48,height:48,borderRadius:'50%',background:'var(--s2)',
            border:'1.5px solid var(--bdr2)',display:'flex',alignItems:'center',
            justifyContent:'center',cursor:'pointer',zIndex:30,transition:'all .2s',
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
        {screen==='home'&&<HomeScreen lang={lang} setLang={setAndSaveLang} onHost={()=>{setSetupKey(k=>k+1);go('setup')}} onJoin={()=>go('join')} onHistory={()=>go('history')} histCount={JSON.parse(localStorage.getItem('quest_sessions')||'[]').length} onLegal={()=>go('legal')}/>}
        {screen==='setup'&&<SetupScreen key={setupKey} lang={lang} onStart={handleHostStart} onBack={()=>go('home')}/>}
        {screen==='lobby'&&<LobbyScreen lang={lang} sessionCode={sessionCode} sessionId={sessionId} onPlay={()=>go('game')} onBack={()=>go('setup')}/>}
        {screen==='join'&&<JoinScreen lang={lang} prefillCode={prefillCode} onJoined={handleGuestJoined} onBack={()=>go('home')}/>}
        {screen==='game'&&<GameScreen lang={lang} sessionId={sessionId} sessionCode={sessionCode} sessionConfig={sessionData?.config} myParticipantId={myParticipantId} myNickname={myNickname} myColor={myColor} isHost={isHost} showQRGlobal={showQR} setShowQRGlobal={setShowQR} onEnd={()=>go('end')} onSaveSession={saveSession}/>}
        {screen==='end'&&<EndScreen lang={lang} sessionId={sessionId} sessionData={sessionData} onHome={()=>{setSessionId(null);setSessionCode(null);setSessionData(null);go('home')}}/>}
        {screen==='history'&&<HistoryScreen lang={lang} onBack={()=>go('home')} onView={s=>{setAlbumId(s.id);setSessionData(s);go('album')}}/>}
      </div>
    </>
  )
}
