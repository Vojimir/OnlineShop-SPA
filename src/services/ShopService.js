import { HttpService } from './HttpService'

class ShopService extends HttpService {

    getAll() {
        return this.axios.get('/shops')
    }
    get(id) {
        return this.axios.get(`/shops/${id}`)
    }

    add(shop) {
        return this.axios.post('/shops', shop)
    }
    edit(shop) {
        return this.axios.put(`shops/${shop.id}`,shop)
    }
}

export const shopService = new ShopService()