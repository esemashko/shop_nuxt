export default defineNuxtPlugin((nuxtApp) => {
    const cookie = useCookie('auth-token')
    nuxtApp.hook('apollo:auth', ({client, token}) => {
        // `client` can be used to differentiate logic on a per client basis.
        // apply apollo client token
        if (cookie?.value) {
            token.value = cookie.value
        }
    })
})