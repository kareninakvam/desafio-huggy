<template>
  <div class="container">
    <div class="search">
      <!-- Adicionando o campo de busca -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar contato..."
      />
    </div>
    <div class="button-container">
      <!-- Adicionando o botão roxo -->
      <button class="purple-button" @click="navigateToClientForm">
        + Adicionar contato
      </button>
    </div>
  </div>
  <div>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Foto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in filteredClients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.address }}</td>
          <td>
            <img :src="client.photo" alt="Photo" style="max-width: 100px" />
          </td>
          <td>
            <button @click="navigateToEditClient(client.id)">Editar</button>
            <button @click="openDeleteModal(client.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" tabindex="-1" role="dialog" v-if="showDeleteModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Excluir Cliente</h5>
            <button type="button" class="close" @click="cancelDelete">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja excluir este cliente?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelDelete"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clients: [],
      searchQuery: "",
      showDeleteModal: false,
      clientIdToDelete: null,
    };
  },
  mounted() {
    this.fetchClients();
  },
  computed: {

    filteredClients() {
      return this.clients.filter(
        (client) =>
          client.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          client.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          client.address.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchClients() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.clients = response.data;
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    },
    openDeleteModal(clientId) {
      console.log(clientId);

      this.showDeleteModal = true;
      console.log(this.showDeleteModal);
      this.clientIdToDelete = clientId;
    },
  
    cancelDelete() {
      this.showDeleteModal = false;
    },
  
    confirmDelete() {
      this.deleteClient(this.clientIdToDelete);
      this.showDeleteModal = false;
    },
    async deleteClient(clientId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8000/api/clients/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Cliente excluído com sucesso");
        this.fetchClients();
      } catch (error) {
        console.error("Erro ao excluir o cliente:", error);
      }
    },
    navigateToClientForm() {
      this.$router.push({ name: "ClientForm" });
    },
    navigateToEditClient(clientId) {
      this.$router.push(`/clients/edit/${clientId}`);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px
}

.search {
  margin-right: auto;
}

.button-container {
  margin-left: auto;
}

.purple-button {
  width: 184px;
  height: 36px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin-left: 8px; 
  background-color: #321bde;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
