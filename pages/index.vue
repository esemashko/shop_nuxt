<template>
    <NuxtLayout>
        <div class="bg-white">
            <div class="container mx-auto px-4">
                <div class="py-8">
                    <h1 class="text-2xl font-bold">Main</h1>
                </div>
            </div>
            <CategoryList :sectionList="sectionList"/>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

const query = gql`
query Categories {
  categories {
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
