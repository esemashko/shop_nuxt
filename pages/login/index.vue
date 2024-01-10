<template>
    <NuxtLayout>
        <div>
            <input v-model="email" type="email" placeholder="Email">
            <input v-model="password" type="password" placeholder="Password">
            <button @click="login">Login</button>
            <ul v-if="errorMessages.length">
                <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
            </ul>
        </div>
    </NuxtLayout>
</template>

<script setup>

const email = ref('info@esemashko.com')
const password = ref('password')
const errorMessages = ref([])

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

    try {
        const { data } = await loginMutation()
        authToken.value = data.login.token
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
}

</script>
