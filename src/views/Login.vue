<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h1>Login</h1>
      <p>Enter your credentials to access your account.</p>
      <form @submit.prevent="onLogin">
      <input v-model="email" type="email" placeholder="Email" class="login-input" />
      <div class="password-wrapper">
            <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="login-input"
            />
            <span class="toggle-pass" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
      </span>
      </div>
      <button @click="onLogin" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { users } from '../data/users'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

// User authentication when user Login
function onLogin() {
  const userFound = users.find(
    (u) => u.email === email.value && u.password === password.value
  );

  if (userFound) {
    router.push('/tickets');
  } else {
    alert('This user is not found');
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f5f0;
}

.login-box {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 25px;
  box-shadow: 0 2px 18px rgba(0,0,0,0.07);
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}

.login-box h1 {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.3rem;
}

.login-box p {
  text-align: center;
  color: #222;
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
}

.login-box form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-input {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  background: #fafafa;
  box-sizing: border-box;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper .login-input {
  padding-right: 2.2rem;
}

.toggle-pass {
  position: absolute;
  right: 0.7rem;
  cursor: pointer;
  color: #7d7d7d;
  font-size: 1.22rem;
  user-select: none;
}

.toggle-pass:hover {
  color: #314cc9;
}

.login-btn {
  background: #222;
  color: #fff;
  border: none;
  padding: 0.95rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.3rem;
}

.login-btn:hover {
  background: #444;
}

</style>
