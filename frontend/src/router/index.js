import axios from 'axios';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ClientForm from '../components/ClientForm.vue';
import ClientUpdate from '../components/ClientUpdate.vue';
import LoginPage from '../components/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/client-form',
    name: 'ClientForm',
    component: ClientForm,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-client/:id',
    name: 'ClientUpdate',
    component: ClientUpdate,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/clients/edit/:id',
    name: 'edit-client',
    component: ClienteEditComponent,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'login' });
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
  } else {
    next();
  }
});

export default router;
