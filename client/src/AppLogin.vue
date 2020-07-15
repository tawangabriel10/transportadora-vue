<template>
  <v-container fluid>
    <div class="login">
      <div class="logo-cliente">
        <img src="@/assets/logo.png">
      </div>
      <div class="login-form">
        <div @keyup.prevent.enter="doLogin" style="text-align: center">
          <v-form lazy-validation>
            <v-text-field
              label="Login"
              outlined
              type="text"
              required
              v-model="form.username"
              append-icon="mdi mdi-account"/>
            <v-text-field
              label="Senha"
              outlined
              type="password"
              v-model="form.password"
              required
              append-icon="mdi mdi-key-variant"/>

            <v-alert
              v-show="!validLogin"
              dense
              outlined
              type="error"
              color="#fc463a"
            >
              {{msgError || 'Usuário ou senha incorretos.'}}
            </v-alert>
            <v-btn color="primary" dark @click="doLogin">Logar</v-btn>
          </v-form>
        </div>
      </div>
      <div class="logo-juma">
        <img src="@/assets/logo-2.png">
      </div>
    </div>
  </v-container>
</template>
<style lang="scss">
  .login {
    position: absolute;
    width: 300px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    > div {
      margin-bottom: 10px;
    }

    select{
      padding: 15px 10px;
      border: 1px solid #ccc;
      margin: 5px;
    }
  }
</style>

<script>
import { mapActions } from 'vuex'
import config from '@/config'

export default {
  data () {
    return {
      config,
      msgError: '',
      validLogin: true,
      form: {
        username: null,
        password: null
      }
    }
  },
  async mounted () {
    this.validLogin = true
  },
  methods: {
    ...mapActions('Login', ['loginAction']),
    async doLogin () {
      try {
        this.msgError = ''
        this.validLogin = true
        await this.loginAction(this.form)
        this.validLogin = true
      } catch (error) {
        this.validLogin = false
        console.error(error)
        if (error instanceof CustomError) {
          this.msgError = error.message
        }
      }
    }
  }
}
</script>
