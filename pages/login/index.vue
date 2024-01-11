<template>
    <NuxtLayout>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                     alt="Your Company"/>
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="login()">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div class="mt-2">
                            <input
                                v-model.trim="email"
                                id="email" name="email" type="email" autocomplete="email" required=""
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password"
                                   class="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div class="mt-2">
                            <input
                                v-model="password"
                                id="password" name="password" type="password" autocomplete="current-password"
                                required=""
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            :class="`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'bg-indigo-300 animate-pulse' : 'bg-indigo-600'}`"
                            :disabled="loading"
                        >
                            <span v-if="!loading">Sign in</span>
                            <span v-else>Loading...</span>
                        </button>
                    </div>
                </form>
                <div>
                    <ul v-if="errorMessages.length">
                        <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    layout: 'empty',
    middleware: [
        'check-auth-redirect',
    ],
})

const email = ref('info@esemashko.com')
const password = ref('password')
const errorMessages = ref([])
const loading = ref(false)

const authToken = useCookie('auth-token')

const mutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

const { mutate: loginMutation } = useMutation(mutation, () => ({
    variables: {
        input: {
            email: email.value,
            password: password.value,
        },
    },
}))

const login = async () => {
    errorMessages.value = []
    loading.value = true
    try {
        const { data } = await loginMutation()
        authToken.value = data?.login?.token
        window.location.reload()
    } catch (error) {
        if (error.graphQLErrors) {
            error.graphQLErrors.forEach((graphQLError) => {
                // Handle validation errors
                if (graphQLError.extensions && graphQLError.extensions.validation) {
                    Object.values(graphQLError.extensions.validation).forEach((messages) => {
                        errorMessages.value.push(...messages)
                    })
                }
                // Handle other errors
                else if (graphQLError.message) {
                    errorMessages.value.push(graphQLError.message)
                }
            })
        }
    }
    loading.value = false
}

</script>
