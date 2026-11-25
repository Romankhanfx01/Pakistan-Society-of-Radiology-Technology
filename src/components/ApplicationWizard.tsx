import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import { gsap } from 'gsap'
import { FORM_ENDPOINT } from '../data/config'
import { prefersReducedMotion } from '../lib/prefs'
import { initialForm, steps, type Errors, type Form } from './wizard/types'
import { DocumentStep, PersonalStep, QualificationStep } from './wizard/WizardSteps'

export default function ApplicationWizard() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(initialForm)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-wizard-open]')
      if (trigger) {
        triggerRef.current = trigger
        setStep(0); setForm(initialForm); setFile(null); setErrors({}); setStatus(''); setOpen(true)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    if (!prefersReducedMotion()) {
      gsap.fromTo(panel.current, { scale: .95, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: .4, ease: 'back.out(1.4)' })
    }
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab') return
      const items = Array.from(panel.current?.querySelectorAll<HTMLElement>('button, input:not([type="file"]), select, textarea, a[href]') ?? [])
      if (!items.length) return
      const first = items[0]!, last = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      triggerRef.current?.focus()
    }
  }, [open])

  const set = (key: keyof Form, value: string) => setForm(f => ({ ...f, [key]: value }))

  const validateStep = (index: number): boolean => {
    const e: Errors = {}
    if (index === 0) {
      if (!form.name.trim()) e.name = 'Enter your full name.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    }
    if (index === 1) {
      if (!form.degree) e.degree = 'Select your qualification.'
      if (!form.district.trim()) e.district = 'Enter the district / division you are applying for.'
    }
    if (index === 2 && !file) e.file = 'Attach your merged PDF.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const acceptFile = (f: File | null) => {
    if (!f) return
    if (f.type !== 'application/pdf') { setErrors({ file: 'Only PDF files are accepted.' }); return }
    if (f.size > 10 * 1024 * 1024) { setErrors({ file: 'File must be under 10 MB.' }); return }
    setFile(f); setErrors({})
  }

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    acceptFile(e.dataTransfer.files[0] ?? null)
  }
  const onPick = (e: ChangeEvent<HTMLInputElement>) => acceptFile(e.target.files?.[0] ?? null)

  const submit = async () => {
    if (!validateStep(2)) return
    setBusy(true); setStatus('')
    const data = new FormData()
    data.append('_subject', `PSRT Coordinator Application — ${form.name}`)
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (file) data.append('merged_application_pdf', file, file.name)
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('Application sent. PSRT will contact shortlisted candidates.')
      setFile(null); setForm(initialForm); setStep(0)
    } catch {
      setStatus('Delivery could not be completed. Please email the merged PDF to the address in the notification.')
    } finally { setBusy(false) }
  }

  if (!open) return null

  const stepProps = { form, errors, set }

  return (
    <div className="modal-scrim z-[210]" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false) }} role="dialog" aria-modal="true" aria-label="Coordinator application wizard">
      <div ref={panel} className="modal-panel max-w-2xl p-6 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Application wizard</p>
            <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">District / Divisional Coordinator</h3>
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="lb-btn" aria-label="Close wizard"><X /></button>
        </div>

        <ol className="mt-8 flex items-center gap-3">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-3">
              <span className={`step-dot ${i === step ? 'is-active' : i < step ? 'is-done' : ''}`}>{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
              <span className={`meta hidden sm:block ${i === step ? 'text-[var(--accent)]' : 'muted'}`}>{label}</span>
              {i < steps.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
            </li>
          ))}
        </ol>

        <div className="mt-8 min-h-[260px]">
          {step === 0 && <PersonalStep {...stepProps} />}
          {step === 1 && <QualificationStep {...stepProps} />}
          {step === 2 && <DocumentStep file={file} errors={errors} onDrop={onDrop} onPick={onPick} />}
        </div>

        <div className="sticky bottom-0 z-10 -mx-6 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--bg-soft)] px-6 py-4 sm:-mx-9 sm:px-9">
          <button type="button" className="btn btn-ghost btn-sm" disabled={step === 0 || busy} onClick={() => setStep(s => s - 1)}><ArrowLeft /> Back</button>
          <div className="flex flex-wrap items-center gap-3">
            <p className="min-h-[1rem] max-w-xs text-xs" role="status" aria-live="polite">{status}</p>
            {step < 2
              ? <button type="button" className="btn btn-primary btn-sm" onClick={() => { if (validateStep(step)) setStep(s => s + 1) }}>Continue <ArrowRight /></button>
              : <button type="button" className="btn btn-primary btn-sm" disabled={busy} onClick={submit}>{busy ? 'Sending…' : 'Submit application'} <ArrowRight /></button>}
          </div>
        </div>
      </div>
    </div>
  )
}
