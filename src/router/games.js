//系统管理
let arr = [
  {
    path: '/character',
    name: 'character',
    component: () => import('@/page/games/character'),
  },{
    path: '/adventure',
    name: 'adventure',
    component: () => import('@/page/games/adventure'),
  },
]

module.exports = arr