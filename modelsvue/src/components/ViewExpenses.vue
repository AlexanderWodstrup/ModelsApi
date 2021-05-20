<template>
    <div class="expenseList">
        <h1>Manage Expenses</h1>

        <table>
            <tr>
                <th>Model</th>
                <th>Job</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
            <tr v-for="expense in expenses" v-bind:key="expense.efExpenseId">
                <td>{{expense.modelId}}</td>
                <td>{{expense.jobId}}</td>
                <td>{{expense.date}}</td>
                <td>{{expense.text}}</td>
                <td>{{expense.amount}}</td>
                
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "listExpenses",
        data() {
            return {
                expenses: [],
                allModels: [],
                jobs: []
            }
        },
        methods: {
            async getExpenses() {
                let response = await fetch("https://localhost:44368/api/Expenses", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    this.expenses = await response.json();
                } else {
                    alert("Error: " + response.statusText);
                }
                await this.getAllModels();
                await this.getJobs();
            },
            async getAllModels() {
                await fetch("https://localhost:44368/api/models", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }

                }).then(res => res.json()).then(res => this.allModels = res).catch(error => alert("Error" + error));

                for (let model of this.allModels) {
                    //console.log("Test: " + model.efModelId);
                    for (let expenseModel of this.expenses) {
                        if (model.efModelId == expenseModel.modelId) {
                            //console.log(model.firstName);
                            let modelname = model.firstName + " " + model.lastName;
                            expenseModel.modelId = modelname;
                        }
                    }
                }
            },
            async getJobs() {
                let response = await fetch("https://localhost:44368/api/jobs", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    this.jobs = await response.json();
                } else {
                    alert("Error: " + response.statusText);
                };

                for (let job of this.jobs) {
                    //console.log("Test: " + job.customer);
                    for (let expenseJob of this.expenses) {
                        if (job.efJobId == expenseJob.jobId) {
                            console.log("Test expense: " + expenseJob.efExpenseId);
                            expenseJob.jobId = job.customer;
                        }
                    }
                }
            }
        },
        mounted() {
            this.getExpenses();
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
