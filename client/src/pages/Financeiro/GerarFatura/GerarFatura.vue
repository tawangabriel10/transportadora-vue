<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" persistent max-width="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Gerar Fatura</span>
                </v-card-title>
                <v-card-text>
                    <v-tabs>
                        <v-tab
                            href="#tab-contabilizacao"
                            >1. Contabilização
                        </v-tab>

                        <v-tab
                            href="#tab-cobranca"
                            >2. Cobrança
                        </v-tab>

                        <v-tab-item value="tab-contabilizacao">
                            <contabilizacao></contabilizacao>
                        </v-tab-item>

                        <v-tab-item value="tab-cobranca">
                            <cobranca></cobranca>
                        </v-tab-item>
                        
                    </v-tabs>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialog = false">Cancelar</v-btn>
                    <v-btn color="blue" @click="showDialog = false">Cadastrar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import Contabilizacao from '@/pages/Financeiro/GerarFatura/Contabilizacao'
import Cobranca from '@/pages/Financeiro/GerarFatura/Cobranca'

export default {
    components: {
        Contabilizacao,
        Cobranca
     },
    data() {
        return {
            showDialog: true
        }
    },
}
</script>