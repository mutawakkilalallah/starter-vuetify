import { defineStore } from 'pinia'
import api from '@/api'

function avatarUrl (user) {
  const name = encodeURIComponent(user?.name || 'User')

  return `https://ui-avatars.com/api/?background=fff&color=000&name=${name}`
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    initialized: false,
    showPassword: false,
    form: {
      email: '',
      password: '',
    },
  }),

  getters: {
    isAuthenticated: state => Boolean(state.user),
    userAvatar: state => avatarUrl(state.user),
  },

  actions: {
    setUser (user) {
      this.user = user
      this.initialized = true
    },

    clearUser () {
      this.user = null
      this.initialized = true
    },

    resetForm () {
      this.form.email = ''
      this.form.password = ''
      this.showPassword = false
    },

    async login () {
      const resp = await api.post('/auth/login', this.form, { silentSuccess: true })
      this.setUser(resp.data.user)
      this.resetForm()

      return resp.data.user
    },

    async submitLogin (router, redirect) {
      try {
        await this.login()
        router.replace(typeof redirect === 'string' ? redirect : '/')
      } catch {
        // Error dialog is handled globally by the axios interceptor.
      }
    },

    async fetchUser () {
      try {
        const resp = await api.get('/auth/me', { silentError: true })
        this.setUser(resp.data.user)

        return resp.data.user
      } catch (error) {
        this.clearUser()
        throw error
      }
    },

    async logout () {
      try {
        await api.post('/auth/logout', null, { silentSuccess: true })
      } finally {
        this.clearUser()
      }
    },
  },
})
