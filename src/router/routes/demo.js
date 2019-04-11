import Frame from '@views/partials/Frame'

export default [{
  path: '/demo',
  component: Frame,
  fullpath: 'demo',
  // isHideInMenu: true,
  meta: {
    title: "Masini"
  },
  children: [
    {
      path: 'form',
      fullpath: '/demo/form',
      isHideInMenu: false,
      meta: {
        title: "Sugereaza o masina",
        ignoreAuth: false
      },
      component: resolve => require(['@views/demo/Form'], resolve)
    },
    {
      path: 'list',
      fullpath: '/demo/list',
      meta: {
        title: "Toate masinile",
        ignoreAuth: false
      },
      component: resolve => require(['@views/demo/List'], resolve)
    }
  ]
}]
