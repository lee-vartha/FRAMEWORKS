<template>
  <div class="register-page">
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="user.firstName" type="text" placeholder="First Name" required />
        <input v-model="user.email" type="email" placeholder="Email" required />
        <input v-model="user.password" type="password" placeholder="Password" required />
        <select v-model="user.memberType" required>
          <option disabled value="">Select Role</option>
          <option value="donor">Donor</option>
          <option value="beneficiary">Beneficiary</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        firstName: '',
        email: '',
        password: '',
        memberType: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/api/accounts/register', this.user);
        alert('Registered successfully!');
        this.$router.push('/login');
      } catch (err) {
        console.error(err);
        alert('Registration failed.');
      }
    }
  }
};
</script>

<style scoped>
.register-page {
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

input, select, button {
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
