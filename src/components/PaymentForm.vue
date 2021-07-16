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
      display: false,
      id: 0
    }
  },
  mounted () {
    this.processParameters();
  },
  watch: {
    $route() {
      this.processParameters();
    },
    getEditItemId(newItemId, oldItemId) {
      const item = this.getPaymentsList().find(i => i.id === newItemId);
      if (!item) {
        return;
      }
      
      this.display = true;
      this.date = item.date;
      this.category = item.category;
      this.price = item.price;
      this.id = item.id;
    }
  },
  computed: {
    ...mapGetters([
      'getEditItemId'
    ])
  },
  methods: {
    save () {
      const { date, category, price, id } = this;
      this.saveItem({ id, date, category, price });
      this.display = false;
      this.clear();
    },
    addcost () {
      this.display = !this.display;
      this.clear();
    },
    clear() {
      this.date = this.category = '';
      this.price = 0;
      this.id = 0;
    },
    processParameters() {
      this.display = false;
      if (this.$route.params.category && this.$route.query.value) {
        const p = { id: 0, date: (new Date()).toLocaleDateString(), category: this.$route.params.category, price: this.$route.query.value };
        this.saveItem(p);
      } else if (this.$route.params.category || this.$route.query.value) {
        this.id = 0;
        this.display = true;
        this.date = (new Date()).toLocaleDateString();
        this.category = this.$route.params.category || '';
        this.price = this.$route.query.value || 0;
      }
    },
    ...mapMutations([
      'saveItem',
      'editItem'
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
