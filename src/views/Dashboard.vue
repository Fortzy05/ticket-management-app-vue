<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth"; //

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: "open" | "in_progress" | "closed";
  createdAt: string;
}

const router = useRouter();
const { user, logout } = useAuth();

const menuOpen = ref(false);
const tickets = ref<Ticket[]>([]);
const loading = ref(true);

// 🔒 Redirect if not logged in
watch(
  () => user.value,
  (newUser) => {
    if (!newUser) router.push("/login");
  },
  { immediate: true }
);

// 📦 Load tickets from localStorage
onMounted(() => {
  const stored = localStorage.getItem("tickets");
  if (stored) tickets.value = JSON.parse(stored);
  loading.value = false;
});

// 📊 Computed stats
const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(
  () => tickets.value.filter((t) => t.status === "open").length
);
const resolvedTickets = computed(
  () => tickets.value.filter((t) => t.status === "closed").length
);

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

<template>
  <div
    class="relative flex min-h-screen flex-col bg-[#F9FAFB] font-[Poppins] text-[#101828]"
  >
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-[#F9FAFB] shadow">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#7F56D9] text-3xl">
              confirmation_number
            </span>
            <h1 class="text-xl font-bold">TicketFlow</h1>
          </RouterLink>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-6">
            <nav class="flex items-center gap-4">
              <RouterLink
                to="/manage-ticket"
                class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#7F56D9]/10 text-[#7F56D9] font-medium"
              >
                <span class="material-symbols-outlined"
                  >confirmation_number</span
                >
                <span>Ticket Management</span>
              </RouterLink>
            </nav>

            <!-- User Avatar + Logout -->
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-[#7F56D9] flex items-center justify-center font-bold text-white"
              >
                {{ user?.email ? getInitials(user.email) : "?" }}
              </div>
              <div class="flex flex-col">
                <p class="font-medium">{{ user?.email || "User" }}</p>
              </div>
            </div>

            <button
              @click="logout"
              class="flex items-center justify-center rounded-2xl h-10 px-6 bg-[#7F56D9] text-white text-sm font-semibold shadow hover:bg-[#6E48C4] transition-colors"
            >
              Logout
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <div class="md:hidden">
            <button class="text-[#101828]" @click="menuOpen = !menuOpen">
              <span class="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="menuOpen"
        class="bg-[#F9FAFB] border-t border-[#D0D5DD]/50 md:hidden"
      >
        <div class="px-4 pt-3 pb-4 space-y-3">
          <RouterLink
            to="/manage-ticket"
            class="flex items-center gap-2 px-3 py-2 rounded-2xl text-base font-medium text-[#7F56D9] bg-[#7F56D9]/10"
          >
            <span class="material-symbols-outlined">confirmation_number</span>
            Ticket Management
          </RouterLink>

          <div class="border-t border-[#D0D5DD]/40 my-3"></div>

          <div class="flex items-center gap-3 px-3 py-2">
            <div
              class="w-10 h-10 rounded-full bg-[#7F56D9] flex items-center justify-center font-bold text-white"
            >
              {{ user?.email ? getInitials(user.email) : "?" }}
            </div>
            <p class="font-medium">{{ user?.email || "User" }}</p>
          </div>

          <button
            @click="logout"
            class="w-full flex items-center justify-center rounded-2xl h-10 px-6 bg-[#7F56D9] text-white text-sm font-semibold shadow hover:bg-[#6E48C4] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold">Dashboard</h1>
        </div>

        <!-- Floating Circles -->
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

        <!-- Ticket Stats -->
        <div v-if="loading">Loading tickets...</div>
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          <div
            v-for="(card, i) in [
              { title: 'Total Tickets', value: totalTickets, icon: 'inbox' },
              { title: 'Open Tickets', value: openTickets, icon: 'draft' },
              {
                title: 'Resolved Tickets',
                value: resolvedTickets,
                icon: 'task_alt',
              },
            ]"
            :key="i"
            class="bg-white rounded-2xl p-6 shadow border border-[#D0D5DD]/30 flex flex-col gap-4"
          >
            <div class="flex items-center gap-3">
              <div class="bg-[#7F56D9]/10 p-2 rounded-full">
                <span class="material-symbols-outlined text-[#7F56D9]">
                  {{ card.icon }}
                </span>
              </div>
              <p class="text-lg font-medium">{{ card.title }}</p>
            </div>
            <p class="text-4xl font-bold">{{ card.value }}</p>
          </div>
        </div>

        <!-- Recent Tickets -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">Recent Tickets</h2>
          <p v-if="tickets.length === 0" class="text-gray-500">
            No tickets found.
          </p>

          <div
            v-else
            class="overflow-x-auto bg-white rounded-2xl shadow border border-[#D0D5DD]/30"
          >
            <table class="min-w-full text-sm text-left">
              <thead class="bg-[#F9FAFB] text-[#667085]">
                <tr>
                  <th class="px-6 py-3 font-medium">Title</th>
                  <th class="px-6 py-3 font-medium">Priority</th>
                  <th class="px-6 py-3 font-medium">Status</th>
                  <th class="px-6 py-3 font-medium">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="ticket in [...tickets].slice(-5).reverse()"
                  :key="ticket.id"
                  class="border-t border-[#EAECF0]"
                >
                  <td class="px-6 py-4 font-medium">{{ ticket.title }}</td>
                  <td class="px-6 py-4">{{ ticket.priority }}</td>
                  <td
                    class="px-6 py-4 font-semibold"
                    :class="{
                      'text-green-600': ticket.status === 'open',
                      'text-yellow-600': ticket.status === 'in_progress',
                      'text-gray-500': ticket.status === 'closed',
                    }"
                  >
                    {{ ticket.status }}
                  </td>
                  <td class="px-6 py-4 text-[#667085]">
                    {{ new Date(ticket.createdAt).toLocaleDateString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#F9FAFB] mt-auto border-t border-[#D0D5DD]/40">
      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-[#98A2B3]"
      >
        © 2025 TicketFlow. All rights reserved.
      </div>
    </footer>
  </div>
</template>
