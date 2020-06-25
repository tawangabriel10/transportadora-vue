<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerState"
      :clipped="false"
      :floating="false"
      :permanent="false"
      :color="config.colors.primary"
      width="260"
      dark
      app
      overflow
    >
      <template v-slot:prepend>
        <v-list-item class="sidebar-title" one-line dark>
          <v-list-item-content>
            <div style="width: 100%; text-align: center">
              <img src="@/assets/logo.png">
            </div>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-container fluid class="menu-select">
        <v-select
          label="Empresa: "
          v-model="currentEmpresaId"
          :items="empresas"
          item-text="nome"
          item-value="id"
        />
        <v-select
          ref="menuSelect"
          :items="homeRoutes"
          label="Área"
          item-text="meta.title"
          item-value="name"
          @change="changeRoute"
          :value="currentRoute"
          filled
          dark
          rounded
          ></v-select>
      </v-container>
      <v-list class="menu-children" v-if="$route.matched.length && $route.matched[0].meta.parent">
        <v-list-item
          v-for="item in currentChildrenRoutes"
          :key="item.meta.title"
          :to="item.path"
          link
          >
          <v-list-item-icon>
            <v-icon :class="item.meta.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click.prevent="onLogoutBtnClick" link>
            <v-list-item-icon class="menu-logout-icon">
              <v-icon>mdi mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <div style="font&#45;size: 12px; text&#45;align: center; padding: 5px; position: absolute; color: #000; z&#45;index: 10; margin&#45;top: 12px;">(61) 3255 1264</div> -->
          <v-list-item style="margin: 0 0 -10px; padding: 0; background: #fff;">
            <img src="@/assets/logo-2.png" style="margin: 0 auto; width: 99%">
          </v-list-item>
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="false"
      app
    >
      <v-app-bar-nav-icon
        dark
        :style="{ backgroundColor: config.colors.primary }"
        style="border-radius: 5px;"
        @click.stop="drawerState = !drawerState"
      />
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import routes from '@/router/routes'
import { mapActions, mapGetters } from 'vuex'
import config from '@/config'

export default {
  name: 'home-layout',
  data: () => ({
    empresas: [],
    currentEmpresaId: null,
    drawerState: null,
    currentRoute: 'home',
    routes,
    config
  }),
  async mounted () {
    if (this.$route.matched.length && this.$route.matched[0].meta.parent) {
      this.currentRoute = this.$route.matched[0].name
    } else {
      if (this.$route.name !== 'home') {
        this.currentRoute = null
        this.$router.push('/')
      }
    }
    this.empresas = await this.find({
      entity: 'empresas'
    })

    const currentEmpresa = this.$store.state.Crud.currentEmpresa || (this.empresas[0] || {})
    this.currentEmpresaId = currentEmpresa && currentEmpresa.id
  },
  watch: {
    '$route' (route) {
      if (route.path === '/') {
        this.$nextTick(() => {
          this.currentRoute = null
        })
      }
    },
    async currentEmpresaId (currentEmpresaId) {
      this.setCurrentEmpresa(currentEmpresaId)
    }
  },
  methods: {
    onLogoutBtnClick () {
      this.logoutAction()
        .then(() => {
          this.$router.push('/')
        })
    },
    changeRoute (name) {
      if (this.$router.name !== name) {
        this.$router.push({ name })
      }
    },
    ...mapActions('Login', ['logoutAction']),
    ...mapActions('Crud', ['find', 'setCurrentEmpresa'])
  },
  computed: {
    ...mapGetters('Login', { userData: 'userData' }),
    currentChildrenRoutes () {
      return this.routes.filter(v => v.name === this.$route.matched[0].name)[0].children.filter(c => {
        if (c.meta.icon && c.meta.userPerfil.includes(this.userData.perfil) && !c.meta.hideFromMenu) {
          return true
        }
      })
    },
    homeRoutes () {
      return this.routes.filter(c => {
        if (c.children && !c.meta.hideFromMenu && c.meta.userPerfil.includes(this.userData.perfil)) {
          return c
        }
      })
    }
  }
}
</script>

<style lang="scss">
.sidebar-title {
  font-weight: bold;
  background: #f5f5f5;
  height: 64px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  img {
    max-width: 100%;
  }
}

.menu-children {
  .v-list-item__icon {
    margin-right: 10px !important;
  }

  .v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
    font-size: 15px;
    white-space: pre-wrap;
  }

  .v-list-item--active:before {
    background: #000 !important;
  }
}

.menu-select {
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
  }
}

.menu-logout-icon {
  margin-right: 10px !important;
}

</style>
