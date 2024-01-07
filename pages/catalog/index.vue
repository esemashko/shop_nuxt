<template>
    <NuxtLayout>
        <TheHeader>Catalog</TheHeader>
        <div class="bg-white">
            <div class="pt-6">
                <CategoryList :sectionList="sectionList"/>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const query = gql`
query Categories {
  categories(orderBy: {column: SORT, order: ASC}) {
    data {
      id
      name
      slug
      sort,
      media {
        url
      }
    }
  }
}
`

const { data: response } = await useAsyncQuery(query)

const sectionList = ref([])

watchEffect(() => {
    const categoriesData = response?.value?.categories?.data
    if (categoriesData) {
        sectionList.value = categoriesData
    }
})

</script>
