<template>
  <section class="relative bg-[#F3F4F6] pt-20 pb-28 overflow-hidden font-[Poppins]">
    <!-- Floating Decorative Circles -->
    <div class="absolute top-1/4 left-1/4 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>
    <div class="absolute bottom-1/3 right-1/4 w-28 h-28 md:w-36 md:h-36 bg-indigo-500 rounded-full opacity-20 animate-[pulse_5s_infinite]"></div>
    <div class="absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
    <div class="absolute top-20 right-10 md:right-40 w-16 h-16 md:w-20 md:h-20 bg-indigo-500 rounded-full opacity-20"></div>
    <div class="absolute bottom-10 left-8 md:left-32 w-24 h-24 md:w-28 md:h-28 bg-indigo-300 rounded-full opacity-30"></div>

    <!-- Hero Content -->
    <div class="relative z-10 container mx-auto px-6 text-center">
      <h1 class="text-4xl md:text-6xl font-black text-gray-800 leading-tight tracking-tight">
        Streamline Your Support,
        <br class="hidden md:block" />
        One Ticket at a Time.
      </h1>

      <p class="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        TicketFlow helps you manage support tickets efficiently and collaboratively
        across all your projects.
      </p>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/create-account"
          class="w-full sm:w-auto flex items-center justify-center rounded-2xl h-12 px-8 bg-indigo-600 text-white text-base font-bold shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105"
        >
          Get Started
        </RouterLink>
        <RouterLink
          to="/login"
          class="w-full sm:w-auto flex items-center justify-center rounded-2xl h-12 px-8 bg-indigo-200 text-indigo-700 font-bold shadow-lg hover:bg-indigo-300 transition-all transform hover:scale-105"
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
