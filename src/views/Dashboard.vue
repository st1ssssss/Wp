<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 mb-8">My personal costs</div>
        <v-dialog v-model="dialog">
          <v-card>
            <add-payment-form />
          </v-card>
        </v-dialog>
        <v-btn @click="dialog = !dialog" color="teal" dark max-width="30%"
          >Add New Cost <v-icon>mdi-plus</v-icon></v-btn
        >
        <payments-display :items="currentPaymentsList" />

        <div class="text-center pt-2">
          <v-pagination
            color="grey"
            v-model="page"
            :length="Math.ceil(paymentsList.length / 5)"
          ></v-pagination>
        </div>
      </v-col>
      <v-col>
        <div class="chart">
          <canvas id="myChart" ref="canvas"></canvas>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { Pie } from "vue-chartjs";
import { mapActions } from "vuex";
import AddPaymentForm from "../components/AddPaymentForm.vue";

export default {
  name: "Dashboard",
  extends: Pie,

  data() {
    return {
      dialog: false,
      page: 1,
      n: 5,
      dataChart: Array,
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
  },
  watch: {
    paymentsList() {
      this.renderChart({
        labels: this.categoryList,
        datasets: [
          {
            label: "расходы",
            data: this.categoryList.map((category) => {
              return this.paymentsList.reduce((total, payment) => {
                if (payment.category === category) {
                  total += +payment.value;
                }
                return total;
              }, 0);
            }),

            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
  methods: {
    openAddPaymentForm() {
      this.dialog = !this.dialog;
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

    /*this.renderChart({
      labels: this.categoryList,
      datasets: [
        {
          label: "расходы",
          data: this.categoryList.map((category) => {
            return this.paymentsList.reduce((total, payment) => {
              if (payment.category === category) {
                total += +payment.value;
              }
              return total;
            }, 0);
          }),

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });*/
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