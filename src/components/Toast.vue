<template>
  <div
    :class="[
      'fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg text-white transition-all duration-300',
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    ]"
  >
    <!-- Icon -->
    <svg
      v-if="type === 'success'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

    <p class="text-sm font-medium">{{ message }}</p>

    <!-- Close Button -->
    <button
      @click="onClose"
      class="ml-3 text-white hover:text-gray-200 focus:outline-none"
    >
      ✖
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const props = defineProps<ToastProps>();

let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  timer = setTimeout(() => {
    props.onClose();
  }, 3000);
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>
