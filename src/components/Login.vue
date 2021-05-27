<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <h1>Tech Shop</h1>
        <div class="md-title">Prijava</div>
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="form.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Lozinka</label>
          <md-input v-model="form.password" type="password"></md-input>
        </md-field>
        <label v-if="error" class="text-danger text-center">{{error}}</label>
      </div>

      <div class="actions md-layout md-alignment-center">
        <md-button class="md-raised md-primary" @click="auth">Prijavite se</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        loading: false,
        form: {
          email: "",
          password: ""
        },
        error: null,
      };
    },
    methods: {
      auth() {
        if (this.form.email.length === 0 || this.form.password.length === 0) {
          this.error = "Neispravan e-mail ili lozinka";
          return;
        } else {
          this.error = null;
        }
        this.loading = true;
        this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password
        }).catch(error => {
          this.error = "Neispravan e-mail ili lozinka";
          this.loading = false;
        });
      }
    }
  }
</script>

<style scoped>
  .centered-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: white;
    min-height: 90vh;
  }

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  img {
    margin-bottom: 16px;
    max-width: 80px;
  }

  .md-button {
    margin: 0;
  }

  .form {
    margin-bottom: 20px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
