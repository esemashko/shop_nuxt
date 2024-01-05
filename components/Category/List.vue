<template>
    <div class="bg-gray-100">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <h2 class="text-2xl font-bold text-gray-900">Categories</h2>

                <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    <div v-for="category in computedElementList" :key="category.id" class="group relative mb-12">
                        <div
                            class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                            <img v-if="category.mediaUrl.length" :src="category.mediaUrl" :alt="category.name"
                                 class="h-full w-full object-cover object-center"/>
                        </div>
                        <h3 class="mt-6 text-sm text-gray-500">
                            <NuxtLink :to="category.fullUrl">
                                <span class="absolute inset-0"></span>
                                {{ category.name }}
                            </NuxtLink>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    sectionList: {
        type: Array,
        default: () => [],
    },
})

const computedElementList = computed(() => {
    return props.sectionList.map(section => {
        return {
            ...section,
            fullUrl: `/catalog/${section.slug}`,
            mediaUrl: section.media?.[0]?.url ?? '',
        }
    })
})
</script>