<template>
  <div class="wrapper">
    <input class="input-add" placeholder="Payment amount" v-model="value" />
    <input class="input-add" v-model="category" />
    <button @click="addNewCategory">add new category</button>
    <select v-model="category" class="input-add">
      <option v-for="(option, idx) in categories" :value="option" :key="idx">
        {{ option }}
      </option>
    </select>
    <input class="input-add" placeholder="Payment date" v-model="date" />
    <button class="button-add" @click="onSaveClick">Save!</button>
  </div>
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

  props: {
    categories: {
      type: Array,
      defualt() {
        return [];
      },
    },
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
    check(a) {
      console.log(a);
    },

    addNewCategory() {
      const test = new RegExp(this.category, "i");
      const res = test.test(this.categories);
      if (res === false) this.categories.push(this.category);
    },

    onSaveClick() {
      const data = {
        value: +this.value,
        category: this.category,
        date: this.date || this.getCurrentDate,
      };
      this.$store.commit("addPaymentsListData", data);
    },
  },
};
</script>

<style scoped lang="sass">
.wrapper
  display: flex
  flex-direction: column
  width: 200px

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