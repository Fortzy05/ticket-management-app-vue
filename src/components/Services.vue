<template>
  <section class="py-20 md:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Heading -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Us?
        </h2>
        <p class="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
          Discover the powerful features that make TicketFlow the best choice
          for your support team.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="service in ServiceData"
          :key="service.title"
          class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <div
            class="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 mb-4"
          >
            <span class="material-symbols-outlined text-indigo-500 text-3xl">
              {{ service.icon }}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">
            {{ service.title }}
          </h3>
          <p class="mt-2 text-sm text-gray-600">{{ service.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ServiceData } from "../constants/Data";
</script>
