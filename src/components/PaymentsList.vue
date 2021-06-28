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
        <td>{{ item.id }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.price }}</td> <div class="test" @click="onContexMenuClick($event, item.id)"></div>
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
import { mapGetters, mapMutations } from 'vuex'
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
    ...mapMutations([
      'deleteItem',
      'editItem'
    ]),
    onPaginate (p) {
      this.page = p
    },
    onContexMenuClick (event, id) {
      const items = [
        { text: 'Delete', action: () => { this.deleteItem(id) }, icon: 'trash-alt' },
        { text: 'Edit', action: () => { this.editItem(id) }, icon: 'pencil-alt' }
      ]
      this.$context.show({ event, items })
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
  .test:after {
  content: '\2807';
  font-size: 28px;
  color: rgb(184, 184, 184);
  }
  .test:hover:after {
    color: rgb(71, 71, 71);
    cursor: pointer;
  }

</style>
