import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import DefaultLayout from '@/layouts/default.vue'
import { useAuthStore } from '@/stores/auth'

const loginRoutes = routes.filter(route => route.path === '/login')
const layoutRoutes = routes.filter(route => route.path !== '/login')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...loginRoutes,
    {
      path: '/',
      component: DefaultLayout,
      children: layoutRoutes,
    },
  ],
})

router.beforeEach(async to => {
  const auth = useAuthStore()

  if (!auth.initialized) {
    try {
      await auth.fetchUser()
    } catch {
      // Guest access is handled by the route rules below.
    }
  }

  if (to.path === '/login') {
    return auth.isAuthenticated ? '/' : true
  }

  if (!auth.isAuthenticated) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  return true
})

export default router
