<template>
    <NuxtLayout>
        <TheHeader>{{ dataElement.name }}</TheHeader>
        <div class="bg-white">
            <div class="pt-6">
                <TheBreadcrumb :breadcrumbs="breadcrumbs" :lastItem="dataElement.name"/>
                <ProductDetail :element="dataElement"/>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const route = useRoute()
let elementCode = route.params.element

const query = gql`
query Product($elementCode: String!) {
   product(slug: $elementCode) {
    id
    name
    price
    vendor_code
    description
    media {
      url
    }
    category {
      name
      slug
    }
  }
}
`

const { data: response } = await useAsyncQuery(query, { elementCode: elementCode })

const dataElement = ref([])
const breadcrumbs = ref([])

watchEffect(() => {
    const data = response?.value?.product
    if (data) {
        dataElement.value = data
    }

    breadcrumbs.value = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: 'Catalog', href: '/catalog' },
        { id: 3, name: dataElement.value.category.name, href: '/catalog/' + dataElement.value.category.slug },
    ]
})
</script>