import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Board from './components/Board.vue';

Vue.use(Router)

const routes = [
    { path: '/', component: Home },
    { path: '/board/:id', component: Board },
];

const router = new Router({
    routes,
    mode: 'history'
});

export default router;