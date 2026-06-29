<template>
  <div class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between mb-4 ga-3 w-100">
    <div class="d-flex flex-wrap align-center ga-2 flex-grow-1">
      <v-defaults-provider scoped>
        <v-btn
          v-if="showCreate"
          color="primary"
          icon="mdi-plus-circle"
          variant="plain"
          @click="emit('create')"
        />

        <v-btn
          v-if="showRefresh"
          color="green"
          icon="mdi-refresh"
          variant="plain"
          @click="emit('refresh')"
        />
      </v-defaults-provider>

      <span class="text-body-medium mr-2">
        Total data : <span class="font-weight-bold">{{ total }}</span>
      </span>

      <v-defaults-provider scoped>
        <v-badge
          v-if="showFilter"
          color="orange"
          :content="activeFilters.length"
          location="top right"
          :model-value="activeFilters.length > 0"
          offset-x="8"
          offset-y="8"
        >
          <v-btn
            color="orange"
            icon="mdi-tune"
            variant="plain"
            @click="emit('open-filter')"
          />
        </v-badge>

        <v-chip
          v-for="filter in activeFilters"
          :key="filter.key"
          class="bg-grey-lighten-3 text-grey-darken-4 font-weight-medium"
          closable
          close-icon="mdi-close-circle"
          size="small"
          variant="flat"
          @click:close="emit('remove-filter', filter.key)"
        >
          <span>{{ filter.label }}: <strong class="text-black ml-1">{{ filter.displayValue }}</strong></span>
        </v-chip>
      </v-defaults-provider>
    </div>

    <div class="d-flex align-center justify-space-between justify-md-end ga-2 w-100 w-md-auto">
      <v-text-field
        v-if="showSearch"
        class="flex-grow-1 flex-md-grow-0"
        clearable
        density="compact"
        hide-details
        max-width="360"
        :model-value="search"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        variant="filled"
        :width="mdAndUp ? 300 : undefined"
        @update:model-value="value => emit('update:search', String(value || ''))"
      />

      <v-select
        v-if="showLimit"
        density="compact"
        hide-details
        :items="limitItems"
        max-width="96"
        :model-value="limit"
        variant="outlined"
        @update:model-value="value => emit('update:limit', Number(value || 10))"
      />

      <v-menu
        v-if="showColumnMenu"
        location="bottom end"
      >
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            icon="mdi-view-column"
            rounded="0"
            size="small"
            variant="tonal"
          />
        </template>

        <v-list density="compact">
          <v-list-item
            v-for="column in columns"
            :key="columnKey(column)"
          >
            <template #prepend>
              <v-checkbox-btn model-value />
            </template>

            <v-list-item-title>{{ columnTitle(column) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mdAndUp } = useDisplay()

  const props = defineProps({
    total: {
      type: Number,
      default: 0,
    },
    search: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 25,
    },
    filters: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      default: () => [],
    },
    limitItems: {
      type: Array,
      default: () => [25, 50, 100, 250, 500, 1000],
    },
    showColumnMenu: {
      type: Boolean,
      default: false,
    },
    showCreate: {
      type: Boolean,
      default: true,
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    showLimit: {
      type: Boolean,
      default: true,
    },
    showRefresh: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits([
    'create',
    'refresh',
    'open-filter',
    'remove-filter',
    'update:search',
    'update:limit',
  ])

  const activeFilters = computed(() => {
    if (!props.filters || !props.params) return []

    const active = []
    for (const filter of props.filters) {
      const value = props.params[filter.key]
      const hasValue = value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)

      if (hasValue) {
        let displayValue = value
        if (filter.options) {
          if (Array.isArray(value)) {
            displayValue = value
              .map(val => {
                const option = filter.options.find(opt => opt.value === val)
                return option ? option.title : val
              })
              .join(', ')
          } else {
            const option = filter.options.find(opt => opt.value === value)
            if (option) displayValue = option.title
          }
        }

        active.push({
          key: filter.key,
          label: filter.label,
          value: value,
          displayValue: displayValue,
        })
      }
    }
    return active
  })

  function columnKey (column) {
    return column.key || column.value || column.title || column
  }

  function columnTitle (column) {
    return column.title || column.label || column
  }
</script>
