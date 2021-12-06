<template>
  <div class="wrapper">
    <input class="input-add" placeholder="Payment amount" v-model="value" />
    <input class="input-add" v-model="category" />
    <input class="input-add" placeholder="Payment date" v-model="date" />
    <button class="button-add" @click="saveClick">Save!</button>
  </div>
</template>

<script>
export default {
  props: {
    idx: Number,
  },
  data() {
    return {
      value: "",
      category: "",
      date: "",
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    saveClick() {
      const product = {
        id: this.idx,
        value: Number(this.value),
        category: this.category,
        date: this.date || this.getCurrentDate,
      };
      const productToReplace = this.$store.state.paymentsList.find(
        (el) => this.idx === el.id
      );

      this.$store.commit("editPaymentsListData", { product, productToReplace });

      this.$modal.hide();
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  flex-direction: column

.input-add
  border-radius: 3px
  margin: 5px 0
  padding: 5px 5px
  transition: all 0.2s
  outline: none
  border: 1px solid #ccc
.input-add:focus
  border: 1px solid #000
</style>