//财务管理
let arr = [
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('@/page/money/recharge'),
  },
  {
    path: '/cash',
    name: 'cash',
    component: () => import('@/page/money/cash'),
  },
  {
    path: '/adddiamonds',
    name: 'adddiamonds',
    component: () => import('@/page/money/addDiamonds'),
  }
]

module.exports = arr