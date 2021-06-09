<template>
  <div>
    <table class="table">
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Category</th>
        <th>Value</th>
      </tr>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    doSomething () {
      console.log(this.items)
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
