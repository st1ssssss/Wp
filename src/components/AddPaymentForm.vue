<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="value" label="Value"></v-text-field>
    <v-text-field v-model="date" label="Date"></v-text-field>
    <v-text-field v-model="category" label="Category" />
    <v-select v-model="category" :items="categories" />
    <v-btn @click="onSaveClick" class="mr-4">Save!</v-btn>
    <v-btn @click="addNewCategory">Add New Category</v-btn>
  </v-card>
</template>

<script>
export default {
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
    categories() {
      return this.$store.getters.getCategoryList;
    },
  },

  methods: {
    addNewCategory() {
      const test = new RegExp(this.category, "i");
      console.log(test);
      const res = test.test(this.categories);
      if (res === false) this.categories.push(this.category);
    },

    onSaveClick() {
      const data = {
        id: this.$store.state.paymentsList.length + 1,
        value: +this.value,
        category: this.category,
        date: this.date || this.getCurrentDate,
      };
      this.$store.commit("addPaymentsListData", data);
      this.infSign = "Ваши данные были успешно сохранены!";
    },
  },
};
</script>

<style scoped lang="sass">
.wrapper
  display: flex
  flex-direction: column
  height: 220px
  z-index: 2
  position: absolute
  top: 0
  left: auto
  right: auto
  bottom: 0
  background-color: #fff
.input-add
  border-radius: 3px
  margin: 5px 0
  padding: 5px 5px
  transition: all 0.2s
  outline: none
  border: 1px solid #ccc
.input-add:focus
  border: 1px solid #000

.button-add
  width: 50%
  padding: 5px
  color: #fff
  text-transform: uppercase
  align-self: flex-end
  background: #00ADAB
  border: #00ADAB
  border-radius: 3px
</style>