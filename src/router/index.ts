import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import MiningView from '@/views/game/MiningView.vue'
import LoadingView from '@/views/LoadingView.vue'
import { useGameStore } from '@/stores/game'
import WoodcuttingView from '@/views/game/WoodcuttingView.vue'
import CombatView from '@/views/game/CombatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'mining',
      meta: { requireGameData: true },
      component: HomeView,
      children: [
        {
          path: 'mining',
          name: 'mining',
          component: MiningView
        },
        {
          path: 'woodcutting',
          name: 'woodcutting',
          component: WoodcuttingView
        },
        {
          path: 'combat',
          name: 'combat',
          component: CombatView
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
  ],
})

router.beforeEach(async (to) => {
  const gameStore = useGameStore();
  if (to.meta.requireGameData && ['none', 'loading'].includes(gameStore.status)) {
    if ('none' === gameStore.status) {
      gameStore.loadData();
    }
    return { name: 'loading' };
  }
});

export default router
