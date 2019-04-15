import Frame from '@views/partials/Frame'
import Dashboard from '@views/partials/Dashboard'

export default [
  {
  path: '/',
  component: Frame,
  fullpath: '',
  // isHideInMenu: true,
  meta: {
    title: "Masini"
  },
  children: [
    {
      path: '/car/list',
      fullpath: '/car/list',
      meta: {
        title: "All cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarList'], resolve)
    },
    {
      path: '/car/favourites',
      fullpath: '/car/favourites',
      meta: {
        title: "My favourites",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarFavouritesList'], resolve)
    },
    {
      path: '/car/compare',
      fullpath: '/car/compare',
      meta: {
        title: "Compare cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CompareCars'], resolve)
    },
    {
      path: '/car/suggest',
      fullpath: '/car/suggest',
      isHideInMenu: false,
      meta: {
        title: "Suggest a car",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/Form'], resolve)
    },
  ]
}]
