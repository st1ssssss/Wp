<template>
  <div>
    <button class="button" @click="isShowing">add new cost</button>

    <PaymentsDisplay :items="currentPaymentsList" />
    <AddPaymentForm :categories="categoryList" v-show="isShow" />
    <Pagination
      :length="paymentsList.length"
      :curPage="page"
      :n="n"
      @paginate="changePage"
    />
  </div>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Pagination from "../components/Pagination.vue";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      isShow: false,
      page: 1,
      n: 5,
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
    },
    ...mapActions(["fetchData"]),
  },
  created() {
    this.fetchData();
    this.$store.dispatch("loadCategories");
  },
  mounted() {
    if (this.$route.params?.page) {
      this.page = Number(this.$route.params.page);
    }
  },
};
</script>

<style>
</style>