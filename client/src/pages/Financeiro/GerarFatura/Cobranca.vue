<template>
    <div>
        <v-col>
            <h3>Cobrança</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Descrição do Serviço', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Número OS', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'textarea', text: 'Observações / Memorando', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'date', text: 'Data da Fatura', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'date', text: 'Vencimento da Fatura', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Subtotal', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'currency', text: 'Impostos', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Total da Fatura', value: '' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<script>
import CustomInput from '@/components/CustomInput'

export default {
    components: { CustomInput },
    data() {
        return {
            form: {}
        }
    },
}
</script>