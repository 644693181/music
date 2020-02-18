import Vue from 'vue'
import Router from 'vue-router'
import musicRoutes from './music'
import resume from '@/pages/resume/resume'

import b from '@/base/scroll/scroll';
Vue.use(Router)

export default new Router({
    // mode: "history",
    routes: [{
        path: "/resume",
        name: 'resumeLink',
        component: resume
    },
    {
        path: '/b',
        component: b
    },
    ...musicRoutes,
    {
        path: "/",
        redirect: "/resume"
    }
    ]
});