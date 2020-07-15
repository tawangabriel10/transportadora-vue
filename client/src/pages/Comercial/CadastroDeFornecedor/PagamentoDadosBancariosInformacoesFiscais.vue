<template>
    <div>
        <v-col>
            <h3>Pagamentos</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Razão Social', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'CNPJ', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Formas de Pagamento', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Agência (com Dígito)', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Conta Corrente', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Banco', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Número do Banco', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Cidade Agência', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'UF da Conta', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Informações Fiscais</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Modalidade', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Tipo de Contribuinte', value: '' }"
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
        }
    },
}
</script>