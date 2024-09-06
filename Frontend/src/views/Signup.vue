<template>
  <div class="signup-page">
    <img src="../assets/blibli.webp" class="logo" />
    <div class="container">
      <h2>Signup</h2>
      <form @submit.prevent="handleSignup">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Signup</button>
        <p v-if="message" :class="messageClass">{{ message }}</p>
      </form>
      <p class="login-option">
        Already have an account?
        <b><router-link to="/login">Login</router-link></b>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const messageClass = ref("");
const authStore = useAuthStore();
const router = useRouter();

async function handleSignup() {
  if (!isNaN(parseInt(username.value[0]))) {
    message.value = "Username must start with a letter";
    messageClass.value = "error";
    return;
  }
  if (email.value.split("@")[1].includes(".") === false) {
    message.value = "Invalid email address";
    messageClass.value = "error";
    return;
  }
  if (password.value.length < 8) {
    message.value = "Password must be at least 8 characters";
    messageClass.value = "error";
    return;
  }
  const response = await authStore.signup(
    username.value,
    email.value,
    password.value
  );
  if (response.status) {
    authStore.userName = response.data;
    localStorage.setItem("username", response.data);
    router.push("/login");
  } else {
    message.value = response.message;
    messageClass.value = "error";
  }
}
</script>

<style scoped>
.logo {
  position: absolute;
  width: 150px;
  height: 80px;
  object-fit: contain;
  margin-left: 40px;
}
.signup-page {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-image: url(https://static.vecteezy.com/system/resources/previews/007/068/286/original/background-for-website-or-mobile-app-online-shopping-with-3d-smartphone-on-blue-background-free-vector.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  gap: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px;
  height: 500px;
  width: 40%;
  max-width: 450px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 100px;
  margin-left: 40px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-grow: 1;
  justify-content: center;
}
h2 {
  align-self: center;
  font-size: 38px;
  margin-top: 10px;
}
input,
button {
  padding: 15px;
  border: 1px solid #030303;
  border-radius: 8px;
  font-size: 20px;
}
button {
  background-color: #0056b3;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #004494;
}
.login-option {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
}
.login-option b {
  font-size: 21px;
  margin-left: 5px;
}
.login-option a {
  color: #0056b3;
  text-decoration: none;
  font-weight: bold;
}
.login-option a:hover {
  color: #004494;
}
p.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
p.success {
  color: green;
  font-size: 14px;
  margin-top: 10px;
}
</style>
