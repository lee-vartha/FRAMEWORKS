<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Beneficiary Dashboard</h2>
    <p class="mb-6">Token Balance: {{ balance }}</p>
    <ul>
      <li v-for="product in products" :key="product._id" class="flex justify-between border-b py-2">
        <span>{{ product.name }} — {{ product.tokenCost }} tokens</span>
        <button @click="buy(product)" class="bg-green-500 text-white px-3 py-1">Buy</button>
      </li>
    </ul>
    <p class="text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<script>
import API from "../services/api";

export default {
  data() {
    return {
      balance: 0,
      products: [],
      error: "",
    };
  },
  // mounted lifecycle hook to fetch user balance and products
  async mounted() {
    const user = await API.get("/auth/me");
    this.balance = user.data.tokenBalance;

    const res = await API.get("/products");
    this.products = res.data;
  },
  methods: {
    async buy(product) {
      try {
        // if the balance is less than the product cost, show error
        if (this.balance < product.tokenCost) {
          this.error = "Insufficient tokens!";
          return;
        }
        // async call to use tokens for the product
        await API.post(`/tokens/use`, { productId: product._id });
        this.balance -= product.tokenCost;
        this.error = "";
      } catch {
        this.error = "Transaction failed.";
      }
    },
  },
};
</script>
