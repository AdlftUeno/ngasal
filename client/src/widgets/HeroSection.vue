<script setup lang="ts">
import ButtonLogin from '@/particles/ButtonLogin.vue';
</script>
<template>
  <section class="flex flex-col min-h-screen w-full bg-blue-100">
    <!-- Judul -->
    <div class="text-center mt-10">
      <h1 class="text-4xl font-bold text-gray-800">Selamat Datang di Sistem Informasi KKN</h1>
      <h2 class="text-2xl text-gray-700 font-bold">Universitas Samudra</h2>
    </div>

    <div class="flex flex-col items-center mt-5" >
      <ButtonLogin />
    </div>

  </section>
</template>
