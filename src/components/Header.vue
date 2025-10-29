<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 sm:gap-3 cursor-pointer">
        <span class="material-symbols-outlined text-indigo-500 text-3xl">
          confirmation_number
        </span>
        <h1 class="text-gray-900 text-lg sm:text-xl font-bold">TicketFlow</h1>
      </RouterLink>

      <!-- Buttons -->
      <div class="flex items-center gap-2 sm:gap-3">
        <RouterLink
          to="/login"
          class="hidden sm:flex items-center justify-center h-10 cursor-pointer px-5 rounded-lg text-gray-800 font-semibold hover:bg-gray-100 transition"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/create-account"
          class="flex items-center justify-center h-10 px-5 rounded-lg cursor-pointer bg-indigo-500 text-white font-semibold shadow hover:bg-indigo-600 transition-all transform hover:scale-105"
        >
          Get Started
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No logic needed
</script>
