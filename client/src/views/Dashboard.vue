<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-semibold text-gray-900 text-center">
             Halo, {{ loggedInUser ? loggedInUser.nama : 'Mahasiswa' }}
          </h3>
  
          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr class="bg-blue-600 text-white">
                  <th class="py-2 px-4">Nama</th>
                  <th class="py-2 px-4">NIM</th>
                  <th class="py-2 px-4">Semester</th>
                  <th class="py-2 px-4">Tempat KKN</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(mhs, index) in mahasiswa" :key="index" class="border-b">
                  <td class="py-2 px-4 text-center">{{ mhs.nama }}</td>
                  <td class="py-2 px-4 text-center">{{ mhs.nim }}</td>
                  <td class="py-2 px-4 text-center">{{ mhs.semester }}</td>
                  <td class="py-2 px-4 text-center">{{ mhs.tempat_kkn }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
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
      const loggedInUser = ref(null); // Menyimpan user yang sedang login
  
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
        console.log("Data user dari API:", res.data); // Debugging: Lihat hasil API
        loggedInUser.value = Array.isArray(res.data) ? res.data[0] : res.data;
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

  
      onMounted(() => {
        fetchMahasiswa();
        fetchLoggedInUser();
      });
  
      return { mahasiswa, loggedInUser };
    },
  };
  </script>