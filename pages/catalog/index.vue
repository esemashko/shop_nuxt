<template>
  <NuxtLayout>
    <TheHeader>Catalog</TheHeader>
    <div class="bg-white">
      <div class="pt-6">
        <TheBreadcrumb :breadcrumbs="breadcrumbs" lastItem="Catalog"/>
        <ProductList :elementList="elementList"/>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const {data: products} = await useFetch('https://fakestoreapi.com/products/');

const elementList = ref([]);
const breadcrumbs = [
  {id: 1, name: 'Home', href: '/'},
];

watchEffect(() =>
{
  if (products.value) {
    elementList.value = toRaw(products.value);
  }
});
</script>