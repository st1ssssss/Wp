<template>
  <div id="drop" class="wrapper" v-if="dropSettings">
    <div v-for="(setting, idx) in dropSettings" :key="idx" :id="setting.btnId">
      <div v-if="setting.btnName === 'Edit'">
        <div @click="isShow = !isShow">{{ setting.btnName }}</div>
        <edit-comp
          :idx="setting.btnId"
          v-if="setting.btnName === 'Edit'"
          v-show="isShow"
        />
      </div>

      <div
        @click="deleteProduct(setting.btnId)"
        v-if="setting.btnName === 'Delete'"
      >
        {{ setting.btnName }}
      </div>
    </div>
  </div>
</template>

<script>
import editComp from "./editComp.vue";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    editComp,
  },
  props: {
    dropSettings: {
      type: Array,
    },
  },
  methods: {
    onDrop() {
      this.$modal.hide();
    },
    deleteProduct(id) {
      const productToDelete = this.$store.state.paymentsList.find(
        (el) => id === el.id
      );
      this.$store.commit("deletePaymentsListData", productToDelete);

      this.$modal.hide();
    },

    cordSet(data) {
      const { left, top } = data;
      console.log(left, top);
      const drop = document.querySelector("#drop");
      drop.style.left = `${left}px`;
      drop.style.top = `${top}px`;
      console.log(drop);
    },
  },

  mounted() {
    this.$dropModal.EventBus.$on("elementSent", this.cordSet);
  },
};
</script>

<style lang="sass" scoped>
</style>