<template>
    <v-card-text>
        <h3>Geral</h3>
        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Razão Social', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Nome Fantasia', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'CPF/CNPJ', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Inscrição Estadual', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Inscrição Municipal', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Inscrição na SUFRAMA', value: 'nome' }"
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
                        :header="{ type: 'text', text: 'Endereço conforme CNPJ', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Complemento', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Número', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'CEP', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Bairro', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Estado', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Cidade', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'País', value: '' }"
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
                        :header="{ type: 'text', text: 'Contato Comercial', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Contato Financeiro', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Telefone - Contato Comercial', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Telefone - Contato Financeiro', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Email - Contato Comercial', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                    <v-col>
                        <custom-input
                        :header="{ type: 'text', text: 'Email - Contato Financeiro', value: '' }"
                        :edited-item="form"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-card-text>
</template>

<style lang="scss" src="../GerarOS/GerarOs.scss"></style>

<script>
import CustomInput from '../../../components/CustomInput'
export default {
    components: { CustomInput },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        
    },
}
</script>