import MyPromise from './myPromise'
import ajax from './ajax'

const methods = ['post', 'get', 'patch', 'delete', 'put']
const MyAjax = {
}
methods.forEach(item => {
  MyAjax[item] = (url, data, header) => {
    return new MyPromise((resolve, reject) => {
      ajax[item](url, data, header)
        .success(res => resolve(res))
        .error(err => reject(err))
    })
  }
})

export default MyAjax
