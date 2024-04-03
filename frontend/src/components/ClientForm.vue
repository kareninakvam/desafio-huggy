<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="form">
    <h1>Adicionar novo contato</h1>
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="formData.name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="phone">Telefone:</label>
        <input type="text" id="phone" v-model="formData.phone" class="form-control" />
      </div>
      <div class="form-group">
        <label for="address">Endereço:</label>
        <input type="text" id="address" v-model="formData.address" class="form-control" />
      </div>
      <div class="form-group">
        <label for="photo">Foto:</label>
        <input type="file" id="photo" @change="handlePhotoChange" class="form-control-file" />
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        photo: null,
      },
    };
  },
  methods: {
    handlePhotoChange(event) {
      this.formData.photo = event.target.files[0];
    },
    handleSubmit() {
      const dataToSend = {
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        address: this.formData.address,
        photo: this.formData.photo ? this.formData.photo.name : null,
      };

      axios.post('http://localhost:8000/api/clients', dataToSend)
        .then(response => {
          console.log('Dados enviados com sucesso:', response.data);
          alert('Contato adicionado com sucesso!');
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Erro ao enviar os dados:', error);
        });
    },
  },
};
</script>
<style scoped>
.container {
  margin: 20px;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
}

.form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}
</style>
