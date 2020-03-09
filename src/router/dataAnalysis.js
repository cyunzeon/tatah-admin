//内容管理
let arr = [
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@/page/dataAnalysis/analysis'),
  },
  {
    path: '/proportion',
    name: 'proportion',
    component: () => import('@/page/dataAnalysis/proportion'),
  }
]

module.exports = arr