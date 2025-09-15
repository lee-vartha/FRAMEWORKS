<template>
  <div class="p-8 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full mb-3" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-3" />
      <button type="submit" class="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
    <p class="text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<script>
import API from "../services/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await API.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "member") {
          this.$router.push("/donor");
        } else {
          this.$router.push("/beneficiary");
        }
      } catch (err) {
        this.error = err.response?.data?.msg || "Login failed";
      }
    },
  },
};
</script>
