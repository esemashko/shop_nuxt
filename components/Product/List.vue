<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <ProductItem v-for='element in computedElementList' :key='element.id' :element='element'/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  elementList: {
    type: Array,
    default: () => [],
  },
});

const computedElementList = computed(() =>
{
  return props.elementList.map(element =>
  {
    return {
      ...element,
      fullUrl: `/catalog/${element.id}`,
    };
  });
});
</script>