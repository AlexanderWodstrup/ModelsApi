<template>
  <div class="HomePage">
    <img alt="Vue logo" src="../assets/logo.png" />
    <acclogin/>
  </div>
</template>

<script>
// @ is an alias to /src
    import acclogin from "@/components/account/acc-login.vue";

export default {
  name: "loginForm",
  components: {
      acclogin,
  },
};
</script>
