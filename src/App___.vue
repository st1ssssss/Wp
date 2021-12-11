<template>
  <div class="wrapper">
    <header>
      <router-link to="/dashboard">Dashboard</router-link>/

      <router-link to="/about">About</router-link>/
      <router-link to="/404">Not Found</router-link>
    </header>
    <div>
      <router-view class="rel" />
      <transition name="fade">
        <drop-down id="drop" :dropSettings="dropSettings" />
      </transition>
    </div>
    <transition name="fade">
      <modal-window
        class="modal"
        :componentName="componentName"
        :settings="modalSettings"
      />
    </transition>
  </div>
</template>
 
<script>
import ModalWindow from "./components/ModalWindow.vue";
import DropDown from "./components/DropDown.vue";
export default {
  name: "App",
  data() {
    return {
      modalSettings: {},
      componentName: "",
      dropSettings: [],
    };
  },

  components: {
    ModalWindow,
    DropDown,
  },
  computed: {},

  methods: {
    onShown(data) {
      const { name, settings } = data;
      this.modalSettings = settings;
      this.componentName = name;
    },
    onDrop(data) {
      this.dropSettings = data;
    },
    onHide() {
      this.modalSettings = {};
      this.componentName = "";
      this.dropSettings = [];
    },
  },
  created() {
    this.$store.dispatch("loadCategories");
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
    this.$dropModal.EventBus.$on("dropShown", this.onDrop);
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  flex-direction: column
  align-items: center

#drop
  position: absolute

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

.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease

.fade-enter, .fade-leave-to
  opacity: 0

a
  text-decoration: none
</style>
