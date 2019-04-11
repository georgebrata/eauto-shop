import $ajax from '../ajax'
import $utils from '../utils'

let serverUrl = $utils.serverUrl

export default {
  login (data) {
    // return $ajax.post(serverUrl('login'), data)
    return new Promise(function(resolve, reject) {
      resolve(true)
    })
  },
  logout () {
    return $ajax.get(serverUrl('logout'))
  }
}
