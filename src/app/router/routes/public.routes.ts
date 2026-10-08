import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/user/HomePage.vue'),
    meta: { titleKey: 'pages.home.title' },
  },
  {
    path: '/fields/:fieldId',
    name: 'field-detail',
    component: () => import('@/pages/user/FieldDetailPage.vue'),
    meta: { titleKey: 'pages.fieldDetail.title' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { layout: 'auth', guestOnly: true, titleKey: 'pages.login.title' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/auth/RegisterPage.vue'),
    meta: { layout: 'auth', guestOnly: true, titleKey: 'pages.register.title' },
  },
  {
    // VNPay / MoMo redirect back here after checkout
    path: '/payment/result',
    name: 'payment-result',
    component: () => import('@/pages/common/PaymentResultPage.vue'),
    meta: { titleKey: 'pages.paymentResult.title' },
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/pages/common/ForbiddenPage.vue'),
    meta: { layout: 'auth', titleKey: 'pages.forbidden.title' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/common/NotFoundPage.vue'),
    meta: { layout: 'auth', titleKey: 'pages.notFound.title' },
  },
]
