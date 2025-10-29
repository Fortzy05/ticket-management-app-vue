<script setup lang="ts">
import { createAuth } from '../composables/useAuth';

createAuth();
</script>

<template>
  <slot />
</template>
