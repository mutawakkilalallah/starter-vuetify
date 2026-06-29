import { defineStore } from 'pinia'
import api from '@/api'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    widgets: [],
    loaded: false,
  }),

  actions: {
    async getData (refresh = false) {
      if (this.loaded && !refresh) {
        return
      }
      const resp = await api.get('/dashboard')
      this.widgets = resp.data.data.widgets
      this.loaded = true
    },
  },
})
