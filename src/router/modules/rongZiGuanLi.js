import Layout from '@/layout'
const rongZiGuanLi = {
  path: '/rongZiGuanLi',
  component: Layout,
  name: 'rongZiGuanLi',
  meta: {
    title: '融资管理',
    icon: 'table'
  },
  children: [
    {
      path: 'guanLi',
      component: () => import('@/views/rongZiGuanLi/guanLi'),
      name: 'guanLi',
      meta: { title: '融资管理' }
    },
    {
      path: 'guanLiAdd',
      component: () => import('@/views/rongZiGuanLi/guanLiAdd'),
      name: 'guanLiAdd',
      meta: { title: '融资管理' },
      hidden: true
    },
  ]
}
export default rongZiGuanLi
