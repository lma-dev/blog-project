import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Create from '../views/Create.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'Detail',
    component: Detail,
    props: true
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router