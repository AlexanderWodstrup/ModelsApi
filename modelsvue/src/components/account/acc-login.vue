<template>
    <div class="loginForm">
        <h1>Login</h1>
        <form v-on:submit.prevent="login">
            <div class="field">
                <label class="label">User name</label>
                <div class="control">
                    <input 
                           v-model="form.email"
                           class="input"
                           type="text"
                           placeholder="User name"
                           />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input 
                           v-model="form.password"
                           class="input"
                           type="text"
                           placeholder="Password"
                           />
                </div>
            </div>
            <div class="control">
                <button class="button is-primary">Submit</button>
            </div>
        </form>
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
                credentials: {},
                jobs: []
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
                        alert("Logged in");
                        //this.credentials = JSON.parse(token.jwt.split(".")[1]);
                        this.jobs = this.getJobs();
                        //this.postJob();
                        //Change view to some other component
                        // ...
                    } else {
                        alert("Server returned: " + response.statusText);
                    }
                } catch (err) {
                    alert("Error: " + err);
                }
                return;
            },
            async getJobs() {
                let response = await fetch("https://localhost:44368/api/jobs", {
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    return await response.json();
                } else {
                    alert(response.statusText);
                }
            },
            async postJob() {
                let data = {
                    "customer": "Salling",
                    "startDate": "2020-05-13T06:29:31.334Z",
                    "days": 1,
                    "location": "Aarhus Ø",
                    "comments": "Skal brug 2 modeller"
                };
                let response = await fetch("https://localhost:44368/api/jobs", {
                    method: "POST",
                    body: JSON.stringify(data),
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    return await response.json();
                } else {
                    alert(response.statusText);
                }
            }
        }
    };
    
</script>

<style scoped>

</style>
