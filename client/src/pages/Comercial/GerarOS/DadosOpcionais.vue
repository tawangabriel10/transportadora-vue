<template>
    <div>
        <v-col>
            <h3>Dados do Consignatário</h3>
            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <custom-input
                            title="Dados do Consignatário"
                            v-bind="customInputs.dadosDoConsignatarioProps"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field disabled
                            label="Código"
                            v-if="form.idDadosDoConsignatario"
                            :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nome" />
                        </v-col>
                        <v-col>
                            <v-text-field disabled
                            label="Nome/Razçao Social"
                            v-if="form.idDadosDoConsignatario"
                            :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col>
                            <custom-input
                            title="Dados do Redespacho"
                            v-bind="customInputs.dadosDoRedespachoProps"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field disabled
                            label="Código"
                            v-if="form.idDadosDoRedespacho"
                            :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nome" />
                        </v-col>
                        <v-col>
                            <v-text-field disabled
                            label="Nome/Razçao Social"
                            v-if="form.idDadosDoRedespacho"
                            :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Dados da Tabela de Frete</h3>
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
                            :header="{ type: 'text', text: 'Ad-Valorem', value: 'adValoragem' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Seguro', value: 'seguro' }"
                            :edited-item="form"
                            />
                        </v-col>
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
                            :header="{ type: 'text', text: 'T. Prestação', value: 'taxaPrestacao' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
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
                            :header="{ type: 'text', text: 'Outros', value: 'outros' }"
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

            <v-row>
                <v-col>
                    <h3>Informações de Identificação</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número de Referência', value: 'numeroReferencia' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'currency', text: 'Valor de Referência', value: 'valorReferencia' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Conhecimento', value: 'conhecimento' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Nota Fiscal', value: 'notaFiscal' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Finalidade do Transporte (Modalidade)', value: 'finalidadeTransporte' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Material', value: 'material' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número de Risco', value: 'numeroRisco' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número ONU', value: 'numeroONU' }"
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
                            :header="{ type: 'text', text: 'Número da Apólice', value: 'numeroApolice' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Importação / Exportação</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número do Contâiner', value: 'numeroContainer' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Tipo do Contâiner', value: 'tipoContainer' }"
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
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Booking', value: 'booking' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Doc. Aduaneiro', value: 'docAduaneiro' }"
                            :edited-item="form"
                            />
                        </v-col>
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
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
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
            customInputs: {
                dadosDoConsignatarioProps: {
                    header: {
                        type: 'grid-select-item-crud',
                        text: 'Dados do Consignatário',
                        value: 'idDadosDoConsignatario',
                        entity: 'veiculos',
                        headers: [
                            { text: 'Código', value: 'codigo' },
                            { text: 'Nome/Razão Social', value: 'nomeRazaoSocial' },
                        ],
                        onSelectRow: async (item) => {
                            //await this.buildVeiculoPrincipal(item.id)
                        },
                        onSave: async (item) => {
                            //await this.buildVeiculoPrincipal(item.id)
                        }
                    }
                },
                dadosDoRedespachoProps: {
                    header: {
                        type: 'grid-select-item-crud',
                        text: 'Dados do Redespacho',
                        value: 'idDadosDoRedespacho',
                        entity: 'veiculos',
                        headers: [
                            { text: 'Código', value: 'codigo' },
                            { text: 'Nome/Razão Social', value: 'nomeRazaoSocial' },
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
        
    },
}
</script>