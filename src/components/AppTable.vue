<template>
  <v-card variant="flat">
    <v-table class="text-no-wrap">
      <thead>
        <tr class="text-uppercase">
          <th
            v-for="column in columns"
            :key="column.key || column"
            :class="column.class"
          >
            {{ column.title || column }}
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="loading">
          <tr
            v-for="row in loadingRows"
            :key="`loading-${row}`"
          >
            <td
              v-for="column in columns"
              :key="column.key || column"
              class="text-start"
            >
              <v-skeleton-loader type="text" />
            </td>
          </tr>
        </template>

        <template v-else>
          <template
            v-for="(item, index) in items"
            :key="item.id || index"
          >
            <slot
              :index="index"
              :item="item"
              name="row"
            />
          </template>
        </template>

        <tr v-if="!loading && items.length === 0">
          <td
            class="text-center text-medium-emphasis"
            :colspan="columns.length"
          >
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
  defineProps({
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingRows: {
      type: Number,
      default: 5,
    },
    emptyText: {
      type: String,
      default: 'Tidak ada data.',
    },
  })
</script>
