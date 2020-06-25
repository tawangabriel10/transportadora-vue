<template>
  <div>
    <v-autocomplete
      v-model="customValue"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      :dense="dense"
      clearable
      hide-no-data
      hide-selected
      :label="header.text"
      @update:search-input="onUpdateSearchInput"
      @change="onChange"
      @blur="onBlur"
      ></v-autocomplete>
  </div>
</template>

<script>
import { http } from '@/pluggables/http'
import config from '@/config'
import _ from 'lodash'

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
    entity: {
      type: String,
      required: true
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
      customValue: '',
      currentInput: null,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }
  },
  computed: {
    items () {
      const entries = this.entries.map(v => {
        return Object.values(v)[0]
      }).filter(e => {
        return e !== null
      })

      if (!_.isEmpty(this.currentInput) && !entries.find(v => v.toUpperCase() === this.currentInput.toUpperCase())) {
        entries.unshift(this.currentInput)
      }

      return entries
    },
  },
  watch: {
    async search () {
      await this.startSearch()
    },
    editedItem (val) {
      if (this.customValue !== this.editedItem[this.header.value]) {
        this.customValue = this.editedItem[this.header.value]
        this.startSearch()
      }
    }
  },
  methods: {
    onUpdateSearchInput (input) {
      this.currentInput = !_.isEmpty(input) ? input : null
    },
    onChange () {
      this.$emit('change', this.customValue)
    },
    onBlur () {
      if (!_.isEmpty(this.currentInput)) {
        this.$emit('change', this.currentInput)
        this.customValue = this.currentInput
        this.editedItem[this.header.value] = this.currentInput
      }
    },
    async startSearch () {
      if (this.items.length > 0) return
      if (this.isLoading) return
      this.isLoading = true

      let { data: d } = await http.get(`${baseUrl}/${this.entity}`, {
        params: {
          distinctFields: [this.header.value],
          size: -1
        }
      })

      this.entries = d
      this.isLoading = false
    }
  },
  mounted () {
    this.customValue = this.editedItem[this.header.value]
    this.startSearch()
  }
}
</script>
