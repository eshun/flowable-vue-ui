import Cookies from 'js-cookie'
import CircularJSON from 'circular-json'
import { childToParent } from '@/utils/'

const app = {
  state: {
    sidebar: {
      opened: false,
      withoutAnimation: false,
      favorites: Cookies.getJSON('menuFavorites') || []
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
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
        { name: menu.name, path: menu.path, meta: menu.meta }
      )
      if (state.sidebar.favorites) {
        Cookies.set('menuFavorites', CircularJSON.stringify(state.sidebar.favorites))
      }
    },
    INIT_FAVORITES: (state, menu) => {
      if (menu) {
        const allMenu = childToParent(menu)
        const item = allMenu.filter(c => c.alwaysShow)
        item.forEach(r => {
          if (r.parent) {
            r.path = r.parent.path + '/' + r.path
          }
          if (!state.sidebar.favorites.some(v => v.path === r.path)) {
            state.sidebar.favorites.push({ name: r.name, path: r.path, meta: r.meta })
          }
        })
        if (state.sidebar.favorites) {
          Cookies.set('menuFavorites', CircularJSON.stringify(state.sidebar.favorites))
        }
      }
    },
    REMOVE_FAVORITES: (state, menu) => {
      for (const [i, v] of state.sidebar.favorites.entries()) {
        if (v.name === menu.name) {
          state.sidebar.favorites.splice(i, 1)
          break
        }
      }
      Cookies.set('menuFavorites', JSON.stringify(state.sidebar.favorites))
    },
    SORT_FAVORITES: (state, { x, y }) => {
      const arry = state.sidebar.favorites
      arry.splice(x - 1, 1, ...arry.splice(y - 1, 1, arry[x - 1]))
      state.sidebar.favorites = arry
      Cookies.set('menuFavorites', CircularJSON.stringify(state.sidebar.favorites))
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
