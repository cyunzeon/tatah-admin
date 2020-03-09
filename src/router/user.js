//用户管理
let arr = [
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/page/user/userInfo'),
  },
  {
    path: '/userInfo/detail',
    name: 'userInfoDetail',
    component: () => import('@/page/user/userInfoDetail'),
  },
  {
    path: '/userInfo/edit',
    name: 'userInfoEdit',
    component: () => import('@/page/user/userInfoEdit'),
  },
  {
    path: '/userCheck',
    name: 'userCheck',
    component: () => import('@/page/user/userCheck'),
  },
  {
    path: '/userCheck/detail',
    name: 'userCheckDetail',
    component: () => import('@/page/user/userCheckDetail'),
  },
  {
    path: '/userClub',
    name: 'userClub',
    component: () => import('@/page/user/club'),
  },
  {
    path: '/userClub/detail',
    name: 'userClubDetail',
    component: () => import('@/page/user/clubDetail'),
  },
  {
    path: '/loseUser',
    name: 'loseUser',
    component: () => import('@/page/user/loseUser'),
  },
]

module.exports = arr