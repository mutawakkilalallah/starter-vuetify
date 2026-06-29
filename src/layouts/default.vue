<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-title class="font-weight-bold text-body-medium">
      <v-icon
        class="mr-1"
        :icon="appConfig.icon"
        size="24"
      />
      {{ appConfig.name }}
    </v-app-bar-title>

    <template #prepend>
      <v-btn
        :icon="drawer ? 'mdi-dock-left' : 'mdi-dock-right'"
        @click="drawer = !drawer"
      />
    </template>

    <template #append>
      <v-menu
        location="bottom end"
        :min-width="userMenuWidth"
        offset="8"
      >
        <template #activator="{ props }">
          <v-sheet
            v-bind="props"
            class="d-flex align-center mr-2 py-1"
            color="transparent"
            :width="userMenuActivatorWidth"
          >
            <v-avatar size="32">
              <v-img
                :alt="user.name"
                cover
                :src="user.photo"
              />
            </v-avatar>

            <div class="d-none d-sm-flex flex-column align-start ml-2">
              <span class="text-label-medium font-weight-medium">{{ user.name }}</span>
              <span class="text-label-small font-weight-light">{{ user.email }}</span>
            </div>
          </v-sheet>
        </template>

        <v-list
          density="compact"
          min-width="100%"
        >
          <v-list-item
            class="text-body-small font-weight-light"
            disabled
            :title="user.email || '-'"
            :value="user.email"
          />

          <v-divider />

          <v-list-item
            title="Profil"
            value="profile"
          />

          <v-list-item
            title="Logout"
            value="logout"
            @click="handleLogout"
          />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">

    <v-list
      density="compact"
    >
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        color="primary"
        :exact="item.exact"
        :to="item.to"
        :value="item.title"
      >
        <template #prepend>
          <v-icon
            :icon="item.icon"
            size="18"
          />
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main class="mx-4">
    <router-view />
  </v-main>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { appConfig } from '@/config/app'
  import { menuItems } from '@/config/menu'
  import { useAuthStore } from '@/stores/auth'

  const { smAndUp } = useDisplay()
  const router = useRouter()
  const auth = useAuthStore()
  const drawer = ref(true)
  const userMenuWidth = appConfig.userMenuWidth
  const userMenuActivatorWidth = computed(() => smAndUp.value ? userMenuWidth : 40)
  const user = computed(() => {
    return {
      name: auth.user?.name || 'User',
      email: auth.user?.email || '',
      photo: auth.userAvatar,
    }
  })

  async function handleLogout () {
    try {
      await auth.logout()
    } finally {
      router.replace('/login')
    }
  }
</script>
