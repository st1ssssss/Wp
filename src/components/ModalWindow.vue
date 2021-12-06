<template>
  <div class="wrapper" v-if="componentName">
    <component :is="componentName" />

    <button @click="onClose">закрыть</button>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import AddPaymentForm from "../components/AddPaymentForm.vue";
import AuthForm from "../components/AuthForm.vue";

export default {
  components: {
    AddPaymentForm,
    AuthForm,
  },
  props: {
    componentName: {
      type: String,
    },
    settings: {
      type: Object,
    },
  },

  methods: {
    onClose() {
      this.$modal.hide();
    },
  },
};
</script>
