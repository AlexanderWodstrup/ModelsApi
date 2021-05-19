<template>
    <div class="viewjobs">
        <jobs/>
    </div>
</template>

<script>
    import jobs from "@/components/GetJobs.vue";

    export default {
        name: "jobslist",
        components: {
            jobs,
        },
    };
</script>
