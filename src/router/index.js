import Vue from 'vue';
import VueRouter from 'vue-router';
import AllTodos from '../pages/AllTodos.vue';
import CompletedTodos from '../pages/CompletedTodos.vue';
import UncompletedTodos from '../pages/UncompletedTodos.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'All',
    component: AllTodos,
  },
  {
    path: '/completed',
    name: 'Completed',
    component: CompletedTodos,
  },
  {
    path: '/uncompleted',
    name: 'Uncompleted',
    component: UncompletedTodos,
  },
];

const router = new VueRouter({
  routes,
  base: '/',
  mode: 'history',
});

export default router;
