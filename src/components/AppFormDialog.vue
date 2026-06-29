<template>
  <v-dialog
    :max-width="maxWidth"
    :model-value="modelValue"
    @update:model-value="emit('update:model-value', $event)"
  >
    <v-card>
      <v-card-title class="bg-grey-lighten-3 text-title-medium font-weight-medium">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <slot />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="grey"
          :text="cancelText"
          variant="flat"
          @click="emit('update:model-value', false)"
        />

        <v-btn
          color="primary"
          :text="saveText"
          variant="flat"
          @click="emit('save')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: [String, Number],
      default: 520,
    },
    cancelText: {
      type: String,
      default: 'batal',
    },
    saveText: {
      type: String,
      default: 'simpan',
    },
  })

  const emit = defineEmits(['save', 'update:model-value'])
</script>
