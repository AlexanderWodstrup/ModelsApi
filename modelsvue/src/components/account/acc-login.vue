<template>
    <div>
        <div v-if="loginState">
            <h1>Logout</h1>
            <button v-on:click="logout()">Logout</button>
        </div>
        <div class="loginForm" v-if="!loginState">
            <h1>Login</h1>
            <form v-on:submit.prevent="login">
                <div class="field">
                    <label class="label">User name</label>
                    <div class="control">
                        <input v-model="form.email"
                               class="input"
                               type="text"
                               placeholder="User name" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input v-model="form.password"
                               class="input"
                               type="text"
                               placeholder="Password" />
                    </div>
                </div>
                <div class="control">
                    <button class="button is-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "acclogin",
        data: function () {
            return {
                form: {
                    email: "",
                    password: "",
                },
                loginState: false,
            };
        },
        methods: {
            async login() {
                let url = "https://localhost:44368/api/account/login";
                try {
                    let response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(this.form),//Assumes data is in an object called form
                        headers: new Headers({
                            "Content-Type": "application/json"
                        })
                    });

                    if (response.ok) {
                        let token = await response.json();
                        localStorage.setItem("token", token.jwt);
                        localStorage.setItem("email", this.form.email);
                        localStorage.setItem("isManager", this.GetRole(token.jwt));
                        localStorage.setItem("loginState", "true");
                        //alert("Logged in: " + localStorage.getItem("loginState"));

                        this.GetLoginState();
                        location.reload();
                        //this.credentials = JSON.parse(toke n.jwt.split(".")[1]);
                        //this.jobs = this.getJobs();
                        //this.postJob();
                        //Change view to some other component
                        // ...
                    } else {
                        alert("Server returned: " + response.statusText);
                    }
                } catch (err) {
                    alert("Error: " + err);
                }
                
            },
            async logout() {
                localStorage.removeItem("token");
                localStorage.removeItem("isManager");
                localStorage.removeItem("email");
                localStorage.removeItem("loginState");
                localStorage.setItem("loginState", "false");
                //alert("loginState: " + localStorage.getItem("loginState"))
                location.reload();
            },
            GetRole(token) {

                //Hentet fra stackoverflow - https://stackoverflow.com/a/38552302/14215614
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                var jsonToken = JSON.parse(jsonPayload)
                var role = jsonToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                if (role == "Manager") {
                    return true;
                } else {
                    return false;
                }
            },
            GetLoginState() {
                if (localStorage.getItem("loginState") == "true") {
                    return this.loginState = true;
                }
                if (localStorage.getItem("loginState") == "false") {
                    return this.loginState = false;
                }
            }

        },
        mounted() {
            this.GetLoginState()
        }

    }
    
</script>

<style scoped>

</style>
