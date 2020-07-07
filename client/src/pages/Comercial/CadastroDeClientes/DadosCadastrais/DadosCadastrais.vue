<template>
    <div class="manter-os">

        <v-tabs>
            <v-tab
              href="#tab-0"
                >Dados Cadastrais
            </v-tab>

            <v-tab-item value="tab-0">
                <v-card flat tile>
                    <!-- Dados Cadastrais-->
                    <v-card-text>
                        
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
                                :header="{ type: 'text', text: 'RG', value: '' }"
                                :edited-item="form"
                                />
                            </v-col>
                            <v-col>
                                <custom-input
                                :header="{ type: 'text', text: 'CPF', value: '' }"
                                :edited-item="form"
                                />
                            </v-col>
                            <v-col>
                                <custom-input
                                :header="{ type: 'text', text: 'Telefone', value: '' }"
                                :edited-item="form"
                                />
                            </v-col>
                            <v-col>
                                <custom-input
                                :header="{ type: 'text', text: 'Celular', value: '' }"
                                :edited-item="form"
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <custom-input
                                :header="{ type: 'text', text: 'Email', value: '' }"
                                :edited-item="form"
                                />
                            </v-col>
                            <v-col>
                                <custom-input
                                :header="{ type: 'text', text: 'Nascimento', value: '' }"
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
                                        :header="{ type: 'text', text: 'Endereço', value: '' }"
                                        :edited-item="form"
                                        />
                                    </v-col>
                                    <v-col>
                                        <custom-input
                                        :header="{ type: 'text', text: 'Complemento', value: '' }"
                                        :edited-item="form"
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <custom-input
                                        :header="{ type: 'text', text: 'Número', value: '' }"
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
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<style lang="scss" src="../../GerarOS/GerarOs.scss"></style>

<script>
import CustomInput from '../../../../components/CustomInput'

export default {
    components: { CustomInput },
    data() {
        return {
            form: {},
            optionsStatus: ['Ativo', 'Inativo']
        }
    },
    methods: {
        
    },
}
</script>