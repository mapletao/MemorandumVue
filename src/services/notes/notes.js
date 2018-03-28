import serve from '../main'
const url = 'http://127.0.0.1:4000/test-list'

export const getNotes = (query) => {
  // serve.api['getTest-list']('1')
  return serve.MyAjax.get(url)
}
export const updateNote = (note) => {
  return serve.MyAjax.post(url + '/11', {id: 1})
}

export const getNote = (id) => {
  return serve.MyAjax.get(`${url}/${id}`)
}
