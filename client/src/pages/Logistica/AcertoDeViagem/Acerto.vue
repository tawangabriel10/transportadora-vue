<template>
    <div>
        <v-col>
            <h3>Despesas Gastas</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Adiantamento antes da Viagem', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Adiantamento durante a Viagem', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Manutenção do Veículo', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Total de Gastos', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Pedágios', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Gasto com Estadia', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Abastecimento', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Duração</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Local de Saída', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Local de Destino', value: '' }"
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
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <h3>Anexos</h3>
                    <v-row>
                        <v-col>
                            <h3>Anexo de Documentos, comprovantes, notas fiscais...</h3>
                            <input type="file" @change="processFile($event)">
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
    components: {
        CustomInput
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        processFile(event) {

        }
    }
}
</script>