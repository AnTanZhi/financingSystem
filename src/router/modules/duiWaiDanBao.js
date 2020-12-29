import Layout from '@/layout'
const duiWaiDanBao = {
  path: '/duiWaiDanBao',
  component: Layout,
  name: 'duiWaiDanBao',
  alwaysShow: true,
  meta: {
    title: '对外担保',
    icon: 'table'
  },
  children: [
    {
      path: 'guanLi',
      component: () => import('@/views/duiWaiDanBao/guanLi'),
      name: 'guanLi',
      meta: { title: '对外担保管理' },
    },
  ]
}
export default duiWaiDanBao
