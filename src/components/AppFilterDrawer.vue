<template>
  <v-navigation-drawer
    border="0"
    elevation="0"
    location="right"
    :model-value="modelValue"
    temporary
    width="400"
    @update:model-value="emit('update:model-value', $event)"
  >
    <v-card
      class="d-flex flex-column h-100"
      rounded="0"
      variant="flat"
    >
      <v-toolbar
        class="text-white"
        color="primary"
        density="compact"
      >
        <v-toolbar-title
          class="font-weight-medium text-body-medium"
          text="Filter"
        />

        <v-btn
          icon="mdi-close"
          @click="emit('update:model-value', false)"
        />
      </v-toolbar>

      <v-card-text class="flex-grow-1">
        <template
          v-for="filter in filters"
          :key="filter.key"
        >
          <v-select
            v-if="filter.type === 'select'"
            clearable
            :items="filter.options"
            :label="filter.label"
            :model-value="params[filter.key]"
            :multiple="filter.multiple"
            @update:model-value="value => emit('update-filter', filter.key, value)"
          />
        </template>
      </v-card-text>

      <v-divider />

      <v-card-actions class="ga-2">
        <v-btn
          color="grey"
          prepend-icon="mdi-cancel"
          text="batal"
          variant="flat"
          @click="emit('update:model-value', false)"
        />

        <v-spacer />

        <v-btn
          color="red"
          prepend-icon="mdi-broom"
          text="Reset"
          variant="tonal"
          @click="emit('reset')"
        />

        <v-btn
          color="primary"
          prepend-icon="mdi-content-save"
          text="Terapkan"
          variant="flat"
          @click="emit('apply')"
        />
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits([
    'apply',
    'reset',
    'update-filter',
    'update:model-value',
  ])
</script>
