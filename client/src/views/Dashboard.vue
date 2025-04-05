<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <!-- FOTO PROFIL -->
        <div class="flex-shrink-0">
          <img
            :src="loggedInUser ? `http://localhost:5000${loggedInUser.foto}` : ''"
            alt="foto profil"
            class="h-48 w-48 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
        </div>

        <!-- INFO SINGKAT -->
        <div class="flex-1 space-y-2">
          <p class="text-xl font-bold text-gray-800">{{ loggedInUser?.nama || 'User belum login' }}</p>
          <p class="text-md text-gray-700">NIM: {{ loggedInUser?.nim || '-' }}</p>
          <p class="text-md text-gray-700">Tempat KKN: {{ loggedInUser?.tempat_kkn || '-' }}</p>
          <button
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            @click="showDetail = !showDetail"
          >
            {{ showDetail ? 'Sembunyikan Biodata' : 'Lihat Biodata Lengkap' }}
          </button>
        </div>
      </div>

      <!-- BIODATA LENGKAP -->
      <div v-if="showDetail" class="mt-6 border-t pt-4 space-y-2">
        <p class="text-md text-gray-700">Semester: {{ loggedInUser?.semester || '-' }}</p>
        <p class="text-md text-gray-700">Tempat, Tanggal Lahir: {{ loggedInUser?.ttl || '-' }}</p>
        <p class="text-md text-gray-700">Program Studi: {{ loggedInUser?.prodi || '-' }}</p>
        <p class="text-md text-gray-700">Fakultas: {{ loggedInUser?.fakultas || '-' }}</p>
        <p class="text-md text-gray-700">Angkatan: {{ loggedInUser?.angkatan || '-' }}</p>
        <p class="text-md text-gray-700">Dosen Pembimbing: {{ loggedInUser?.dospem || '-' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const mahasiswa = ref([]);
    const loggedInUser = ref(null);
    const showDetail = ref(false);

    const fetchMahasiswa = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        mahasiswa.value = res.data;
      } catch (error) {
        console.error("Gagal mengambil data mahasiswa:", error);
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        console.log("Data user dari API:", res.data);
        loggedInUser.value = Array.isArray(res.data) ? res.data[0] : res.data;
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    onMounted(() => {
      fetchMahasiswa();
      fetchLoggedInUser();
    });

    return { mahasiswa, loggedInUser, showDetail };
  },
};
</script>

<style scoped>
/* Styling tambahan kalau butuh */
</style>
