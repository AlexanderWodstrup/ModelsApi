<template>
    <div class="CreateJobForm">
        <h1>Enter Job Information</h1>
        <form v-on:submit.prevent="create">
            <div class="field">
                <label class="label">Customer</label>
                <div class="control">
                    <input v-model="form.Customer"
                           class="input"
                           type="text"
                           placeholder="Customer" />
                </div>
            </div>
            <div class="field">
                <label class="label">StartDate</label>
                <div class="control">
                    <input v-model="form.StartDate"
                           class="input"
                           type="datetime"
                           placeholder="StartDate" />
                </div>
            </div>
            <div class="field">
                <label class="label">Days</label>
                <div class="control">
                    <input v-model="form.days"
                           class="input"
                           type="number"
                           placeholder="Days" />
                </div>
            </div>
            <div class="field">
                <label class="label">Location</label>
                <div class="control">
                    <input v-model="form.Location"
                           class="input"
                           type="text"
                           placeholder="Location" />
                </div>
            </div>
            <div class="field">
                <label class="label">Comments</label>
                <div class="control">
                    <input v-model="form.Comments"
                           class="input"
                           type="text"
                           placeholder="Comments" />
                </div>
            </div>
            <div class="control">
                <button class="button is-primary">Submit</button>
            </div>
        </form>
    </div>
</template>
<!--  -->
<script>
    export default {
        name: "createjob",
        data: function () {
            return {
                form: {
                    customer: "string",
                    startDate: "2021-05-18T14:46:34.626Z",
                    days: 0,
                    location: "string",
                    comments: "string"
                },
                credentials: {},
                jobs: []
            };
        },
        methods: {
            async create() {
                let url = "https://localhost:44368/api/Jobs";
                try {
                    this.form.days = parseFloat(this.form.days);
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
                        alert("Job created");
                    } else {
                        alert("Job not created: " + response.statusText + " token:  " + localStorage.getItem("token"));
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