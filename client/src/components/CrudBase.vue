<template>
  <div>
    <component :is="containerComponent" v-model="dialog" max-width="900px">
    <template v-if="showAddButton" v-slot:activator="{ on }">
      <v-btn v-if="onClickAdicionar" @click="onClickAdicionar" color="primary" dark class="mb-2">Adicionar</v-btn>
      <v-btn v-else color="primary" dark class="mb-2" v-on="on">Adicionar</v-btn>
    </template>
    <v-card>
      <v-card-title v-if="showTitle">
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="formValid"
          :lazy-validation="true"
          >
          <v-container :class="dense ? 'dense' : undefined" v-if="formReady">
            <v-row>
              <v-col :key="`${entity}-${header.type}-${i}`" v-for="(header, i) in currentFormHeaders" cols="12" sm="6" :md="header.cols ? header.cols : 4">
                <colaborador-input
                  v-if="header.type === 'colaborador'"
                  :rules="parseRules(header.rules, header.text)"
                  :header="header"
                  :dense="dense"
                  @change="onChangeCustomInput(header, $event)"
                  :edited-item="editedItem"></colaborador-input>
          <auto-complete
            v-else-if="header.type === 'autocomplete'"
            :rules="parseRules(header.rules, header.text)"
            :header="header"
            :entity="entity"
            :dense="dense"
            @change="onChangeCustomInput(header, $event)"
            :edited-item="editedItem"></auto-complete>
          <custom-input
            v-else-if="supportedFieldTypes.includes(header.type)"
            :rules="parseRules(header.rules, header.text)"
            :header="header"
            :dense="dense"
            @change="onChangeCustomInput(header, $event)"
            :edited-item="editedItem"></custom-input>
          <v-autocomplete
            clearable
            v-else-if="lookupValues[header.lookupName || header.lookup || header.value] || header.items"
            v-model="editedItem[header.value]"
            :item-text="'nome'"
            :item-value="'id'"
            :dense="dense"
            :items="lookupValues[header.lookupName || header.lookup || header.value] || header.items"
            :rules="parseRules(header.rules, header.text)"
            :label="header.text"
            @change="onChangeCustomInput(header, $event)"
            v-bind="header.options || {}"></v-autocomplete>
          <v-text-field
            v-else
            v-model="editedItem[header.value]"
            :label="header.text"
            :dense="dense"
            :rules="parseRules(header.rules, header.text)"
            v-mask="header.mask || noMask"
            v-bind="header.options || {}"
            @change="onChangeCustomInput(header, $event)"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="showFormBottom">
              <v-col cols="12">
                <slot name="form-bottom" v-bind="editedItem"></slot>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <anexos v-if="typeof anexosConfig !== 'undefined'" :config="anexosConfig" ref="anexos" :entity="entity" :id-entidade="editedId"></anexos>
      </v-card-text>

      <v-card-actions :style="{ marginBottom: dense ? 0 : undefined }">
        <v-spacer></v-spacer>
        <v-btn v-show="showCancelButton" @click="close">Cancelar</v-btn>
        <v-btn color="blue" dark @click="save">
          <template v-if="editedIndex === -1">Adicionar</template>
          <template v-else>Salvar</template>
        </v-btn>
      </v-card-actions>
    </v-card>
    </component>
  </div>
</template>

<script>
import { http } from '@/pluggables/http'
import { mapActions, mapState } from 'vuex'
import config from '@/config'
import ColaboradorInput from './ColaboradorInput'
import AutoComplete from './AutoComplete'
import { VDialog } from 'vuetify/lib'
import Anexos from './Anexos'

const baseUrl = config.baseUrl

export default {
  name: 'crud-base',
  components: {
    Anexos,
    ColaboradorInput,
    AutoComplete,
    'v-dialog': VDialog
  },
  props: {
    entity: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      default: () => []
    },
    dense: {
      type: Boolean,
      default: () => false
    },
    showFormBottom: {
      type: Boolean,
      default: () => false
    },
    showCancelButton: {
      type: Boolean,
      default: () => false
    },
    showAddButton: {
      type: Boolean,
      default: () => false
    },
    showTitle: {
      type: Boolean,
      default: () => true
    },
    updateState: {
      type: Boolean,
      default: () => true
    },
    preSave: {
      type: Function,
      required: false
    },
    anexosConfig: {
      type: Object,
      required: false,
      default: () => undefined
    },
    onClickAdicionar: {
      type: Function,
      required: false
    },
    isDialog: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      dialog: false,
      formValid: true,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      lookupValues: {},
      formReady: false,
      currentHeaders: [],
      supportedFieldTypes: ['date', 'color', 'time', 'currency', 'textarea', 'number', 'radio', 'checkbox'],
      noMask: {
        mask: '*'.repeat(255),
        tokens: {
          '*': { pattern: /./ }
        }
      }
    }
  },
  async mounted () {
    try {
      await this.buildHeaders()
      this.buildEditItem()
      this.formReady = true

      for (const header of this.headers) {
        if (header.fieldValue) {
          this.editedItem[header.value] = header.fieldValue
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      this.setLoadingStatus(false)
      this.$emit('loaded')
    }
  },

  computed: {
    ...mapState('Crud', {
      data (state) {
        return state.data[this.entity] || []
      }
    }),
    containerComponent () {
      return this.isDialog ? 'v-dialog' : 'div'
    },
    currentFormHeaders () {
      return this.currentHeaders.filter(header => {
        return header.value !== 'action' &&
          !header.hide &&
          !(this.editedIndex === -1 && header.hideOnAdd) &&
          !(this.editedIndex !== -1 && header.hideOnEdit)
      })
    },
    formTitle () {
      return (this.editedIndex === -1 ? 'Inserir' : 'Editar') + ' ' + this.title
    },
    editedId () {
      return (this.editedItem.id ? this.editedItem.id : null)
    }
  },
  watch: {
    async dialog (val) {
      if (val) {
        await this.buildHeaders()
      } else {
        this.$refs.form && this.$refs.form.reset()
        this.close()
      }
    },
    activate (val) {
      this.dialog = val
    }
  },

  methods: {
    ...mapActions('Crud', ['find', 'insertRow', 'removeRow', 'updateRow', 'setLoadingStatus']),
    async onChangeCustomInput (header, $event) {
      if (header.change) {
        await header.change($event)
      }
      this.editedItem.$set(header.value, $event)
    },
    async buildHeaders () {
      const headers = []
      for (const header of this.headers) {
        this.setLoadingStatus(true)
        if (header.lookup) {
          let data = []
          let lookupName = header.lookup
          if (typeof header.lookup === 'string') {
            let { data: d } = await http.get(`${baseUrl}/${header.lookup}`, {
              params: {
                outFields: ['id'],
                distinctFields: ['nome'],
                size: -1
              }
            })
            data = d
          } else if (typeof header.lookup === 'function') {
            lookupName = header.value
            data = await header.lookup()
          } else {
            data = []
          }

          header.lookupName = lookupName
          this.lookupValues[lookupName] = data
          this.$forceUpdate()
        } else if (header.lookupForFilter) {
          const [entity, distinctField] = header.lookupForFilter.split('#')
          let { data: d } = await http.get(`${baseUrl}/${entity}`, {
            params: {
              distinctFields: [distinctField],
              size: -1
            }
          })
          this.lookupValues[header.lookupForFilter] = d
        }
        this.setLoadingStatus(false)

        headers.push(header)
      }

      this.currentHeaders = headers

      for (const header of headers) {
        if (header.immediateChange && header.change && this.editedItem[header.value]) {
          await header.change(this.editedItem[header.value])
        }

        if (header.fieldValue) {
          this.editedItem[header.value] = header.fieldValue
        }
      }
    },

    updateHeader (indexHeader, newValue = {}) {
      const headers = []
      for (const [index, header] of Object.entries(this.currentHeaders)) {
        if (String(index) === String(indexHeader)) {
          headers.push({
            ...header,
            ...newValue
          })
        } else {
          headers.push(header)
        }
      }

      this.currentHeaders = headers
      this.$forceUpdate()
    },

    activate () {
      this.dialog = true
    },

    parseRules (rules, field) {
      let parsedRules = []
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          if (this.$utils.formRules[rule]) {
            parsedRules.push(this.$utils.formRules[rule](field))
          }
        })
      }
      return parsedRules
    },
    edit (item) {
      this.editedIndex = this.data.findIndex(({ id }) => String(item.id) === String(id))
      this.buildEditItem(item)
      this.dialog = true
    },

    buildEditItem (item = {}) {
      this.editedItem = Object.assign({
        $set: (key, value, emitChanges = true) => {
          this.editedItem = {
            ...this.editedItem,
            [key]: value
          }
          if (emitChanges) {
            this.$emit('edit-attribute-item', { editedItem: this.editedItem, attributesChanged: [key] })
            this.$emit('edit-item', this.editedItem)
          }
        }
      }, item)

      for (const header of this.headers) {
        if (header.fieldValue) {
          this.editedItem[header.value] = header.fieldValue
        }
      }
    },

    async delete (item) {
      if (confirm('Tem certeza que deseja remover?')) {
        await this.removeRow({ entity: this.entity, key: item.id })
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.buildEditItem(this.defaultItem)
        this.editedIndex = -1
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      }, 300)
    },

    async save () {
      try {
        if (!this.$refs.form.validate()) {
          return
        }
        this.editedIndex = this.data.findIndex(({ id }) => String(this.editedItem.id) === String(id))

        const values = {}
        const headersObj = {}
        for (const header of this.currentHeaders) {
          headersObj[header.value] = header
        }
        for (const key in this.editedItem) {
          if (headersObj[key] && headersObj[key].type === 'virtual') {
            continue
          }
          if (this.editedItem.hasOwnProperty(key)) {
            const value = this.editedItem[key]
            if (headersObj[key] && headersObj[key].preSave) {
              values[key] = await headersObj[key].preSave(value)
            } else {
              values[key] = value
            }
          }
        }

        if (this.preSave) {
          await this.preSave(this.editedItem)
        }

        if (this.editedIndex > -1) {
          await this.updateRow({ entity: this.entity, key: this.editedItem.id, values, updateState: this.updateState })
        } else {
          this.editedItem = await this.insertRow({ entity: this.entity, values, updateState: this.updateState })
          this.buildEditItem(this.editedItem)
        }
        this.$emit('save', this.editedItem)
        if (this.$refs.anexos) {
          await this.$refs.anexos.onAddFile(this.editedItem.id)
        }
        this.close()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dense {
  padding-bottom: 0;
}

.loading-wrap {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  z-index: 100000;
  height: 100%;
}
</style>
