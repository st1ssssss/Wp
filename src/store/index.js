import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const localDB = [

    { id: 1, date: "20.03.2020", category: "Food", value: 169 },
    { id: 2, date: "21.03.2020", category: "Transport", value: 50 },
    { id: 3, date: "23.03.2020", category: "Entertaiment", value: 969 },
    { id: 4, date: "24.03.2020", category: "Education", value: 1500 },
    { id: 5, date: "22.03.2020", category: "Entertaiment", value: 450 },
    { id: 6, date: "25.03.2020", category: "Food", value: 200 },

]

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
        paymentsListIds: [],
    },

    mutations: {
        setPaymentsListData(state, payload) {

            //state.paymentsList = payload
            const uniqIds = payload.filter((element) => {
                return state.paymentsListIds.indexOf(element.id) < 0
            })
            const newIds = uniqIds.map(el => el.id);
            state.paymentsList.push(...uniqIds);
            state.paymentsListIds.push(...newIds);
        },
        addPaymentsListData(state, payload) {
            state.paymentsList.push(payload)
        },
        editPaymentsListData(state, payload) {
            const { product, productToReplace } = payload
            state.paymentsList.splice(state.paymentsList.indexOf(productToReplace),
                1,
                product
            );
        },
        deletePaymentsListData(state, payload) {
            state.paymentsList.splice(state.paymentsList.indexOf(payload),
                1)
        },
        setCategoryList(state, payload) {
            if (!Array.isArray(payload)) {
                payload = [payload]
            }
            state.categoryList.push(...payload)
        },
    },
    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const items = localDB

                    resolve(items)
                }, 2000)
            }).then(result => commit('setPaymentsListData', result))
        },



        loadCategories() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Transport', 'Education', 'Entertaiment'])
                }, 1000)
            }).then(result => this.commit('setCategoryList', result))
        }
    },
    getters: {
        getFullPaymentsValue(state) {
            return state.paymentsList.reduce((result, el) =>
                result += el.value
                , 0)
        },

        getPaymentsList: state => state.paymentsList,
        getCategoryList: state => state.categoryList,
    },

    mounted() {
        if (!this.categoryList.length) this.loadCategories()
    }
})