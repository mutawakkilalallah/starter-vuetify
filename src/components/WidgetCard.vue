<template>
  <v-card
    class="widget-card h-100"
    :color="color"
    rounded="lg"
    variant="flat"
  >
    <v-card-text>
      <div class="d-flex align-start justify-space-between ga-4">
        <div>
          <div class="widget-card__label text-body-medium font-weight-medium opacity-80">{{ name }}</div>
          <div class="widget-card__value text-display-medium font-weight-bold mt-2">{{ value }}</div>
          <div class="widget-card__description text-body-small opacity-80 mt-2">{{ description }}</div>
        </div>

        <v-avatar
          class="widget-card__icon"
          color="white"
          size="56"
          variant="flat"
        >
          <v-icon
            :color="color"
            :icon="icon"
            size="24"
          />
        </v-avatar>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        append-icon="mdi-arrow-right"
        color="white"
        size="small"
        :to="to"
        variant="text"
      >
        Selengkapnya
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  defineProps({
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      default: undefined,
    },
  })
</script>

<style scoped>
  .widget-card {
    position: relative;
    overflow: hidden;
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  }

  .widget-card::before {
    position: absolute;
    inset: auto -24px -40px auto;
    width: 120px;
    height: 120px;
    border-radius: 999px;
    background: white;
    content: "";
    opacity: 0.16;
  }

  .widget-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16);
  }

  .widget-card__icon {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  }

  .widget-card__label,
  .widget-card__description {
    line-height: 1.2;
  }

  .widget-card__value {
    line-height: 1;
  }
</style>
