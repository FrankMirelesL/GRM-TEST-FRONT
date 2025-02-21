<template>
  <div class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
      Crear Cita
    </h2>

    <form @submit.prevent="crearCita" class="space-y-4">
      <div>
        <label class="block font-semibold text-gray-700 mb-1"
          >Número de Cita</label
        >
        <input
          v-model="numeroCita"
          type="text"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-semibold text-gray-700 mb-1">Paciente</label>
          <select
            v-model="pacienteId"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled selected>Selecciona un paciente</option>
            <option
              v-for="paciente in pacientes"
              :key="paciente.id"
              :value="paciente.id"
            >
              {{ paciente.nombre }} {{ paciente.apellido }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-1">Médico</label>
          <select
            v-model="medicoId"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled selected>Selecciona un médico</option>
            <option
              v-for="medico in medicos"
              :key="medico.id"
              :value="medico.id"
            >
              {{ medico.nombre }} {{ medico.apellido }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label class="block font-semibold text-gray-700 mb-1"
          >Tipo de Cita</label
        >
        <select
          v-model="tipoCitaId"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled selected>Selecciona el tipo de cita</option>
          <option v-for="tipo in tipoCitas" :key="tipo.id" :value="tipo.id">
            {{ tipo.descripcion }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block font-semibold text-gray-700 mb-1">Fecha</label>
          <input
            v-model="fecha"
            type="date"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-1">Hora</label>
          <input
            v-model="hora"
            type="time"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Guardar Cita
      </button>
    </form>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      numeroCita: "",
      pacienteId: "",
      medicoId: "",
      tipoCitaId: "",
      fecha: "",
      hora: "",
      pacientes: [],
      medicos: [],
      tipoCitas: [],
    };
  },
  async created() {
    try {
      const responseP = await api.get("/citas/pacientes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseM = await api.get("/citas/medicos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseTC = await api.get("/citas/tipoCita", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.pacientes = responseP.data;
      this.medicos = responseM.data;
      this.tipoCitas = responseTC.data;
    } catch (error) {
      console.error("Error al obtener listas", error);
    }
  },
  methods: {
    async crearCita() {
      try {
        const response = await api.post("/citas", {
          numeroCita: this.numeroCita,
          pacienteId: this.pacienteId,
          medicoId: this.medicoId,
          tipoCitaId: this.tipoCitaId,
          fecha: this.fecha,
          hora: this.hora,
        });
        alert("Cita creada con éxito " + response.data);
        this.$router.push("/dashboard");
      } catch (error) {
        alert(
          "Error al crear la cita: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  },
};
</script>
