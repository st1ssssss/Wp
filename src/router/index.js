import Vue from "vue";
import Router from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import AddPaymentForm from '../components/AddPaymentForm.vue'
Vue.use(Router)



const routes = [
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/dashboard/:page',
        component: Dashboard
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/add/payment/:category??value=:value',
        name: 'addPayment',
        component: Dashboard, AddPaymentForm
    },
    {
        path: '/add/payment',
        name: 'addPayment',
        component: Dashboard, AddPaymentForm
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    },

]
const router = new Router({
    mode: 'history',
    routes
})







export default router