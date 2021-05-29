<template>
  <div class="centered-container">
    <md-content class="md-elevation-3 max-height-90">
      <div class="title">
        <h3>Registracija</h3>
      </div>

      <div class="form">
        <md-field>
          <label>Ime</label>
          <md-input v-model="form.name" autofocus></md-input>
        </md-field>
        <md-field>
          <label>Prezime</label>
          <md-input v-model="form.surname"></md-input>
        </md-field>
        <md-field>
          <label>E-mail</label>
          <md-input v-model="form.email" type="email"></md-input>
        </md-field>
        <md-field>
          <label>Adresa</label>
          <md-input v-model="form.address" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Broj telefona</label>
          <md-input v-model="form.phoneNumber" type="text"></md-input>
        </md-field>
        <md-field md-has-password>
          <label>Lozinka</label>
          <md-input v-model="form.password" type="password" minlength="6"></md-input>
        </md-field>
        <md-field md-repeat-password>
          <label>Ponovite lozinku</label>
          <md-input v-model="form.repeatedPassword" type="password" minlength="6"></md-input>
        </md-field>
        <label v-if="error" class="text-danger text-center">{{error}}</label>
      </div>

      <div class="actions md-layout md-alignment-center">
        <md-button class="md-raised md-primary" @click="register">Registruj se</md-button>
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
        error: null,
        form: {
          name: "",
          surname: "",
          email: "",
          password: "",
          repeatedPassword: "",
          address: "",
          phoneNumber: "",
        }
      };
    },
    methods: {
      register() {
        if (this.form.name === '' || this.form.surname === '' || this.form.address === '' | this.form.phoneNumber === '') {
          this.error = "Sva polja su obavezna";
          return;
        } else if (this.form.password !== this.form.repeatedPassword) {
          this.error = "Lozinke se ne poklapaju";
          return;
        } else if (this.form.password.length < 6) {
          this.error = 'Lozinka mora da ima minimum 6 karaktera';
          return;
        } else {
          this.error = null;
        }
        this.loading = true;
        this.$store.dispatch('register', {
          name: this.form.name,
          surname: this.form.surname,
          email: this.form.email,
          password: this.form.password,
          address: this.form.address,
          phoneNumber: this.form.phoneNumber,
        }).catch(error => {
          if(error.code === 'auth/email-already-in-use') {
            this.error = 'E-mail adresa već postoji';
          } else if (error.code === 'auth/weak-password'){
            this.error = 'Lozinka mora da ima minimum 6 karaktera';
          } else if (error.code === 'auth/invalid-email') {
            this.error = 'Nevalidan e-mail';
          } else {
            this.error = 'Neidentifikovana greška';
          }
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

  .max-height-90 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
