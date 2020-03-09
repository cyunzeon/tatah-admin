//内容管理
let arr = [
  {
    path: '/activityAd',
    name: 'activityAd',
    component: () => import('@/page/content/activityAd'),
  },
  {
    path: '/activityAd/addAd',
    name: 'activityAdAddAd',
    component: () => import('@/page/content/addAd'),
  },
  {
    path: '/indexTk',
    name: 'indexTk',
    component: () => import('@/page/content/indexTk'),
  },
  {
    path: '/indexTk/addTk',
    name: 'indexTk',
    component: () => import('@/page/content/addTk'),
  },
  {
    path: '/indexTk/editTk',
    name: 'editTk',
    component: () => import('@/page/content/editTk'),
  },
  {
    path: '/contentUserImg',
    name: 'contentUserImg',
    component: () => import('@/page/content/userImg'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/page/content/report'),
  },
  {
    path: '/report/detail',
    name: 'reportDetail',
    component: () => import('@/page/content/reportDetail'),
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import('@/page/content/gift'),
  }
]

module.exports = arr