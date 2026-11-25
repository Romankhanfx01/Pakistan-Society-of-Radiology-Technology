export type Form = {
  name: string
  email: string
  phone: string
  city: string
  degree: string
  district: string
  notes: string
}

export type Errors = Record<string, string>

export const initialForm: Form = {
  name: '', email: '', phone: '', city: '', degree: '', district: '', notes: '',
}

export const steps = ['Personal info', 'Degree & district', 'Document upload'] as const
