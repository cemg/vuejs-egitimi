import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import ContactUs from './views/ContactUs.vue'
import NotFound from './views/NotFound.vue'
import Photos from './views/Photos.vue'

import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contactus',
            name: 'contactus',
            component: ContactUs
        },
        {
            path: '/photos/:id',
            name: 'photos',
            component: Photos
        },
        {
            path: '*',
            component: NotFound,
            //redirect: '/'
        }
    ]
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router;
