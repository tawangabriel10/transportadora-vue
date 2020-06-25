<template>
  <div>
    <v-card>
      <v-card-text>
        <h3 class="card-title">{{ title }}
          <v-btn style="margin-left: 30px;" @click="addItem" small color="primary">Adicionar +</v-btn>
        </h3>

        <div class="clearfix"></div>

        <v-simple-table dense class="list-mini-crud" style="padding: 20px">
          <template v-slot:default>
            <thead>
            <tr>
              <th>Ações</th>
              <th v-for="(header, i) in headers" :key="`grid-select-item-header-${i}`">{{header.text}}</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="i" v-for="(item, i) in data">
              <td>
                <div style="display: flex">
                  <v-icon
                    class="mdi mdi-check"
                    @click="selectRow(item, $event)"
                    title="Selecionar"
                  />
                  <v-icon
                    class="mdi mdi-pencil"
                    @click="editItem(data.find(row => row.id === item.id))"
                    title="Editar"
                  />
                  <v-icon
                    class="mdi mdi-delete"
                    @click="deleteItem(data.find(row => row.id === item.id))"
                    title="Excluir"
                  />
                </div>
              </td>
              <td v-for="(header, i) in headers" :key="`grid-select-item-row-${i}`">
                {{ item[header.value] }}
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <crud-base ref="crudBase"
               :entity="entity"
               :headers="headers"
               :title="title"
               :showCancelButton="true"
               :pre-save="preSave"
               @save="$emit('save', $event)"
    ></crud-base>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

// miolo da modal de seleção em que aparece o grid com o botão de adicionar, editar e remover
export default {
  name: 'grid-select-item-crud',
  props: {
    entity: {
      type: String,
      required: true
    },
    preSave: {
      type: Function,
      required: false
    },
    headers: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    where: {
      type: Object,
      required: false,
      defaultValue: () => ({})
    }
  },
  watch: {
    headers: {
      immediate: true,
      async handler () {
        await this.find({
          entity: this.entity,
          params: {
            size: -1,
            ...(this.where || {})
          }
        })
      }
    }
  },
  computed: {
    ...mapState('Crud', {
      data (state) {
        return state.data[this.entity] || []
      }
    })
  },
  methods: {
    ...mapActions('Crud', ['find']),
    selectRow (item) {
      this.$emit('select-row', item)
    },
    editItem (item) {
      // this.$emit('edit', item.id)
      this.$refs.crudBase.edit(item)
    },
    addItem () {
      this.$refs.crudBase.activate()
    },
    deleteItem (item) {
      this.$refs.crudBase.delete(item)
      // this.$emit('remove', item.id)
    }
  }
}
</script>

<style lang="scss">
  .list-mini-crud {
    border-collapse: collapse;
    border-color: #cdcdcd;

    td {
      padding: 2px 10px;
    }
  }
</style>
