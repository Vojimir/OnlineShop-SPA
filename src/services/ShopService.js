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
}

export const shopService = new ShopService()