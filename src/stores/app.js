import { defineStore } from 'pinia'

const filterDrawerCallbacks = {
  onApply: null,
  onReset: null,
  onUpdate: null,
}

export const useAppStore = defineStore('app', {
  state: () => ({
    tableLoadingCount: 0,
    loadingCount: 0,
    tableLoading: false,
    loading: false,
    filterDrawer: {
      show: false,
      filters: [],
      params: {},
    },
    snackbar: {
      show: false,
      color: 'success',
      text: '',
    },
    errorDialog: {
      show: false,
      title: 'Terjadi Kesalahan',
      text: '',
    },
  }),

  actions: {
    startLoading (method) {
      if (method === 'get') {
        this.tableLoadingCount += 1
        this.tableLoading = true
        return
      }

      this.loadingCount += 1
      this.loading = true
    },

    stopLoading (method) {
      if (method === 'get') {
        this.tableLoadingCount = Math.max(this.tableLoadingCount - 1, 0)
        this.tableLoading = this.tableLoadingCount > 0
        return
      }

      this.loadingCount = Math.max(this.loadingCount - 1, 0)
      this.loading = this.loadingCount > 0
    },

    openFilterDrawer ({ filters, params, onApply, onReset, onUpdate } = {}) {
      this.filterDrawer.filters = filters || []
      this.filterDrawer.params = params || {}
      filterDrawerCallbacks.onApply = onApply || null
      filterDrawerCallbacks.onReset = onReset || null
      filterDrawerCallbacks.onUpdate = onUpdate || null
      this.filterDrawer.show = true
    },

    closeFilterDrawer () {
      this.filterDrawer.show = false
    },

    updateFilter (key, value) {
      filterDrawerCallbacks.onUpdate?.(key, value)
    },

    applyFilter () {
      filterDrawerCallbacks.onApply?.()
      this.closeFilterDrawer()
    },

    resetFilter () {
      filterDrawerCallbacks.onReset?.()
      this.closeFilterDrawer()
    },

    showSuccess (text) {
      this.snackbar.color = 'success'
      this.snackbar.text = text
      this.snackbar.show = true
    },

    showError (error) {
      this.errorDialog.text = error?.response?.data?.message || error?.message || 'Terjadi kesalahan'
      this.errorDialog.show = true
    },

    closeSnackbar () {
      this.snackbar.show = false
    },

    closeError () {
      this.errorDialog.show = false
    },
  },
})
