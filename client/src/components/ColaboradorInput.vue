<template>
  <div>
    <v-autocomplete
      v-model="editedItem[header.value]"
      :items="items"
      :loading="isLoading"
      :dense="dense"
      clearable
      item-value="id"
      item-text="nome"
      hide-no-data
      :label="header.text"
      :rules="rules"
      v-bind="header.options || {}"
      @change="onChange"
      ></v-autocomplete>
  </div>
</template>

<script>
import { http } from '@/pluggables/http'
import config from '@/config'

const baseUrl = config.baseUrl

export default {
  props: {
    rules: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    dense: {
      type: Boolean,
      default: () => false
    },
    header: {
      type: Object,
      required: true
    },
    editedItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      entries: [],
      isLoading: false,
      model: null,
      search: null
    }
  },
  computed: {
    items () {
      const entries = this.entries.map(v => {
        return {
          id: v.id,
          nome: v.dadosPessoais.nome
        }
      })

      return entries
    }
  },
  methods: {
    onChange () {
      this.$emit('change', this.editedItem[this.header.value])
    }
  },
  async mounted () {
    this.isLoading = true
    let { data: d } = await http.get(`${baseUrl}/colaboradores`, {
      params: {
        outFields: ['id', '$dadosPessoais'],
        size: -1
      }
    })

    this.entries = d
    this.isLoading = false
  }
}
</script>
