<template>
    <div class="manter-os">
        <!-- Mercadorias-->
        <v-card-text>
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
                            :header="{ type: 'text', text: 'Valor do Frete', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Pedágio', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Ad-Valorem', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Seguro', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Taxa Aérea', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Taxa Coleta', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'T. Prestação', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Taxa de Entrega', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Redespacho', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Outros', value: '' }"
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
                            :header="{ type: 'date', text: 'Data de Chegada', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'time', text: 'Hora de Chegada', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Forma de Pagamento', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Resp. Pagamento', value: '' }"
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
                            :header="{ type: 'text', text: 'Número de Referência', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Valor de Referência', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Conhecimento', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Nota Fiscal', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Finalidade do Transporte (Modalidade)', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Material', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número de Risco', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número ONU', value: '' }"
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
                            :header="{ type: 'text', text: 'Seguradora', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número da Apólice', value: '' }"
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
                            :header="{ type: 'text', text: 'Número do Contâiner', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Tipo do Contâiner', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Navio', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Armador', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Booking', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Doc. Aduaneiro', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'DI/DTA', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Agência', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Porto', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </div>
</template>

<script>
import CustomInput from '../../../../components/CustomInput'

export default {
    components: { CustomInput },
    data() {
        return {
            form: {},
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