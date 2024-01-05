<template>
    <NuxtLayout>
        <TheHeader>{{ dataSection.name }}</TheHeader>
        <div class="bg-white">
            <div class="pt-6">
                <TheBreadcrumb :breadcrumbs="breadcrumbs" :lastItem="dataSection.name"/>
                <ProductList :elementList="dataSection.products" :sectionCode="dataSection.slug"/>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()
let sectionCode = route.params.section

const query = gql`
query Category($sectionCode: String!) {
   category(slug: $sectionCode) {
    id
    name
    slug
    products {
      id
      name
      slug
      price
      vendor_code
      media {
        url
      }
    }
  }
}
`

const { data: response } = await useAsyncQuery(query, { sectionCode: sectionCode })

const breadcrumbs = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Catalog', href: '/catalog' },
]

const dataSection = ref([])
watchEffect(() => {
    const data = response?.value?.category
    if (data) {
        dataSection.value = data
    }
})

</script>