/**
 * Scalloped "verified" seal — a blue rosette with a dark check mark.
 * Colours come from theme tokens so it works in both light and dark themes.
 */
const buildSeal = (): string => {
  const lobes = 12
  const step = (Math.PI * 2) / lobes
  const valley = 8.6
  const crest = 13.4
  const point = (angle: number, radius: number) =>
    `${(12 + radius * Math.cos(angle)).toFixed(2)} ${(12 + radius * Math.sin(angle)).toFixed(2)}`

  let path = ''
  for (let i = 0; i < lobes; i++) {
    const center = -Math.PI / 2 + i * step
    const start = center - step / 2
    const end = center + step / 2
    path += `${i === 0 ? `M ${point(start, valley)}` : ''} Q ${point(center, crest)} ${point(end, valley)} `
  }
  return `${path}Z`
}

const sealPath = buildSeal()

export default function VerifiedSeal({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={sealPath} fill="var(--verified)" />
      <path
        d="M8.2 12.1l2.7 2.7 5-5.2"
        fill="none"
        stroke="var(--verified-ink)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
