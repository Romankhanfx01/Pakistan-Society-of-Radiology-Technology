import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

/** Official brand icons. Only channels PSRT has actually published are linked. */
export default function SocialLinks({ facebook }: { facebook: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Social channels">
      <a href={facebook} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="PSRT official Facebook page">
        <FaFacebookF className="brand-facebook" />
      </a>
      <span className="social-btn is-muted" role="img" aria-label="Instagram — not yet published" title="Not yet published"><FaInstagram className="brand-instagram" /></span>
      <span className="social-btn is-muted" role="img" aria-label="YouTube — not yet published" title="Not yet published"><FaYoutube className="brand-youtube" /></span>
      <span className="social-btn is-muted" role="img" aria-label="LinkedIn — not yet published" title="Not yet published"><FaLinkedinIn className="brand-linkedin" /></span>
      <span className="social-btn is-muted" role="img" aria-label="X — not yet published" title="Not yet published"><FaXTwitter className="brand-x" /></span>
    </div>
  )
}
