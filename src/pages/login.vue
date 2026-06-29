<template>
  <v-main>
    <v-row
      class="fill-height"
      no-gutters
    >
      <v-col
        class="d-none d-md-flex align-center justify-center pa-8"
        md="7"
      >
        <div class="text-center">
          <v-avatar
            color="primary"
            size="72"
            variant="tonal"
          >
            <v-icon
              color="primary"
              icon="mdi-view-dashboard"
              size="40"
            />
          </v-avatar>

          <div class="text-display-small font-weight-bold text-primary mt-6">
            VUETIFY APP
          </div>

          <div class="text-title-medium font-weight-medium mt-2">
            Personal Dashboard Starter
          </div>

          <div class="text-body-medium text-medium-emphasis mt-4">
            Kelola catatan, ringkasan data, dan aktivitas personal dalam satu tempat.
          </div>

          <v-row
            class="mt-8"
            justify="center"
          >
            <v-col
              v-for="feature in features"
              :key="feature.title"
              cols="6"
              sm="4"
            >
              <v-sheet
                border
                class="pa-4"
                rounded="lg"
              >
                <v-icon
                  color="primary"
                  :icon="feature.icon"
                  size="28"
                />

                <div class="text-body-small font-weight-medium mt-2">
                  {{ feature.title }}
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col
        class="bg-surface-light d-flex align-center justify-center pa-6"
        cols="12"
        md="5"
      >
        <v-card
          max-width="360"
          width="100%"
        >
          <v-card-text class="pa-6 pa-sm-8">
            <div class="text-title-large font-weight-bold">Login</div>

            <div class="text-body-small text-medium-emphasis mt-1">
              Masukkan akun Anda untuk melanjutkan.
            </div>

            <v-form
              class="mt-6"
              @submit.prevent="auth.submitLogin(router, route.query.redirect)"
            >
              <v-text-field
                v-model="auth.form.email"
                autocomplete="email"
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                required
                type="email"
              />

              <v-text-field
                v-model="auth.form.password"
                :append-inner-icon="auth.showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                autocomplete="current-password"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                required
                :type="auth.showPassword ? 'text' : 'password'"
                @click:append-inner="auth.showPassword = !auth.showPassword"
              />

              <v-btn
                block
                class="mt-4"
                color="primary"
                type="submit"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const features = [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
    },
    {
      title: 'Notes',
      icon: 'mdi-file-document',
    },
    {
      title: 'Reports',
      icon: 'mdi-chart-line',
    },
  ]
</script>
