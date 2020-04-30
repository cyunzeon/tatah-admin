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
  },{
    path: '/activityAd/editAd',
    name: 'activityAdeditAd',
    component: () => import('@/page/content/editAd'),
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
    path: '/partyReport',
    name: 'partyReport',
    component: () => import('@/page/content/partyReport'),
  },
  {
    path: '/partyReport/detail',
    name: 'partyReportDetail',
    component: () => import('@/page/content/partyReportDetail'),
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import('@/page/content/gift'),
  },
  {
    path: '/iceBreaking',
    name: 'iceBreaking',
    component: () => import('@/page/content/iceBreaking'),
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('@/page/content/task'),
  },
  {
    path: '/party',
    name: 'party',
    component: () => import('@/page/content/party'),
  },
  {
    path: '/party/detail',
    name: 'partyDetail',
    component: () => import('@/page/content/partyDetail'),
  },{
    path: '/party/edit',
    name: 'partyEdit',
    component: () => import('@/page/content/partyEdit'),
  },
  {
    path: '/uservideo',
    name: 'uservideo',
    component: () => import('@/page/content/userVideo'),
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('@/page/content/dynamic'),
  },
  {
    path: '/dynamic/talkDetail',
    name: 'talkDetail',
    component: () => import('@/page/content/talkDetail'),
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/page/content/wuyong'),
  }
]

module.exports = arr