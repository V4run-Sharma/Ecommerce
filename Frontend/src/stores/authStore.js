import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    AuthToken: document.cookie.split('=')[1] || '',
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await fetch('http://10.20.2.234:5050/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json()
        console.log(data)
        console.log(data.status)
        // console.log(data.data)
        // if (data.status == true) {

        //   this.AuthToken = data.headers["AuthToken"];
        //   // localStorage.setItem('token', this.token);
        //   document.cookie=`AuthToken=${AuthToken}`
        //   console.log(this.AuthToken)
          return data.status;
        
      } catch {
        return false;
      }
    },

    async signup(username, email, password) {
      try {
        const response = await fetch('http://10.20.2.234:5050/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.status) {
          const data = await response.json();
          this.AuthToken = data.headers["AuthToken"];
           document.cookie=`AuthToken=${AuthToken}`
          console.log(response.headers)
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  },
});
