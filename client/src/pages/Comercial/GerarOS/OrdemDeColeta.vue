<template>
    <div>
      <v-col>
        <h3>Dados Gerais</h3>
          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'date', text: 'Data Emissão', value: 'dataEmissao' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'date', text: 'Data de Coleta', value: 'dataColeta' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Cód. IBGE', value: 'localEmissaoCodIbge' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <v-text-field :value="form.localEmissaoDesc" label="Local de Emissão" disabled/>
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'time', text: 'Hora Limite', value: 'horaLimite' }"
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
              <custom-input
                :header="{ type: 'time', text: 'Hora Chamada', value: 'horaChamada' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Nome do Solicitante', value: 'nomeSolicitante' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <h3>Dados do Remetente</h3>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Tipo de Cliente"
                        v-model="dynamicValues.tipoClienteRemetente"
                        :items="[{ text: 'Pessoa Física', value: 'PF' }, { text: 'Pessoa Jurídica', value: 'PJ' }]"
                      />
                    </v-col>
                    <v-col>
                      <custom-input
                        v-if="dynamicValues.tipoClienteRemetente && customInputs.remetenteProps"
                        v-bind="customInputs.remetenteProps"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field disabled
                                    label="Nome do Remetente"
                                    v-if="dynamicValues.tipoClienteRemetente && customInputs.remetenteProps"
                                    :value="dynamicValues.remetente && dynamicValues.remetente.nome" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <h3>Dados do Destinatário</h3>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Tipo de Cliente"
                        v-model="dynamicValues.tipoClienteDestinatario"
                        :items="[{ text: 'Pessoa Física', value: 'PF' }, { text: 'Pessoa Jurídica', value: 'PJ' }]"
                      />
                    </v-col>
                    <v-col>
                      <custom-input
                        v-if="dynamicValues.tipoClienteDestinatario && customInputs.destinatarioProps"
                        v-bind="customInputs.destinatarioProps"
                        :edited-item="form"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field disabled
                                    label="Nome do Destinatário"
                                    v-if="dynamicValues.tipoClienteDestinatario && customInputs.destinatarioProps"
                                    :value="dynamicValues.destinatario && dynamicValues.destinatario.nome" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-row>
                <v-col>
                  <custom-input
                    title="Veículo Principal"
                    v-bind="customInputs.veiculoPrincipalProps"
                    :edited-item="form"
                  />
                </v-col>
                <v-col>
                  <v-text-field disabled
                                label="Descrição"
                                v-if="form.idVeiculoPrincipal"
                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nome" />
                </v-col>
                <v-col>
                  <v-text-field disabled
                                label="Placa"
                                v-if="form.idVeiculoPrincipal"
                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                </v-col>
                <v-col>
                  <v-text-field disabled
                                label="Marca/Modelo"
                                v-if="form.idVeiculoPrincipal"
                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.marcaModelo" />
                </v-col>
                <v-col>
                  <v-text-field disabled
                                label="Tipo do Veículo"
                                v-if="form.idVeiculoPrincipal"
                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.tipoVeiculo && dynamicValues.veiculoPrincipal.tipoVeiculo.nome"
                  />
                </v-col>
                <v-col>
                  <v-text-field disabled
                                label="Chassi"
                                v-if="form.idVeiculoPrincipal"
                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nChassi"
                  />
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
      tabsAbertura: ['Ordem de Coleta', 'Mercadorias', 'Dados Opcionais'],
      tabsVeiculo: ['Veículo Principal', 'Vinculados'],
      currentOs: null,
      statusVisualizado: 'ABERTURA',
      statusAtualDaOS: 'ABERTURA',
      todosStatus: ['ABERTURA', 'ABERTO_PRO_OPERACIONAL', 'ABERTO_PRO_FINANCEIRO', 'FECHAMENTO'],
      dynamicValues: {
        tipoClienteRemetente: null,
        tipoClienteDestinatario: null,
        veiculoPrincipal: null
      },
      customInputs: {
        veiculoPrincipalProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Veículo Principal',
            value: 'idVeiculoPrincipal',
            entity: 'veiculos',
            headers: [
              { text: 'Nome', value: 'nome' },
              { text: 'Placa', value: 'placa' },
              { text: 'Ano', value: 'ano' },
              { text: 'Cor', value: 'cor' },
              { text: 'MarcaModelo', value: 'marcaModelo' },
              { text: 'Renavam', value: 'renavam' },
              { text: 'NChassi', value: 'nChassi' },
              { text: 'MedCarroceria', value: 'medCarroceria' },
              { text: 'Tara', value: 'tara' },
              { text: 'CapacicidadeKg', value: 'capacicidadeKg' },
              { text: 'CapacidadeMCubicos', value: 'capacidadeMCubicos' },
              { text: 'CapacidadeTanque', value: 'capacidadeTanque' },
              { text: 'NEixos', value: 'nEixos' },
              { text: 'MediaKmLitro', value: 'mediaKmLitro' },
              { text: 'EnderecoCodigoIbge', value: 'enderecoCodigoIbge' },
              { text: 'EnderecoCidade', value: 'enderecoCidade' },
              { text: 'EnderecoUf', value: 'enderecoUf' },
              { text: 'Observacoes', value: 'observacoes' },
              { text: 'IdTipoVeiculo', value: 'idTipoVeiculo' },
              { text: 'IdMotorista', value: 'idMotorista' }
            ],
            onSelectRow: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            }
          }
        }
      }
    }
  },
  watch: {
    'dynamicValues.tipoClienteRemetente' (tipoCliente) {
      this.buildClientePessoaCustomInput(tipoCliente)
    },
    'dynamicValues.tipoClienteDestinatario' (tipoCliente) {
      this.buildClientePessoaCustomInput(
        tipoCliente,
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
  async mounted () {
    if (this.id) {
      await this.getCurrentOs(this.id)
    }
  },
  methods: {
    ...mapActions('Crud', ['find', 'updateRow', 'insertRow']),
    async buildVeiculoPrincipal (idVeiculoPrincipal) {
      this.form.idVeiculoPrincipal = idVeiculoPrincipal
      const veiculoPrincipal = (await this.find({
        updateState: false,
        entity: 'veiculos',
        params: {
          where: {
            id: idVeiculoPrincipal
          },
          include: [
            {
              as: 'tipoVeiculo',
              model: 'TipoVeiculo'
            },
            {
              as: 'motorista',
              model: 'Motorista'
            }
          ]
        }
      }))[0]
      if (veiculoPrincipal) {
        this.dynamicValues = {
          ...this.dynamicValues,
          veiculoPrincipal
        }
      }
    },
    async getCurrentOs (id) {
      this.currentOs = (await this.find({
        entity: 'ordemServico',
        params: {
          where: {
            id
          },
          include: [
            { model: 'ClienteOuFornecedor', as: 'destinatario' },
            { model: 'ClienteOuFornecedor', as: 'remetente' },
            { model: 'ClienteOuFornecedor', as: 'consignatario' },
            { model: 'Motorista', as: 'motorista' },
            { model: 'Veiculos', as: 'veiculoPrincipal' }
          ]
        }
      }))[0] || {}
      this.form = {
        ...this.form,
        ...this.currentOs
      }
      if (this.currentOs && this.currentOs.destinatario) {
        this.dynamicValues.tipoClienteDestinatario = this.currentOs.destinatario.tipoCliente
      }
      if (this.currentOs && this.currentOs.remetente) {
        this.dynamicValues.tipoClienteRemetente = this.currentOs.remetente.tipoCliente
      }
      if (this.currentOs.idVeiculoPrincipal) {
        await this.buildVeiculoPrincipal(this.currentOs.idVeiculoPrincipal)
      }
    },
    async salvar () {
      if (this.id) {
        await this.updateRow({
          updateState: false,
          entity: 'ordemServico',
          key: this.id,
          values: this.form
        })
        await this.getCurrentOs(this.id)
      } else {
        const os = await this.insertRow({
          updateState: false,
          entity: 'ordemServico',
          values: this.form
        })
        await this.$router.push({ path: `/comercial/ordem-de-servico/${os.id}` })
        this.getCurrentOs(os.id)
      }
    },
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
            tipoCliente
          },
          headers: tipoCliente === 'PF' ? PFHeaders : PJHeaders,
          preSave: (itemAdicionado) => {
            itemAdicionado.tipoCliente = tipoCliente
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