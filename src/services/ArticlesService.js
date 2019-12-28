import { HttpService } from './HttpService'

class ArticlesService extends HttpService {
    
    getAll() {
        return this.axios.get('/articles')
    }
    get(id) {
        return this.axios.get(`/articles/${id}`)
    }
    add(article) {
        return this.axios.post('/articles', article)
    }
}

export const articlesService = new ArticlesService()