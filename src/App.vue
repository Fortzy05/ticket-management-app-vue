<template>
  <AuthProvider>
    <router-view />
  </AuthProvider>
</template>

<script setup lang="ts">
import AuthProvider from "./composables/AuthProvider.vue";
</script>
