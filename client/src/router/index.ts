import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/common/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('@/views/list/RoomListView.vue'),
      meta: {
        requiresAuth: true
      }
    },



    {
      path: '/rooms/:roomId',
      name: 'room',
      component: () => import('@/views/detail/RoomDetailView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/operations/:operationId',
      name: 'operations',
      component: () => import('@/views/detail/OperationDetailView.vue'),
      meta: {
        requiresAuth: true
      }
    },



    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('@/views/common/StatisticsView.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/common/CalendarView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ],
});


router.beforeEach((to, from, next) => {
  const stringifiedUser = sessionStorage.getItem("user");
  const user = (stringifiedUser == null) ? undefined : JSON.parse(stringifiedUser);

  // if (to.meta.requiresAuth && !user) {
  //   return next({ name: 'dashboard' });
  // }

  if (!to.meta.requiresAuth && user) {
    console.debug(to, user)
    console.debug("non auth route, redirecting to dashboard")
    return next({ name: 'dashboard' });
  }

  next();
})

export default router;
