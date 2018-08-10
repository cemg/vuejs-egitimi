import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import DashBoard from '../pages/DashBoard';
import UserList from '../pages/user/UserList';

const routes = [
    {
        path: '/',
        component: DashBoard,
        name: 'dashboard'
    },
    {
        path: '/users',
        component: UserList,
        name: 'user.index'
    },
];

export default new VueRouter({
    mode: 'hash',
    routes
})