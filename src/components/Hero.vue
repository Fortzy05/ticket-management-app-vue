<template>
  <section class="relative bg-[#F3F4F6] pt-16 pb-24 overflow-hidden font-[Poppins]">
    <!-- Decorative Circles (less intrusive on mobile) -->
    <div class="hidden sm:block absolute top-1/4 left-1/4 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>
    <div class="absolute bottom-1/3 right-4 sm:right-1/4 w-14 h-14 sm:w-28 sm:h-28 bg-indigo-500 rounded-full opacity-20 animate-[pulse_5s_infinite]"></div>
    <div class="hidden sm:block absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
    <div class="absolute top-14 right-4 sm:right-32 w-12 h-12 md:w-16 md:h-16 bg-indigo-500 rounded-full opacity-20"></div>
    <div class="hidden sm:block absolute bottom-8 left-8 md:left-32 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30"></div>

    <!-- Hero Content -->
    <div class="relative z-10 container mx-auto px-6 text-center">
      <h1 class="text-3xl md:text-6xl font-black text-gray-800 leading-snug md:leading-tight tracking-tight">
        Streamline Your Support,
        <br class="hidden md:block" />
        One Ticket at a Time.
      </h1>

      <p class="mt-4 text-base md:text-xl text-gray-600 max-w-xl mx-auto">
        TicketFlow helps you manage support tickets efficiently and collaboratively
        across all your projects.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <RouterLink
          to="/create-account"
          class="w-full sm:w-auto flex items-center justify-center rounded-xl h-12 px-8 bg-indigo-600 text-white text-sm md:text-base font-bold shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
        >
          Get Started
        </RouterLink>
        <RouterLink
          to="/login"
          class="w-full sm:w-auto flex items-center justify-center rounded-xl h-12 px-8 bg-indigo-200 text-indigo-700 text-sm md:text-base font-bold shadow-lg hover:bg-indigo-300 transition-all active:scale-95"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script logic needed for now
</script>
