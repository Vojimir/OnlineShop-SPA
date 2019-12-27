import { HttpService } from './HttpService'

class ManagerService extends HttpService  {
        
    getAll() {
        return this.axios.get('/managers')
    }
   
    get(id) {
        return this.axios.get(`/managers/${id}`)
    }

    add(manager) {
        return this.axios.post('/managers', manager)
    }
}

export const managerService = new ManagerService()