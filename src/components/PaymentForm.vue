<template>
  <div>
    <button class="buttonaddnewcost" @click="addcost">ADD NEW COST +</button>
    <div class="inputform" v-if="display">
      <input placeholder="Date" v-model="date" type="text" />
      <input placeholder="Category" v-model="category" type="text" />
      <input placeholder="Price" v-model.number="price" type="text" />
      <button class="buttonadd" @click="save">ADD +</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      category: '',
      price: 0,
      display: false
    }
  },
  props: {
    items: Array
  },
  methods: {
    save () {
      const { date, category, price } = this
      this.$emit('add', { date, category, price })
    },
    addcost () {
      this.display = !this.display
    }

  }
}
</script>

<style>
  .buttonaddnewcost {
    color: #fff;
    background-color: rgb(86, 197, 192);
    border: 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 5px;
  }
  .buttonadd {
    color: #fff;
    background-color: rgb(86, 197, 192);
    border: 0;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    width: 160px;
    margin-top: 5px;
  }
  .inputform {
    display: flex;
    flex-direction: column;
  }
  .inputform input[type="text"] {
    width: 150px;
    padding: 8px 12px;
    margin-top: 5px;
    border-radius: 5px;
    border: solid 1px rgb(184, 184, 184);
  }
</style>
