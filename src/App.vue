<template>
  <div>
    <header>
      <router-link to="/dashboard">Dashboard</router-link>/

      <router-link to="/about">About</router-link>/
      <router-link to="/404">Not Found</router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    //this.$router.push({ name: "Dashboard" });
  },
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
.main-heading
  font-family: Arial, Helvetica, sans-serif

.nav-bar
  display: flex

.button
  width: 150px
  padding: 5px
  color: #fff
  text-transform: uppercase
  align-self: flex-end
  background: #00ADAB
  border: #00ADAB
  border-radius: 3px

a
  text-decoration: none
</style>
