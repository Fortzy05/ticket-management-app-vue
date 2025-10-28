<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-[Poppins]">
    <!-- Header -->
    <header class="bg-white shadow-sm p-4 flex justify-between">
      <RouterLink to="/" class="flex items-center gap-3">
        <span class="material-symbols-outlined text-[#7F56D9] text-3xl">
          confirmation_number
        </span>
        <h1 class="text-xl font-bold">TicketFlow</h1>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        <nav class="flex items-center gap-4">
          <RouterLink
            to="/dashboard"
            class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#7F56D9]/10 text-[#7F56D9] font-medium"
          >
            <span class="material-symbols-outlined">confirmation_number</span>
            <span>Dashboard</span>
          </RouterLink>
        </nav>

        <!-- User Avatar + Logout -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-[#7F56D9] flex items-center justify-center font-bold text-white"
          >
            {{ user ? getInitials(user.email) : "?" }}
          </div>
          <div class="flex flex-col">
            <p class="font-medium">{{ user?.email || "User" }}</p>
          </div>
        </div>

        <button @click="logout" class="text-red-600 font-semibold">
          Logout
        </button>
      </div>
    </header>

    <!-- Main -->
    <main class="relative p-8 max-w-6xl mx-auto">
      <div class="flex justify-between mb-6">
        <h2 class="text-xl font-semibold">Your Tickets</h2>
        <button
          @click="router.push('/create-ticket')"
          class="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          + Create Ticket
        </button>
      </div>

      <!-- Background Blobs -->
      <div
        class="absolute z-0 top-3/4 left-24 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"
      ></div>
      <div
        class="absolute bottom-11 right-1/8 w-28 h-28 md:w-36 md:h-36 bg-indigo-500 rounded-full opacity-20 animate-[pulse_5s_infinite]"
      ></div>
      <div
        class="absolute top-1/2 left-2/5 w-10 h-10 md:w-12 md:h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"
      ></div>

      <!-- Ticket Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white p-6 rounded-2xl shadow"
        >
          <div class="flex justify-between mb-4">
            <h3 class="text-lg font-semibold">{{ ticket.title }}</h3>
            <span
              :class="[
                'px-3 py-1 text-sm font-semibold text-white rounded-full',
                getStatusColor(ticket.status),
              ]"
            >
              {{ ticket.status }}
            </span>
          </div>
          <p class="text-gray-600 mb-4">{{ ticket.description }}</p>

          <div class="flex justify-end gap-3">
            <button
              @click="router.push(`/edit-ticket/${ticket.id}`)"
              class="text-blue-600 bg-blue-100 px-3 py-1 rounded-md hover:bg-blue-200"
            >
              Edit
            </button>
            <button
              @click="deleteTicket(ticket.id)"
              class="text-red-600 bg-red-100 px-3 py-1 rounded-md hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
import Footer from "../components/Footer.vue";
import { useTickets } from "../composables/useTickets";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { tickets, deleteTicket } = useTickets();
const { user, logout } = useAuth();

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-500";
    case "in_progress":
      return "bg-blue-500";
    case "closed":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const getInitials = (email: string) => {
  const namePart = email.split("@")[0];
  return (
    namePart
      .split(".")
      .map((n) => n[0]?.toUpperCase())
      .join("") || email[0]?.toUpperCase()
  );
};
</script>
