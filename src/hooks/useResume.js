import { useState, useCallback } from 'react'
import { resumeApi } from '@services/api'

export const useResume = () => {
  const [resume, setResume] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const uploadResume = useCallback(async (file) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await resumeApi.uploadResume(file)
      setResume(response.data)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const parseResume = useCallback(async (file) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await resumeApi.parseResume(file)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const translateResume = useCallback(async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await resumeApi.translateResume(data)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResume = useCallback(() => {
    setResume(null)
    setError(null)
  }, [])

  return {
    resume,
    isLoading,
    error,
    uploadResume,
    parseResume,
    translateResume,
    clearResume,
  }
}
