import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  }
}
const menuMap = {
  admin: [{
    name: 'documentation',
    icon: 'documentation',
    remarks: ''
  },
  {
    url: 'https://github.com/PanJiaChen/vue-element-admin',
    name: 'externalLink',
    icon: 'link'
  }
  ]
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  getMenu: config => {
    const { token } = param2Obj(config.url)
    if (menuMap[token]) {
      return menuMap[token]
    } else {
      return []
    }
  },
  logout: () => 'success'
}
