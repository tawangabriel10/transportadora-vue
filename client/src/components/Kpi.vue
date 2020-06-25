<template>
  <div>
    <v-row style="justify-content: center">
      <v-col cols="3">
        <div class="kpi">
          <div class="kpi-title">{{ title }}</div>
          <div class="value">{{countTotal}}</div>
          <div  v-if="hasFilter" class="value">
            <div>
              <div style="font-size: 12px">Filtrado</div>
              {{countFiltered}}
            </div>
            <div class="value-percentual">
              <div>Percentual</div>
              <div>{{percentual}} %</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="3" v-if="sumField">
        <div class="kpi">
          <div class="kpi-title">{{ sumField.title ? sumField.title : 'Valor Total' }}</div>
          <div class="value">
            {{ sumField.format ? sumField.format(totalSumField) : totalSumField }}
          </div>
          <div class="value" v-if="sumField && hasFilter">
            <div>
              <div>Filtrado</div>
              {{ sumField.format ? sumField.format(totalSumFieldFiltered) : totalSumFieldFiltered }}
            </div>
            <div class="value-percentual">
              <div>Percentual</div>
              <div>{{percentualValor}} %</div>
            </div>
          </div>
        </div>
      </v-col>
      <slot></slot>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import lodash from 'lodash'

export default {
  name: 'kpi',
  props: {
    entity: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Total de Registros'
    },
    showResultFilter: {
      type: Boolean,
      default: true
    },
    sumField: {
      type: Object,
      required: false
    }
  },
  computed: {
    ...mapState('Crud', {
      entityFilter (state) {
        return state.filter[this.entity] || {}
      },
      entityData (state) {
        return state.data[this.entity] || {}
      }
    }),
    percentual () {
      return this.hasFilter && this.countTotal ? ((this.countFiltered / this.countTotal) * 100).toFixed(2) : 0
    },
    percentualValor () {
      return this.hasFilter && this.totalSumField ? ((this.totalSumFieldFiltered / this.totalSumField) * 100).toFixed(2) : 0
    },
    hasFilter () {
      return !!(this.showResultFilter && Object.keys(this.entityFilter).length && this.countTotal)
    }
  },
  watch: {
    entityData: {
      immediate: true,
      async handler () {
        this.countTotal = await this.find({
          entity: this.entity,
          updateState: false,
          params: {
            returnCountOnly: true
          }
        })
        await this.buildKpiFilter()
      }
    },
    entityFilter: {
      immediate: true,
      async handler () {
        await this.buildKpiFilter()
      }
    }
  },
  data: () => ({
    countTotal: 0,
    countFiltered: 0,
    totalSumField: 0,
    totalSumFieldFiltered: 0
  }),
  methods: {
    ...mapActions('Crud', ['find']),
    async buildKpiFilter () {
      if (this.hasFilter) {
        this.countFiltered = await this.find({
          entity: this.entity,
          updateState: false,
          params: {
            where: this.entityFilter,
            returnCountOnly: true
          }
        })
      }

      if (this.sumField && this.sumField.field) {
        const promises = []
        if (this.hasFilter) {
          promises.push(
            this.find({
              entity: this.entity,
              updateState: false,
              params: {
                where: this.entityFilter,
                outStatistics: JSON.stringify([
                  {
                    statisticType: 'sum',
                    onStatisticField: this.sumField.field,
                    outStatisticFieldName: '_kpiSumFiltered'
                  }
                ])
              }
            }).then((result) => {
              this.totalSumFieldFiltered = lodash.get(result, '[0]._kpiSumFiltered', 0)
            })
          )
        }

        promises.push(
          this.find({
            entity: this.entity,
            updateState: false,
            params: {
              where: {},
              outStatistics: JSON.stringify([
                {
                  statisticType: 'sum',
                  onStatisticField: this.sumField.field,
                  outStatisticFieldName: '_kpiSumTotal'
                }
              ])
            }
          }).then((result) => {
            this.totalSumField = lodash.get(result, '[0]._kpiSumTotal', 0)
          })
        )

        await Promise.all(promises)
      }
    }
  }
}
</script>

<style lang="scss">
  .kpi {
    position:relative;
    width: 100%;
    height: 100%;
    background: #fafafa;
    max-width: 320px;
    display: flex;
    flex-direction: column;

    > .kpi-title{
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      background: #eff7ff;
      border: 1px solid #ddd;
      border-bottom: 0;
      padding: 10px;
    }

    > .value{
      text-align: center;
      font-size: 13px;
      padding: 5px;
      background: #fff;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 65px;
      > div {
        width: 50%;
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > .value-percentual{
        display: flex;
        flex-direction: column;
        border-left: 1px solid #ddd;
      }
    }
  }
</style>
