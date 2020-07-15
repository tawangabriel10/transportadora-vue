<template>
  <div class="manter-os">
    <v-btn icon text>
      <v-icon
        class="mdi mdi-arrow-left"
        @click="goToBack"
      >
      </v-icon>
    </v-btn>
    <div class="resume" v-if="id && currentOs">
      <h2>Detalhes da OS:</h2>
      <div>
        <b>ID: {{id}}</b>
      </div>
      <v-row>
        <v-col cols="4">
          <b>Local Emissão Cod. IBGE:</b> {{currentOs.localEmissaoCodIbge}}
        </v-col>
        <v-col cols="4">
          <b>Local Emissão Desc.:</b> {{currentOs.localEmissaoDesc}}
        </v-col>
        <v-col cols="4">
          <b>Data Coleta:</b> {{currentOs.dataColeta}}
        </v-col>
        <v-col cols="4">
          <b>Local Coleta:</b> {{currentOs.localColeta}}
        </v-col>
        <v-col cols="4">
          <b>Local Entrega:</b> {{currentOs.localEntrega}}
        </v-col>
        <v-col cols="4">
          <b>Nome Solicitante:</b> {{currentOs.nomeSolicitante}}
        </v-col>
        <v-col cols="4">
          <b>Remetente:</b> {{currentOs.remetente ? currentOs.remetente.nome : '-'}}
        </v-col>
        <v-col cols="4">
          <b>Destinatario:</b> {{currentOs.destinatario ? currentOs.destinatario.nome : '-'}}
        </v-col>
        <v-col cols="4">
          <b>VeículoPrincipal:</b> {{currentOs.veiculoPrincipal ? currentOs.veiculoPrincipal.nome : '-'}}
        </v-col>
        <v-col cols="4">
          <b>Motorista:</b> {{currentOs.motorista ? currentOs.motorista.nome : ''}}
        </v-col>
        <v-col cols="4">
          <b>Chapa:</b> {{currentOs.chapa}}
        </v-col>
        <v-col cols="4">
          <b>Consignatário:</b> {{currentOs.consignatario ? currentOs.consignatario.nome : '-'}}
        </v-col>
      </v-row>
    </div>
    <div class="area-timeline">
      <div class="timeline">
        <div class="start-point">&nbsp;</div>
        <div class="hit-area"
             :class="{ active: statusNumber >= 0, current: statusVisualizado === 'ABERTURA' }"
             @click="setStatusVisualizado('ABERTURA')">
          <div class="circle"
          >
            <span>Abertura</span>
          </div>
        </div>
        <div class="hit-area"
             :class="{ active: statusNumber >= 1, current: statusVisualizado === 'ABERTO_PRO_OPERACIONAL' }"
             @click="setStatusVisualizado('ABERTO_PRO_OPERACIONAL')">
          <div class="circle"
          >
            <span>Operacional</span>
          </div>
        </div>
        <div class="hit-area"
             :class="{ active: statusNumber >= 2, current: statusVisualizado === 'ABERTO_PRO_FINANCEIRO' }"
             @click="setStatusVisualizado('ABERTO_PRO_FINANCEIRO')">
          <div class="circle"
          >
            <span>Financeiro</span>
          </div>
        </div>
        <div class="hit-area"
             :class="{ active: statusNumber >= 3, current: statusVisualizado === 'FECHAMENTO' }"
             @click="setStatusVisualizado('FECHAMENTO')">
          <div class="circle"
          >
            <span>Fechamento</span>
          </div>
        </div>
        <div class="final-point">&nbsp;</div>
      </div>
    </div>

    <!--ABERTURA-->
    <div class="abertura" v-if="statusVisualizado === 'ABERTURA'">
      <v-card>
        <v-card-text>
          <v-card-title>
            <v-row>
              <v-col cols="9">
<!--                <b style="font-size: 14px">Status: ?</b>-->
              </v-col>
              <v-col cols="2">
                <v-btn @click="salvar">Salvar Alterações</v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-tabs
            fixed-tabs
            background-color="blue"
            dark>
            <v-tab href="#tab-timeline-gerar-os">
              Gerar OS
            </v-tab>
            <v-tab href="#tab-timeline-cadastrar-cliente">
              Cadastrar Cliente
            </v-tab>
            <v-tab href="#tab-timeline-cadastrar-fornecedor">
              Cadastrar Fornecedor
            </v-tab>
            <v-tab href="#tab-timeline-acertos-de-viagem">
              Acertos de Viagem
            </v-tab>
            <v-tab href="#tab-timeline-mapa-de-viagem">
              Mapa de Viagem
            </v-tab>
            <v-tab href="#tab-timeline-financeiro">
              Financeiro
            </v-tab>
            <v-tab href="#tab-timeline-gerar-cte">
              Gerar CT-e
            </v-tab>
            <v-tab href="#tab-timeline-gerar-mfe">
              Gerar MF-e
            </v-tab>

            <v-tab-item value="tab-timeline-gerar-os">

              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Gerar nova OS</span>
                </v-card-title>
                <v-card-text>
                    <!-- Tabs GerarOS -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaGerarOS"
                        :key="i"
                        :href="`#tab-gerar-os-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Ordem de coleta-->
                      <v-tab-item value="tab-gerar-os-0">
                        <ordem-de-coleta :form="form.ordemDeColeta"></ordem-de-coleta>
                      </v-tab-item>

                      <!-- Mercadorias -->
                      <v-tab-item value="tab-gerar-os-1">
                        <mercadorias :form="form.mercadorias"></mercadorias>
                      </v-tab-item>

                      <!-- Dados Opcionais -->
                      <v-tab-item value="tab-gerar-os-2">
                        <dados-opcionais :form="form.dadosOpcionais"></dados-opcionais>
                      </v-tab-item>

                      <!-- Ocorrencias -->
                      <v-tab-item value="tab-gerar-os-3">
                        <ocorrencias :form="form.ocorrencias"></ocorrencias>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Tabs GerarOS -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-cadastrar-cliente">
              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Cadastrar Cliente</span>
                </v-card-title>
                <v-card-text>
                    <!-- Cadastrar Cliente -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaCadastrarCliente"
                        :key="i"
                        :href="`#tab-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Dados Cadastrais Cliente -->
                      <v-tab-item value="tab-0" >
                          <dados-cadastrais-cliente :form="form.cliente.dadosCadastrais"></dados-cadastrais-cliente>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Cadastrar Cliente -->
                </v-card-text>
              </v-card>
            </v-tab-item>
                
            <v-tab-item value="tab-timeline-cadastrar-fornecedor">
              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Cadastrar Fornecedor</span>
                </v-card-title>
                <v-card-text>
                    <!-- Cadastrar Fornecedor -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaCadastrarFornecedor"
                        :key="i"
                        :href="`#tab-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Dados Cadastrais Fornecedor -->
                      <v-tab-item value="tab-0">
                        <dados-cadastrais-fornecedor :form="form.fornecedor.dadosCadastrais"></dados-cadastrais-fornecedor>
                      </v-tab-item>

                      <!-- Pagamento, Dados Bancários e Informações Fiscais -->
                      <v-tab-item value="tab-1">
                        <pagamento-dados-bancarios-informacoes-fiscais :form="form.fornecedor.pagamentoDadosBancarios"></pagamento-dados-bancarios-informacoes-fiscais>
                      </v-tab-item>

                      <!-- Serviços e/ou Produtos Prestados -->
                      <v-tab-item value="tab-2">
                        <servicos-e-ou-produtos-prestados :form="form.fornecedor.servicosProdutosPrestados"></servicos-e-ou-produtos-prestados>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Cadastrar Fornecedor -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-acertos-de-viagem">
              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Acerto de Viagem</span>
                </v-card-title>
                <v-card-text>
                    <!-- Acertos de Viagem -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaAcertosdeViagem"
                        :key="i"
                        :href="`#tab-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Acerto -->
                      <v-tab-item value="tab-0">
                        <acerto></acerto>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Acertos de Viagem -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-mapa-de-viagem">
              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Mapa de Viagem</span>
                </v-card-title>
                <v-card-text>
                    <!-- Mapa de Viagem -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaMapaDeViagem"
                        :key="i"
                        :href="`#tab-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Informações -->
                      <v-tab-item value="tab-0">
                        <informacoes></informacoes>
                      </v-tab-item>

                      <!-- Previsao -->
                      <v-tab-item value="tab-1">
                        <previsao></previsao>
                      </v-tab-item>

                      <!-- Trajeto -->
                      <v-tab-item value="tab-2">
                        <trajeto></trajeto>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Mapa de Viagem -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-financeiro">
              <v-card flat tile>
                <v-card-title>
                    <span class="headline">Financeiro</span>
                </v-card-title>
                <v-card-text>
                    <!-- Financeiro -->
                    <v-tabs>
                      <v-tab
                        v-for="(tabNome, i) in tabsAberturaMapaDeViagem"
                        :key="i"
                        :href="`#tab-${i}`"
                      >{{tabNome}}
                      </v-tab>

                      <!-- Contabilizacao -->
                      <v-tab-item value="tab-0">
                        <contabilizacao></contabilizacao>
                      </v-tab-item>

                      <!-- Cobranca -->
                      <v-tab-item value="tab-1">
                        <cobranca></cobranca>
                      </v-tab-item>

                    </v-tabs>
                    <!-- Financeiro -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-gerar-cte">
              <v-card flat tile>

              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-timeline-gerar-mfe"></v-tab-item>

          </v-tabs>
          
        </v-card-text>
      </v-card>
    </div>

    <!--ABERTO_PRO_OPERACIONAL-->
    <div class="abertura" v-if="statusVisualizado === 'ABERTO_PRO_OPERACIONAL'">
      <h3>Informações de logística relacionados a essa OS</h3>
    </div>

  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import { mapActions } from 'vuex'
import CustomInput from '@/components/CustomInput'

import OrdemDeColeta from '@/pages/Comercial/GerarOS/OrdemDeColeta'
import Mercadorias from '@/pages/Comercial/GerarOS/Mercadorias'
import DadosOpcionais from '@/pages/Comercial/GerarOS/DadosOpcionais'
import Ocorrencias from '@/pages/Comercial/GerarOS/Ocorrencias'

import DadosCadastraisCliente from '@/pages/Comercial/CadastroDeClientes/DadosCadastraisCliente'

import DadosCadastraisFornecedor from '@/pages/Comercial/CadastroDeFornecedor/DadosCadastraisFornecedor'
import PagamentoDadosBancariosInformacoesFiscais from '@/pages/Comercial/CadastroDeFornecedor/PagamentoDadosBancariosInformacoesFiscais'
import ServicosEOuProdutosPrestados from '@/pages/Comercial/CadastroDeFornecedor/ServicosEOuProdutosPrestados'

import Acerto from '@/pages/Logistica/AcertoDeViagem/Acerto'

import Informacoes from '@/pages/Logistica/MapaDeViagem/Informacoes'
import Previsao from '@/pages/Logistica/MapaDeViagem/Previsao'
import Trajeto from '@/pages/Logistica/MapaDeViagem/Trajeto'

import Contabilizacao from '@/pages/Financeiro/GerarFatura/Contabilizacao'
import Cobranca from '@/pages/Financeiro/GerarFatura/Cobranca'

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
  components: { 
    CustomInput,
    OrdemDeColeta,
    Mercadorias,
    DadosOpcionais,
    Ocorrencias,
    DadosCadastraisCliente,
    DadosCadastraisFornecedor,
    PagamentoDadosBancariosInformacoesFiscais,
    ServicosEOuProdutosPrestados,
    Acerto,
    Informacoes,
    Previsao,
    Trajeto,
    Contabilizacao,
    Cobranca
  },
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      tabsAberturaTimeline: [
        'Gerar OS',
        'Cadastrar Cliente',
        'Cadastrar Fornecedor',
        'Acertos de Viagem',
        'Mapa de Viagem',
        'Financeiro',
        'Gerar CT-e',
        'Gerar MF-e'
      ],
      tabsAberturaGerarOS: ['1. Ordem de Coleta', '2. Mercadorias', '3. Dados Opcionais', '4. Ocorrências'],
      tabsAberturaCadastrarCliente: ['1. Dados Cadastrais'],
      tabsAberturaCadastrarFornecedor: ['1. Dados Cadastrais', '2. Pagamento, Dados Bancários e Informações Fiscais', '3. Serviços e/ou Produtos Prestados'],
      tabsAberturaAcertosdeViagem: ['1. Informações'],
      tabsAberturaMapaDeViagem: ['1. Informações', '2. Previsão', '3. Trajeto'],
      tabsAberturaFinanceiro: ['1. Contabilização', '2. Cobrança'],
      currentOs: null,
      statusVisualizado: 'ABERTURA',
      statusAtualDaOS: 'ABERTURA',
      todosStatus: ['ABERTURA', 'ABERTO_PRO_OPERACIONAL', 'ABERTO_PRO_FINANCEIRO', 'FECHAMENTO'],
      form: {
        ordemDeColeta: {},
        mercadorias: {},
        dadosOpcionais: {},
        ocorrencias: {},
        cliente: {
          dadosCadastrais: {},
        },
        fornecedor: {
          dadosCadastrais: {},
          pagamentoDadosBancarios: {},
          servicosProdutosPrestados: {}
        }
      },
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
