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
                <th>Edit</th>
            </tr>
            <tr v-for="job in jobs" v-bind:key="job.efJobId">
                <td>{{job.customer}}</td>
                <td>{{job.startDate}}</td>
                <td>{{job.days}}</td>
                <td>{{job.location}}</td>
                <td>{{job.comments}}</td>
                <td><router-link :to="`/manager/jobs/${job.efJobId}`" class="editButton">Edit</router-link></td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        name: "Jobs",
        data() {
            return {
                jobs: [],
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
                    return await response.json();
                } else {
                    alert(response.statusText);
                }
            },
            
        }
    };

</script>

<style scoped>
    jobslist{
        text-align: center;
    }
</style>
