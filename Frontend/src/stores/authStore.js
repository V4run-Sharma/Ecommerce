import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    AuthToken: document.cookie.split("=")[1] || "",
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch("http://10.20.2.234:5050/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data.status;
      } catch {
        return false;
      }
    },

    async signup(username, email, password) {
      const response = await fetch("http://10.20.2.234:5050/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      alert(data.message);
      return data.status;
    },
  },
});
