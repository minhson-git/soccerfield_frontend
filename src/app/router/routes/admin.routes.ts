import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    meta: { layout: 'dashboard', roles: ['ADMIN'] },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/AdminDashboardPage.vue'),
        meta: { titleKey: 'pages.adminDashboard.title' },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/pages/admin/AdminUsersPage.vue'),
        meta: { titleKey: 'pages.adminUsers.title' },
      },
      {
        path: 'branches',
        name: 'admin-branches',
        component: () => import('@/pages/admin/AdminBranchesPage.vue'),
        meta: { titleKey: 'pages.adminBranches.title' },
      },
      {
        path: 'bookings',
        name: 'admin-bookings',
        component: () => import('@/pages/admin/AdminBookingsPage.vue'),
        meta: { titleKey: 'pages.adminBookings.title' },
      },
    ],
  },
]
