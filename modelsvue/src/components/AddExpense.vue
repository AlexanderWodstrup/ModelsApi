<template>
    <div class="expenseAdd">
        <h1>Add expense to job</h1>
        <form v-on:submit.prevent="create">
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                    <input v-model="form.Date"
                           class="input"
                           type="datetime"
                           placeholder="Date" />
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <input v-model="form.Text"
                           class="input"
                           type="text"
                           placeholder="Description" />
                </div>
            </div>
            <div class="field">
                <label class="label">Amount</label>
                <div class="control">
                    <input v-model="form.amount"
                           class="input"
                           type="number"
                           step="0.01"
                           placeholder="Amount" />
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
        name: "addExpense",
        data: function () {
            return {
                form: {
                    modelId: 0,
                    jobId: 0,
                    date: "2021-05-18T14:46:34.626Z",
                    text: "string",
                    amount: 0
                },
            };
        },
        methods: {
            async create() {
                await this.currentJob();
                await this.currentModel();
                this.form.modelId = parseInt(this.form.modelId);
                this.form.jobId = parseFloat(this.form.jobId);
                this.form.amount = parseFloat(this.form.amount);
                let url = "https://localhost:44368/api/Expenses";
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
                        alert("Expense created");
                    } else {
                        alert("Expense not created: " + response.statusText + " token:  " + localStorage.getItem("token"));
                    }
                } catch (err) {
                    alert("Error: " + err);
                }
            },
            currentJob() {
                let currentUrl = window.location.pathname;
                //let jobId2 = currentUrl[currentUrl.length - 1];
                //jobId2 = parseInt(jobId2);
                let jobId = currentUrl.split("/");
                jobId = jobId[jobId.length - 1];
                
                return this.form.jobId = parseInt(jobId);;
            },
            async currentModel() {
                
                //Hentet fra stackoverflow - https://stackoverflow.com/a/38552302/14215614
                var token = localStorage.getItem("token");
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                var jsonToken = JSON.parse(jsonPayload)
                this.form.modelId = jsonToken.ModelId;
                
            }
        },
        mounted() {
            
        }
    };

</script>

<style scoped>
    h1 {
        text-align: center;
    }

</style>
