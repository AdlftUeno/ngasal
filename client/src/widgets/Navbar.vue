<template>
 <nav class="bg-white shadow-lg px-4 py-2 sticky top-0 z-50">
  <div class="container flex items-center justify-between max-w-7xl mx-auto">
    
    <!-- Logo -->
    <div class="flex items-center">
      <img src="@/assets/LogoUnsam.png" alt="logo" class="h-10 w-10 m-2">
      <div class="text-blue-800 my-1">
        KKN UNSAM <br> 
        <span class="text-black">Universitas Samudra</span>
      </div>
    </div>

    <!-- Navigasi -->
    <div class="hidden md:flex gap-6">
      <router-link to="/" class="text-blue-800 hover:text-yellow-400 hover:underline transition duration-300 ease-in-out transform hover:-translate-y-1">Beranda</router-link>
      <router-link to="/about" class="text-blue-800 hover:text-yellow-400 hover:underline transition duration-300 ease-in-out transform hover:-translate-y-1">Tentang KKN</router-link>
      <router-link to="/services" class="text-blue-800 hover:text-yellow-400 hover:underline transition duration-300 ease-in-out transform hover:-translate-y-1">Layanan</router-link>
      <router-link to="/contact" class="text-blue-800 hover:text-yellow-400 hover:underline transition duration-300 ease-in-out transform hover:-translate-y-1">Kontak</router-link>
    </div>
    
  </div>
</nav>

</template>
