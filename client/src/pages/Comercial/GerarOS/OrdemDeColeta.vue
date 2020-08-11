<template>
    <div>
      <v-col>
        <h3>Dados Gerais</h3>
          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'number', text: 'Nº Ordem de Serviço', value: 'numOrdemServico' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'date', text: 'Data de emissão', value: 'dataEmissao' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'time', text: 'Hora de emissão', value: 'horaEmissao' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'date', text: 'Previsão da coleta', value: 'dataColeta' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'date', text: 'Previsão da entrega', value: 'dataColeta' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Cód. IBGE', value: 'localEmissaoCodIbge' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Local de coleta', value: 'localColeta' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Local de entrega', value: 'localEntrega' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <v-select
                label="Status" 
                :items="todosStatus"
                v-model="form.status"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'radio', text: 'Tipo de solicitante', value: 'tipoSolicitante', items: [{ id: 'PF', nome: 'Física' },{ id: 'PJ', nome: 'Jurídica' }], required: true }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'CPF/CNPJ', value: 'cpfCnpjSolicitante', mask: (form.tipoSolicitante === 'PJ' ? '##.###.###/####-##' : '###.###.###-##'), required: true }"
                :edited-item="form"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
                <custom-input
                    title="Nome do Solicitante"
                    v-bind="customInputs.solicitanteProps"
                    :edited-item="form"
                />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <h3>Dados do Remetente</h3>
              <v-row>
                  <v-col>
                      <custom-input
                          title="Código"
                          v-bind="customInputs.remetenteProps"
                          :edited-item="form"
                      />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Nome / Razão Social"
                          :value="dynamicValues.remetente && dynamicValues.remetente.razaoSocial" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Data de Nascimento"
                          :value="dynamicValues.remetente && dynamicValues.remetente.dataNascimento" />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      <v-text-field disabled
                          label="Nome do Responsável"
                          :value="dynamicValues.remetente && dynamicValues.remetente.nomeResponsavel" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Contato do Responsável"
                          :value="dynamicValues.remetente && dynamicValues.remetente.contatoResponsavel" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Endereço"
                          :value="dynamicValues.remetente && dynamicValues.remetente.enderecoGeradoPeloCep" />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      <v-text-field disabled
                          label="Bairro"
                          :value="dynamicValues.remetente && dynamicValues.remetente.enderecoBairro" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Cidade"
                          :value="dynamicValues.remetente && dynamicValues.remetente.enderecoGeradoCidade" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="UF"
                          :value="dynamicValues.remetente && dynamicValues.remetente.enderecoGeradoUf" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Telefone"
                          :value="dynamicValues.remetente && dynamicValues.remetente.telefone" />
                  </v-col>

              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <h3>Dados do Destinatário</h3>
              <v-row>
                  <v-col>
                      <custom-input
                          title="Código"
                          v-bind="customInputs.destinatarioProps"
                          :edited-item="form"
                      />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Nome / Razão Social"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.razaoSocial" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Data de Nascimento"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.dataNascimento" />
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      <v-text-field disabled
                          label="Nome do Responsável"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.nomeResponsavel" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Contato do Responsável"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.contatoResponsavel" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Endereço"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.enderecoGeradoPeloCep" />
                  </v-col>
              </v-row>

              <v-row>
                  <v-col>
                      <v-text-field disabled
                          label="Bairro"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.enderecoBairro" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Cidade"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.enderecoGeradoCidade" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="UF"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.enderecoGeradoUf" />
                  </v-col>
                  <v-col>
                      <v-text-field disabled
                          label="Telefone"
                          :value="dynamicValues.destinatario && dynamicValues.destinatario.telefone" />
                  </v-col>
              </v-row>
            </v-col>
          </v-row>

      </v-col>
    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>>

<script>
import { mapActions } from 'vuex'
import CustomInput from '@/components/CustomInput'

export default {
  components: { CustomInput },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentTabAbertura: 0,
      tabsVeiculo: ['Veículo Principal', 'Vinculados'],
      currentOs: null,
      statusVisualizado: 'ABERTURA',
      statusAtualDaOS: 'ABERTURA',
      todosStatus: ['A COLETAR', 'EM TRÂNSITO', 'ENTREGUE', 'DEPÓSITO'],
      dynamicValues: {
        solicitante: null,
        remetente: null,
        destinatario: null,
        veiculoPrincipal: null,
        motorista: null
      },
      customInputs: {
        solicitanteProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Dados do Solicitante',
            value: 'solicitante',
            entity: 'solicitante',
            headers: [
              { text: 'Nome do Solicitante', value: 'nome' }
            ],
            onSelectRow: async (item) => {
              await this.buildSolicitanteCustomInput(item.id)
            },
            onSave: async (item) => {
              await this.buildSolicitanteCustomInput(item.id)
            }
          }
        },
        remetenteProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Dados do Remetente',
            value: 'remetente',
            entity: 'clienteOuFornecedor',
            headers: [
              { text: 'Nome / Razão Social', value: 'razaoSocial', required: true },
              { text: 'Data de Nascimento', value: 'dataNascimento', type: 'date' },
              { text: 'Nome do Responsável', value: 'nomeResponsavel', required: true },
              { text: 'Contato do Responsável', value: 'contatoResponsavel' },
              { text: 'Endereço', value: 'enderecoGeradoPeloCep', required: true },
              { text: 'Bairro', value: 'enderecoBairro' },
              { text: 'Cidade', value: 'enderecoGeradoCidade', required: true },
              { text: 'UF', value: 'enderecoGeradoUf' },
              { text: 'Telefone', value: 'telefone', mask: '(##) #####-####' }
            ],
            onSelectRow: async (item) => {
              await this.buildClientePessoaCustomInput(item.id)
            },
            onSave: async (item) => {
              await this.buildClientePessoaCustomInput(item.id)
            }
          }
        },
        destinatarioProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Dados do Destinátario',
            value: 'destinatario',
            entity: 'clienteOuFornecedor',
            headers: [
              { text: 'Nome / Razão Social', value: 'razaoSocial', required: true },
              { text: 'Data de Nascimento', value: 'dataNascimento', type: 'date' },
              { text: 'Nome do Responsável', value: 'nomeResponsavel', required: true },
              { text: 'Contato do Responsável', value: 'contatoResponsavel' },
              { text: 'Endereço', value: 'enderecoGeradoPeloCep', required: true },
              { text: 'Bairro', value: 'enderecoBairro' },
              { text: 'Cidade', value: 'enderecoGeradoCidade', required: true },
              { text: 'UF', value: 'enderecoGeradoUf' },
              { text: 'Telefone', value: 'telefone', mask: '(##) #####-####' }
            ],
            onSelectRow: async (item) => {
              await this.buildClientePessoaCustomInput(item.id,
                'idDestinatario',
                'Código do Destinatário',
                'destinatario',
                'destinatarioProps')
            },
            onSave: async (item) => {
              await this.buildClientePessoaCustomInput(item.id,
                'idDestinatario',
                'Código do Destinatário',
                'destinatario',
                'destinatarioProps')
            }
          }
        },
      }
    }
  },
  watch: {
    'dynamicValues.remetente' (codigo) {
      this.buildClientePessoaCustomInput(codigo)
    },
    'dynamicValues.destinatario' (codigo) {
      this.buildClientePessoaCustomInput(
        codigo,
        'idDestinatario',
        'Código do Destinatário',
        'destinatario',
        'destinatarioProps'
      )
    },
    id: {
      immediate: true,
      handler (id) {
        if (id) {
          this.statusAtualDaOS = 'ABERTO_PRO_OPERACIONAL'
        }
      }
    }
  },
  computed: {
    statusNumber () {
      const status = this.todosStatus
      return status.indexOf(this.statusAtualDaOS)
    }
  },
  methods: {
    ...mapActions('Crud', ['find', 'updateRow', 'insertRow']),
    buildClientePessoaCustomInput (id, key = 'idRemetente', labelInput = 'Código do Remetente', dynamicAttribute = 'remetente', customInputName = 'remetenteProps') {
      const getItemData = async (item) => {
        this.form[key] = item.id
        const data = (await this.find({
          updateState: false,
          entity: 'clienteOuFornecedor',
          params: {
            where: {
              id: item.id
            }
          }
        }))[0]
        console.log('DADOS', data)
        if (data) {
          this.dynamicValues = {
            ...this.dynamicValues,
            [dynamicAttribute]: data
          }
        }
      }
      this.customInputs[customInputName] = {
        header: {
          type: 'grid-select-item-crud',
          text: labelInput,
          value: key,
          entity: 'clienteOuFornecedor',
          where: {
            id
          },
          headers: this.customInputs[customInputName].header.headers,
          preSave: (itemAdicionado) => {
            itemAdicionado.id = id
          },
          onSelectRow: async (item) => {
            getItemData(item)
          },
          onSave: async (item) => {
            getItemData(item)
          }
        }
      }
    },
    buildSolicitanteCustomInput (id, key = 'idSolicitante', labelInput = 'Nome do Solicitante', dynamicAttribute = 'solicitante', customInputName = 'solicitanteProps') {
      const getItemData = async (item) => {
        this.form[key] = item.id
        const data = (await this.find({
          updateState: false,
          entity: 'solicitante',
          params: {
            where: {
              id: item.id
            }
          }
        }))[0]
        if (data) {
          this.dynamicValues = {
            ...this.dynamicValues,
            [dynamicAttribute]: data
          }
        }
      }
      this.customInputs[customInputName] = {
        header: {
          type: 'grid-select-item-crud',
          text: labelInput,
          value: key,
          entity: 'solicitante',
          where: {
            id
          },
          headers: this.customInputs[customInputName].header.headers,
          preSave: (itemAdicionado) => {
            itemAdicionado.id = id
          },
          onSelectRow: async (item) => {
            getItemData(item)
          },
          onSave: async (item) => {
            getItemData(item)
          }
        }
      }
    },
    async goToBack () {
      await this.$router.push({ path: `/comercial/ordem-de-servicos` })
    },
    setStatusVisualizado (status) {
      const statusIndexAtual = this.todosStatus.indexOf(this.statusAtualDaOS)
      const statusIndex = this.todosStatus.indexOf(status)

      if (statusIndex <= statusIndexAtual) {
        this.statusVisualizado = status
      }
    }
  }
}
</script>