import { defineStore } from 'pinia'
import api from '@/api'
import { useAppStore } from '@/stores/app'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    items: [],
    meta: {},
    params: {
      page: 1,
      limit: 25,
      status: null,
      search: '',
    },
    dialog: false,
    form: {
      title: '',
      content: '',
      status: null,
    },
    idEdit: null,
    dialogDelete: false,
    msgDelete: '',
    statusOptions: [],
    filter: [],
    metaLoaded: false,
  }),

  getters: {
    total: state => state.meta.total || 0,
    pageCount: state => state.meta.totalPages || 1,
  },

  actions: {
    async getFilter () {
      const resp = await api.get('/notes/filter')
      this.filter = resp.data.data
    },

    async getStatusOptions () {
      const resp = await api.get('/form/status')
      this.statusOptions = resp.data.data.options
    },

    async getMeta () {
      if (this.metaLoaded) {
        return
      }

      await this.getFilter()
      await this.getStatusOptions()
      this.metaLoaded = true
    },

    async getData () {
      const resp = await api.get('/notes',
        {
          params: {
            ...this.params,
          },
        },
      )
      this.items = resp.data.data
      this.meta = resp.data.meta
    },

    resetForm () {
      this.form.title = ''
      this.form.content = ''
      this.form.status = null
      this.idEdit = null
    },

    openDialog () {
      this.resetForm()
      this.dialog = !this.dialog
    },

    openFilter () {
      const app = useAppStore()

      app.openFilterDrawer({
        filters: this.filter,
        params: this.params,
        onApply: () => this.applyFilter(),
        onReset: () => this.resetFilter(),
        onUpdate: (key, value) => this.updateFilter(key, value),
      })
    },

    updateFilter (key, value) {
      this.params[key] = value || ''
    },

    removeFilter (key) {
      const filterConfig = this.filter.find(f => f.key === key)
      this.params[key] = filterConfig && filterConfig.multiple ? [] : null
      this.params.page = 1
      this.getData()
    },

    applyFilter () {
      this.params.page = 1
      this.getData()
    },

    resetFilter () {
      for (const filter of this.filter) {
        this.params[filter.key] = filter.multiple ? [] : ''
      }

      this.params.page = 1
      this.getData()
    },

    async addData () {
      const resp = await api.post('/notes', this.form)
      if (resp.status === 201) {
        this.openDialog()
        this.getData()
      }
    },

    openEdit (d) {
      const note = d || { id: null, title: '', content: '', status: null }

      this.idEdit = note.id
      this.form.title = note.title
      this.form.content = note.content
      this.form.status = note.status
      this.dialog = true
    },

    saveData () {
      if (this.idEdit) {
        this.editData()
        return
      }

      this.addData()
    },

    async editData () {
      const resp = await api.put(`/notes/${this.idEdit}`, this.form)
      if (resp.status === 200) {
        this.openDialog()
        this.getData()
      }
    },

    confirmDelete (d) {
      const note = d || { id: null, title: '' }

      this.idEdit = note.id
      this.msgDelete = `${note.title}`
      this.dialogDelete = true
    },

    closeConfirmDelete () {
      this.idEdit = null,
      this.msgDelete = '',
      this.dialogDelete = false
    },

    async delData () {
      const resp = await api.delete(`/notes/${this.idEdit}`)
      if (resp.status === 204) {
        this.getData()
        this.closeConfirmDelete()
      }
    },

    rowNumber (index) {
      return (this.params.page - 1) * this.params.limit + index + 1
    },
  },
})
