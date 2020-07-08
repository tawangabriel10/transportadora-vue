<template>
    <v-card-text>
        <h3>Motorista</h3>
        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Nome', value: 'nome' }"
                :edited-item="form"
                />
            </v-col>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Celular', value: 'celular' }"
                :edited-item="form"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'time', text: 'Hora da Partida', value: '' }"
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
                                                title="Veículo Principal"
                                                v-bind="customInputs.veiculoPrincipalProps"
                                                :edited-item="form"
                                        />
                                        </v-col>
                                        <v-col>
                                            <v-text-field disabled
                                                label="Descrição"
                                                v-if="form.idVeiculoPrincipal"
                                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nome" />
                                        </v-col>
                                        <v-col>
                                            <v-text-field disabled
                                                label="Placa"
                                                v-if="form.idVeiculoPrincipal"
                                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                                        </v-col>
                                        <v-col>
                                            <v-text-field disabled
                                                label="Marca/Modelo"
                                                v-if="form.idVeiculoPrincipal"
                                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.marcaModelo" />
                                        </v-col>
                                        <v-col>
                                            <v-text-field disabled
                                                label="Tipo do Veículo"
                                                v-if="form.idVeiculoPrincipal"
                                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.tipoVeiculo && dynamicValues.veiculoPrincipal.tipoVeiculo.nome"
                                        />
                                        </v-col>
                                        <v-col>
                                            <v-text-field disabled
                                                label="Chassi"
                                                v-if="form.idVeiculoPrincipal"
                                                :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nChassi"
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
    </v-card-text>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            form: {},
            dynamicValues: {}
        }
    },
}
</script>