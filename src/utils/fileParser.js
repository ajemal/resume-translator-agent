/**
 * File parser utilities for handling different resume formats
 */

export const SUPPORTED_FORMATS = ['pdf', 'doc', 'docx', 'txt']

export const validateFile = (file) => {
  if (!file) return { isValid: false, error: 'No file provided' }

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxFileSize) {
    return { isValid: false, error: 'File size exceeds 10MB limit' }
  }

  const fileExtension = file.name.split('.').pop().toLowerCase()
  if (!SUPPORTED_FORMATS.includes(fileExtension)) {
    return {
      isValid: false,
      error: `Unsupported format. Supported formats: ${SUPPORTED_FORMATS.join(', ')}`,
    }
  }

  return { isValid: true }
}

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Parse resume content based on file type
 * (Actual parsing would depend on backend services or libraries)
 */
export const parseResume = async (file) => {
  const validation = validateFile(file)
  if (!validation.isValid) {
    throw new Error(validation.error)
  }

  const fileExtension = getFileExtension(file.name)

  // Placeholder for different parsing strategies
  switch (fileExtension) {
    case 'pdf':
      return parsePDFResume(file)
    case 'docx':
    case 'doc':
      return parseDocResume(file)
    case 'txt':
      return parseTxtResume(file)
    default:
      throw new Error(`Unsupported format: ${fileExtension}`)
  }
}

const parsePDFResume = async (file) => {
  // TODO: Implement PDF parsing using a library like pdf.js or pdfjs-dist
  console.log('Parsing PDF:', file.name)
  return null
}

const parseDocResume = async (file) => {
  // TODO: Implement DOCX parsing using a library like docx or mammoth
  console.log('Parsing DOC/DOCX:', file.name)
  return null
}

const parseTxtResume = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target.result
        resolve({ text, format: 'txt' })
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
