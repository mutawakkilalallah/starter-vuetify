<template>
  <v-breadcrumbs
    class="pa-0 mb-4 text-title-small"
    density="compact"
  >
    <template #prepend>
      <v-icon
        icon="mdi-view-dashboard"
        size="small"
      />
    </template>

    <slot />
  </v-breadcrumbs>
</template>
