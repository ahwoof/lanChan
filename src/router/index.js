import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import index from '@/pages/Room'
import room from '@/components/talk/index'
import talk from '@/components/talk/talk'
import userMsgDetail from '@/components/userMsgDetail/index'
import otherMsg from '@/components/userMsgDetail/otherMsg'
import album from '@/components/album/index'
import addAlbum from '@/components/album/add'
import myAlbum from '@/components/album/my'

import dynamic from '@/components/dynamic/index'
import addDynamic from '@/components/dynamic/add'
import myDynamic from '@/components/dynamic/my'

import file from '@/components/file/index'
import addFile from '@/components/file/add'
import myFile from '@/components/file/my'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[{
        path: '/index/room',
        name: 'room',
        component: room,
        children:[{
          path: '/index/room/talk',
          name: 'talk',
          component: talk,
        },{
          path: '/index/room/album',
          name: 'album',
          component: album,
        },{
          path: '/index/room/addAlbum',
          name: 'addAlbum',
          component: addAlbum,
        },{
          path: '/index/room/file',
          name: 'file',
          component: file,
        },{
          path: '/index/room/addFile',
          name: 'addFile',
          component: addFile,
        },{
          path: '/index/room/dynamic',
          name: 'dynamic',
          component: dynamic,
        },{
          path: '/index/room/addDynamic',
          name: 'addDynamic',
          component: addDynamic,
        },]
      },{
        path: '/room/userMsgDetail',
        name: 'userMsgDetail',
        component: userMsgDetail,
      },{
        path: '/room/otherMsg',
        name: 'otherMsg',
        component: otherMsg,
      },{
        path: '/room/myDynamic',
        name: 'myDynamic',
        component: myDynamic,
      },{
        path: '/room/myAlbum',
        name: 'myAlbum',
        component: myAlbum,
      },{
        path: '/room/myFile',
        name: 'myFile',
        component: myFile,
      }],
      // beforeEnter: (to, from, next) => {
      //   if(from.name == null){
      //     next({
      //       path: '/'
      //     })
      //   }else{
      //     next();
      //   }
      // }
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})


// {
//   path: '/index/room/personTalk',
//   name: 'personTalk',
//   component: personTalk,
// }