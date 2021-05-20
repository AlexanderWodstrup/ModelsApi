<template>
    <div class="viewjobs">
        <listJobs/>
    </div>
</template>

<script>
    import listJobs from "@/components/GetJobs.vue";

    export default {
        name: "jobslist",
        components: {
            listJobs,
        }
    };
</script>
