<template>
  <v-card>
    <v-card-title v-if="!!title">{{title}}</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="formValid"
        :lazy-validation="true"
      >
        <v-container v-if="formReady">
          <v-row>
            <v-col :key="i" v-for="(header, i) in currentFormHeaders" cols="12" sm="6" md="4">
              <custom-input
                v-if="supportedFieldTypes.includes(header.type)"
                :rules="parseRules(header.rules, header.text)"
                :header="header"
                :edited-item="editedItem"></custom-input>
              <v-autocomplete
                clearable
                v-else-if="lookupValues[header.lookup] || header.items"
                v-model="editedItem[header.value]"
                :item-text="'nome'"
                :item-value="'id'"
                :items="lookupValues[header.lookup] || header.items"
                :rules="parseRules(header.rules, header.text)"
                :label="header.text"
                @change="header.change ? header.change($event) : null"
                v-bind="header.options || {}"></v-autocomplete>
              <v-text-field
                v-else
                v-model="editedItem[header.value]"
                :label="header.text"
                :rules="parseRules(header.rules, header.text)"
                v-mask="header.mask || noMask"
                v-bind="header.options || {}"
                @change="header.change ? header.change($event) : null"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <slot name="form-bottom"></slot>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="close">Cancelar</v-btn>
      <v-btn color="primary" dark @click="save">Salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { http } from '@/pluggables/http'
import { mapActions, mapState } from 'vuex'
import config from '@/config'
import CustomInput from './CustomInput'

const baseUrl = config.baseUrl

export default {
  components: {
    CustomInput
  },
  props: {
    entity: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    headers: {
      type: Array,
      default: () => []
    },
    values: {
      type: Object,
      default: () => {}
    },
    showAddButton: {
      type: Boolean,
      default: () => false
    },
    updateState: {
      type: Boolean,
      default: () => true
    },
    preSave: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      formValid: true,
      editedIndex: -1,
      editedItem: this.values,
      defaultItem: {},
      lookupValues: {},
      formReady: false,
      currentHeaders: [],
      supportedFieldTypes: ['date', 'color', 'time', 'currency'],
      noMask: {
        mask: '*'.repeat(255),
        tokens: {
          '*': { pattern: /./ }
        }
      }
    }
  },
  watch: {
    values (values = {}) {
      if (values) {
        this.editedItem = { ...this.editedItem, values }
      }
    }
  },
  computed: {
    ...mapState('Crud', {
      data (state) {
        return state.data[this.entity] || []
      }
    }),
    currentFormHeaders () {
      return this.currentHeaders.filter(v => {
        return v.value !== 'action' && !(this.editedIndex === -1 && v.hideOnAdd) && !(this.editedIndex !== -1 && v.hideOnEdit)
      })
    }
  },
  async mounted () {
    try {
      await this.buildHeaders()
      this.formReady = true
    } catch (e) {
      console.error(e)
    } finally {
      this.setLoadingStatus(false)
      this.$emit('loaded')
    }
  },
  methods: {
    ...mapActions('Crud', ['find', 'insertRow', 'removeRow', 'updateRow', 'setLoadingStatus']),
    async buildHeaders () {
      const headers = []
      for (const header of this.headers) {
        this.setLoadingStatus(true)
        if (header.lookup) {
          let data = []
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
            data = await header.lookup()
          } else {
            data = []
          }

          this.lookupValues[header.lookup] = data
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
        } else if (!['id', 'action'].includes(header.value) && !header.hideOnFilter) {
          // let { data: d } = await http.get(`${baseUrl}/${this.entity}`, {
          //   params: {
          //     distinctFields: [header.value],
          //     size: -1
          //   }
          // })
          // this.lookupValues[`${this.entity}#${header.value}`] = d
        }
        this.setLoadingStatus(false)

        headers.push(header)
        // this.editedItem[header.value] = null
      }
      this.currentHeaders = headers

      for (const header of headers) {
        if (header.immediateChange && header.change && this.editedItem[header.value]) {
          await header.change(this.editedItem[header.value])
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

    parseRules (rules, field) {
      let parsedRules = []
      if (rules && rules.length) {
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
      this.editedItem = Object.assign({}, item)
    },

    async delete (item) {
      if (confirm('Tem certeza que deseja remover?')) {
        await this.removeRow({ entity: this.entity, key: item.id })
      }
    },

    close () {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
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
        }
        this.$emit('save', this.editedItem)
        this.close()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
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
