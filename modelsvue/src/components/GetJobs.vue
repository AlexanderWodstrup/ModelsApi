<template>
    <div class="jobslist">
        <h1>Manage Jobs</h1>

        <table>
            <tr>
                <th>Customer</th>
                <th>Start Date</th>
                <th>Days</th>
                <th>Location</th>
                <th>Comments</th>
                <th v-if="isManager">Edit</th>
                <th v-if="!isManager">Edit</th>
            </tr>
            <tr v-for="job in jobs" v-bind:key="job.efJobId">
                <td>{{job.customer}}</td>
                <td>{{job.startDate}}</td>
                <td>{{job.days}}</td>
                <td>{{job.location}}</td>
                <td>{{job.comments}}</td>
                <td v-if="isManager"><router-link :to="`/editjobs/${job.efJobId}`" class="editButton">Edit</router-link></td>
                <th v-if="!isManager"><router-link :to="`/addexpense/${job.efJobId}`" class="editButton">Add expense</router-link></th>
            </tr>
        </table>
        <div v-if="isManager">
            <listExpenses />
        </div>
        
    </div>
</template>

<script>
    import listExpenses from "@/components/ViewExpenses.vue";

    export default {
        name: "listJobs",
        components: {
            listExpenses,
        },
        data() {
            return {
                jobs: [],
                isManager: false
            }
        },
        methods: {
            async getJobs() {
                let response = await fetch("https://localhost:44368/api/jobs", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    return this.jobs = await response.json();
                } else {
                    alert("Error: " + response.statusText);
                }
            },
            getUserRole() {
                if (localStorage.getItem("isManager") == "true") {
                    this.isManager = true;
                }
                else {
                    this.isManager = false;
                }
            }
        },
        mounted() {
            this.getJobs();
            this.getUserRole();
        }
    };

</script>

<style scoped>
    h1 {
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

    .editButton {
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

        .editButton:hover {
            background-color: #2e9444;
        }

        .editButton:active {
            position: relative;
            top: 1px;
        }
</style>
