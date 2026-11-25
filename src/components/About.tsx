import { Activity, Camera, GraduationCap, Shield } from 'lucide-react'
import type { SiteConfig } from '../types'
import { Reveal } from '../lib/motion'

const pillars = [
  {
    no: '01',
    title: 'Educate',
    icon: GraduationCap,
    text: 'Continuous professional development, clinical workshops and standardized academic curricula across Pakistani universities.',
  },
  {
    no: '02',
    title: 'Empower',
    icon: Shield,
    text: 'Grassroots representation, technologist welfare advocacy and provincial coordination for every practitioner.',
  },
  {
    no: '03',
    title: 'Advance',
    icon: Activity,
    text: 'Radiation safety awareness, institutional compliance support and clear career progression pathways.',
  },
]

export default function About({ config }: { config: SiteConfig }) {
  return (
    <section id="about" className="section-pad section-divider relative">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">About the society</p>
          <h2 className="section-title">A national voice for radiology technology</h2>
          <p className="section-lead">
            From Khyber Pakhtunkhwa to Azad Jammu Kashmir, Punjab, Sindh and Balochistan — PSRT works at the grassroots level to unite medical imaging professionals.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <Reveal>
            <p className="text-base leading-relaxed">{config.mission}</p>
            <p className="mt-4 text-base leading-relaxed muted">
              Our elected leadership and appointed district coordinators interface with hospitals, diagnostic centres and academic institutions to promote safety, dignity and career progression for every practitioner.
            </p>

            <div className="mt-8 space-y-3">
              {pillars.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.no} className="glass flex items-start gap-4 rounded-lg p-4 transition hover:border-[var(--border-strong)]">
                    <span className="icon-tile"><Icon className="h-5 w-5" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="mono text-xs font-bold text-[var(--gold-bright)]">{p.no}.</span>
                        <h3 className="font-display text-base font-bold">{p.title}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed muted">{p.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <blockquote className="mt-8 border-l-2 border-[var(--gold)] pl-5 font-display text-xl font-bold italic sm:text-2xl">
              “Together for a Skilled, Safe and Advanced Radiology Profession.”
            </blockquote>
          </Reveal>

          <Reveal>
            <figure className="glass relative overflow-hidden rounded-lg p-3">
              <div className="card-media">
                <img src="/assets/meeting.jpg" alt="PSRT national leadership meeting in session" width={1376} height={1824} loading="lazy" style={{ aspectRatio: '1376 / 1824' }} className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                <span className="tag absolute left-3 top-3">National leadership in session</span>
                <span className="image-veil absolute inset-0" />
              </div>
              <figcaption className="mt-4 flex items-center gap-2 px-2 text-xs font-medium muted">
                <Camera className="h-4 w-4 text-[var(--accent)]" /> PSRT executive governing body convening on national radiological affairs.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
