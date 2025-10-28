<script setup >
import { useAuth } from "./context/AuthContext";
import { useRouter } from "vue-router";

const router = useRouter();
const { user } = useAuth();

// If no user, redirect to login immediately
if (!user.value) {
  router.replace("/login");
}
</script>

<template>
  <!-- Only render children if user exists -->
  <slot v-if="user" />
</template>
