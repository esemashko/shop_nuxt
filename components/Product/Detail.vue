<template>
    <div>
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div class="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
                <img v-if="computedElement.mediaUrl.length"
                     :src="computedElement.mediaUrl"
                     :alt="element.name"
                     class="h-full w-full object-cover object-center"/>
            </div>
            <div class="mt-4 lg:row-span-3 lg:mt-0">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl tracking-tight text-gray-900">${{ element.price }}</p>
                <!-- Reviews -->
                <div class="mt-6">
                    <h3 class="sr-only">Reviews</h3>
                    <div class="flex items-center">
                        <!--              <div class="flex items-center">
                                        <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                                  :class="[element.rating.rate > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                                                  aria-hidden="true"/>
                                      </div>-->
                        <!--              <p class="sr-only">{{ element.rate }} out of 5 stars</p>-->
                        <!--              <a href="javascript:void(0)"
                                         class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{{ element.rating.count }}
                                        reviews</a>-->
                    </div>
                </div>
                <form class="mt-10">
                    <button type="submit"
                            class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add to bag
                    </button>
                </form>
                <div class="space-y-6 mt-10">
                    <p class="text-base text-gray-900">{{ element.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { StarIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    element: {
        type: Object,
    },
})

const computedElement = computed(() => {
    return {
        mediaUrl: props.element.media?.[0]?.url ?? '',
    }
})
</script>