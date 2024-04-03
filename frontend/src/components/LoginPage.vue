<template>
  <div class="login-form">
    <form @submit.prevent="login" method="post">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$router.push("/");
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
  },
};
</script>

<style>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ajusta a altura conforme necessário */
}

form {
  width: 300px; /* Largura do formulário */
  padding: 20px; /* Preenchimento interno do formulário */
  background-color: #f4f4f4; /* Cor de fundo do formulário */
  border-radius: 8px; /* Borda arredondada */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

input,
button {
  display: block;
  width: 100%;
  margin-bottom: 10px; /* Espaçamento entre os campos */
  padding: 8px; /* Preenchimento interno dos campos */
  border: 1px solid #ccc; /* Borda dos campos */
  border-radius: 4px; /* Borda arredondada */
}

button {
  background-color: #007bff; /* Cor de fundo do botão */
  color: #fff; /* Cor do texto do botão */
  border: none; /* Remove a borda do botão */
}
</style>
