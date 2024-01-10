<template>
  <div>
      <NuxtPwaManifest />
      <NuxtLoadingIndicator/>
      {{auth}}
      <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const auth = useCookie('auth-token')
</script>