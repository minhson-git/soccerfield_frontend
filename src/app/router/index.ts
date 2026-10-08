import { createRouter, createWebHistory } from 'vue-router'

import { i18n } from '@/shared/i18n'

import { authGuard } from './guards'
import { adminRoutes } from './routes/admin.routes'
import { ownerRoutes } from './routes/owner.routes'
import { publicRoutes } from './routes/public.routes'
import { userRoutes } from './routes/user.routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // publicRoutes holds the catch-all, but vue-router ranks by specificity, not order
  routes: [...userRoutes, ...ownerRoutes, ...adminRoutes, ...publicRoutes],
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0 },
})

router.beforeEach(authGuard)

router.afterEach((to) => {
  const appName = i18n.global.t('app.name')
  document.title = to.meta.titleKey ? `${i18n.global.t(to.meta.titleKey)} | ${appName}` : appName
})
