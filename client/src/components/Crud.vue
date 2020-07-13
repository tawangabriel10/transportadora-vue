<template>

  <div class="crud-component">
    <crud-filter ref="filter"
                 v-if="showFilter"
                 @set-filter="filterData"
                 :entity="entity"
                 :headers="headersComp"
                 :lookup-values="lookupValues"></crud-filter>

      <kpi :entity="entity" :sum-field="kpiSumField" :show-result-filter="true" v-if="showKpis">
        <slot name="kpis" style="padding: 1px"></slot>
      </kpi>

    <slot name="middle-area"></slot>

    <crud-base ref="crudBase"
               @loaded="_onLoadedCrudBase"
               @editItem="$emit('editItem', $event)"
               @edit-attribute-item="$emit('edit-attribute-item', $event)"
               @save="$emit('save', $event)"
               show-add-button :show-cancel-button="!inline"
               :dense="inline"
               :entity="entity"
               :pre-save="preSave"
               :show-title="showTitle"
               :is-dialog="!inline"
               :on-click-adicionar="onClickAdicionar"
               :headers="headers"
               :anexosConfig="anexosConfig"
               :title="title"
               :style="{ marginTop: inline ? 0 : '20px' }">
      <template #form-bottom="item">
        <slot v-bind="item" name="form-bottom"></slot>
      </template>
    </crud-base>

    <v-data-table
      v-show="showGrid && (!inline || inline && dataParsed.length > 0)"
      :dense="true"
      :sort-by="sortBy"
      :headers="headersComp"
      :items="dataParsed"
      class="elevation-1"
      :server-items-length="totalItems"
      :items-per-page="pagination.totalItemPerPage"
      :page="pagination.page"
      @pagination="onPagination"
    >
      <template #top></template>
      <template #item.action="{ item }">
        <div class="row-actions">
            <slot v-bind:item="item" name="custom-actions"></slot>

            <v-icon
              class="mdi mdi-pencil"
              @click="editItem(data.find(row => row.id === item.id))"
              title="Editar"
            >
            </v-icon>

            <v-icon
              title="Excluír"
              class="mdi mdi-delete"
              @click="deleteItem(data.find(row => row.id === item.id))"
            >
            </v-icon>
          </div>
      </template>
    </v-data-table>
  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Kpi from '@/components/Kpi'
import CrudFilter from '@/components/Filter'
import CrudBase from '@/components/CrudBase'
import lodash from 'lodash'

export default {
  components: {
    Kpi,
    CrudFilter,
    CrudBase
  },
  props: {
    showGrid: {
      type: Boolean,
      default: () => true
    },
    inline: {
      type: Boolean,
      default: () => false
    },
    entity: {
      type: String,
      required: true
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: () => true
    },
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      default: () => []
    },
    sortBy: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Object,
      default: () => undefined
    },
    showKpis: {
      type: Boolean,
      default: () => true
    },
    showFilter: {
      type: Boolean,
      default: () => true
    },
    openModalOnStart: {
      type: Boolean,
      default: () => false
    },
    preSave: {
      type: Function,
      required: false
    },
    onClickAdicionar: {
      type: Function,
      required: false
    },
    onClickEditRow: {
      type: Function,
      required: false
    },
    onClickDeleteRow: {
      type: Function,
      required: false
    },
    kpiSumField: {
      type: Object,
      default: () => null
    },
    outFields: {
      type: Array,
      default: () => undefined
    },
    anexosConfig: {
      type: Object,
      required: false,
      default: () => undefined
    }
  },
  data () {
    return {
      totalItems: 0,
      lookupValues: {},
      currentHeaders: [],
      pagination: {
        totalItemPerPage: 10,
        page: 1
      }
    }
  },
  async mounted () {
    if (this.openModalOnStart) {
      this.$refs.crudBase.activate()
    }
    if (typeof this.filter !== 'undefined') {
      await this.filterData(this.filter)
    } else {
      this.totalItems = await this.find({
        entity: this.entity,
        updateState: false,
        params: {
          size: -1,
          where: this.entityFilter,
          returnCountOnly: true
        }
      })
      await this.filterData()
    }
  },
  computed: {
    ...mapState('Crud', {
      data (state) {
        return state.data[this.entity] || []
      },
      entityFilter (state) {
        return state.filter[this.entity] || {}
      },
      headersComp () {
        return this.currentHeaders.filter(({ hide }) => !hide)
      }
    }),
    dataParsed () {
      const parsed = []
      for (const row of this.data) {
        if (row.hide) {
          continue
        }
        const rowParsed = lodash.cloneDeep(row)
        const handlersPosLoop = []
        this.currentHeaders.forEach((header, index) => {
          header.class = `crud-header header-${index}`
          if (header.lookup && this.lookupValues[header.lookupName]) {
            const distinctValue = this.lookupValues[header.lookupName].find(lv => String(lv.id) === String(row[header.value]))
            row['$' + header.value] = distinctValue
            rowParsed['$' + header.value] = distinctValue
            rowParsed[header.value] = distinctValue ? distinctValue.nome : null
          } else if (header.items && header.items.length && typeof header.items[0] === 'object') {
            const distinctValue = header.items.find(lv => String(lv.id) === String(row[header.value]))
            row['$' + header.value] = distinctValue
            rowParsed['$' + header.value] = distinctValue
            rowParsed[header.value] = distinctValue ? distinctValue.nome : null
          } else if (header.type === 'currency') {
            rowParsed[header.value] = new Intl.NumberFormat('pt-BR', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            }).format(row[header.value])
          }
          if (header.handlerRow) {
            handlersPosLoop.push(header)
          }
        })
        for (const header of handlersPosLoop) {
          header.handlerRow(rowParsed, header, row)
        }
        parsed.push(rowParsed)
      }

      if (this.totalItems === 0) {
        this.setTotalItems(parsed.length)
      }

      return parsed
    }
  },

  methods: {
    ...mapActions('Crud', ['find']),
    ...mapMutations('Crud', ['setFilter']),
    _onLoadedCrudBase () {
      this.currentHeaders = this.$refs.crudBase.currentHeaders
      this.lookupValues = this.$refs.crudBase.lookupValues
    },
    setTotalItems (total) {
      this.totalItems = total
    },
    async filterData (filter = []) {
      this.setFilter({ entity: this.entity, filter })
      this.pagination = {
        ...this.pagination,
        page: 1
      }
      await this.find({
        entity: this.entity,
        params: {
          where: filter,
          page: 1,
          size: this.pagination.itemsPerPage,
          outFields: this.outFields
        }
      })
      this.totalItems = await this.find({
        entity: this.entity,
        updateState: false,
        params: {
          size: -1,
          where: filter,
          returnCountOnly: true
        }
      })
      this.$emit('set-filter', filter)
    },
    async onPagination (pagination) {
      if (this.pagination.totalItemPerPage !== pagination.itemsPerPage || this.pagination.page !== pagination.page) {
        this.pagination = pagination
        await this.find({
          entity: this.entity,
          params: {
            where: this.entityFilter,
            size: pagination.itemsPerPage,
            page: pagination.page,
            outFields: this.outFields
          }
        })
      }
    },
    editItem (item) {
      this.$emit('click-edit', item)

      if (this.$props.onClickEditRow) {
        this.$props.onClickEditRow(item)
      } else {
        this.$refs.crudBase.edit(item)
      }
    },

    async deleteItem (item) {
      if (this.$props.onClickDeleteRow) {
        this.$props.onClickDeleteRow(item)
      } else {
        this.$refs.crudBase.delete(item)
      }
    }

  }
}
</script>

<style lang="scss">
.crud-component {
  width: 100%;
  height: 100%;
  background: #fafafa;

  .crud-header{
    min-width: 100px;
    width: auto;
    white-space: nowrap;
    word-break: keep-all;
    text-align: center;
  }
  td.text-start {
    white-space: nowrap;
  }
  .row-actions {
    min-width: 80px;
    display: flex;
    > *{
      padding: 10px;
    }
    > i {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
