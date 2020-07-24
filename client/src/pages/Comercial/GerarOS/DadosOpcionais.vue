<template>
    <div>
        <v-col>
            <h3>Dados do Consignatário</h3>
            <v-row>
                <v-col>
                    <custom-input
                          title="Código"
                          v-bind="customInputs.consignatarioProps"
                          :edited-item="form"
                      />
                </v-col>
                <v-col>
                    <v-text-field disabled
                    label="Nome/Razão Social"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.razaoSocial" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field disabled
                    label="Nome responsável"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.nomeResponsavel" />
                </v-col>
                <v-col>
                    <v-text-field disabled
                    label="Endereço"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.enderecoGeradoPeloCep" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field disabled
                    label="Bairro"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.enderecoBairro" />
                </v-col>
                <v-col>
                    <v-text-field disabled
                    label="Cidade"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.enderecoGeradoCidade" />
                </v-col>
                <v-col>
                    <v-text-field disabled
                    label="UF"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.enderecoGeradoUf" />
                </v-col>
                <v-col>
                    <v-text-field disabled
                    label="Telefone"
                    :value="dynamicValues.consignatario && dynamicValues.consignatario.telefone" />
                </v-col>
            </v-row>
        </v-col>

        <v-row>
            <v-col>
                <h3>Dados do Redespacho</h3>
                <v-row>
                    <v-col>
                        <custom-input
                          title="Código"
                          v-bind="customInputs.redespachoProps"
                          :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                        label="Nome/Razão Social"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.razaoSocial" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field disabled
                        label="Nome responsável"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.nomeResponsavel" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                        label="Endereço"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.enderecoGeradoPeloCep" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field disabled
                        label="Bairro"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.enderecoBairro" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                        label="Cidade"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.enderecoGeradoCidade" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                        label="UF"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.enderecoGeradoUf" />
                    </v-col>
                    <v-col>
                        <v-text-field disabled
                        label="Telefone"
                        :value="dynamicValues.redespacho && dynamicValues.redespacho.telefone" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <h3>Dados do Frete</h3>
                <v-row>
                    <v-col>
                        <custom-input
                          title="Tabela de Frete"
                          v-bind="customInputs.freteProps"
                          :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Valor do Frete', value: 'valorFrete' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Pedágio', value: 'pedagio' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Ad-valorem', value: 'adValoragem' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Seguro', value: 'seguro' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Outros', value: 'outros' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Taxa Aérea', value: 'taxaAerea' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Taxa Coleta', value: 'taxaColeta' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Taxa de Entrega', value: 'taxaEntrega' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Redespacho', value: 'valorRedespacho' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Total de Prestação', value: 'totalPrestacao' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <h3>Informações de Identificação</h3>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Número de referência', value: 'numeroReferencia' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'currency', text: 'Valor de referência', value: 'valorReferencia' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Conhecimento', value: 'conhecimento' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Nº Nota Fiscal', value: 'notaFiscal' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Finalidade do Transporte', value: 'finalidadeTransporte' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Material', value: 'material' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Nº Risco', value: 'numeroRisco' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Nº ONU', value: 'numeroONU' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <h3>Importação/Exportação</h3>
                <v-row>
                    <v-col>
                        <v-select
                            label="Tipo do Contêiner" 
                            :items="[]"
                            v-model="form.tipoContainer"
                        ></v-select>
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Nº Contêiner', value: 'numeroContainer' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Navio', value: 'navio' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Armador', value: 'armador' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Booking', value: 'booking' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'DI/DTA', value: 'diDta' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Agência', value: 'agencia' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Porto', value: 'porto' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Doc. Aduaneiro', value: 'docAduaneiro' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
             <v-col>
                <h3>Seguro</h3>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Seguradora', value: 'seguradora' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Nº Apólice', value: 'numeroApolice' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>

            <v-col>
                <h3>Dados do Frete</h3>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'date', text: 'Data de Chegada', value: 'dataChegada' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'time', text: 'Hora de Chegada', value: 'horaChegada' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Forma de Pagamento', value: 'formaPagamento' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Resp. Pagamento', value: 'respPagamento' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

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
    data() {
        return {
            dynamicValues: {
                consignatario: {},
                redespacho: {},
                dadosFrete: {}
            },
            customInputs: {
                consignatarioProps: {
                    header: {
                        type: 'grid-select-item-crud',
                        text: 'Dados do Consignatário',
                        value: 'consignatario',
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
                            //await this.buildVeiculoPrincipal(item.id)
                        },
                        onSave: async (item) => {
                            //await this.buildVeiculoPrincipal(item.id)
                        }
                    }
                },
                redespachoProps: {
                    header: {
                        type: 'grid-select-item-crud',
                        text: 'Dados do Redespacho',
                        value: 'redespacho',
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
                            //await this.buildVeiculoPrincipal(item.id)
                        },
                        onSave: async (item) => {
                            //await this.buildVeiculoPrincipal(item.id)
                        }
                    }
                },
                freteProps: {
                    header: {
                        type: 'grid-select-item-crud',
                        text: 'Dados do Frete',
                        value: 'frete',
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
                            //await this.buildVeiculoPrincipal(item.id)
                        },
                        onSave: async (item) => {
                            //await this.buildVeiculoPrincipal(item.id)
                        }
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions('Crud', ['find', 'updateRow', 'insertRow']),
        async buildConsignatario (idConsignatario) {
            this.form.idConsignatario = idConsignatario
            const consignatario = (await this.find({
                updateState: false,
                entity: 'clienteOuFornecedor',
                params: {
                    where: {
                        id: idConsignatario
                    }
                }
            }))[0]
            if (consignatario) {
                this.dynamicValues = {
                    ...this.dynamicValues,
                    consignatario
                }
            }
        },
         async buildRedespacho(idRedespacho) {
            this.form.idRedespacho = idRedespacho
            const redespacho = (await this.find({
                updateState: false,
                entity: 'clienteOuFornecedor',
                params: {
                    where: {
                        id: idRedespacho
                    }
                }
            }))[0]
            if (redespacho) {
                this.dynamicValues = {
                    ...this.dynamicValues,
                    redespacho
                }
            }
        },
        async buildFrete (idFrete) {
            this.form.idFrete = idFrete
            const frete = (await this.find({
                updateState: false,
                entity: 'frete',
                params: {
                    where: {
                        id: idFrete
                    }
                }
            }))[0]
            if (frete) {
                this.dynamicValues = {
                    ...this.dynamicValues,
                    frete
                }
            }
        },
    },
}
</script>