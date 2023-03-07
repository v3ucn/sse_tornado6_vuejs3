import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

import index from '../components/index'


import reg from '../components/reg'

import login from '../components/login'



var routes = [

        {
          path:'/login',
          name:'login',
          component:login
        },

        {
          path:'/',
          name:'index',
          component:index
        },

        {
          path:'/reg',
          name:'reg',
          component:reg
        },
    
]


const router = new createRouter({
  history: createWebHistory(), // history为必填项
 //history:createWebHashHistory(),
  routes,
})

export {
    router
}
