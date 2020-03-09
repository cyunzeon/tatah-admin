//系统管理
let arr = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/page/system/account'),
  },
  {
    path: '/daily',
    name: 'daily',
    component: () => import('@/page/system/daily'),
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('@/page/system/role'),
  },
  {
    path: '/userrole',
    name: 'userrole',
    component: () => import('@/page/system/usersRole'),
  },
  {
    path: '/jurisdiction',
    name: 'role',
    component: () => import('@/page/system/jurisdiction'),
  },
  {
    path: '/account/edit',
    name: 'accountEdit',
    component: () => import('@/page/system/editUser'),
  }
]

module.exports = arr