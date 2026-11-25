import type { ChangeEvent, DragEvent } from 'react'
import { FileCheck2, UploadCloud } from 'lucide-react'
import WizardField from './WizardField'
import type { Errors, Form } from './types'

type StepProps = {
  form: Form
  errors: Errors
  set: (key: keyof Form, value: string) => void
}

export function PersonalStep({ form, errors, set }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <WizardField id="appName" label="Full name" error={errors.name}>
        <input id="appName" className="field-input" required aria-required="true" value={form.name} onChange={e => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'appName-error' : undefined} placeholder="As on CNIC" />
      </WizardField>
      <WizardField id="appEmail" label="Email" error={errors.email}>
        <input id="appEmail" type="email" className="field-input" required aria-required="true" value={form.email} onChange={e => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'appEmail-error' : undefined} placeholder="you@example.com" />
      </WizardField>
      <WizardField id="appPhone" label="Phone (optional)">
        <input id="appPhone" type="tel" className="field-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="03xx-xxxxxxx" />
      </WizardField>
      <WizardField id="appCity" label="Current city">
        <input id="appCity" className="field-input" value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Peshawar" />
      </WizardField>
    </div>
  )
}

export function QualificationStep({ form, errors, set }: StepProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <WizardField id="appDegree" label="Highest qualification" error={errors.degree}>
        <select id="appDegree" className="field-input" required aria-required="true" value={form.degree} onChange={e => set('degree', e.target.value)} aria-invalid={!!errors.degree} aria-describedby={errors.degree ? 'appDegree-error' : undefined}>
          <option value="">Select…</option>
          <option>BS Radiology / Medical Imaging Technology</option>
          <option>MS Radiology / Medical Imaging Technology</option>
          <option>PhD Radiology / Medical Imaging Technology</option>
        </select>
      </WizardField>
      <WizardField id="appDistrict" label="District / Division applied for" error={errors.district}>
        <input id="appDistrict" className="field-input" required aria-required="true" value={form.district} onChange={e => set('district', e.target.value)} aria-invalid={!!errors.district} aria-describedby={errors.district ? 'appDistrict-error' : undefined} placeholder="e.g. Peshawar District" />
      </WizardField>
      <div className="sm:col-span-2">
        <WizardField id="appNotes" label="Short note (optional)">
          <textarea id="appNotes" rows={3} className="field-input" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Relevant academic or organizational experience" />
        </WizardField>
      </div>
    </div>
  )
}

export function DocumentStep({ file, errors, onDrop, onPick }: {
  file: File | null
  errors: Errors
  onDrop: (e: DragEvent<HTMLLabelElement>) => void
  onPick: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="dropzone" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
        <input type="file" accept="application/pdf" className="sr-only" aria-label="Choose merged application PDF" aria-invalid={!!errors.file} aria-describedby={errors.file ? 'appFile-error' : undefined} onChange={onPick} />
        {file ? <FileCheck2 className="h-9 w-9 text-[var(--accent)]" /> : <UploadCloud className="h-9 w-9 text-[var(--accent)]" />}
        <span className="text-sm font-semibold">{file ? file.name : 'Drop your merged PDF here'}</span>
        <span className="meta muted">{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB · click to replace` : 'CV + CNIC + Degree + photograph + district name · max 10 MB'}</span>
        <span className="meta muted">Press Enter or Space to choose a file</span>
      </label>
      {errors.file && <p id="appFile-error" role="alert" className="field-error mt-2">{errors.file}</p>}
      <p className="mt-4 text-xs leading-relaxed muted">The file is sent directly to PSRT with your application details. Keep a copy for your records.</p>
    </div>
  )
}
