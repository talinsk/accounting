<template>
  <div>
    <table class="table">
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Value</th>
      </tr>
      <tr v-for="(item, index) in currentElements" :key="index">
        <td>{{ index + 1 + (page - 1)*n}}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </table>
    <Pagination
      :length="getPaymentsList.length"
      :n="n"
      :cur="page"
      @paginate="onPaginate"
    />
  </div>
</template>

<script>
import Pagination from './Pagination'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      page: 1,
      n: 10
    }
  },
  methods: {
    onPaginate (p) {
      this.page = p
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsList'
    ]),
    currentElements () {
      const { n, page } = this
      return this.getPaymentsList.slice(n * (page - 1), n * page)
    }
  }
}
</script>

<style>
  .table {
    border-spacing: 0px;
  }
  .table th {
    padding: 11px 50px;
    border-bottom: solid 1px rgb(184, 184, 184);
    color: rgb(61, 61, 61);
  }
  .table td {
    border-bottom: solid 1px rgb(184, 184, 184);
    padding: 11px 50px;
    text-align: center;
    color: rgb(71, 71, 71);
  }
  .table td:nth-child(1), .table th:nth-child(1) {
    padding-left:15px;
  }

</style>
