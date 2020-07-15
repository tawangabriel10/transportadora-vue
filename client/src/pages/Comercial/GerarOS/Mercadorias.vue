<template>
    <div>
        <v-col>
            <h3>Dados da Mercadoria</h3>
            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Quantidade', value: 'quantidade' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Unidade', value: 'unidade' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Peso Bruto', value: 'pesoBrutoKg' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Peso Líquido', value: 'pesoLiquidoKg' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Cubagem', value: 'cubagem' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Nº Nota Fiscal', value: 'nNotaFiscal' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Data de Emissão', value: 'dataEmissao' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Valor da Nota Fiscal', value: 'valorNotaFiscal' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Natureza da Carga', value: 'idNaturezaCarga' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Espécie do Volume ou Mercadoria', value: 'especieVolumeCategoria' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Produto Transportado', value: 'produtoTransportado' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Tara', value: 'tara' }"
                    :edited-item="form"
                    />
                </v-col>
                <v-col>
                    <custom-input
                    :header="{ type: 'text', text: 'Lacre', value: 'lacre' }"
                    :edited-item="form"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <custom-input
                    :header="{ type: 'textarea', text: 'Observações', value: 'observacoes' }"
                    :edited-item="form"
                    />
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
    methods: {
        
    },
}
</script>