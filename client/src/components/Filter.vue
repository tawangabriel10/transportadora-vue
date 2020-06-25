<template>
  <div>
    <v-card v-if="!loading">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="dense" :key="i" v-for="(header, i) in headersComp" cols="12" sm="6" md="4">
              <v-autocomplete
                outlined
                dense
                clearable
                v-if="header.type !== 'date'"
                v-model="filterValues[header.value]"
                :item-text="getFieldNameForSelect(header)"
                :item-value="getFieldValueForSelect(header)"
                :items="getFilterValues(header)"
                :label="header.text"
                ></v-autocomplete>

              <v-menu
                v-else-if="header.type === 'date'"
                v-model="header.$isMonthPickerActive"
                :close-on-content-click="true"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <div class="type-date" :style="filterValues[header.value] ? 'padding: 18px 10px 0px 10px' : ''" v-on="on">
                    <div :class="filterValues[header.value] ? 'type-date-placeholder-valued' : ''">{{header.text}}</div>
                    <div class="type-date-clear-button" v-if="filterValues[header.value]">
                      <v-btn icon @click="clearDate(header, $event)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <div :class="filterValues[header.value] ? 'type-date-value' : ''" v-if="filterValues[header.value]">
                      <div >{{filterValues[header.value]}}</div>
                      <v-icon style="color: #aeaeae; font-size: 70%; margin-left: 10px;">mdi-calendar</v-icon>
                    </div>
                  </div>
                </template>
                <v-date-picker @input="onChangeDate(header, $event)" type="month"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="dark" @click="setFilter" dark>Filtrar</v-btn>
      </v-card-actions>
    </v-card>
    <div v-else>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import lodash from 'lodash'
import moment from 'moment'

export default {
  props: {
    entity: {
      type: String,
      required: true
    },
    lookupValues: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: true,
      distinctValues: {},
      filterValues: lodash.get(this.$store, `state.Crud.filter[${this.entity}]`, {})
    }
  },
  computed: {
    headersComp () {
      return this.headers
        .filter(v => !['id', 'action'].includes(v.value) && !v.hideOnFilter)
        .map((header) => ({
          ...header,
          $isMonthPickerActive: false
        }))
    }
  },
  async mounted () {
    for (const header of this.headers) {
      if (header.value !== 'action' && !header.lookup && !header.lookupForFilter && !header.items && header.type !== 'virtual') {
        let fields = await this.find({
          entity: this.entity,
          updateState: false,
          params: {
            distinctFields: [header.value]
          }
        })
        this.distinctValues[header.value] = fields.map(v => {
          let label = v[header.value]
          if (header.type === 'currency') {
            label = new Intl.NumberFormat('pt-BR', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(v[header.value])
          }

          return {
            id: v[header.value],
            nome: label
          }
        })
      }
    }
    this.loading = false
  },
  methods: {
    ...mapActions('Crud', ['find']),
    getFieldValueForSelect (header) {
      return header.lookupForFilter ? header.lookupForFilter.split('#')[1] : 'id'
    },
    getFieldNameForSelect (header) {
      return header.lookupForFilter ? header.lookupForFilter.split('#')[1] : 'nome'
    },
    getFilterValues (header) {
      const lookupKey = header.lookupName || header.lookup || header.lookupForFilter || header.value
      // console.log(lookupKey)
      // console.log(this.lookupValues)
      if (this.lookupValues[lookupKey] || header.items) {
        return this.lookupValues[lookupKey] || header.items
      } else {
        return this.distinctValues[header.value]
      }
    },
    setFilter () {
      const filter = {}
      const mapHeadersByValue = {}

      for (const header of this.headers) {
        mapHeadersByValue[header.value] = header
        if (header && header.type === 'virtual' && header.filterHandler) {
          header.filterHandler(filter, this.filterValues)
        }
      }

      for (const key in this.filterValues) {
        const header = mapHeadersByValue[key]

        if (header && header.type !== 'virtual' && this.filterValues.hasOwnProperty(key) && this.filterValues[key] !== void 0) {
          if (header && header.type === 'date' && this.filterValues[key]) {
            const startDate = moment(this.filterValues[key], 'MM/YYYY').set('date', 1).format('YYYY-MM-DD')
            const endDate = moment(this.filterValues[key], 'MM/YYYY').set('date', 31).format('YYYY-MM-DD')
            filter[key] = {
              $between: [ startDate, endDate ]
            }
          } else {
            filter[key] = this.filterValues[key]
          }
        }
      }

      this.$emit('set-filter', filter)
    },
    onChangeDate (header, value) {
      this.filterValues[header.value] = value ? moment(value, 'YYYY-MM').format('MM/YYYY') : null
    },
    clearDate (header, event) {
      event.stopPropagation()
      this.filterValues = {
        ...this.filterValues,
        [header.value]: void 0
      }
      header.$isMonthPickerActive = false
    }
  }
}
</script>

<style lang="scss">
.row > .dense {
  padding: 5px;

  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
  }

  .type-date{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: auto;
    align-self: center;
    position: relative;

    > .type-date-clear-button{
      position: absolute;
      top: 0;
      right: 0;
    }

    > .type-date-placeholder-valued{
      position: absolute;
      top: 0;
      font-size: 11px;
      cursor: pointer;
    }

    > .type-date-value{
      display: flex;
      flex-direction: row;
    }
  }

}
</style>
