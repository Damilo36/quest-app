const S = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#07080A;--s1:#0F1115;--s2:#16191F;--bdr:rgba(255,255,255,0.07);--lime:#C6FF00;--white:#EFF1F5;--muted:rgba(239,241,245,0.5);--r:16px}
html,body{min-height:100%;background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:680px;margin:0 auto;padding:48px 24px 80px}
h1{font-family:'Syne',sans-serif;font-weight:800;font-size:30px;margin-bottom:8px}
h2{font-family:'Syne',sans-serif;font-weight:700;font-size:17px;margin:28px 0 10px;color:var(--lime)}
p{font-size:15px;line-height:1.75;color:var(--muted);margin-bottom:12px}
a{color:var(--lime);text-decoration:none}
.back{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:var(--s2);border:1px solid var(--bdr);border-radius:100px;color:var(--muted);font-size:13px;font-family:'Syne',sans-serif;font-weight:600;cursor:pointer;margin-bottom:32px;transition:all .2s}.back:hover{color:var(--white);border-color:rgba(255,255,255,.13)}
.divider{height:1px;background:var(--bdr);margin:32px 0}
ul{padding-left:20px;color:var(--muted);font-size:15px;line-height:1.85}
`

export default function Legal({ onBack, lang = 'de' }) {
  return (
    <>
      <style>{S}</style>
      <div className="wrap">
        <button className="back" onClick={onBack}>← {lang === 'de' ? 'Zurück' : 'Back'}</button>

        <h1>Impressum</h1>
        <p style={{ color: 'rgba(239,241,245,.35)', fontSize: 13, marginBottom: 24 }}>Angaben gemäß § 5 TMG</p>

        <h2>Verantwortlich</h2>
        <p>
          Daniel Milosz<br />
          Großensterzer Str. 15<br />
          95666 Mitterteich<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>Bei Fragen: <a href="mailto:kontakt@memofox.app">kontakt@memofox.app</a></p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser App werden von den Nutzern selbst erstellt und hochgeladen.
          Wir übernehmen keine Verantwortung für nutzergenerierte Inhalte.
          Jeder Nutzer ist selbst für die von ihm hochgeladenen Inhalte verantwortlich.
        </p>

        <div className="divider" />

        <h1>Datenschutzerklärung</h1>
        <p style={{ color: 'rgba(239,241,245,.35)', fontSize: 13, marginBottom: 24 }}>Zuletzt aktualisiert: April 2026</p>

        <h2>1. Wer wir sind</h2>
        <p>Memofox ist eine Web-App für interaktive Foto-Challenges. Verantwortlicher: Daniel Milosz, Großensterzer Str. 15, 95666 Mitterteich.</p>

        <h2>2. Welche Daten wir speichern</h2>
        <ul>
          <li>Selbst gewählte Nicknames der Teilnehmer</li>
          <li>Fotos die Nutzer im Rahmen von Aufgaben hochladen</li>
          <li>Session-Konfigurationen (Anlass, Vibe, Aufgabenanzahl)</li>
          <li>Zeitstempel der Aktivitäten</li>
        </ul>
        <p style={{ marginTop: 12 }}>Wir speichern keine E-Mail-Adressen, keine echten Namen (außer selbst eingegeben), keine Standortdaten.</p>

        <h2>3. Speicherdauer</h2>
        <p>Alle Fotos und Session-Daten werden automatisch <strong style={{ color: 'var(--white)' }}>30 Tage nach Erstellung</strong> gelöscht. Nutzer werden in der App auf diese Frist hingewiesen.</p>

        <h2>4. Zugriff auf Fotos</h2>
        <p>Fotos sind ausschließlich über den einzigartigen Session-Link zugänglich. Wir prüfen, moderieren oder verwenden die Fotos nicht. Keine Weitergabe an Dritte.</p>

        <h2>5. Technische Infrastruktur</h2>
        <ul>
          <li><strong style={{ color: 'var(--white)' }}>Supabase</strong> (Irland/EU) — Datenbank und Speicherung</li>
          <li><strong style={{ color: 'var(--white)' }}>Vercel</strong> (USA) — Hosting</li>
        </ul>

        <h2>6. Deine Rechte</h2>
        <p>Auskunft, Löschung, Widerspruch: <a href="mailto:kontakt@memofox.app">kontakt@memofox.app</a></p>

        <h2>7. Einwilligung</h2>
        <p>Durch Nutzung der App und Hochladen von Fotos stimmst du dieser Datenschutzerklärung zu.</p>
      </div>
    </>
  )
}
