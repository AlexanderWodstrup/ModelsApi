<template>
    <div>
        <h1>Job information:</h1>

        <p>Customer: {{job.customer}}</p>
        <p>StartDate: {{job.startDate}}</p>
        <p>Days: {{job.days}}</p>
        <p>Location: {{job.location}}</p>
        <p>Comments: {{job.comments}}</p>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Delete</th>
            </tr>
            <tr v-for="model in models" v-bind:key="model.email">
                <td>{{model.firstName}}</td>
                <td>{{model.lastName}}</td>
                <td>{{model.email}}</td>
                <td><button class="DeleteButton" v-on:click="deleteModel(model)">Delete</button></td>
                
            </tr>
        </table>
        <router-link :to="`/editjobs/${currentJob()}/addmodel`" class="AddButton">Add Model</router-link>
        <router-link :to="`/jobs`" class="AddButton" style="margin-left: 10px">Go back</router-link>
    </div>
</template>

<script>

export default {
    name: "EditJob",
    data() {
        return {
            job: [],
            models: [],
            allModels: [],
            jobId: []
        }
    },
        methods: {
            async getModels() {
                await fetch("https://localhost:44368/api/Jobs/" + this.currentJob(), {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                }).then(res => res.json()).then(res => this.job = res).then(res => this.models = res.models).catch(error => alert("Error: " + error));

            },
            currentJob() {
                let currentUrl = window.location.pathname;
                //let jobId2 = currentUrl[currentUrl.length - 1];
                //jobId2 = parseInt(jobId2);
                let jobId = currentUrl.split("/");
                jobId = jobId[jobId.length - 1];
                return this.jobId = jobId;
            },
            async deleteModel(model) {
                var modelId;
                for (var tmp of this.allModels) {
                    if (model.email == tmp.email) {
                        modelId = tmp.efModelId;
                    }
                }
                await fetch("https://localhost:44368/api/Jobs/" + this.currentJob() + "/model/" + modelId, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                }).catch(err => console.error('Error: ', err));
                location.reload();
            },
            async getAllModels() {
                await fetch("https://localhost:44368/api/models", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }

                }).then(res => res.json()).then(res => this.allModels = res).catch(error => alert("Error" + error));
            }
        },
    beforeMount() {
        this.getModels();
        this.getAllModels();
    }
}</script>

<style scoped>
    h1, .modelAdd {
        text-align: center;
    }

    table {
        border-collapse: collapse;
        width: 90%;
        margin: auto;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    .AddButton {
        margin-top: 10px;
        background-color: green;
        border-color: black;
        border-radius: 6px;
        min-width: 60px;
        display: inline-block;
        cursor: pointer;
        color: white;
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 6px;
        text-decoration: none;
        text-align: center;
    }


    .AddButton:hover {
        background-color: lightgreen;
    }

    .AddButton:active {
        position: relative;
        top: 1px;
    }

    .DeleteButton {
        background-color: red;
        border-color: black;
        border-radius: 6px;
        min-width: 60px;
        display: inline-block;
        cursor: pointer;
        color: white;
        font-family: Arial;
        font-size: 15px;
        font-weight: bold;
        padding: 6px 6px;
        text-decoration: none;
        text-align: center;
    }
   

    .DeleteButton:hover {
        background-color: lightcoral;
    }

    .DeleteButton:active {
        position: relative;
        top: 1px;
    }

</style>