<template>
  <!-- Tombol Login & Daftar -->
  <div class="mt-4 flex gap-4">
    <button 
      @click="showForm = 'login'"
      class="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-yellow-500 duration-200"
    >
      Login
    </button>
    <button 
      @click="showForm = 'daftar'"
      class="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-yellow-500 duration-200"
    >
      Daftar
    </button>
  </div>

  <!-- Form dengan Animasi -->
  <transition name="fade-slide" mode="out-in">
    <!-- Form Login -->
    <div v-if="showForm === 'login'" key="login" class="w-full md:w-[400px] bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 class="text-xl font-semibold text-center mb-4">Login Mahasiswa</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">NIP/NPM/Email</label>
          <input 
            v-model="identifier"
            type="text" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan NIP/NPM/Email"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Kata Sandi</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan Kata Sandi"
          />
        </div>
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          MASUK
        </button>
        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
      </form>
    </div>

    <!-- Form Daftar -->
    <div v-else-if="showForm === 'daftar'" key="daftar" class="w-full md:w-[400px] bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 class="text-xl font-semibold text-center mb-4">Form Pendaftaran</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Nama Lengkap</label>
          <input 
            v-model="nama"
            type="text" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan Nama Lengkap"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">NIP/NPM/Email</label>
          <input 
            v-model="emailReg"
            type="text" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan NIP/NPM/Email"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Kata Sandi</label>
          <input 
            v-model="passwordReg"
            type="password" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Masukkan Kata Sandi"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Ulangi Kata Sandi</label>
          <input 
            v-model="confirmPassword"
            type="password" 
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Ulangi Kata Sandi"
          />
        </div>
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          DAFTAR
        </button>
        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
      </form>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const showForm = ref("login");
    const identifier = ref(""); // Bisa NIM atau Email
    const password = ref("");
    const errorMsg = ref("");
    const router = useRouter();

    const nama = ref("");
    const emailReg = ref("");
    const passwordReg = ref("");
    const confirmPassword = ref("");

    // ✅ LOGIN: Bisa pakai Email atau NIM
    const login = async () => {
      if (!identifier.value || !password.value) {
        errorMsg.value = "Harap isi semua bidang!";
        return;
      }
      
      console.log("Mengirim data ke backend:", {
        identifier: identifier.value,
        password: password.value,
      });

      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          identifier: identifier.value,
          password: password.value,
        });

        // ✅ SIMPAN DATA USER KE LOCALSTORAGE
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));


        console.log("Respon dari backend:", res.data);
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      } catch (err) {
        console.error("Error dari backend:", err.response?.data);
        errorMsg.value = err.response?.data?.message || "Login gagal!";
      }
    };


    const register = async () => {
      if (!nama.value || !emailReg.value || !passwordReg.value || !confirmPassword.value) {
        errorMsg.value = "Harap isi semua bidang!";
        return;
      }

      if (passwordReg.value !== confirmPassword.value) {
        errorMsg.value = "Password tidak cocok!";
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          nama: nama.value,
          email: emailReg.value,
          password: passwordReg.value,
        });

        alert(res.data.message);
        showForm.value = "login"; // Beralih ke login setelah sukses daftar
      } catch (err) {
        errorMsg.value = err.response?.data?.message || "Pendaftaran gagal!";
      }
    };

    return {
      showForm,
      identifier, // ✅ Ganti dari "email" jadi "identifier"
      password,
      errorMsg,
      login,
      nama,
      emailReg,
      passwordReg,
      confirmPassword,
      register,
    };
  },
};
</script>


<style>
/* Animasi Transisi */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
