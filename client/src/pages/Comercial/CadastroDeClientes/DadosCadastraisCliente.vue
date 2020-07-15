<template>
    <div>
        <v-col>
            <h3>Geral</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Nome', value: 'nome' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Status', value: 'status', items: optionsStatus }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'RG', value: 'rg' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'CPF', value: 'cpf' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Telefone', value: 'telefone' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Celular', value: 'telefoneCelular' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Email', value: 'email' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Nascimento', value: 'dataNascimento' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Endereço</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Endereço', value: 'enderecoGeradoPeloCep' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Complemento', value: 'enderecoComplemento' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Número', value: 'enderecoNumero' }"
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
        },
    },
    data() {
        return {
            optionsStatus: ['Ativo', 'Inativo']
        }
    },
    methods: {
        
    },
}
</script>