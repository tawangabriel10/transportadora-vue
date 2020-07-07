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

                            

                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-vinculados">
                        <v-card flat tile>

                            

                        </v-card>
                    </v-tab-item>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            form: {}
        }
    },
}
</script>