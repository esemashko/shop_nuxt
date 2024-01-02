<template>
  <footer class="bg-gray-800 text-white py-8 px-8">
    <div class="container mx-auto">
      <div class="mt-8 mb-8 text-center text-sm">
        <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear();
</script>