<template>
  <div>
    <header>
      <h2 class="main-heading">My personal costs</h2>
      <button class="button" @click="isShowing">add new cost</button>
    </header>
    <main>
      <PaymentsDisplay :items="paymentsList" />
      <AddPaymentForm @addNewPayment="addNewPayment" v-show="isShow" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";

export default {
  name: "App",

  data() {
    return {
      paymentsList: [],
      isShow: false,
    };
  },

  components: {
    PaymentsDisplay,
    AddPaymentForm,
  },

  methods: {
    addNewPayment(data) {
      this.paymentsList = [...this.paymentsList, data];
    },

    isShowing() {
      if (this.isShow === false) return (this.isShow = true);
      else return (this.isShow = false);
    },

    fetchdata() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
  },
  created() {
    this.paymentsList = this.fetchdata();
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
</style>
