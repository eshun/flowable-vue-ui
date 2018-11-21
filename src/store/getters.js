const getters = {
  appTitle: state => state.app.appTitle,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  allMenus: state => state.app.allMenus,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  menus: state => state.user.menus,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs
}
export default getters
