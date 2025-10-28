import { ref, computed, watch, onMounted } from "vue";

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
  priority?: string;
  createdAt: string;
}

// ✅ Reactive state
const tickets = ref<Ticket[]>([]);

export function useTickets() {
  // ✅ Load tickets on mounted
  onMounted(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      tickets.value = JSON.parse(stored);
    }
  });

  // ✅ Watch for changes and persist
  watch(
    tickets,
    (newTickets) => {
      localStorage.setItem("tickets", JSON.stringify(newTickets));
    },
    { deep: true }
  );

  // ✅ Ticket operations
  function addTicket(ticket: Ticket) {
    tickets.value.push(ticket);
  }

  function updateTicket(updated: Ticket) {
    tickets.value = tickets.value.map((t) =>
      t.id === updated.id ? updated : t
    );
  }

  function deleteTicket(id: string) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
  }

  // ✅ Computed getter
  const openTickets = computed(() =>
    tickets.value.filter((t) => t.status === "open")
  );

  return {
    tickets,
    openTickets,
    addTicket,
    updateTicket,
    deleteTicket,
  };
}
