<template>
  <div class="manter-os">
    <v-dialog v-model="showDialog" persistent max-width="1000px">
      <v-card flat tile>
        <v-card-title>
          <span class="headline">Gerar nova OS</span>
        </v-card-title>
        <v-card-text>
          <v-tabs>
            <v-tab class="disabledTab" href="#tab-dados-proposta">Dados Proposta</v-tab>

            <v-tab-item value="tab-dados-proposta">
              <v-form ref="form" v-model="form.valid">
                <v-col>
                  <v-row>
                    <v-col>
                      <custom-input
                        :header="{ type: 'text', text: 'Nº Proposta', value: 'numProposta' }"
                        :edited-item="form"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <custom-input
                        :header="{ type: 'text', text: 'Situacao', value: 'situacao' }"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <custom-input
                        :header="{ type: 'date', text: 'Validade da Proposta', value: 'validade' }"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <custom-input
                        :header="{ type: 'text', text: 'Pagamento', value: 'pagamento' }"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <custom-input
                        :header="{ type: 'text', text: 'Descrição do Servico', value: 'descricaoServico' }"
                        :edited-item="form"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <custom-input
                        title="Código do Cliente"
                        v-bind="customInputs.clienteProps"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        disabled
                        label="Nome / Razão Social"
                        :value="dynamicValues.cliente && dynamicValues.cliente.razaoSocial"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        disabled
                        label="E-mail do Cliente"
                        :value="dynamicValues.cliente && dynamicValues.cliente.contatoResponsavel"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <h3>Cálculo da Proposta</h3>
                      <v-row>
                        <v-col>
                          <custom-input
                            title="Código do Cliente"
                            v-bind="customInputs.clienteProps"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            disabled
                            label="Servidor / Serviço"
                            :value="dynamicValues.cliente && dynamicValues.cliente.razaoSocial"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'text', text: 'Origem', value: 'origem' }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'text', text: 'Destino', value: 'destino' }"
                            :edited-item="form"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <custom-input
                            :header="{ type: 'radio', text: 'Unidade de Medida', value: 'unidadeMedida', items: [{ id: 'KG', nome: 'KG' },{ id: 'M2', nome: 'M²' }], rules: [ 'required' ] }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'number', text: 'Valor Unidade de Medida', value: 'valorUnidadeMedida' }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'number', text: 'KM', value: 'km' }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'text', text: 'Índice', value: 'indice' }"
                            :edited-item="form"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <custom-input
                            :header="{ type: 'currency', text: 'Valor do Seguro', value: 'valorSeguro' }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'number', text: '% de seguro a cobrar', value: 'porcentagemSeguro' }"
                            :edited-item="form"
                          />
                        </v-col>
                        <v-col>
                          <custom-input
                            :header="{ type: 'number', text: 'Coeficiente', value: 'coeficiente' }"
                            :edited-item="form"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            disabled
                            label="Total"
                            :value="form.total"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="blue" @click="onSave">Gravar</v-btn>
          <v-btn color="blue" @click="onPrint">Imprimir</v-btn>
          <v-btn color="blue" @click="onSendEmail">Enviar e-mail</v-btn>
          <v-btn color="blue" @click="onClear">Limpar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<style scoped>
.disabledTab {
  pointer-events: none;
}
</style>

<script>
import { mapActions } from "vuex";
import CustomInput from "@/components/CustomInput";

export default {
  components: {
    CustomInput
  },
  props: {
    showDialog: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      form: {},
      dynamicValues: {
        cliente: null,
        clienteCalculo: null
      },
      customInputs: {
        clienteProps: {
          header: {
            type: "grid-select-item-crud",
            text: "Dados do Cliente",
            value: "cliente",
            entity: "clienteOuFornecedor",
            headers: [
              { text: "Nome / Razão Social", value: "razaoSocial", rules: [ "required" ] },
              { text: "Data de Nascimento", value: "dataNascimento", type: "date" },
              { text: "Nome do Responsável", value: "nomeResponsavel", rules: [ "required" ] },
              { text: "Contato do Responsável", value: "contatoResponsavel" },
              {
                text: "Endereço",
                value: "enderecoGeradoPeloCep",
                rules: [ "required" ],
              },
              { text: "Bairro", value: "enderecoBairro" },
              {
                text: "Cidade",
                value: "enderecoGeradoCidade",
                rules: [ "required" ],
              },
              { text: "UF", value: "enderecoGeradoUf" },
              { text: "Telefone", value: "telefone", mask: "(##) #####-####" },
            ],
            onSelectRow: async (item) => {
              await this.buildClientePessoaCustomInput(item.id);
            },
            onSave: async (item) => {
              await this.buildClientePessoaCustomInput(item.id);
            },
          },
        },
        clienteCalculoProps: {
          header: {
            type: "grid-select-item-crud",
            text: "Dados do Cliente",
            value: "clienteCalculo",
            entity: "clienteOuFornecedor",
            headers: [
              { text: "Nome / Razão Social", value: "razaoSocial", rules: [ "required" ] },
              { text: "Data de Nascimento", value: "dataNascimento", type: "date" },
              { text: "Nome do Responsável", value: "nomeResponsavel", rules: [ "required" ] },
              { text: "Contato do Responsável", value: "contatoResponsavel" },
              {
                text: "Endereço",
                value: "enderecoGeradoPeloCep",
                rules: [ "required" ],
              },
              { text: "Bairro", value: "enderecoBairro" },
              {
                text: "Cidade",
                value: "enderecoGeradoCidade",
                rules: [ "required" ],
              },
              { text: "UF", value: "enderecoGeradoUf" },
              { text: "Telefone", value: "telefone", mask: "(##) #####-####" },
            ],
            onSelectRow: async (item) => {
              await this.buildClientePessoaCustomInput(item.id, 'idClienteCalculo', 'Código do Cliente', 'clienteCalculo', 'clienteCalculoProps');
            },
            onSave: async (item) => {
              await this.buildClientePessoaCustomInput(item.id, 'idClienteCalculo', 'Código do Cliente', 'clienteCalculo', 'clienteCalculoProps');
            },
          },
        }
      }
    };
  },
  methods: {
    ...mapActions("Crud", ["find", "updateRow", "insertRow"]),
    buildClientePessoaCustomInput(
      id,
      key = "idCliente",
      labelInput = "Código do Cliente",
      dynamicAttribute = "cliente",
      customInputName = "clienteProps"
    ) {
      const getItemData = async (item) => {
        this.form[key] = item.id;
        const data = (
          await this.find({
            updateState: false,
            entity: "clienteOuFornecedor",
            params: {
              where: {
                id: item.id,
              },
            },
          })
        )[0];
        console.log("DADOS", data);
        if (data) {
          this.dynamicValues = {
            ...this.dynamicValues,
            [dynamicAttribute]: data,
          };
        }
      };
      this.customInputs[customInputName] = {
        header: {
          type: "grid-select-item-crud",
          text: labelInput,
          value: key,
          entity: "clienteOuFornecedor",
          where: {
            id,
          },
          headers: this.customInputs[customInputName].header.headers,
          preSave: (itemAdicionado) => {
            itemAdicionado.id = id;
          },
          onSelectRow: async (item) => {
            getItemData(item);
          },
          onSave: async (item) => {
            getItemData(item);
          },
        },
      };
    },
    async getCurrentProposta(id) {
      this.currentProposta =
        (
          await this.find({
            entity: "proposta",
            params: {
              where: {
                id
              }
            }
          })
        )[0] || {};
      console.log("CURRENT PROPOSTA", this.currentProposta);
      this.form = {
        ...this.form,
        ...this.currentProposta
      };
    },
    async onSave() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let entity = {
        ...this.form
      };
      console.log("ENTITY", entity);
      if (this.id) {
        await this.updateRow({
          updateState: false,
          entity: "proposta",
          key: this.id,
          values: entity
        });
        await this.getCurrentOs(this.id);
      } else {
        const os = await this.insertRow({
          updateState: false,
          entity: "proposta",
          values: entity
        });
        //  await this.$router.push({ path: `/comercial/ordem-de-servicos` });
        this.showDialog = false;
        this.getCurrentOs(os.id);
      }
    },
    onPrint() {

    },
    onSendEmail() {

    },
    onClear() {
      this.form = {}
    }
  }
};
</script>