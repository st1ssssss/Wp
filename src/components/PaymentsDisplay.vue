<template>
  <v-container class="table">
    <v-row class="elevation-1">
      <v-col :cols="1">#</v-col>
      <v-col :cols="4">Date</v-col>
      <v-col :cols="5">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <v-row v-for="(item, idx) in items" :key="idx" class="elevation-1">
      <v-col :cols="1">{{ idx + 1 }}</v-col>
      <v-col :cols="4">{{ item.date }}</v-col>
      <v-col :cols="5">{{ item.category }}</v-col>
      <v-col :cols="1">{{ item.value }}</v-col>
      <v-col
        :cols="1"
        :id="idx"
        @click="openDropDown(item.id, item.date, item.category, item.value)"
      >
        ...
      </v-col>
    </v-row>
    <v-dialog v-model="isShow" max-width="400">
      <v-card>
        <div class="box-btn pt-8 pb-8">
          <v-btn @click="edit = !edit">Edit</v-btn>
          <v-btn @click="deleteProduct(idx)">Delete</v-btn>
        </div>

        <edit-comp
          :idx="idx"
          :valueEd="valueEd"
          :categoryEd="categoryEd"
          :dateEd="dateEd"
          v-if="edit"
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import EditComp from "./editComp.vue";
export default {
  components: { EditComp },
  data() {
    return {
      idx: Number,
      dateEd: "",
      categoryEd: "",
      valueEd: Number,
      edit: false,
      isShow: false,
      dropSettings: {},
    };
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    getFPV() {
      return this.$store.getters.getFullPaymentsValue;
    },
  },
  methods: {
    openDropDown(id, date, category, value) {
      this.isShow = !this.isShow;
      this.idx = id;
      this.dateEd = date;
      this.categoryEd = category;
      this.valueEd = value;
    },
    deleteProduct(id) {
      const productToDelete = this.$store.state.paymentsList.find(
        (el) => id === el.id
      );
      this.$store.commit("deletePaymentsListData", productToDelete);
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang='sass'>
.box-btn
  display: flex
  justify-content: space-around

.payment-block
  display: flex
  flex-direction: column

  .table
    width: 600px
    border-collapse: collapse

.nav-bar
  display: flex
  justify-content: space-between

td
  font-family: Helvetica, sans-serif
  text-align: left
  border-top: 1px solid #ccc
  padding: 10px 20px 10px 0

th
  font-family: Helvetica, sans-serif

  text-align: left
  border-bottom: 1px solid #ccc
  padding: 10px 0
</style>