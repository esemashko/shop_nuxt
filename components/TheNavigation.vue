<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5"/>
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                             alt="Your Company"/>
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <NuxtLink
                                v-for="item in menuList"
                                :key="item.id"
                                :to="item.fullUrl"
                                active-class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                {{ item.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div v-if="!loading"
                    role="status" class="animate-pulse">
                    <div class="flex items-center justify-center">
                        <div class="w-40 h-8 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else
                    class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <Menu
                        v-if="userData.id > 0"
                        as="div" class="relative ml-3">
                        <div>
                            <MenuButton
                                class="relative flex rounded-full bg-gray-800 text-sm">
                                <span class="absolute -inset-1.5"/>
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full"
                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt=""/>

                                <span v-if="userData.id > 0" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                    {{ userData.name }}
                                </span>

                            </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                    <a href="#"
                                       :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="#"
                                       :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <a href="#"
                                       :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                    <div v-else class="flex items-center lg:order-2">
                        <NuxtLink to="/login" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                         Log in
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <NuxtLink
                    v-for="item in menuList"
                    :key="item.id"
                    :to="item.fullUrl"
                    active-class="block rounded-md px-3 py-2 text-base font-medium bg-gray-900 text-white"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    {{ item.name }}
                </NuxtLink>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '~/store/userStore'

const query = gql`
query Categories {
  categories(orderBy: {column: SORT, order: ASC}) {
    data {
      id
      name
      slug
    }
  }
}
`

const { data: response } = await useAsyncQuery(query)

const menuList = ref([])
const userData = ref({})
const loading = ref(false)

watchEffect(async () => {
    const categoriesData = response?.value?.categories?.data
    if (categoriesData) {
        menuList.value = categoriesData.map(category => ({
            ...category,
            fullUrl: `/catalog/${category.slug}`
        }))
    }
})

onMounted(async () => {
    const userStore = useUserStore()
    userData.value = await userStore.userData()
    loading.value = true
})

</script>