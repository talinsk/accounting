<template>
  <div id="app">
    <header :class="[$style.header]">
      My personal costs
    </header>
    <main>
      <PaymentForm />
      <PaymentsList />
    </main>
  </div>
</template>

<script>
import PaymentsList from './components/PaymentsList'
import PaymentForm from './components/PaymentForm'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentsList,
    PaymentForm
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('miunted');
    this.fetchListData();
  },
  methods: {
    onDataAdded (data) {
      this.paymentsList.push(data)
    },
    ...mapActions({
      fetchListData: 'fetchData'
    })
  }
}
</script>

<style lang="scss" module>
.header {
  color: rgb(61, 61, 61);
  font-size: 50px;
}
</style>
