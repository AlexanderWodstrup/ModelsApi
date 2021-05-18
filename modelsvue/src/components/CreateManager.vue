<template>
    <div class="CreateManagerForm">
        <h1>Enter Manager Information</h1>
        <form v-on:submit.prevent="create">
            <div class="field">
                <label class="label">Firstname</label>
                <div class="control">
                    <input v-model="form.FirstName"
                           class="input"
                           type="text"
                           placeholder="Firstname" />
                </div>
            </div>
            <div class="field">
                <label class="label">Lastname</label>
                <div class="control">
                    <input v-model="form.LastName"
                           class="input"
                           type="text"
                           placeholder="Lastname" />
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="form.Email"
                           class="input"
                           type="text"
                           placeholder="Email" />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input v-model="form.Password"
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
</template>

<script>
    export default {
        name: "createmanager",
        data: function () {
            return {
                form: {
                    firstName: "string",
                    lastName: "string",
                    email: "string",
                    password: "string"
                },
                credentials: {},
                jobs: []
            };
        },
        methods: {
            async create() {
                let url = "https://localhost:44368/api/Managers";
                try {
                    let response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(this.form),
                        credentials: "include",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        alert("Manager created");
                    } else {
                        alert("Manager not created: " + response.statusText + " token:  " + localStorage.getItem("token"));
                    }
                } catch (err) {
                    alert("Error: " + err);
                }
            }
        }
    };
</script>

<style scoped>

</style>