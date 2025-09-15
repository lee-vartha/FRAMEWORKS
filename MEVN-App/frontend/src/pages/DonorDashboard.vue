<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Donor Dashboard</h2>
    <form @submit.prevent="addProduct" class="mb-6">
      <input v-model="productName" placeholder="Product Name" class="border p-2 w-full mb-3" />
      <input v-model.number="tokenCost" type="number" placeholder="Token Cost" class="border p-2 w-full mb-3" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Product</button>
    </form>
    <ul>
      <li v-for="product in products" :key="product._id" class="border-b py-2">
        {{ product.name }} — {{ product.tokenCost }} tokens
      </li>
    </ul>
  </div>
</template>

<script>
import API from "../services/api";

export default {
  data() {
    return {
      productName: "",
      tokenCost: 1,
      products: [],
    };
  },
  // mounted means to run this code when the component is loaded
  async mounted() {
    const res = await API.get("/products");
    this.products = res.data;
  },
  methods: {
    // adding a product
    async addProduct() {
      // get the product from the form and post it to the backend
      const res = await API.post("/products", {
        name: this.productName,
        tokenCost: this.tokenCost,
      });
      this.products.push(res.data);
      this.productName = "";
      this.tokenCost = 1;
    },
  },
};
</script>
