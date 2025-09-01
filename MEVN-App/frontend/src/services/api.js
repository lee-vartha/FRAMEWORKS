import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export default {
  register(data) {
    return api.post('/auth/register', data)
  },
  login(data) {
    return api.post('/auth/login', data)
  },
  getProducts() {
    return api.get('/products')
  },
  addProduct(data) {
    return api.post('/products', data)
  },
  reserveMeal(data) {
    return api.post('/reservations', data)
  }
}
