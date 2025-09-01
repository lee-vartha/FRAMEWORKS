<template>
  <div class="form-container">
    <h2>Add Product</h2>
    <form @submit.prevent="addProduct">
      <input v-model="product.productName" placeholder="Product Name" />
      <input v-model="product.companyName" placeholder="Company" />
      <input v-model="product.quantity" type="number" placeholder="Quantity" />
      <input v-model="product.tokenCost" type="number" placeholder="Token Cost" />
      <input v-model="product.waitTime" type="number" placeholder="Wait Time (mins)" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      product: {
        productName: '',
        companyName: '',
        quantity: 0,
        tokenCost: 0,
        waitTime: 0,
        donorId: '' // should get from login session ideally
      }
    };
  },
  methods: {
    async addProduct() {
      await axios.post('/api/products', this.product);
      alert("Product added!");
    }
  }
};
</script>
