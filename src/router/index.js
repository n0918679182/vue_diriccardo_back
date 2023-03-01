import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'seats',
      component: () => import('../views/SeatsMap.vue')
    },
    {
      path: '/WaitingMeal',
      name: 'WaitingMeal',
      component: () => import('../views/WaitingMeal.vue')
    },
    {
      path: '/HistoryOrders',
      name: 'HistoryOrders',
      component: () => import('../views/HistoryOrders.vue')
    }
  ]
})

export default router
