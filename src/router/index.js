import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../view/home/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../view/home/Home.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../view/OrderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../view/orderList/OrderList.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../view/shop/Shop.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../view/register/Register.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/login/Login.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
