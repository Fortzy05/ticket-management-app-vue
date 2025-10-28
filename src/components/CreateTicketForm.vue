<script setup lang="ts" >
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTickets } from "../composables/useTickets"; // same composable logic as React context

const route = useRoute();
const router = useRouter();
const { tickets, addTicket, updateTicket } = useTickets();

const id = route.params.id as string | undefined;
const editingTicket = computed(() => tickets.value.find((t) => t.id === id));

const title = ref(editingTicket.value?.title || "");
const status = ref(editingTicket.value?.status || "open");
const description = ref(editingTicket.value?.description || "");
const priority = ref(editingTicket.value?.priority || "medium");
const error = ref("");

const handleSubmit = (e: Event) => {
  e.preventDefault();

  if (!title.value.trim()) {
    error.value = "Title is required.";
    return;
  }

  if (!["open", "in_progress", "closed"].includes(status.value)) {
    error.value = "Status must be one of: open, in_progress, closed.";
    return;
  }

  const newTicket = {
    id: editingTicket.value ? editingTicket.value.id : Date.now().toString(),
    title: title.value,
    status: status.value,
    description: description.value,
    priority: priority.value,
    createdAt: editingTicket.value
      ? editingTicket.value.createdAt
      : new Date().toISOString(),
  };

  if (editingTicket.value) {
    updateTicket(newTicket);
  } else {
    addTicket(newTicket);
  }

  router.push("/manage-ticket");
};
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-slate-50 p-6 font-[Poppins,sans-serif]"
  >
    <div
      class="w-full max-w-2xl rounded-2xl bg-white shadow-lg p-8 border border-slate-100 relative z-10"
    >
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-1">
          {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
        </h1>
        <p class="text-slate-500 text-base">
          {{
            editingTicket
              ? "Update the details of this ticket."
              : "Fill in the details below to create a new support ticket."
          }}
        </p>
      </header>

      <!-- Floating circles -->
      <div
        class="absolute z-0 top-1/4 left-24 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/8 w-28 h-28 md:w-36 md:h-36 bg-indigo-500 rounded-full opacity-20 animate-[pulse_5s_infinite]"
      ></div>
      <div
        class="absolute top-1/2 left-1/5 w-10 h-10 md:w-12 md:h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"
      ></div>
      <div
        class="absolute top-20 right-10 md:right-40 w-16 h-16 md:w-20 md:h-20 bg-indigo-500 rounded-full opacity-20"
      ></div>
      <div
        class="absolute bottom-10 left-8 md:left-32 w-24 h-24 md:w-28 md:h-28 bg-indigo-300 rounded-full opacity-30"
      ></div>

      <form @submit="handleSubmit" class="flex flex-col gap-6 z-5">
        <!-- Error -->
        <div
          v-if="error"
          class="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm"
        >
          {{ error }}
        </div>

        <!-- Title -->
        <div>
          <label class="block text-base font-medium text-slate-700 mb-2">
            Title<span class="text-red-500">*</span>
          </label>
          <input
            v-model="title"
            required
            placeholder="e.g., Website is down"
            class="w-full h-14 px-4 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-base font-medium text-slate-700 mb-2">
            Status<span class="text-red-500">*</span>
          </label>
          <select
            v-model="status"
            class="w-full h-14 px-4 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-base font-medium text-slate-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            v-model="description"
            placeholder="Provide more details about the issue..."
            class="w-full min-h-36 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>

        <!-- Priority -->
        <div>
          <label class="block text-base font-medium text-slate-700 mb-2">
            Priority (Optional)
          </label>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="level in ['low', 'medium', 'high']"
              :key="level"
              type="button"
              @click="priority = level"
              :class="[
                'px-5 h-11 rounded-xl border text-sm font-medium capitalize transition-all duration-200',
                priority === level
                  ? 'border-teal-600 text-teal-600 bg-teal-50'
                  : 'border-slate-300 text-slate-700 hover:border-teal-400 hover:text-teal-600',
              ]"
            >
              {{ level }}
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="submit"
            class="flex-1 bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors"
          >
            {{ editingTicket ? "Update Ticket" : "Save" }}
          </button>
          <button
            type="button"
            @click="router.push('/manage-ticket')"
            class="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
