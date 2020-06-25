<template>
  <div class="anexos-wrap">
    <h2>Anexos</h2>
    <v-file-input
      v-model="upload"
      placeholder="Fazer novo upload"
      label="Anexo"
      prepend-icon="mdi-paperclip"
      multiple
      @change="onAddFile(idEntidade)"
      >
      <template v-slot:selection="{ text }">
        <v-chip small label color="primary">
          {{ text }}
        </v-chip>
      </template>
    </v-file-input>

    <div class="clearfix"></div>

    <v-row>
      <v-col cols="12" sm="4" md="3" :key="idx" v-for="(file, idx) in files">
        <div class="anexo-item">
          <v-text-field dense readonly v-model="file.nome"></v-text-field>
          <v-btn icon @click="deleteAnexo(file.id)"><v-icon>mdi-delete</v-icon></v-btn>
          <v-btn icon @click="downloadAnexo(file.id, file.nome)"><v-icon>mdi-download</v-icon></v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import config from '@/config'

const baseUrl = config.baseUrl

export default {
  props: {
    entity: {
      type: String,
      required: true
    },
    idEntidade: {
      type: Number,
      required: false
    },
    config: {
      type: Object,
      required: false,
      default: () => undefined
    }
  },
  data () {
    return {
      upload: [],
      files: []
    }
  },
  methods: {
    ...mapActions('Crud', ['find', 'insertRow', 'removeRow']),
    async onAddFile (id) {
      if ((this.upload.length < 1 || (!this.idEntidade && !id)) && typeof this.config !== 'undefined') {
        return
      }

      const listToSavePromises = []
      for (let file of this.upload) {
        listToSavePromises.push(
          this.insertRow({
            entity: this.config.entity,
            values: {
              [this.config.columns.data]: file,
              [this.config.columns.id]: this.idEntidade ? this.idEntidade : id,
              [this.config.columns.name]: file.name
            },
            isFormData: true,
            updateState: false
          })
        )
      }

      await Promise.all(listToSavePromises)
      this.upload = []
      this.files = []
      await this.refreshFiles()
    },
    async downloadAnexo (id, name) {
      const element = document.createElement('a')
      element.setAttribute('href', `${baseUrl}/${this.config.entity}/${id}/stream/anexo?authentication-token=${this.userData.token}`)
      element.setAttribute('download', name || ('Anexo_' + id))
      element.setAttribute('target', '_blank')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    async deleteAnexo (id) {
      this.removeRow({
        entity: this.config.entity,
        key: id,
        updateState: false
      }).then(() => {
        this.refreshFiles()
      })
    },
    async refreshFiles () {
      if (this.idEntidade && typeof this.config !== 'undefined') {
        this.files = await this.find({
          entity: this.config.entity,
          updateState: false,
          params: {
            where: {
              [this.config.columns.id]: this.idEntidade
            },
            size: -1
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters('Login', {
      userData: 'userData'
    })
  },
  watch: {
    idEntidade () {
      this.files = []
      this.refreshFiles()
    }
  },
  async mounted () {
    await this.$nextTick()
    this.upload = []
    this.files = []
    await this.refreshFiles()
  }
}
</script>

<style lang="scss">
.anexos-wrap {
  h2 {
    margin: 10px 0;
  }

  .anexo-item {
    background: #D8D8D8;
    padding: 0 10px 5px;
    border: 1px solid #979797;
  }
}
</style>
