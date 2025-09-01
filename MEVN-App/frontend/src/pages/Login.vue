<template>
  <div class="login-page">
    <div class="form-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/api/accounts/login', {
          email: this.email,
          password: this.password
        });

        const user = res.data;
        localStorage.setItem('user', JSON.stringify(user));

        alert(`Welcome, ${user.firstName}!`);

        // Redirect based on role
        if (user.memberType === 'donor') {
          this.$router.push('/donor');
        } else {
          this.$router.push('/beneficiary');
        }

      } catch (err) {
        console.error(err);
        alert('Login failed. Please check your credentials.');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f4f6;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

input, button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  background-color: #324960;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #223348;
}
</style>
