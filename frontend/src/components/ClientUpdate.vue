<template>
  <div>
    <h2>Edit Client</h2>
    <form @submit.prevent="updateClient">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email">
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="formData.phone">
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="formData.address">
      </div>
      <div>
        <label for="photo">Photo:</label>
        <input type="file" id="photo" @change="handlePhotoChange">
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        photo: ''
      }
    };
  },
  methods: {
  updateClient() {
    const router = useRouter();
    const clientId = this.$route.params.id;
    fetch(`http://localhost:8000/api/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
      return response.json();
    })
    .then(data => {
      if (data.message === 'succes') {
        alert('Cliente atualizado com sucesso');
        router.push({ name: 'home' });
      } else {
        throw new Error('Failed to update client');
      }
    })
    .catch(error => {
      console.error('Erro ao atualizar cliente:', error);
      alert('Ocorreu um erro ao atualizar o cliente');
    });
  },
}
};
</script>

