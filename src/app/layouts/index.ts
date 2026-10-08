import type { Component } from 'vue'

import AuthLayout from './AuthLayout.vue'
import DashboardLayout from './DashboardLayout.vue'
import UserLayout from './UserLayout.vue'

export const layouts = {
  user: UserLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
} satisfies Record<string, Component>

export type LayoutName = keyof typeof layouts
