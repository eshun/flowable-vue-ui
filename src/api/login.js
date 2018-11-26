import request from '@/utils/request'
import qs from 'qs'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }
//
// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function loginByUsername(username, password) {
  const data = {
    j_username: username,
    j_password: password,
    _spring_security_remember_me: true,
    submit: 'Login'
  }
  return request({
    url: '/flowable-idm/app/authentication',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/flowable-idm/app/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/flowable-idm/app/rest/account',
    method: 'get',
    params: { token }
  })
}

