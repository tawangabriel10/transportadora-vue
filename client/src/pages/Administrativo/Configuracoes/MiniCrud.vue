<template>
  <div>
    <v-card>
      <v-card-text>
        <h3 class="card-title">{{ title }} <v-btn style="margin-left: 30px;" @click="addItem" small color="primary">Adicionar +</v-btn></h3>

        <div class="clearfix"></div>

        <v-simple-table dense :height="250" class="list-mini-crud">
          <template v-slot:default>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="i" v-for="(item, i) in data">
                <td href="#">
                  {{ item.id }}
                </td>
                <td href="#">
                  {{ item.nome }}
                </td>
                <td>
                  <v-icon
                    small
                    class="mdi mdi-pencil"
                    @click="editItem(data.find(row => row.id === item.id))"
                    title="Editar"
                    >
                  </v-icon>
                  <v-icon
                    small
                    title="Excluír"
                    class="mdi mdi-delete"
                    @click="deleteItem(data.find(row => row.id === item.id))"
                    >
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <crud-base ref="crudBase" :entity="entity" :headers="headers" :title="title"></crud-base>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CrudBase from '@/components/CrudBase'

export default {
  name: 'mini-crud',
  props: {
    entity: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  components: {
    CrudBase
  },
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id', options: { disabled: true }, hideOnAdd: true },
        { text: 'Nome', value: 'nome', rules: ['required'] }
      ]
    }
  },
  computed: {
    ...mapState('Crud', {
      data (state) {
        return state.data[this.entity] || []
      }
    })
  },
  async mounted () {
    await this.find({
      entity: this.entity,
      params: {
        size: -1
      }
    })
  },
  methods: {
    ...mapActions('Crud', ['find']),
    editItem (item) {
      this.$refs.crudBase.edit(item)
    },
    addItem () {
      this.$refs.crudBase.activate()
    },
    deleteItem (item) {
      this.$refs.crudBase.delete(item)
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
