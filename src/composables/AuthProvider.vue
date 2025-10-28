<template>
  <slot />
</template>

<script setup lang="ts">
import { createAuth } from '../composables/useAuth'

// Call createAuth to provide the auth context
createAuth()
</script>
