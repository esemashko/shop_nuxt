import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: 0,
            name: '',
            email: ''
        },
        basket: []
    }),
    actions: {
        async fetchUser() {
            const query = gql`
                query GetUser {
                    me {
                        id
                        name
                    }
                }
            `

            let executeQuery = null
            const { data: response, execute } = await useLazyAsyncQuery(query)

            executeQuery = execute
            if (executeQuery) {
                await executeQuery()
            }

            const userData = response?.value?.me

            this.user.id = userData?.id || 0
            this.user.name = userData?.name || ''
            this.user.email = userData?.email || ''
        },
        async userData() {
            if (!this.user.id) {
                await this.fetchUser()
            }
            return this.user
        }
    }
})