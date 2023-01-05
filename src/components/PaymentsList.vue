<template>
  <div>
    <v-row>
        <v-col>
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
        </v-col>
        <v-col>
          <div class="pie">
            <line-chart :chart-data="datacollection"></line-chart>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import Pagination from './Pagination'
import LineChart from './AccountingChart.js'
import { mapGetters, mapMutations } from 'vuex'
import { backgroundColors } from '../common/constants'
export default {
  components: {
    Pagination,
    LineChart
  },
  data () {
    return {
      page: 1,
      n: 10,
      datacollection: {}
    }
  },
  mounted () {
    this.fillData();
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
    },
    fillData () {
      const payments = this.getPaymentsList;
      const lbls = [];
      const dat = [];
      const bckgs = [];

      for (const p of payments) {
        const ind = lbls.findIndex(l => l === p.category);
        if (ind < 0) {
          lbls.push(p.category);
          dat.push(p.price);
          bckgs.push(backgroundColors[(lbls.length - 1) % backgroundColors.length]);
        } else {
          dat[ind] += p.price;
        }
      }

      this.datacollection = {
        labels: lbls,
        datasets: [
          {
            backgroundColor: bckgs,
            data: dat
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
  },
  watch: {
    getPaymentsList: function () {
      this.fillData();
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
  .pie {
    width: 300px;
  }

</style>
