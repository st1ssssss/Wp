<template>
  <div class="wrapper">
    <payments-display :items="currentPaymentsList" />
    <button @click="openAddPaymentForm">Add New Cost</button>
    <pagination
      :length="paymentsList.length"
      :curPage="page"
      :n="n"
      @paginate="changePage"
    />
  </div>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

import Pagination from "../components/Pagination.vue";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      page: 1,
      n: 5,
    };
  },

  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentsList;
    },

    currentPaymentsList() {
      const { n, page } = this;
      return this.paymentsList.slice(n * (page - 1), n * page);
    },
  },

  components: {
    PaymentsDisplay,
    Pagination,
  },

  methods: {
    openAddPaymentForm() {
      this.$modal.show("addPaymentForm", { title: "Add New Cost" });
    },
    changePage(newPage) {
      this.page = newPage;
    },
    ...mapActions(["fetchData"]),
  },
  created() {
    this.fetchData();
  },
  mounted() {
    if (this.$route.params?.page) {
      this.page = Number(this.$route.params.page);
    }
  },
};
</script>

<style lang="sass" scoped>
.button-add
  width: 150px
  padding: 5px
  color: #fff
  text-transform: uppercase

  background: #00ADAB
  border: #00ADAB
  border-radius: 3px
</style>