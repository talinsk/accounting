<template>
  <div :class="[$style.wrp]">
    <div @click="onClick(cur - 1)">&lt;</div>
    <div
      v-for="i in amount" :key="i"
      :class="{
        [$style.active]: cur === i
      }"
      @click="onClick(i)"
    >{{ i }}</div>
    <div @click="onClick(cur + 1)">&gt;</div>
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
    n: Number,
    cur: Number
  },
  computed: {
    amount () {
      return Math.ceil(this.length / this.n)
    }
  },
  methods: {
    onClick (p) {
      if (p < 1 || p > this.amount) {
        return
      }
      this.$emit('paginate', p)
    }
  }
}
</script>

<style module lang="scss">
.wrp {
  display: flex;

  & > div {

    padding: 17px;
    cursor: pointer;

    &:hover {
      color: rgb(86, 197, 192);
    }

    &.active {
      color: rgb(86, 197, 192);
      font-weight: bold;
    }
  }
}
</style>