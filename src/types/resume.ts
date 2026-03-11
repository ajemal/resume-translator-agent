export interface Resume {
  name: string
  size: number
  type: string
  content?: string
}

export interface TranslationRequest {
  resume: Resume
  jobDescription: string
  targetLanguage: string
  tone: string
}

export interface TranslationResponse {
  originalResume: Resume
  translatedResume: string
  matchScore: number
  keywords: string[]
  suggestions: string[]
}
