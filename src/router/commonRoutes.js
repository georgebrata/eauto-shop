import NotFound from '@views/partials/NotFound'
export default [
  {
    path: '/login',
    meta: {
      title: 'Login',
      ignoreAuth: true
    },
    component: resolve => require(['@views/Login'], resolve)
  },
  {
    path: '/',
    redirect: '/car/list'
  },
  {
    path: '*',
    meta: {
      title: 'Not Found',
      ignoreAuth: true
    },
    component: NotFound
  }
]
