/** Short, honest public policy pages. Copy must not promise more than the site does. */
export interface LegalPage {
  id: string
  title: string
  paragraphs: string[]
  links?: { label: string; href: string }[]
}

export const legalPages: LegalPage[] = [
  {
    id: 'terms',
    title: 'Terms of use',
    paragraphs: [
      'This website provides general information about the Pakistan Society of Radiology Technology (PSRT). Official notices shown here are reproduced from the society’s public Facebook page and are dated accordingly.',
      'The leadership directory lists only office bearers published by PSRT. It is not a licence-verification or professional registration service, and nothing on this site should be used as proof of credentials.',
      'Content on this site is informational and is not clinical advice. Decisions about patient care must be made by qualified professionals in the appropriate clinical setting.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    paragraphs: [
      'This website does not create user accounts and does not store messages. Information you send through the contact form or application wizard is delivered directly to PSRT by a third-party form-delivery service.',
      'The only data stored in your browser is your theme preference (light or dark), kept locally so the site remembers your choice. This site does not use advertising or analytics cookies.',
      'The site loads fonts and a decorative background from third-party providers; those providers may see standard request data such as your IP address. Do not include sensitive personal or medical information in a message.',
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    paragraphs: [
      'This site is designed to work with keyboard navigation, visible focus indicators, screen readers, reduced-motion preferences and both light and dark colour themes.',
      'We aim to meet WCAG 2.2 AA. If you find a barrier, please tell us so it can be fixed — include the page, your browser and what you were trying to do.',
    ],
    links: [{ label: 'Report an accessibility problem', href: 'mailto:abdulwadooodafridi686@gmail.com?subject=PSRT%20website%20accessibility' }],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    paragraphs: [
      'Corrections, suggestions and reports of broken content are welcome. Because PSRT is a volunteer society, please allow time for a response.',
      'For membership or coordinator applications, use the dedicated forms on this site rather than general feedback.',
    ],
    links: [
      { label: 'Send feedback by email', href: 'mailto:abdulwadooodafridi686@gmail.com?subject=PSRT%20website%20feedback' },
      { label: 'Visit the official Facebook page', href: 'https://www.facebook.com/profile.php?id=61596658681301' },
    ],
  },
]
