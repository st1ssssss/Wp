<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-btn plain to="/about">About</v-btn>
        <v-btn plain class="mr-2" to="/dashboard">Dashboard</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
  mounted() {
    this.$store.dispatch("loadCategories");
  },
};
</script>
