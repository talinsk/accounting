<template>
  <div id="app">
    <v-app-bar flat>
      <v-btn :ripple="false" plain to="/">Dashboard</v-btn>
      <v-btn :ripple="false" plain to="/about">About</v-btn>
    </v-app-bar>

    <header :class="[$style.header]">
      My personal costs
    </header>

    <v-main>
      <router-view></router-view>
    </v-main>

    <main>
      <div v-if="false">
        <router-link :class="[$style.wrp]" to="/add/payment/Food?value=200">/add/payment/Food?value=200</router-link>
        <router-link :class="[$style.wrp]" to="/add/payment/Transport?value=50">/add/payment/Transport?value=50</router-link>
        <router-link :class="[$style.wrp]" to="/add/payment/Entertainment?value=2000">/add/payment/Entertainment?value=2000</router-link>
        <router-link :class="[$style.wrp]" to="/add/payment/Entertainment">/add/payment/Entertainment</router-link>
        <router-link :class="[$style.wrp]" to="/add/payment/?value=2000">/add/payment/?value=2000</router-link>
      </div>
    </main>
    <ContextMenu />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ContextMenu from './components/ContextMenu.vue'

export default {
  name: 'App',
  components: {
    ContextMenu
  },
  data () {
    return {
    }
  },
  mounted () {
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
.wrp {
  display: flex;

  & {
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: rgb(86, 197, 192);
    }
  }
}
</style>
