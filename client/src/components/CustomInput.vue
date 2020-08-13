<template>
  <div>
    <div :class="dense ? 'dense' : ''">
      <v-text-field type="number" v-if="header.type === 'number'"
                    v-model="customValue"
                    v-bind="header.options || {}"
                    :dense="dense"
                    :rules="parseRules(header.rules, header.text)"
                    :label="header.text"
                    @change="change()"
      ></v-text-field>
      <v-textarea
        v-else-if="header.type === 'textarea'"
        :rules="parseRules(header.rules, header.text)"
        v-model="editedItem[header.value]"
        :dense="dense"
        :label="header.text"
        v-bind="header.options || {}"
      >
      </v-textarea>
      <div v-else-if="header.type === 'radio'">
        <label class="radio-label">{{ header.text }}</label>
        <v-radio-group v-bind="header.options || {}" v-model="editedItem[header.value]"
                       :mandatory="header.rules && header.rules.includes('required')" :rules="parseRules(header.rules, header.text)" row
                       @change="change()">
          <v-radio :key="item.id" v-for="item in header.items" :label="item.nome || item"
                   :value="item.id || item"></v-radio>
        </v-radio-group>
      </div>
      <v-checkbox v-else-if="header.type === 'checkbox'" v-bind="header.options || {}" :label="header.text"
                  v-model="editedItem[header.value]" :rules="parseRules(header.rules, header.text)" @change="change()"></v-checkbox>
      <v-currency-field v-else-if="header.type === 'currency'"
                        v-model="editedItem[header.value]"
                        :label="header.text"
                        :rules="parseRules(header.rules, header.text)"
                        :dense="dense"
                        v-bind="header.options || {}"
      ></v-currency-field>
      <v-text-field
        :label="header.text"
        :value="editedItem[header.value]"
        v-else-if="header.type === 'grid-select-item-crud'"
        @click="showDialogGridSelect = true"
      >
        <v-icon slot="append" class="mdi mdi-search-web" />
      </v-text-field>
      <v-menu
        v-else
        v-model="isActive"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :rules="parseRules(header.rules, header.text)"
            v-mask="header.mask ? header.mask : noMask"
            v-model="editedItem[header.value]"
            :dense="dense"
            :label="header.text"
            v-bind="header.options || {}"
            v-on="on"
          >

            <v-icon v-if="header.type === 'color'" slot="append" :color="editedItem[header.value]">mdi-circle</v-icon>
            <v-icon color="#BFBFBF" v-else-if="header.type === 'time'" slot="append">mdi-clock-outline</v-icon>
            <v-icon color="#BFBFBF" v-else-if="header.type === 'date'" slot="append">mdi-calendar</v-icon>
          </v-text-field>
        </template>
        <v-date-picker v-if="header.type === 'date'"
                       v-model="customValue"
                       no-title
                       :rules="parseRules(header.rules, header.text)"
                       @input="parseDate"
                       v-bind="header.pickerOptions || {}"
        ></v-date-picker>
        <v-time-picker v-else-if="header.type === 'time'"
                       v-model="customValue"
                       format="24hr"
                       @input="parseTime"
                       v-bind="header.pickerOptions || {}"
        ></v-time-picker>
        <v-color-picker v-else-if="header.type === 'color'"
                        v-model="customValue"
                        @input="parseColor"
                        v-bind="header.pickerOptions || {}"
        ></v-color-picker>
      </v-menu>

      <v-dialog v-model="showDialogGridSelect" max-width="1000px" v-if="header.type === 'grid-select-item-crud'">
        <grid-select-item-crud :title="header.text"
                               :headers="header.headers"
                               :entity="header.entity"
                               :where="header.where || {}"
                               :pre-save="header.preSave"
                               @select-row="onEventGridSelectItem('select-row', $event)"
                               @save="onEventGridSelectItem('save', $event)"
        />
      </v-dialog>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import GridSelectItemCrud from './GridSelectItemCrud'

export default {
  name: 'custom-input',
  components: {
    'grid-select-item-crud': GridSelectItemCrud
  },
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
      required: false
    },
    editedItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      customValue: '',
      isActive: false,
      showDialogGridSelect: false,
      noMask: {
        mask: '*'.repeat(255),
        tokens: {
          '*': { pattern: /./ }
        }
      }
    }
  },
  watch: {
    isActive (active) {
      if (active) {
        if (this.header.type === 'color') {
          this.customValue = this.editedItem[this.header.value] ? this.editedItem[this.header.value] : '#F5F5F5'
        } else if (this.header.type === 'date') {
          let val
          if (typeof this.editedItem[this.header.value] === 'string') {
            val = this.editedItem[this.header.value] ? moment(this.editedItem[this.header.value], 'DD/MM/YYYY').format('YYYY-MM-DD') : ''
          } else {
            val = this.editedItem[this.header.value] ? moment(this.editedItem[this.header.value]).format('YYYY-MM-DD') : ''
          }
          this.customValue = val
        } else {
          this.customValue = this.editedItem[this.header.value]
        }
      }
    }
  },
  methods: {
    onEventGridSelectItem (event, item) {
      const setOfEvents = {
        'select-row': () => {
          if (this.header.onSelectRow) {
            this.header.onSelectRow(item)
          }
          this.editedItem[this.header.value] = item.id
          this.$forceUpdate()
          this.showDialogGridSelect = false
        },
        'save': () => {
          if (this.header.onSave) {
            this.header.onSave(item)
          }
          this.editedItem[this.header.value] = item.id
          this.$forceUpdate()
          this.showDialogGridSelect = false
        }
      }
      return setOfEvents[event] ? setOfEvents[event]() : null
    },
    parseDate (date) {
      this.editedItem[this.header.value] = date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      this.isActive = false
      this.change()
    },
    parseTime (time) {
      this.editedItem[this.header.value] = time
      this.change()
    },
    parseColor (color) {
      this.editedItem[this.header.value] = color
      this.change()
    },
    change () {
      this.$emit('change', this.editedItem[this.header.value])
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
    }
  }
}
</script>

<style>
  .radio-label {
    font-weight: bold;
  }

  .dense .v-input--checkbox {
    margin-top: 5px;
  }
</style>
