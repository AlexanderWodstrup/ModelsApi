<template>
    <div>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Add</th>
            </tr>
            <tr v-for="model in models" v-bind:key="model.email">
                <td>{{model.firstName}}</td>
                <td>{{model.lastName}}</td>
                <td>{{model.email}}</td>
                <td><button class="addButton" v-on:click="addModelToJob(model)">Add</button></td>
            </tr>
        </table>
        <router-link :to="`/editjobs/${currentJob()}`" class="addButton" style="margin-top: 10px">Go back</router-link>
    </div>
</template>

<script>

    export default {
        name: "listModels",
        data() {
            return {
                models: [],
                allModels: [],
                modelsWithJob: [],
                job: [],
            }
        },
        methods: {
            async getAllModels() {
                await fetch("https://localhost:44368/api/models", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }

                }).then(res => res.json()).then(res => this.allModels = res).catch(error => alert("Error" + error));
                await this.getModelsWithJob();
                await this.sortModels();
            },
            checkIfPushed(model) {
                for (let jobModel of this.modelsWithJob) {
                    if (model.email == jobModel.email) {
                        return false;
                    }
                }

                return true;
            },
            sortModels() {
                for (let model of this.allModels)
                {
                    if (this.checkIfPushed(model) == true) {
                        this.models.push(model);
                    }
                }
            },
            
            async getModelsWithJob() {
                await fetch("https://localhost:44368/api/Jobs/" + this.currentJob(), {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                }).then(res => res.json()).then(res => this.job = res).then(res => this.modelsWithJob = res.models).catch(error => alert("Error: " + error));

            },
            currentJob() {
                let currentUrl = window.location.pathname;
                //let jobId2 = currentUrl[currentUrl.length - 1];
                //jobId2 = parseInt(jobId2);
                let jobId = currentUrl.split("/");
                jobId = jobId[jobId.length - 2];
                return this.jobId = jobId;
            },
            async addModelToJob(model) {
                var modelId;
                for (let tmp of this.allModels) {
                    if (model.email == tmp.email) {
                        modelId = tmp.efModelId;
                    }
                }
                
                await fetch("https://localhost:44368/api/Jobs/" + this.currentJob() + "/model/" + modelId, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                }).catch(err => console.error('Error: ', err));
                location.reload();
                await this.getModelsWithJob();
                
                
            }
        },
        mounted() {
            this.getAllModels()
            
        }
    }

</script>

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

    .addButton {
        box-shadow: inset 0px 1px 0px 0px #caefab;
        background-color: #4CAF50;
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

        .addButton:hover {
            background-color: #2e9444;
        }

        .addButton:active {
            position: relative;
            top: 1px;
        }
</style>