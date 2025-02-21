<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-96 p-6 shadow-lg bg-white rounded-md">
      <h2 class="text-2xl font-bold mb-5 text-center">Iniciar Sesión</h2>
      <div class="text-center p-4">
        <img
          src="../assets/logoReina.png"
          alt="Imagen de la empresa"
          class="rounded-lg shadow-lg w-32 mx-auto"
        />
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700">Usuario</label>
          <input
            v-model="username"
            type="text"
            class="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-500 text-center mt-3">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/authService";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        await login(this.username, this.password);
        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = "Usuario o contraseña incorrectos";
      }
    },
  },
};
</script>
