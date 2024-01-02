<template>
  <div class="group relative">
    <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
      <NuxtImg v-if="element.image"
               :src="element.image" :alt="element.title"
               class="h-full w-full object-contain object-center lg:h-full lg:w-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <NuxtLink :to="element.fullUrl">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ element.title }}
          </NuxtLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ element.category }}</p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{ element.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  element: {
    type: Object
  }
})
</script>