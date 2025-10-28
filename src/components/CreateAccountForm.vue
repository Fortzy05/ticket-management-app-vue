<template>
  <div
    class="relative flex min-h-screen w-full items-center justify-center from-violet-50 via-white to-indigo-50 px-4 font-[Poppins,sans-serif]"
  >
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-slate-800">Create an Account</h1>
        <p class="mt-2 text-sm text-slate-500">
          to start managing your support tickets.
        </p>
      </div>

      <!-- Floating Circles -->
      <div class="absolute z-0 top-1/4 left-24 w-20 h-20 md:w-24 md:h-24 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>
      <div class="absolute bottom-1/3 right-1/8 w-28 h-28 md:w-36 md:h-36 bg-indigo-500 rounded-full opacity-20 animate-[pulse_5s_infinite]"></div>
      <div class="absolute top-1/2 left-1/5 w-10 h-10 md:w-12 md:h-12 bg-indigo-300 rounded-full opacity-40 animate-pulse"></div>
      <div class="absolute top-20 right-10 md:right-40 w-16 h-16 md:w-20 md:h-20 bg-indigo-500 rounded-full opacity-20"></div>
      <div class="absolute bottom-10 left-8 md:left-32 w-24 h-24 md:w-28 md:h-28 bg-indigo-300 rounded-full opacity-30"></div>

      <!-- Form Card -->
      <div class="rounded-2xl bg-white shadow-lg p-6 sm:p-8 border border-slate-100">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
              class="h-12 w-full px-4 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div class="relative flex items-center">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
                required
                class="h-12 w-full px-4 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span v-if="showPassword" class="material-symbols-outlined">visibility</span>
                <span v-else class="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <div class="relative flex items-center">
              <input
                :type="showConfirm ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirm your password"
                required
                class="h-12 w-full px-4 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                @click="showConfirm = !showConfirm"
                class="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span v-if="showConfirm" class="material-symbols-outlined">visibility</span>
                <span v-else class="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
            <p
              v-if="!passwordsMatch && confirmPassword"
              class="text-red-500 text-xs font-medium pt-1"
            >
              Passwords do not match.
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 transition-all"
          >
            Sign Up
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-slate-500">
            Already have an account?
            <RouterLink
              to="/login"
              class="text-violet-600 font-medium hover:underline"
            >
              Log in
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { useAuth } from "../composables/useAuth"; // adapt path

const router = useRouter();
const { signup } = useAuth(); // must return signup(email, password)

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirm = ref(false);

const passwordsMatch = computed(
  () => password.value === confirmPassword.value || confirmPassword.value === ""
);

const handleSubmit = async () => {
  if (!passwordsMatch.value) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    await signup(email.value, password.value);
    toast.success("Account created successfully!");
    setTimeout(() => router.push("/login"), 1000);
  } catch (error) {
    toast.error((error as Error).message);
  }
};
</script>
