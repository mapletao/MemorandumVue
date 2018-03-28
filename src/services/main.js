import MyAjax from '../assets/js/MyAjax'

const api = new Proxy({}, {
  get (target, prop) {
    const method = /^[a-z]+/.exec(prop)[0]
    const path = '/' + prop
      .substring(method.length)
      .replace(/([a-z])([A-Z])/g, '$1/$2')
      .replace(/\$/g, '/$/')
      .toLowerCase()
    return (...args) => { // <------ 返回动态构造的函数！
      const url = path.replace(/\$/g, () => args.shift())
      const options = args.shift() || {}
      console.log('Requesting: ', method, url, options)
      return MyAjax({method, url, ...options})
    }
  }
})
export default {
  MyAjax: MyAjax,
  api: api
}
