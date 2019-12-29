import { HttpService } from './HttpService'

class CommentService extends HttpService {
    
    getAll() {
        return this.axios.get('/comments')
    }
    get(id) {
        return this.axios.get(`/comments/${id}`)
    }
    add(comment) {
        return this.axios.post('/comments', comment)
    }
    delete(id) {
        return this.axios.delete(`comments/${id}`)
      }
}

export const commentService = new CommentService()