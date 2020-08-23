<template>
  <div>
    <v-col>
      <h3>Ocorrências</h3>

      <div class="clearfix"></div>

      <v-row>
        <div v-if="form.length > 0">
          <v-simple-table dense class="list-mini-crud" style="padding: 20px; width: 100%;">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(header, i) in headers"
                    :key="`grid-select-item-header-${i}`"
                  >{{header.text}}</th>
                  <th>Arquivo</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="i" v-for="(item, i) in form">
                  <td>{{ item.dataHoraFormat }}</td>
                  <td>{{ item.tipo }}</td>
                  <td>{{ item.descricao }}</td>
                  <td>{{ item.usuario.nomeUsuario }}</td>
                  <td>
                    <div style="display: flex" v-if="item.arquivo">
                      <v-icon
                        class="mdi mdi-cloud-download"
                        @click="downloadItem(item)"
                        title="Download"
                      />
                      <v-icon
                        class="mdi mdi-delete-restore"
                        @click="deleteItem(i, $event)"
                        title="Excluir"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-row>

      <v-card flat tile>
        <v-card-text>
          <v-form v-model="formOcorrencia.valid">
            <v-col>
              <h3>Incluir Ocorrência</h3>
              <v-row>
                <v-col>
                  <custom-input
                    :header="{ type: 'textarea', text: 'Descrição da Ocorrência', value: 'descricao', rules: ['required'] }"
                    :edited-item="formOcorrencia"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-file-input show-size label="Incluir Arquivo" v-model="formOcorrencia.arquivo"></v-file-input>
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="onClear">Limpar</v-btn>
          <v-btn color="blue" @click="onSave">Incluir Ocorrência</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import CustomInput from "@/components/CustomInput"
import loginStore from '@/store/login'
import { format } from 'date-fns'

export default {
  components: { CustomInput },
  props: {
    form: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { text: "Data", value: "dataHoraCriacao" },
        { text: "Tipo", value: "tipo" },
        { text: "Descrição", value: "descricao" },
        { text: "Usuário", value: "usuario.nomeUsuario" }
      ],
      formOcorrencia: {},
      user: loginStore.state.user.usuario
    };
  },
  methods: {
    downloadItem(item) {},
    deleteindex(index, event) {},
    onClear() {
      this.formOcorrencia = {}
    },
    onSave() {
      if (!this.formOcorrencia.valid) {
        return;
      }
      this.form.push({
        ...this.formOcorrencia,
        dataHoraFormat: this.formatDate(new Date()),
        dataHoraCriacao: new Date(),
        usuario: this.user,
        tipo: 'Manual'
      })
      this.onClear()
    },
    formatDate(datetime) {
      if (datetime) {
        return format(datetime, 'dd/MM/yyyy HH:mm')
      }
    }
  }
};
</script>