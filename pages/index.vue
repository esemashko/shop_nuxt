<template>
  <NuxtLayout>
    <TheHeader>Catalog</TheHeader>
    <div class="bg-white">
      <div class="pt-6">
        <ProductList :elementList="elementList"/>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const {data: products} = await useFetch('https://fakestoreapi.com/products/');

const elementList = ref([]);

watchEffect(() =>
{
  if (products.value) {
    elementList.value = toRaw(products.value);
  }
});
</script>
