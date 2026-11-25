export type RosterGroup = 'executive' | 'secretary' | 'organizer'

export interface Member {
  id: string
  name: string
  role: string
  group: RosterGroup
  wing: string
  unnamed?: boolean
}

export interface GalleryItem {
  id: string
  src: string
  caption: string
  tag: string
  wide?: boolean
  width: number
  height: number
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface NewsItem {
  id: string
  date: string
  dateLabel: string
  category: string
  title: string
  summary: string
  image: string
  pdf: string
  ref: string
}

export interface SearchHit {
  id: string
  title: string
  excerpt: string
  group: string
  href: string
  keywords?: string
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  mission: string
  location: string
  email: string
  facebook: string
  stats: Stat[]
  notice: {
    ref: string
    issued: string
    deadline: string
    deadlineLabel: string
    title: string
    email: string
  }
}
