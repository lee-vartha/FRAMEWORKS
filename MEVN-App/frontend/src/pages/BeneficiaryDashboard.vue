<template>
  <div class="dashboard">
    <h2>Welcome Beneficiary</h2>

    <h3>Available Meals</h3>
    <ul>
      <li v-for="product in products" :key="product._id">
        {{ product.productName }} - {{ product.tokenCost }} tokens
        <button @click="reserve(product)">Reserve</button>
      </li>
    </ul>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const products = ref([])
const message = ref('')

const fetchProducts = async () => {
  const res = await api.getProducts()
  products.value = res.data
}

const reserve = async (product) => {
  const user = JSON.parse(localStorage.getItem('user'))
  try {
    await api.reserveMeal({
      productId: product._id,
      beneficiaryId: user._id,
    })
    message.value = `Reserved ${product.productName} successfully.`
    await fetchProducts()
  } catch (err) {
    message.value = 'Reservation failed: ' + (err.response?.data?.message || 'Unknown error')
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: auto;
  padding-top: 40px;
}
button {
  margin-left: 10px;
}
</style>
