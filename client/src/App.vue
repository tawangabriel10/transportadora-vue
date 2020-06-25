<template>
  <div id="app">
    <app-home v-if="isLoggedIn"></app-home>
    <app-login v-else></app-login>
    <loading :loading="isLoading"></loading>
    <v-snackbar
      v-model="alert.show"
    >
      {{ alert.text }}
      <v-btn
        icon
        text
        color="light"
        @click="alert.show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import AppHome from './HomeLayout'
import AppLogin from './AppLogin'
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading,
    'app-home': AppHome,
    'app-login': AppLogin
  },
  computed: {
    ...mapGetters('Login', { isLoggedIn: 'isLoggedIn', userData: 'userData' })
  },
  data () {
    return {
      isLoading: null,
      tempLoadingValue: false,
      lockLoading: false,
      alert: {
        type: 'dark',
        show: false,
        text: ''
      }
    }
  },
  mounted () {
    this.$utils.eventEmitter.on('Alert', ({ type, text }) => {
      this.alert.show = true
      this.alert.text = text
      this.alert.type = type
    })
    this.$store.watch((state) => {
      const isLoading = state.Crud.isLoading
      this.tempLoadingValue = isLoading

      if (!this.lockLoading && isLoading) {
        this.isLoading = true
        this.lockLoading = true
        const timer = setInterval(() => {
          if (this.tempLoadingValue === false) {
            this.isLoading = false
            this.lockLoading = false
            clearInterval(timer)
          }
        }, 500)
      }
    })
  }
}
</script>

<style lang="scss">
.fieldset {
  border: 1px solid #ddd;
  position: relative;
  padding: 20px 10px 0;

  > .legend {
    position: absolute;
    top: -13px;
    left: 10px;
    font-weight: bold;
    padding: 0 5px;
    z-index: 1;
    background: #fff;
  }
}
</style>
