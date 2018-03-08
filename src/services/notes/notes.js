import serve from '../main'
export const getNotes = (query) => {
  return new Promise((resolve, reject) => {
    serve.ajax({
      type: 'get',
      url: 'http://127.0.0.1:4000/test-list',
      success: res => {
        resolve(res)
      },
      error: err => {
        reject(err)
      }
    })
  })
}
