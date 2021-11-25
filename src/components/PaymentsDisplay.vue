<template>
  <div class="payment-block">
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
      </tr>
    </table>
  </div>
</template>

<script>
export default {
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