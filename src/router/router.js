import pages from '../app/pages/route.config.js'

const Login = () =>
    import( /* webpackChunkName: "auth" */ '@/app/auth/login/Login.vue')

const Home = () =>
    import( /* webpackChunkName: "auth" */ '../app/auth/home/home.vue')

export const routes = [

    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: 'home/homePage',
        children: [
            ...pages
        ]
    },
]