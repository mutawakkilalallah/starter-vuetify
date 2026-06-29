<template>
  <v-app>
    <AppFilterDrawer
      :filters="app.filterDrawer.filters"
      :model-value="app.filterDrawer.show"
      :params="app.filterDrawer.params"
      @apply="app.applyFilter"
      @reset="app.resetFilter"
      @update-filter="app.updateFilter"
      @update:model-value="app.filterDrawer.show = $event"
    />

    <router-view />

    <v-dialog
      v-model="app.loading"
      max-width="320"
      persistent
    >
      <v-card>
        <v-card-text class="d-flex align-center ga-4">
          <v-progress-circular
            color="primary"
            indeterminate
          />

          <span>Memproses data...</span>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="app.snackbar.show"
      :color="app.snackbar.color"
      location="top end"
      prepend-icon="mdi-check-circle"
      :text="app.snackbar.text"
      timeout="3000"
      timer="top"
      timer-color="white"
      title="Berhasil"
      variant="elevated"
    >
      <template #actions>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="app.closeSnackbar"
        />
      </template>
    </v-snackbar>

    <v-dialog
      v-model="app.errorDialog.show"
      max-width="420"
    >
      <v-card>
        <v-card-title class="bg-red font-weight-medium text-body-medium">{{ app.errorDialog.title }}</v-card-title>

        <v-card-text class="text-body-small font-italic font-weight-medium">{{ app.errorDialog.text }}</v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red"
            text="tutup"
            variant="flat"
            @click="app.closeError"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
  import AppFilterDrawer from '@/components/AppFilterDrawer.vue'
  import { useAppStore } from '@/stores/app'

  const app = useAppStore()
</script>
