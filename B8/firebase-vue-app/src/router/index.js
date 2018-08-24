import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Dashboard from '@/views/admin/Dashboard'
import UserList from '@/views/admin/UserList'
import ProductList from '@/views/admin/ProductList'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            redirect: '/'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users',
            name: 'users',
            component: UserList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/products',
            name: 'products',
            component: ProductList,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) {
        toastr.warning('Bu sayfayı görüntülemek için giriş yapınız...');
        next('login');
    } else
        next();
})

export default router
