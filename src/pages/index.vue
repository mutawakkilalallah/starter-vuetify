<template>
  <AppBreadcrumbs>
    <v-breadcrumbs-item to="/" />
    <v-breadcrumbs-divider />
    <v-breadcrumbs-item disabled>Dashboard</v-breadcrumbs-item>
  </AppBreadcrumbs>

  <v-row>
    <v-col
      v-for="widget in store.widgets"
      :key="widget.name"
      cols="12"
      md="3"
      sm="4"
    >
      <WidgetCard
        :color="widget.color"
        :description="widget.description"
        :icon="widget.icon"
        :name="widget.name"
        :to="widget.to"
        :value="widget.value"
      />
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted } from 'vue'
  import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
  import WidgetCard from '@/components/WidgetCard.vue'
  import { useDashboardStore } from '@/stores/dashboard'

  const store = useDashboardStore()

  onMounted(() => {
    store.getData()
  })
</script>
