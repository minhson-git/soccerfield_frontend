import type { RouteRecordRaw } from 'vue-router'

export const ownerRoutes: RouteRecordRaw[] = [
  {
    path: '/owner',
    meta: { layout: 'dashboard', roles: ['OWNER'] },
    children: [
      {
        path: '',
        name: 'owner-dashboard',
        component: () => import('@/pages/owner/OwnerDashboardPage.vue'),
        meta: { titleKey: 'pages.ownerDashboard.title' },
      },
      {
        path: 'branches',
        name: 'owner-branches',
        component: () => import('@/pages/owner/OwnerBranchesPage.vue'),
        meta: { titleKey: 'pages.ownerBranches.title' },
      },
      {
        path: 'fields',
        name: 'owner-fields',
        component: () => import('@/pages/owner/OwnerFieldsPage.vue'),
        meta: { titleKey: 'pages.ownerFields.title' },
      },
      {
        path: 'bookings',
        name: 'owner-bookings',
        component: () => import('@/pages/owner/OwnerBookingsPage.vue'),
        meta: { titleKey: 'pages.ownerBookings.title' },
      },
    ],
  },
]
