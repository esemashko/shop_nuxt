<template>
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for='element in computedElementList' :key="element.id" class="group relative">
                <div
                    class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <NuxtImg v-if="element.mediaUrl"
                             :src="element.mediaUrl" :alt="element.name"
                             class="h-full w-full object-contain object-center lg:h-full lg:w-full"
                    />
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">
                            <NuxtLink :to="element.fullUrl">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                {{ element.name }}
                            </NuxtLink>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Art. {{ element.vendor_code }}</p>
                    </div>
                    <p class="text-sm font-medium text-gray-900">${{ element.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    elementList: {
        type: Array,
        default: () => [],
    },
    sectionCode: {
        type: String,
        default: () => '',
    },
})

const computedElementList = computed(() => {
    return props.elementList.map(element => {
        return {
            ...element,
            fullUrl: `/catalog/${props.sectionCode}/${element.slug}`,
            mediaUrl: element.media?.[0]?.url ?? '',
        }
    })
})
</script>