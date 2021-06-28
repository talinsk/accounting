import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    editItemId: null
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsList = payload
    },
    deleteItem (state, payload) {
      state.paymentsList = state.paymentsList.filter(item => item.id !== payload)
    },
    editItem (state, payload) {
      state.editItemId = payload
    },
    saveItem(state, payload) {
      const itemIndex = state.paymentsList.findIndex(item => item.id === payload.id);
      if (itemIndex < 0) {
        if (state.paymentsList.length > 0) {
          payload.id = state.paymentsList[state.paymentsList.length - 1].id + 1;
        }
        state.paymentsList.push(payload);
      } else {
        state.paymentsList[itemIndex] = payload;
      }

      state.paymentsList = [...state.paymentsList];
    }
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getPaymentsListFullPrice: state => {
      return state.paymentsList
        .reduce((res, cur) => res + cur.price, 0)
    },
    getEditItemId: state => state.editItemId
  },
  actions: {
    fetchData ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const items = []
          for (let i = 1; i < 105; i++) {
            items.push({
              id: i,
              date: '13.05.2021',
              category: 'Education',
              price: Math.floor(Math.random() * 100)
            })
          }
          resolve(items)
        }, 2000)
      })
        .then(res => {
          commit('setPaymentsListData', res)
        })
    }
  }
})