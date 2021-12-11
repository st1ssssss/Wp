<template>
  <div class="wrapper">
    <div @click="onClick(curPage - 1)">-</div>
    <div
      v-for="page in amountPage"
      :key="page"
      @click="onClick(page)"
      :class="{ active: page === curPage }"
    >
      {{ page }}
    </div>
    <div @click="onClick(curPage + 1)">+</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    length: Number,
    n: Number,
    curPage: Number,
  },

  computed: {
    amountPage() {
      return Math.ceil(this.length / this.n);
    },
  },

  methods: {
    onClick(p) {
      if (p < 1 || p > this.amountPage) return;
      this.$emit("paginate", p);
    },
  },
};
</script>

<style scoped lang="sass">
.wrapper
    display: flex

div
    padding: 10px
.active
    background-color: #ccc
</style>