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
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      date: '',
      category: '',
      price: 0,
      display: false
    }
  },
  mounted () {
    this.processParameters();
  },
  watch: {
    $route() {
      this.processParameters();
    }
  },
  methods: {
    save () {
      const { date, category, price } = this;
      const pays = this.getPaymentsList();
      this.setPaymentsListData([{ date, category, price }, ...pays]);
      this.date = this.category = '';
      this.price = 0;
    },
    addcost () {
      this.display = !this.display
    },
    processParameters() {
      if (this.$route.params.category && this.$route.query.value) {
        const p = { date: (new Date()).toLocaleDateString(), category: this.$route.params.category, price: this.$route.query.value };
        const pays = this.getPaymentsList();
        this.setPaymentsListData([p, ...pays]);
      } else {
        this.display = true;
        this.date = (new Date()).toLocaleDateString();
        this.category = this.$route.params.category || '';
        this.price = this.$route.query.value || 0;
      }
    },
    ...mapMutations([
      'setPaymentsListData'
    ]),
    ...mapGetters([
      'getPaymentsList'
    ])
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
