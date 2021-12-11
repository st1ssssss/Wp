<template>
  <v-card class="pr-8 pl-8 pb-8 outlined">
    {{ inSign }}
    <v-text-field v-model="value" label="Value"></v-text-field>
    <v-text-field v-model="date" label="Date"></v-text-field>
    <v-text-field v-model="category" label="Category" />

    <v-btn @click="saveClick">Save changes!</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    idx: Number,
    valueEd: Number,
    categoryEd: String,
    dateEd: null,
  },
  data() {
    return {
      value: this.valueEd,
      category: this.categoryEd,
      date: this.dateEd,
      inSign: "",
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
      this.infSign = "Успешно изменено";
    },
  },
};
</script>

<style lang="sass" scoped>
</style>