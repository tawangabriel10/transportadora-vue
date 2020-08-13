<template>
  <div>
    <v-col>
      <v-card flat tile>
        <v-card-text>
          <v-form v-model="formMercadoria.valid">
          <v-col>
            <h3>Dados da Mercadoria</h3>
            <v-row>
              <v-col>
                <custom-input
                  :header="{ type: 'text', text: 'Unidade', value: 'unidade' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
              <v-col>
                <custom-input
                  :header="{ type: 'currency', text: 'Peso Bruto', value: 'pesoBrutoKg' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
              <v-col>
                <custom-input
                  :header="{ type: 'currency', text: 'Peso Líquido', value: 'pesoLiquidoKg' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
              <v-col>
                <custom-input
                  :header="{ type: 'currency', text: 'Cubagem', value: 'cubagem' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <custom-input
                  :header="{ type: 'text', text: 'Nº Nota Fiscal', value: 'nNotaFiscal' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
              <v-col>
                <custom-input
                  :header="{ type: 'date', text: 'Data de Emissão', value: 'dataEmissao' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
              <v-col>
                <custom-input
                  :header="{ type: 'currency', text: 'Valor da Nota Fiscal', value: 'valorNotaFiscal' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <custom-input
                  :header="{ type: 'text', text: 'Espécie do Volume ou Mercadoria', value: 'especieVolumeCategoria' }"
                  :edited-item="formMercadoria"
                  />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <custom-input
                  :header="{ type: 'textarea', text: 'Observações', value: 'observacoes' }"
                  :edited-item="formMercadoria"
                />
              </v-col>
            </v-row>
          </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="onSave">Gravar</v-btn>
          <v-btn color="blue" @click="onClear">Limpar</v-btn>
        </v-card-actions>
      </v-card>

      <v-row>
        <div v-if="form.length > 0">
          <v-simple-table dense class="list-mini-crud" style="padding: 20px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(header, i) in headers"
                    :key="`grid-select-item-header-${i}`"
                  >{{header.text}}</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in form">
                  <td
                    v-for="(header, i) in headers"
                    :key="`grid-select-item-row-${i}`"
                  >{{ item[header.value] }}</td>
                  <td>
                    <div style="display: flex">
                      <v-icon class="mdi mdi-pencil" @click="onEditItem(item)" title="Editar" />
                      <v-icon
                        class="mdi mdi-delete"
                        @click="onDeleteItem(item, index)"
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
    </v-col>
  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import CustomInput from "@/components/CustomInput";
import { mapActions } from 'vuex'

export default {
  components: { CustomInput },
  props: {
    form: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formMercadoria: {},
      headers: [
        {
          text: "ID",
          value: "id",
          options: { disabled: true },
          hideOnAdd: true,
        },
        { text: "Unidade", value: "unidade" },
        { text: "Espécie", value: "especie" },
        { text: "Produto Transportado", value: "produtoTransportado" },
        { text: "Nº Nota Fiscal", value: "nNotaFiscal" },
        { text: "Data", value: "dataEmissao" },
        { text: "Ações", value: "action", sortable: false },
      ],
    };
  },
  methods: {
    onSave() {
      if (!this.formMercadoria.valid) {
        return;
      }
      this.form.push({
        ...this.formMercadoria,
      });
      this.onClear();
    },
    onClear() {
      this.formMercadoria = {};
    },
    onEditItem(item) {
      this.formMercadoria = {
        ...item,
      };
    },
    onDeleteItem(item, index) {}
  },
};
</script>