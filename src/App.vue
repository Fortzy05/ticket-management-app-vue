<template>
  <div>
    <AuthProvider> <router-view /></AuthProvider>
  </div>
</template>

<script setup lang="ts">
import AuthProvider from "./composables/AuthProvider.vue";
</script>

<style scoped></style>
