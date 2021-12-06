<template>
  <div class="payment-block">
    <h2 class="main-heading">My personal costs</h2>
    {{ getFPV }}
    <table class="table">
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Value</th>
      </tr>
      <tr v-for="(item, idx) in items" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.value }}</td>
        <td :id="idx" @click="openDropDown(item.id, idx)">...</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
    openDropDown(id, idx) {
      this.$dropModal.show([
        { btnName: "Edit", btnId: id },
        { btnName: "Delete", btnId: id },
      ]);
      const elem = document.getElementById(idx);
      const domRect = elem.getBoundingClientRect();
      const { left, top } = domRect;
      this.$dropModal.cords({ left, top });
    },
  },
};
</script>

<style lang='sass'>
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