<template>
  <div>
    About
    <button @click="openAuthForm"></button>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      componentName: "",
      modalSettings: {},
    };
  },
  components: {},
  methods: {
    openAuthForm() {
      this.$modal.show("authForm", { title: "Auth Form" });
    },
  },
};
</script>

<style>
</style>