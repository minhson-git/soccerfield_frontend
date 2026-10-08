import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/me',
    meta: { roles: ['CUSTOMER'] },
    children: [
      {
        path: 'bookings',
        name: 'my-bookings',
        component: () => import('@/pages/user/MyBookingsPage.vue'),
        meta: { titleKey: 'pages.myBookings.title' },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/user/ProfilePage.vue'),
        meta: { titleKey: 'pages.profile.title' },
      },
    ],
  },
]
