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

          <v-row>
              <v-col>
                  <v-tabs>
                      <v-tab
                          href="#tab-veiculo-principal"
                          >Veículo Principal
                      </v-tab>
                      <v-tab
                          href="#tab-vinculados"
                          >Vinculados
                      </v-tab>

                      <v-tab-item value="tab-veiculo-principal">
                          <v-card flat tile>
                              <v-row>
                                  <v-col>
                                      <v-row>
                                          <v-col>
                                              <custom-input
                                                  title="Código"
                                                  v-bind="customInputs.veiculoPrincipalProps"
                                                  :edited-item="form"
                                          />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Descrição"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.descricao" />
                                          </v-col>
                                      </v-row>
                                      <v-row>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Placa"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Marca/Modelo"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.marcaModelo" />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Tipo do Veículo"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.tipoVeiculo && dynamicValues.veiculoPrincipal.tipoVeiculo.nome"
                                          />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Chassi"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nChassi"
                                          />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="KM Saída"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.kmSaida"
                                          />
                                          </v-col>
                                      </v-row>
                                      <v-row>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Horário de Saída"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.horarioSaida"
                                          />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="Local"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.local"
                                          />
                                          </v-col>
                                          <v-col>
                                              <v-text-field disabled
                                                  label="UF"
                                                  :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.enderecoUf"
                                          />
                                          </v-col>
                                      </v-row>
                                  </v-col>
                              </v-row>

                          </v-card>
                      </v-tab-item>

                      <v-tab-item value="tab-vinculados">
                          <v-card flat tile>

                          </v-card>
                      </v-tab-item>
                  </v-tabs>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h3>Dados do Motorista</h3>
                <v-row>
                    <v-col>
                        <custom-input
                            title="Código"
                            v-bind="customInputs.motoristaProps"
                            :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="Nome"
                            :value="dynamicValues.motorista && dynamicValues.motorista.nome" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field disabled
                            label="CPF"
                            :value="dynamicValues.motorista && dynamicValues.motorista.cpf" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="RG"
                            :value="dynamicValues.motorista && dynamicValues.motorista.rg" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="CNH"
                            :value="dynamicValues.motorista && dynamicValues.motorista.cnh" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="Contato do Motorista"
                            :value="dynamicValues.motorista && dynamicValues.motorista.telefone" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field disabled
                            label="Endereço"
                            :value="dynamicValues.motorista && dynamicValues.motorista.enderecoGeradoPeloCep" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="Bairro"
                            :value="dynamicValues.motorista && dynamicValues.motorista.enderecoBairro" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="Cidade"
                            :value="dynamicValues.motorista && dynamicValues.motorista.enderecoGeradoCidade" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                            label="UF"
                            :value="dynamicValues.motorista && dynamicValues.motorista.enderecoGeradoUf" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field disabled
                            label="Chapa"
                            :value="dynamicValues.motorista && dynamicValues.motorista.chapa" />
                    </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <h3>Dados de Auditoria</h3>
                <v-row>
                  <v-col>
                    <custom-input
                      :header="{ type: 'text', text: 'Cadastrado por', value: 'auditoria.nomeCadastro' }"
                      :edited-item="form"
                    />
                  </v-col>
                  <v-col>
                    <custom-input
                      :header="{ type: 'date', text: 'Data', value: 'auditoria.dataCadastro' }"
                      :edited-item="form"
                    />
                  </v-col>
                  <v-col>
                    <custom-input
                      :header="{ type: 'text', text: 'Alterado por', value: 'auditoria.nomeAlterado' }"
                      :edited-item="form"
                    />
                  </v-col>
                  <v-col>
                    <custom-input
                      :header="{ type: 'date', text: 'Data', value: 'auditoria.dataAlterado' }"
                      :edited-item="form"
                    />
                  </v-col>
                  <v-col>
                    <custom-input
                      :header="{ type: 'text', text: 'Cód. Autenticação do E-mail', value: 'auditoria.codAutenticacaoEmail' }"
                      :edited-item="form"
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
        veiculoPrincipalProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Veículo Principal',
            value: 'veiculoPrincipal',
            entity: 'veiculos',
            headers: [
              { text: 'Descrição', value: 'descricao' },
              { text: 'Placa', value: 'placa' },
              { text: 'Marca/Modelo', value: 'marcaModelo' },
              { text: 'Tipo do Veículo', value: 'idTipoVeiculo' },
              { text: 'Chassi', value: 'nChassi' },
              { text: 'KM Saída', value: 'kmSaida' },
              { text: 'Horário de Saída', value: 'horarioSaida' },
              { text: 'Local', value: 'local' },
              { text: 'UF', value: 'enderecoUf' }
            ],
            onSelectRow: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              await this.buildVeiculoPrincipal(item.id)
            }
          }
        },
        motoristaProps: {
          header: {
            type: 'grid-select-item-crud',
            text: 'Dados do Motorista',
            value: 'motorista',
            entity: 'motorista',
            headers: [
              { text: 'Nome', value: 'nome' },
              { text: 'CPF', value: 'cpf' },
              { text: 'RG', value: 'rg' },
              { text: 'CNH', value: 'cnh' },
              { text: 'Contato do Motorista', value: 'telefone' },
              { text: 'Endereço', value: 'enderecoGeradoPeloCep' },
              { text: 'Bairro', value: 'enderecoBairro' },
              { text: 'Cidade', value: 'enderecoGeradoCidade' },
              { text: 'UF', value: 'enderecoGeradoUf' },
              { text: 'Chapa', value: 'chapa' }
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