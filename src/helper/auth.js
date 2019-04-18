import Cookies from 'js-cookie'

export default {
  checkSession () {
    return true;
    //return Cookies.get('isLogin')
  }
}
