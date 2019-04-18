import Frame from '@views/partials/Frame'
import Dashboard from '@views/partials/Dashboard'

export default [
  {
  path: '',
  component: Frame,
  fullpath: '',
  //isHideInMenu: true,
  meta: {
    title: "Menu"
  },
  children: [
      {
      path: '',
      fullpath: '',
      isHideInMenu: true,
      meta: {
        title: "All cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarList'], resolve)
    },
    {
      path: '/cars/all',
      fullpath: '/cars/all',
      meta: {
        title: "All cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarList'], resolve)
    },
    {
      path: '/cars/makes/:make',
      fullpath: '/cars/makes/:make',
      isHideInMenu: true,
      meta: {
        title: "All cars by make",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarListByMake'], resolve)
    },
    {
      path: '/cars/models/:model',
      fullpath: '/cars/models/:model',
      isHideInMenu: true,
      meta: {
        title: "Car details",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarDetails'], resolve)
    },
    {
      path: '/cars/favourites',
      fullpath: '/cars/favourites',
      meta: {
        title: "My favourites",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CarFavouritesList'], resolve)
    },
    {
      path: '/cars/compare',
      fullpath: '/cars/compare',
      meta: {
        title: "Compare cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CompareCars'], resolve)
    },
    {
      path: '/cars/compare/:carid1/:carid2',
      fullpath: '/cars/compare/:carid1/:carid2',
      isHideInMenu: true,
      meta: {
        title: "Compare cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CompareCars'], resolve)
    },
    {
      path: '/cars/compare/:carid1',
      fullpath: '/cars/compare/:carid1',
      isHideInMenu: true,
      meta: {
        title: "Compare cars",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/CompareCars'], resolve)
    },
    {
      path: '/cars/suggest',
      fullpath: '/cars/suggest',
      isHideInMenu: false,
      meta: {
        title: "Suggest a car",
        ignoreAuth: false
      },
      component: resolve => require(['@views/car/SuggestACar'], resolve)
    },
  ]
}]
