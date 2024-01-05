<template>
    <NuxtLayout>
        <div class="bg-white">
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
