<template>
  <div class="container">
    <h2>Registrar</h2>
    <form @submit.prevent="registerUser" class="form">
      <div class="form-group">
        <label for="name" class="label">Nome:</label>
        <input type="text" id="name" v-model="formData.name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email" class="label">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password" class="label">Senha:</label>
        <input type="password" id="password" v-model="formData.password" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password_confirmation" class="label">Confirmar Senha:</label>
        <input type="password" id="password_confirmation" v-model="formData.password_confirmation" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    };
  },
  methods: {
    registerUser() {
      // Faça a requisição POST para a API de registro
      axios.post('http://localhost:8000/api/register', this.formData)
        .then(response => {
          console.log('Usuário registrado com sucesso:', response.data);
          alert('Usuário registrado com sucesso!');
          this.$router.push('/login');

        })
        .catch(error => {
          console.error('Erro ao registrar o usuário:', error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px auto; /* Centralizar horizontalmente */
  padding: 20px auto; /* Espaçamento interno */
  font-family: 'Roboto', sans-serif;
  max-width: 350px; /* Definindo a largura máxima do formulário */
}

.form {
  background-color: #f4f4f4; /* Cor de fundo do formulário */
  padding: 20px; /* Espaçamento interno do formulário */
  margin: 20px 0; /* Espaçamento externo do formulário */
  border-radius: 8px; /* Borda arredondada */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  padding: 20px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
