export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: resolve => require(['../pages/Home'], resolve)
  },
  {
    path: '/note/:id',
    component: resolve => require(['../pages/Note'], resolve)
  }
]
