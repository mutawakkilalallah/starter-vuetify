<template>
  <v-dialog
    :max-width="maxWidth"
    :model-value="modelValue"
    @update:model-value="updateModel"
  >
    <v-card>
      <v-card-title class="bg-red font-weight-medium text-body-medium">
        {{ title }}
      </v-card-title>

      <v-card-text class="text-body-small font-italic">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="grey"
          :text="cancelText"
          variant="flat"
          @click="cancel"
        />

        <v-btn
          color="red"
          :text="confirmText"
          variant="flat"
          @click="emit('confirm')"
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
      default: 'Konfirmasi',
    },
    message: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: [String, Number],
      default: 420,
    },
    cancelText: {
      type: String,
      default: 'batal',
    },
    confirmText: {
      type: String,
      default: 'hapus',
    },
  })

  const emit = defineEmits(['cancel', 'confirm', 'update:model-value'])

  function cancel () {
    updateModel(false)
  }

  function updateModel (value) {
    emit('update:model-value', value)

    if (!value) {
      emit('cancel')
    }
  }
</script>
