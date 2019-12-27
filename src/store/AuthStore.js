import { authService } from './../services/AuthService'

export const AuthStore = {
    state: {
        token: localStorage.getItem('token'),
        errors: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setErrors(state, errors) {
            state.errors = errors
        }
    },
    actions : {
        async login(context,{email, password}) {
            try {
                
                const response = await authService.login(email,password)
                context.commit('setToken', response.data.token)
                context.commit('setErrors',null) //brisemo errore - restartujemo ih
                localStorage.setItem('token', response.data.token)
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
        }
    }
    
}