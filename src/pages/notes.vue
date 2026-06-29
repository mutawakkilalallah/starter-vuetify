<template>
  <AppBreadcrumbs>
    <v-breadcrumbs-item to="/" />
    <v-breadcrumbs-divider />
    <v-breadcrumbs-item disabled>Notes</v-breadcrumbs-item>
  </AppBreadcrumbs>

  <DataToolbar
    v-model:limit="store.params.limit"
    v-model:search="store.params.search"
    :filters="store.filter"
    :params="store.params"
    :total="store.meta.total"
    @create="store.openDialog"
    @open-filter="store.openFilter"
    @refresh="store.getData"
    @remove-filter="store.removeFilter"
    @update:limit="store.params.page = 1; store.getData()"
    @update:search="store.params.page = 1; store.getData()"
  />

  <AppTable
    :columns="columns"
    :items="store.items"
    :loading="app.tableLoading"
  >
    <template #row="{ item, index }">
      <tr
        class="cursor-pointer"
        @contextmenu.prevent="e => openContextMenu(e, item)"
      >
        <td>
          <div class="d-flex align-center">
            <v-sheet
              color="transparent"
              width="24"
            >
              {{ store.rowNumber(index) }}
            </v-sheet>

            <v-defaults-provider scoped>
              <v-menu>
                <template #activator="{ props: menuProps }">
                  <v-btn
                    v-bind="menuProps"
                    density="compact"
                    icon="mdi-dots-vertical"
                    size="small"
                    variant="plain"
                  />
                </template>

                <v-list density="compact">
                  <v-list-item
                    prepend-icon="mdi-pencil"
                    title="Edit"
                    @click="store.openEdit(item)"
                  />

                  <v-list-item
                    class="text-red"
                    prepend-icon="mdi-delete"
                    title="Hapus"
                    @click="store.confirmDelete(item)"
                  />
                </v-list>
              </v-menu>
            </v-defaults-provider>
          </div>
        </td>

        <td>{{ item.title }}</td>

        <td>
          <v-chip
            :color="statusColor(item.status)"
            size="small"
            variant="tonal"
          >
            {{ item.status }}
          </v-chip>
        </td>

        <td>{{ formatDate(item.created_at) }}</td>
        <td>{{ formatDate(item.updated_at) }}</td>
      </tr>
    </template>
  </AppTable>

  <div class="d-flex justify-center my-4">
    <v-pagination
      v-if="store.meta.totalPages > 1"
      v-model="store.params.page"
      color="primary"
      density="compact"
      :length="store.meta.totalPages"
      total-visible="5"
      @update:model-value="store.getData"
    />
  </div>

  <AppFormDialog
    v-model="store.dialog"
    :title="store.idEdit ? 'Edit Note' : 'Tambah Note'"
    @save="store.saveData"
  >
    <v-text-field
      v-model="store.form.title"
      label="Title"
      required
    />

    <v-textarea
      v-model="store.form.content"
      label="Content"
      rows="4"
    />

    <v-select
      v-model="store.form.status"
      :items="store.statusOptions"
      label="Status"
    />
  </AppFormDialog>

  <AppConfirmDialog
    v-model="store.dialogDelete"
    :message="deleteMessage"
    title="Hapus Note"
    @cancel="store.closeConfirmDelete"
    @confirm="store.delData"
  />

  <v-menu
    v-model="showMenu"
    :target="menuCoords"
  >
    <v-list density="compact">
      <v-list-item
        prepend-icon="mdi-pencil"
        title="Edit"
        @click="store.openEdit(activeNote)"
      />

      <v-list-item
        class="text-red"
        prepend-icon="mdi-delete"
        title="Hapus"
        @click="store.confirmDelete(activeNote)"
      />
    </v-list>
  </v-menu>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
  import AppConfirmDialog from '@/components/AppConfirmDialog.vue'
  import AppFormDialog from '@/components/AppFormDialog.vue'
  import AppTable from '@/components/AppTable.vue'
  import DataToolbar from '@/components/DataToolbar.vue'
  import { useAppStore } from '@/stores/app'
  import { useNotesStore } from '@/stores/notes'
  import { formatDate } from '@/utils/date'
  import { statusColor } from '@/utils/format'

  const app = useAppStore()
  const store = useNotesStore()

  const showMenu = ref(false)
  const activeNote = ref(null)
  const menuCoords = ref(null)
  const columns = [
    { key: 'number', title: '#' },
    { key: 'title', title: 'title' },
    { key: 'status', title: 'status' },
    { key: 'created_at', title: 'created at' },
    { key: 'updated_at', title: 'updated at' },
  ]
  const deleteMessage = computed(() => `Apakah anda yakin akan menghapus data "${store.msgDelete}"?`)

  function openContextMenu (e, note) {
    activeNote.value = note
    menuCoords.value = [e.clientX, e.clientY]
    showMenu.value = true
  }

  onMounted(async () => {
    await store.getMeta()
    store.getData()
  })
</script>
