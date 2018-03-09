import MyPromise from './myPromise'
import ajax from './ajax'

const MyAjax = {
  get: url => {
    return new MyPromise((resolve, reject) => {
      ajax.get(url)
        .success(res => resolve(res))
        .error(err => reject(err))
    })
  }
}

export default MyAjax
