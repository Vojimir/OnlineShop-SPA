import { authService } from './../services/AuthService'

export const AuthStore = {
    state: {
        token: localStorage.getItem('token'),
        errors: null,
        user: localStorage.getItem('user')
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setErrors(state, errors) {
            state.errors = errors
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions : {
        async login(context,{email, password}) {
            try {
                
                const response = await authService.login(email,password)
                context.commit('setToken', response.data.token)
                localStorage.setItem('token', response.data.token)
                context.commit('setUser', JSON.stringify(response.data.user))
                localStorage.setItem('user', JSON.stringify(response.data.user))
                context.commit('setErrors',null) //brisemo errore - restartujemo ih
                return response
            }catch(exception) {
                context.commit('setErrors',exception)
            }
        },
        async register(context, user) {
            try { 
                 const response = await authService.register(user)
                 return response
            } catch(exception) {
                context.commit('setErrors', exception.response.data.error)
            }
        },
        fetchUser(context, id) {
            return authService.get(id)
                .then(
                    response => { context.commit('setUser', response.data) }
                )
        },
        logout(context) {
            context.commit('setToken', null)
            // localStorage.setItem('token', null) drugo resenje
            localStorage.removeItem('token')
        }
    },
    getters: {
        isUserAuthenticated(state) {
            return !!state.token
        },
        errors(state) {
            return state.errors
        },
        user(state) {
            return JSON.parse(state.user)
        }
    }
    
}