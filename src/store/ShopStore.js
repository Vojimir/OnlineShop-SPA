import { shopService } from '../services/ShopService'

export const ShopStore = {
    state: {
        shops: [],
        shop: {},
        shopErrors: null,
        searchTerm: '',
    },

    mutations: {
        setShops(state, shops) {
            state.shops = shops
        },

        setShop(state, shop) {
            state.shop = shop
        },

        setShopErrors(state, errors) {
            state.shopErrors = errors
        },
        setSearchTerm(state, { term }) {
            state.searchTerm = term
        }
    },

    actions: {
        fetchShops(context, title) {
            return shopService.getAll(title)
                .then(
                    response => {
                        context.commit('setShops', response.data)
                    })
        },

        fetchShop(context, id) {
            return shopService.get(id)
                .then(
                    response => { context.commit('setShop', response.data) }
                )
        },

        addShop(context, shop) {
            return shopService.add(shop)
                .catch(response => context.commit('setShopErrors', response.data.errors))
        },
        editShop(context, shop) {
            return shopService.edit(shop)
        }
    },

    getters: {
        shops(state) {
            return state.shops
        },

        shop(state) {
            return state.shop
        },

        shopErros(state) {
            return state.shopErros
        },
        filteredShops(state) {
            return state.shops.filter((shop) =>
                shop.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
        }
    }
}