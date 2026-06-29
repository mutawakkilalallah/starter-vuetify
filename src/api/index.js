import axios from 'axios'
import { useAppStore } from '@/stores/app'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api').replace(/\/$/, '')

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(config => {
  const app = useAppStore()

  if (config.params) {
    config.params = Object.fromEntries(
      Object.entries(config.params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    )
  }

  app.startLoading(config.method)

  return config
})

api.interceptors.response.use(
  response => {
    const app = useAppStore()
    const method = response.config.method

    app.stopLoading(method)

    if (method !== 'get' && !response.config.silentSuccess) {
      app.showSuccess(response.data?.message || successMessage(method))
    }

    return response
  },
  error => {
    const app = useAppStore()

    app.stopLoading(error.config?.method)
    if (!error.config?.silentError) {
      app.showError(error)
    }
    console.error('API Error:', error.response?.data ?? error.message)
    return Promise.reject(error)
  },
)

function successMessage (method) {
  return {
    post: 'Data berhasil ditambahkan',
    put: 'Data berhasil diperbarui',
    patch: 'Data berhasil diperbarui',
    delete: 'Data berhasil dihapus',
  }[method] || 'Proses berhasil'
}

export default api
