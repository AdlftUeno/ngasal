<script setup lang="ts">
import ButtonLogin from '@/particles/ButtonLogin.vue';
</script>

<template>
    <section class="flex flex-col min-h-screen w-full bg-blue-100">
    <!-- Judul -->
    <div class="text-center mt-10">
      <h1 class="text-4xl font-bold text-gray-800">Tentang KKN</h1>
      <h2 class="text-2xl text-gray-700 font-bold">Universitas Samudra</h2>
    </div>

    <div class="text-left ml-40 mr-40 mt-10">
      <h1 class="text-sm font-bold text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, porro consequuntur non corporis blanditiis, ratione delectus repellendus ipsum excepturi rerum natus eum amet a quae perspiciatis. Ea tempora corrupti eius.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aspernatur eaque corporis possimus excepturi commodi nam, quaerat quasi enim perferendis! Praesentium adipisci quidem consequatur placeat illum dolorem cum sapiente voluptatum!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa mollitia magnam corporis, odio commodi nesciunt consequuntur inventore, sed, cum provident dignissimos non et voluptatum optio itaque repudiandae voluptatem reiciendis tenetur!
      </h1>
    </div>

    <div class="text-center mt-5">
      <h1 class="text-4xl font-bold text-gray-800">Silahkan Gabung</h1>
    </div>

    <div class="flex flex-col items-center mt-5">
      <ButtonLogin />
    </div>
</section>
</template>