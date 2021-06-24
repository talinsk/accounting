<template>
  <div>
    <PaymentForm />
    <PaymentsList />
  </div>
</template>

<script>
import PaymentsList from './PaymentsList'
import PaymentForm from './PaymentForm.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    PaymentsList,
    PaymentForm
  }
}
</script>

<style>

</style>