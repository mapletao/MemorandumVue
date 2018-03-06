export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: resolve => require(['../pages/Home'], resolve)
  }
]
