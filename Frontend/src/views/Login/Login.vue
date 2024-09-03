<template>
  <div>
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input
        v-model="email"
        type="email"
        placeholder="  Email"
        required
      /><br />
      <input
        v-model="password"
        type="password"
        placeholder="  Password"
        required
      /><br />
      <button type="submit">Login</button><br />
      <p>
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script src="./login.js"></script>

<style scoped>
h2 {
  margin: 20px;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100vh;
  padding: 10%;
}
form {
  height: 500px;
  width: 400px;
  border: 2px solid black;
  justify-self: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
}
input {
  margin: 10px;
  height: 50px;
  width: 200px;
  border: 2pxsolid black;
  border-radius: 10px;
}
button {
  margin: 10px;
  height: 50px;
  width: 200px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: rgb(38, 80, 220);
  color: white;
}
</style>
