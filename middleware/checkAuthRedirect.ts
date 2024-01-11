import {useUserStore} from '../store/userStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const userData = await userStore.userData()

    if (to.path.includes('/personal') && userData.id <= 0) {
        return navigateTo('/login')
    }

    if (to.path.includes('/login') && userData.id > 0) {
        return navigateTo('/')
    }
})
