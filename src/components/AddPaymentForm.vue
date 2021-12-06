<template>
  <div class="wrapper">
    <div class="links">
      <router-link
        @click.native="quickAdd"
        :to="{
          name: 'addPayment',
          params: { category: 'Food', value: 200 },
        }"
      >
        Food</router-link
      >
      <router-link
        @click.native="quickAdd"
        :to="{
          name: 'addPayment',
          params: { category: 'Transport', value: 50 },
        }"
      >
        Transport</router-link
      >
      <router-link
        @click.native="quickAdd"
        :to="{
          name: 'addPayment',
          params: { category: 'Entertainment', value: 2000 },
        }"
      >
        Entertainment</router-link
      >
    </div>
    {{ infSign }}
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
      infSign: "",
    };
  },

  props: {},

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
    quickAdd() {
      if (this.$route.params?.value) {
        this.value = Number(this.$route.params.value);
      }
      if (this.$route.params?.category) {
        this.category = this.$route.params.category;
      }
      if (this.value && this.category) {
        this.onSaveClick();
      } else this.infSign = "Введите недостающие данные!";
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