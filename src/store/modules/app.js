import Cookies from 'js-cookie'

function getFavorites(allMenus) {
  const routers = []
  // console.log(constantRouterMap)
  allMenus && allMenus.forEach(r => {
    if (r.alwaysShow) {
      routers.push(r)
    } else {
      if (r.children) {
        const child = r.children.filter(c => c.alwaysShow)
        if (child && child.length > 0) {
          r.children = child
          routers.push(r)
        }
      }
    }
  })
  routers.concat(Cookies.getJSON('menuFavorites'))
  return routers
}

const app = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false,
      favorites: getFavorites()
    },
    appTitle: undefined,
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium',
    allMenus: []
  },
  mutations: {
    SET_APPTITLE: (state, appTitle) => {
      state.appTitle = appTitle
    },
    SET_ALLMENUS: (state, allMenus) => {
      state.allMenus = allMenus
      state.sidebar.favorites = getFavorites(allMenus)
    },
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    TOGGLE_SIDEBAR_OPENED: (state, opened) => {
      state.sidebar.opened = opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    ADD_FAVORITES: (state, menu) => {
      if (state.sidebar.favorites.some(v => v.path === menu.path)) return
      state.sidebar.favorites.push(
        Object.assign({}, menu)
      )
      Cookies.set('menuFavorites', state.sidebar.favorites)
    },
    REMOVE_FAVORITES: (state, menu) => {
      for (const [i, v] of state.sidebar.favorites.entries()) {
        if (v.path === menu.path) {
          state.sidebar.favorites.splice(i, 1)
          break
        }
      }
      Cookies.set('menuFavorites', state.sidebar.favorites)
    },
    SORT_FAVORITES: (state, { from, to }) => {
      // arr.splice(x - 1, 1, ...arr.splice(y - 1, 1, arr[x - 1]))
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    }
  },
  actions: {
    setAppTitle({ commit }, appTitle) {
      commit('SET_APPTITLE', appTitle)
    },
    setAllMenus({ commit }, allMenus) {
      commit('SET_ALLMENUS', allMenus)
    },
    toggleSideBar({ commit }, opened) {
      if (opened !== undefined) {
        commit('TOGGLE_SIDEBAR_OPENED', opened)
      } else {
        commit('TOGGLE_SIDEBAR')
      }
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    addFavorites({ commit }, menu) {
      commit('ADD_FAVORITES', menu)
    },
    removeFavorites({ commit }, menu) {
      commit('REMOVE_FAVORITES', menu)
    },
    sortFavorites({ commit }, { from, to }) {
      commit('SORT_FAVORITES', { from, to })
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
