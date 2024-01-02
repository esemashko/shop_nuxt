<template>
  <NuxtLayout>
    <TheHeader>{{ elementDetail.title }}</TheHeader>
    <div class="bg-white">
      <div class="pt-6">
        <TheBreadcrumb :breadcrumbs="breadcrumbs" :lastItem="element.title"/>
        <ProductDetail :element="elementDetail"/>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
let elementId = route.params.element;

const {data: element} = await useFetch('https://fakestoreapi.com/products/' + elementId);

const breadcrumbs = [
  {id: 1, name: 'Home', href: '/'},
  {id: 2, name: 'Catalog', href: '/catalog'},
];

const elementDetail = ref([]);
watchEffect(() =>
{
  if (element.value) {
    elementDetail.value = toRaw(element.value);
  }
});
</script>