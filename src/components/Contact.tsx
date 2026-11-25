import { useState, type FormEvent, type ReactNode } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { FaFacebookF } from 'react-icons/fa6'
import type { SiteConfig } from '../types'
import { FORM_ENDPOINT, FORM_SUBJECT } from '../data/config'
import { Reveal } from '../lib/motion'

export default function Contact({ config }: { config: SiteConfig }) {
  const [form, setForm] = useState({ name: '', email: '', city: '', topic: 'Membership', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null)
  const [busy, setBusy] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.message.trim()) e.message = 'Please write your message.'
    setErrors(e)
    return !Object.keys(e).length
  }

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    setStatus(null)
    if (!validate()) { setStatus({ text: 'Please check the highlighted fields.', ok: false }); return }
    setBusy(true)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: FORM_SUBJECT, ...form }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus({ text: 'Message sent. The PSRT team will get back to you.', ok: true })
      setForm({ name: '', email: '', city: '', topic: 'Membership', message: '' })
    } catch {
      setStatus({ text: 'Delivery could not be completed. Please email PSRT using the address on the left.', ok: false })
    } finally { clearTimeout(timer); setBusy(false) }
  }

  return (
    <section id="contact" className="section-pad section-divider relative">
      <div className="container-x grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow mb-5">Contact</p>
          <h2 className="section-title">Contact the society</h2>
          <p className="section-lead">Membership, coordinator applications, academic partnerships or a general question — we would like to hear from you.</p>

          <ul className="mt-10 space-y-3">
            <li className="glass flex items-start gap-4 rounded-lg p-4">
              <span className="icon-tile"><Mail className="h-5 w-5 brand-email" /></span>
              <div><p className="mono text-[10px] uppercase tracking-[.14em] muted">Email</p><a href={`mailto:${config.email}`} className="mt-1 block min-h-[44px] break-all text-sm font-semibold hover:text-[var(--accent)]">{config.email}</a></div>
            </li>
            <li className="glass flex items-start gap-4 rounded-lg p-4">
              <span className="icon-tile"><MapPin className="h-5 w-5 brand-location" /></span>
              <div><p className="mono text-[10px] uppercase tracking-[.14em] muted">Based in</p><p className="mt-1 text-sm font-semibold">{config.location}</p></div>
            </li>
            <li className="glass flex items-start gap-4 rounded-lg p-4">
              <span className="icon-tile">
                <FaFacebookF className="h-5 w-5 brand-facebook" aria-hidden="true" />
              </span>
              <div><p className="mono text-[10px] uppercase tracking-[.14em] muted">Follow</p><a href={config.facebook} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-semibold hover:text-[var(--accent)]">Pakistan Society of Radiology Technology</a></div>
            </li>
          </ul>
        </Reveal>

        <Reveal>
          <form onSubmit={submit} noValidate className="glass-strong rounded-lg p-6 sm:p-9">
            <div>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Send a message</h3>
              <p className="mono mt-2 text-[10px] uppercase tracking-[.14em] muted">Online contact form</p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="contactName" label="Full name" error={errors.name} required>
                <input id="contactName" className="field-input" required aria-required="true" value={form.name} onChange={e => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contactName-error' : undefined} placeholder="Your name" />
              </Field>
              <Field id="contactEmail" label="Email address" error={errors.email} required>
                <input id="contactEmail" type="email" className="field-input" required aria-required="true" value={form.email} onChange={e => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contactEmail-error' : undefined} placeholder="you@example.com" />
              </Field>
              <Field id="contactCity" label="City / District">
                <input id="contactCity" className="field-input" value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Peshawar" />
              </Field>
              <Field id="contactTopic" label="I am interested in">
                <select id="contactTopic" className="field-input" value={form.topic} onChange={e => set('topic', e.target.value)}>
                  <option>Membership</option><option>Coordinator application</option><option>Academic activity</option><option>General enquiry</option>
                </select>
              </Field>
            </div>
            <div className="mt-5">
              <Field id="contactMessage" label="Message" error={errors.message} required>
                <textarea id="contactMessage" rows={5} className="field-input" required aria-required="true" value={form.message} onChange={e => set('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contactMessage-error' : undefined} placeholder="Write your message here..." />
              </Field>
            </div>
            <p className="mt-4 text-[11px] muted">Your message is sent to the PSRT contact address. No data is stored by this website.</p>
            <button type="submit" disabled={busy} className="btn btn-primary btn-block mt-6">{busy ? 'Sending…' : 'Send message'} <Send /></button>
            <p className={`mt-4 min-h-[1.25rem] text-sm ${status?.ok ? 'text-[var(--accent)]' : status ? 'text-[var(--danger)]' : ''}`} role="status" aria-live="polite">{status?.text ?? ''}</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label} {required && <span className="text-[var(--gold)]" aria-hidden="true">*</span>}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="field-error">{error}</p>}
    </div>
  )
}
