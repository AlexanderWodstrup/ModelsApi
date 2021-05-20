<template>
  <div id="app">
      <div id="nav">
          <div v-if="loginState">
              <div v-if="isManager">
                  <router-link to="/createmodel">Model</router-link> |
                  <router-link to="/createmanager">Manager</router-link> |
                  <router-link to="/">Home</router-link> |
                  <router-link to="/createjob">Create job</router-link> |
                  <router-link to="/jobs">Jobs</router-link>
              </div>
              <div v-if="!isManager">
                  <router-link to="/">Home</router-link> |
                  <router-link to="/jobs">Jobs</router-link>
              </div>
          </div>
          <div v-if="!loginState">
              <router-link to="/">Home</router-link>
          </div>
      </div>
    <router-view />
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                isManager: false,
                loginState: false
            }
        },
        methods: {
            getUserRole() {
                if (localStorage.getItem("isManager") == "true") {
                    this.isManager = true;
                }
                else {
                    this.isManager = false;
                }
            },
            GetLoginState() {
                if (localStorage.getItem("loginState") == "true") {
                    this.loginState = true;
                }
                if (localStorage.getItem("loginState") == "false") {
                    this.loginState = false;
                }
            }
        },
        mounted() {
            this.getUserRole();
            this.GetLoginState();
        }
    };

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
