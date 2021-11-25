<template>
  <div>
    <header>
      <h2 class="main-heading">My personal costs</h2>
      <button class="button" @click="isShowing">add new cost</button>
    </header>
    <main>
      <PaymentsDisplay :items="currentPaymentsList" />
      <AddPaymentForm :categories="categoryList" v-show="isShow" />
      <Pagination :length="6" :curPage="page" :n="n" @paginate="changePage" />
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Pagination from "./components/Pagination.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isShow: false,
      page: 1,
      n: 3,
    };
  },

  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentsList;
    },
    categoryList() {
      return this.$store.getters.getCategoryList;
    },
    currentPaymentsList() {
      const { n, page } = this;
      return this.paymentsList.slice(n * (page - 1), n * page);
    },
  },

  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Pagination,
  },

  methods: {
    isShowing() {
      if (this.isShow === false) return (this.isShow = true);
      else return (this.isShow = false);
    },
    changePage(newPage) {
      this.page = newPage;
      this.fetchData(newPage);
    },
    ...mapActions(["fetchData"]),
  },
  created() {
    this.fetchData(this.page);
    this.$store.dispatch("loadCategories");
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
