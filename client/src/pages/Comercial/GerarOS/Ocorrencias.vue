<template>
  <div>
    <v-col>
      <h3>Ocorrências</h3>

      <div class="clearfix"></div>

      <v-row>
        <div>
        <v-simple-table dense class="list-mini-crud" style="padding: 20px">
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  v-for="(header, i) in headers"
                  :key="`grid-select-item-header-${i}`"
                >{{header.text}}</th>
              </tr>
              <th>Arquivo</th>
            </thead>
            <tbody>
              <tr :key="i" v-for="(item, i) in data">
                <td
                  v-for="(header, i) in headers"
                  :key="`grid-select-item-row-${i}`"
                >{{ item[header.value] }}</td>
                <td>
                  <div style="display: flex">
                    <v-icon
                      class="mdi cloud-download"
                      @click="downloadItem(item, $event)"
                      title="Selecionar"
                    />
                    <v-icon
                      class="mdi delete-restore"
                      @click="deleteItem(item, $event)"
                      title="Editar"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        </div>
      </v-row>

      <v-row>
        <v-col>
          <h3>Incluir Ocorrência</h3>
          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'textarea', text: 'Descrição da Ocorrência', value: 'observacoes' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Incluir Arquivo</h3>
          <input type="file" @change="processFile($event)" />
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Data', value: '' },
                { text: 'Tipo', value: '' },
                { text: 'Descrição', value: '' },
                { text: 'Usuário', value: '' },
            ],
            data: [],
            form: {}
        }
    },
    methods: {
        downloadItem(item, event) {

        },
        deleteItem(item, event) {

        },
        processFile(event) {

        }
    }
};
</script>