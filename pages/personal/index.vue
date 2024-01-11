<template>
    <NuxtLayout>
        <div>Personal</div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: [
        'check-auth-redirect',
    ],
});
</script>