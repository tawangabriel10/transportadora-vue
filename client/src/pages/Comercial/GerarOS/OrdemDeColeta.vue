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
                :header="{ type: 'radio', text: 'Tipo de solicitante', value: 'tipoSolicitante', items: [{ id: 'PF', nome: 'Física' },{ id: 'PJ', nome: 'Jurídica' }] }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'CPF/CNPJ', value: 'cpfCnpjSolicitante' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Nome do Solicitante', value: 'nomeSolicitante' }"
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
const PFHeaders = [
  { text: 'Nome', value: 'nome' },
  { text: 'CPF', value: 'cpf', mask: 'X##.###.###-##' },
  { text: 'Apelido', value: 'apelido' },
  { text: 'RG', value: 'rg' },
  { text: 'UF do RG', value: 'rgUf' },
  { text: 'Data Emissão', value: 'dataEmissao', type: 'date' },
  { text: 'Orgão Expeditor', value: 'orgaoExpeditor' },
  { text: 'Data de Nascimento', value: 'dataNascimento', type: 'date' },
  { text: 'Naturalidade', value: 'naturalidade' },
  { text: 'Sexo', value: 'sexo', items: [{ nome: 'Masculino', id: 'M' }, { nome: 'Feminino', id: 'F' }] },
  { text: 'CEP', value: 'cep', mask: '##.###-###' },
  // { text: 'EnderecoGeradoPeloCep', value: 'enderecoGeradoPeloCep', disable: true },
  // { text: 'EnderecoCodigoIbge', value: 'enderecoCodigoIbge' },
  // { text: 'Endereco GeradoUf', value: 'enderecoGeradoUf' },
  // { text: 'EnderecoGeradoCidade', value: 'enderecoGeradoCidade' },
  { text: 'Bairro', value: 'enderecoBairro' },
  { text: 'Número do Endereço', value: 'enderecoNumero' },
  { text: 'Complemento do Endereço', value: 'enderecoComplemento' },
  { text: 'Referência', value: 'enderecoReferencia' },
  { text: 'Email', value: 'email' },
  { text: 'Email Secundário', value: 'emailSecundario' },
  { text: 'Telefone', value: 'telefone', mask: '(##) ####-####' },
  { text: 'Celular', value: 'telefoneCelular', mask: '(##) # ####-####' },
  { text: 'Nome Contato', value: 'nomeContato' }
]
const PJHeaders = [
  { text: 'Nome', value: 'nome' },
  { text: 'Apelido', value: 'apelido' },
  { text: 'CNPJ', value: 'cnpj' },
  { text: 'Nome Contato', value: 'nomeContato' },
  { text: 'Razao Social', value: 'razaoSocial' },
  { text: 'Nome Fantasia', value: 'nomeFantasia' },
  { text: 'Inscrição Estadual', value: 'inscricaoEstadual' },
  { text: 'Inscrição Municipal', value: 'inscricaoMunicipal' },
  { text: 'Inscricao Suframa', value: 'inscricaoSuframa' },
  { text: 'Contribuicao ICMS', value: 'contribuicaoIcms' },
  { text: 'CFOP', value: 'idCfop', lookup: 'cfop' },
  { text: 'CEP', value: 'cep', mask: '##.###-###' },
  // { text: 'EnderecoGeradoPeloCep', value: 'enderecoGeradoPeloCep', disable: true },
  // { text: 'EnderecoCodigoIbge', value: 'enderecoCodigoIbge' },
  // { text: 'Endereço Gerado UF', value: 'enderecoGeradoUf' },
  // { text: 'Endereço GeradoCidade', value: 'enderecoGeradoCidade' },
  { text: 'Endereço Bairro', value: 'enderecoBairro' },
  { text: 'Endereço Numero', value: 'enderecoNumero' },
  { text: 'Endereço Complemento', value: 'enderecoComplemento' },
  { text: 'Endereço Referência', value: 'enderecoReferencia' },
  { text: 'Email', value: 'email' },
  { text: 'Email Secundário', value: 'emailSecundario' },
  { text: 'Telefone', value: 'telefone', mask: '(##) ####-####' },
  { text: 'Celular', value: 'telefoneCelular', mask: '(##) # ####-####' }
]

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
        remetente: null,
        destinatario: null,
        veiculoPrincipal: null,
        motorista: null
      },
      customInputs: {
        remetenteProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Dados do Remetente',
            value: 'remetente',
            entity: 'clienteOuFornecedor',
            headers: [
              { text: 'Nome / Razão Social', value: 'razaoSocial' },
              { text: 'Nome do Responsável', value: 'nomeResponsavel' },
              { text: 'Contato do Responsável', value: 'contatoResponsavel' },
              { text: 'Endereço', value: 'enderecoGeradoPeloCep' },
              { text: 'Bairro', value: 'enderecoBairro' },
              { text: 'Cidade', value: 'enderecoGeradoCidade' },
              { text: 'UF', value: 'enderecoGeradoUf' },
              { text: 'Telefone', value: 'telefone' }
            ],
            onSelectRow: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
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
              { text: 'Nome / Razão Social', value: 'razaoSocial' },
              { text: 'Nome do Responsável', value: 'nomeResponsavel' },
              { text: 'Contato do Responsável', value: 'contatoResponsavel' },
              { text: 'Endereço', value: 'enderecoGeradoPeloCep' },
              { text: 'Bairro', value: 'enderecoBairro' },
              { text: 'Cidade', value: 'enderecoGeradoCidade' },
              { text: 'UF', value: 'enderecoGeradoUf' },
              { text: 'Telefone', value: 'telefone' }
            ],
            onSelectRow: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
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
    buildClientePessoaCustomInput (tipoCliente, key = 'idRemetente', labelInput = 'Código do Remetente', dynamicAttribute = 'remetente', customInputName = 'remetenteProps') {
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
          headers: tipoCliente === 'PF' ? PFHeaders : PJHeaders,
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