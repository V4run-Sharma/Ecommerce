import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const userName = ref("");

  const login = async (email, password) => {
    const response = await fetch("http://10.20.2.234:8090/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // cross origin

        // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  };

  const signup = async (username, email, password) => {
    const response = await fetch("http://10.20.2.234:8090/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // cross origin
        // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    return data;
  };

  return {
    userName,
    login,
    signup,
  };
});
