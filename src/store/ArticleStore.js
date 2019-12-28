import {articlesService} from '../services/ArticlesService'

export const ArticleStore = {
    
    state: {
        articles: [],

    },
    mutations: {
        setArticles(state , articles){
            state.articles = articles
        },
        setArticle(state , article){
            state.article = article
        }
    },

    
    actions: {

        addArticle(context, article) {
            return articlesService.add(article)
        },
        fetchArticles(context ) {
            return articlesService.getAll()
                .then(
                    response => {
                        context.commit('setArticles', response.data)
                    })
        },
        fetchArticle(context, id) {
            return articlesService.get(id)
                .then(
                    response => { context.commit('setArticle', response.data) }
                )
        },

        
    },
    getters : {

        articles(state){
            return state.articles
        },
        article(state){
            return state.article
        }
    }
}