import Vue from 'vue'
import Router from 'vue-router'
import user from './user'
import content from './content'
import system from './system'
import dataAnalysis from './dataAnalysis'
import money from './money'
import games from './games'

Vue.use(Router);

let mainRouter = [{
  path: '/',
  component: () => import('@/page/main'),
}]

/*Router.onError((err) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.message.match(pattern);
  if (isChunkLoadFailed) {
    let chunkBool = sessionStorage.getItem('chunkError');
    let nowTimes = Date.now();
    if (chunkBool === null || chunkBool && nowTimes - parseInt(chunkBool) > 60000) { //路由跳转报错,href手动跳转
      sessionStorage.setItem('chunkError', 'reload');
      const targetPath = Router.history.pending.fullPath;
      window.location.href = window.location.origin + targetPath;
    } else if (chunkBool === 'reload') { //手动跳转后依然报错,强制刷新
      sessionStorage.setItem('chunkError', Date.now());
      window.location.reload(true);
    }
  }
})*/

export default new Router({
  routes: [{
      path: '',
      name: 'index',
      component: () => import('@/page/index'),
      children: [
        ...mainRouter,
        ...user,
        ...content,
        ...system,
        ...dataAnalysis,
        ...money,
        ...games,
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/login'),

    }
  ],
  //进入页面就到定点到顶点
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
