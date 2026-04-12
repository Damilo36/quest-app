import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)

// ── Helpers ──────────────────────────────────────────────

export function generateCode() {
  const L = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const N = '0123456789'
  const l = Array.from({length:4}, ()=>L[Math.floor(Math.random()*L.length)]).join('')
  const n = Array.from({length:4}, ()=>N[Math.floor(Math.random()*N.length)]).join('')
  return `${l}-${n}`
}

export function randomColor() {
  const colors = ['#C6FF00','#8B5CF6','#EC4899','#3B82F6','#F97316','#10B981','#F59E0B','#EF4444']
  return colors[Math.floor(Math.random()*colors.length)]
}

export function avatarLetter(name) {
  return (name||'?')[0].toUpperCase()
}
