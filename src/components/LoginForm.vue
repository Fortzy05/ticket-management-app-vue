<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Toast from "./Toast.vue";
import { useAuth } from "../composables/useAuth"; // ← create this composable later

const router = useRouter();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");
const toast = ref<{ message: string, type: "error" | "success" } | null>(null);

const handleSubmit = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = "Email and password are required.";
    toast.value = { message: "Please fill in all fields.", type: "error" };
    return;
  }

  try {
    await login(email.value, password.value);
    toast.value = { message: "Login successful!", type: "success" };

    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  } catch (err: any) {
    const msg = err?.message || "Invalid credentials. Please try again.";
    error.value = msg;
    toast.value = { message: msg, type: "error" };
  }
};
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-[#F5F5F5] font-[Poppins] px-4 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] p-8 space-y-6 relative z-10"
    >
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-[#333333]">Welcome Back!</h1>
        <p class="text-gray-500 mt-2">Log in to your account</p>
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

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Email -->
        <div>
          <label for="email" class="sr-only">Email</label>
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              width="22"
              height="22"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="#9CA3AF"
            >
              <path
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z"
              />
            </svg>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-3 text-[#333333] placeholder:text-gray-400 focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/40 transition"
            />
          </div>
          <p v-if="error && !email" class="text-sm text-red-500 mt-1">
            Email is required.
          </p>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="sr-only">Password</label>
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Password"
              required
              class="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-10 text-[#333333] placeholder:text-gray-400 focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/40 transition"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition"
            >
             <span v-if="showPassword" class="material-symbols-outlined">visibility</span>
                <span v-else class="material-symbols-outlined">visibility_off</span>
            </button>
          </div>
          <p v-if="error && !password" class="text-sm text-red-500 mt-1">
            Password is required.
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full flex justify-center rounded-lg bg-[#4A90E2] px-4 py-3 text-white font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 transition"
        >
          Login
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-sm text-gray-500">
          Don’t have an account?
          <RouterLink
            to="/create-account"
            class="font-medium text-[#4A90E2] hover:text-blue-600"
            >Sign up</RouterLink
          >
        </p>
      </div>
    </div>

    <!-- Toast -->
    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />
  </div>
</template>
