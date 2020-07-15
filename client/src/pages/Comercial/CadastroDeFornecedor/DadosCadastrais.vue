<template>
    <div>
        <v-col>
            <h3>Geral</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Razão Social', value: 'razaoSocial' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Nome Fantasia', value: 'nomeFantasia' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'CPF/CNPJ', value: 'cnpj' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Inscrição Estadual', value: 'inscricaoEstadual' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Inscrição Municipal', value: 'inscricaoMunicipal' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Inscrição na SUFRAMA', value: 'inscricaoSuframa' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Localização</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Endereço conforme CNPJ', value: 'enderecoGeradoPeloCep' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Complemento', value: 'enderecoComplemento' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número', value: 'enderecoNumero' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'CEP', value: 'cep' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Bairro', value: 'enderecoBairro' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Estado', value: 'enderecoGeradoEstado' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Cidade', value: 'enderecoGeradoCidade' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'País', value: 'enderecoGeradoPais' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Contatos</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Contato Comercial', value: 'contatoComercial' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Contato Financeiro', value: 'contatoFinanceiro' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Telefone - Contato Comercial', value: 'contatoTelefoneComercial' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Telefone - Contato Financeiro', value: 'contatoTelefoneFinanceiro' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Email - Contato Comercial', value: 'contatoEmailComercial' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Email - Contato Financeiro', value: 'contatoEmailFinanceiro' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

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

        }
    },
    methods: {
        
    },
}
</script>