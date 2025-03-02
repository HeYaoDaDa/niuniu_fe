import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import SkillAreaView from '@/views/game/SkillAreaView.vue'
import LoadingView from '@/views/LoadingView.vue'
import { useGameDataStore } from '@/stores/gameData'
import ErrorNotFound from '@/views/ErrorNotFound.vue'
import ErrorLoading from '@/views/ErrorLoading.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/skill/mining',
      meta: { requireGameData: true },
      component: HomeView,
      children: [
        {
          path: 'skill/:id',
          name: 'skill',
          component: SkillAreaView
        }
      ]
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorLoading,
    },
    {
      path: '/:catchAll(.*)*',
      component: ErrorNotFound,
    },
  ],
})

router.beforeEach(async (to) => {
  const gameDataStore = useGameDataStore();
  if (to.meta.requireGameData && ['none', 'loading'].includes(gameDataStore.dataStatus)) {
    if ('none' === gameDataStore.dataStatus) {
      gameDataStore.loadData();
    }
    return { name: 'loading' };
  }
});

export default router
