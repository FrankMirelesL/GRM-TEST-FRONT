<template>
  <div class="p-4">
    <div class="border-b border-gray-200 mb-4">
      <nav class="flex space-x-4">
        <button
          @click="activeTab = 'citas'"
          :class="{
            'border-b-2 border-blue-500 text-blue-500': activeTab === 'citas',
          }"
          class="px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          Citas Generadas
        </button>
        <button
          @click="activeTab = 'eliminadas'"
          :class="{
            'border-b-2 border-blue-500 text-blue-500':
              activeTab === 'eliminadas',
          }"
          class="px-4 py-2 text-gray-600 hover:text-blue-500"
        >
          Historial Citas
        </button>
      </nav>
    </div>

    <div v-if="activeTab === 'citas'">
      <h2 class="text-xl font-bold mb-4">Lista de Citas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="cita in citas"
          :key="cita.id"
          class="border p-4 rounded-lg shadow-md bg-white flex flex-col"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Cita: {{ cita.numeroCita }}</h3>
            <div class="flex space-x-2">
              <button
                @click="editCita(cita.id)"
                class="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 py-2 px-4 rounded-lg shadow-md transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              <button
                @click="deleteCita(cita.id)"
                class="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 py-2 px-4 rounded-lg shadow-md transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-2 text-sm">
            <div class="flex justify-between">
              <span class="font-semibold">Fecha:</span>
              <span>{{ cita.fecha }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Hora:</span>
              <span>{{ cita.hora }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Paciente:</span>
              <span
                >{{ cita.paciente.nombre }} {{ cita.paciente.apellido }}</span
              >
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Médico:</span>
              <span>{{ cita.medico.nombre }} {{ cita.medico.apellido }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Especialidad:</span>
              <span>{{ cita.medico.especialidad }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Tipo de Cita:</span>
              <span>{{ cita.tipoCita.descripcion }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'eliminadas'">
      <h2 class="text-xl font-bold mb-4">Historial</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="cita in citasEliminadas"
          :key="cita.id"
          class="border p-4 rounded-lg shadow-md bg-gray-100"
        >
          <h3 class="font-bold text-lg text-red-500">
            Cita {{ cita.descripcion }}
          </h3>
          <div class="mt-2 text-sm">
            <div class="flex justify-between">
              <span class="font-semibold">Número:</span>
              <span>{{ cita.numeroCita }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Fecha:</span>
              <span>{{ cita.fecha }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Hora:</span>
              <span>{{ cita.hora }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Paciente:</span>
              <span>{{ cita.pacienteId }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Descripción:</span>
              <span>{{ cita.descripcion }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Fecha Modificación:</span>
              <span>{{ cita.fechaModificacion }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-xl font-bold mb-4">Editar Cita</h3>
        <form @submit.prevent="updateCita">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Número de Cita</label
            >
            <input
              v-model="modalCita.numeroCita"
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Fecha</label
            >
            <input
              v-model="modalCita.fecha"
              type="date"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Hora</label
            >
            <input
              v-model="modalCita.hora"
              type="time"
              class="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Paciente</label
            >
            <select
              v-model="modalCita.paciente.id"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled
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

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Médico</label
            >
            <select
              v-model="modalCita.medico.id"
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

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700"
              >Tipo de Cita</label
            >
            <select
              v-model="modalCita.tipoCita.id"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled selected>
                Selecciona el tipo de cita
              </option>
              <option v-for="tipo in tipoCitas" :key="tipo.id" :value="tipo.id">
                {{ tipo.descripcion }}
              </option>
            </select>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              @click="closeModal"
              type="button"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/api.js";

export default {
  data() {
    return {
      activeTab: "citas",
      citas: [],
      citasEliminadas: [],
      paciente: [],
      medico: [],
      tipoCitas: [],
      showModal: false,
      modalCita: {},
    };
  },
  async created() {
    try {
      // Petición para obtener las citas
      const response = await api.get("/citas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const responseElim = await api.get("/citas/eliminadas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      this.citas = response.data;
      this.citasEliminadas = responseElim.data;
    } catch (error) {
      console.error("Error al obtener citas", error);
    }
  },
  methods: {
    // Función para editar cita
    editCita(citaId) {
      const cita = this.citas.find((c) => c.id === citaId);
      if (cita) {
        this.modalCita = { ...cita };
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.modalCita = {};
    },
    async updateCita() {
      try {
        const response = await api.put(
          `/citas/${this.modalCita.id}`,
          this.modalCita,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const index = this.citas.findIndex((c) => c.id === this.modalCita.id);
        if (index !== -1) {
          this.citas[index] = { ...response.data };
        }
        this.closeModal();
        alert("Cita actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar la cita", error);
        alert("Error al actualizar la cita");
      }
    },
    // Función para eliminar una cita
    async deleteCita(citaId) {
      try {
        await api.delete(`/citas/${citaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.citas = this.citas.filter((cita) => cita.id !== citaId);
        alert("Cita eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar cita", error);
        alert("Error al eliminar cita");
      }
    },
  },
};
</script>
