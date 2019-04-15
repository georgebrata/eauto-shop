import $ajax from '../ajax'
import $utils from '../utils'

let serverUrl = $utils.serverUrl

export default {
  fetchAll () {
    return fetch('https://api.sheety.co/01427d16-4881-4021-980f-7fb3dc6bbcba')
        .then(response => {
             return response.json();
        }) 
        .then(myJson => {
        //console.warn(JSON.stringify(myJson)); 
            return myJson; 
        }); 
  },
  logout () {
    return $ajax.get(serverUrl('logout'))
  }
}
