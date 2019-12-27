import { managerService } from '../services/ManagerService'

export const ManagerStore = {
    state: {
        managers: [],
        manager: {},
        managerErrors: null,
        searchTerm: '',
    },

    mutations: {
        setManagers(state, managers) {
            state.managers = managers
        },

        setManager(state, manager) {
            state.manager = manager
        },

        setManagerErrors(state, errors) {
            state.managerErrors = errors
        },
        setSearchTerm(state, { term }) {
            state.searchTerm = term
        }
    },

    actions: {
        fetchManagers(context ) {
            return managerService.getAll()
                .then(
                    response => {
                        context.commit('setManagers', response.data)
                    })
        },

        fetchManager(context, id) {
            return managerService.get(id)
                .then(
                    response => { context.commit('setManager', response.data) }
                )
        },

        addManager(context, manager) {
            return managerService.add(manager)
                .catch(response => context.commit('setManagerErrors', response.data.errors))
        }
    },

    getters: {
        managers(state) {
            return state.managers
        },

        manager(state) {
            return state.manager
        },

        managerErros(state) {
            return state.managerErrors
        },
        filteredManagers(state) {
            return state.managers.filter((manager) =>
                manager.first_name.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
        }
    }
}