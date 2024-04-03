// authGuard.js

export default function AuthGuard(to, from, next) {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
      
      next('/login');
    } else {
     
      next();
    }
  }