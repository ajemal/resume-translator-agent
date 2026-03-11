import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// Resume translation endpoints
export const resumeApi = {
  uploadResume: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  translateResume: (data) => apiClient.post('/resume/translate', data),

  parseResume: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/resume/parse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  matchWithJobDescription: (resumeData, jobDescription) =>
    apiClient.post('/resume/match', { resumeData, jobDescription }),
}

// Job description endpoints
export const jobApi = {
  analyzeJobDescription: (jobDescription) =>
    apiClient.post('/jobs/analyze', { jobDescription }),

  extractKeywords: (jobDescription) =>
    apiClient.post('/jobs/keywords', { jobDescription }),
}

// Export the client for custom requests
export default apiClient
