<template>
    <div class="manter-os">

        <v-btn color="dark" @click="showDialogOS" dark>Cadastrar Ordem de Serviço</v-btn>

        <v-dialog v-model="showDialog" max-width="1000px" max-heigth="1000px">
            <div>
                <v-tabs>
                    <v-tab
                    href="#tab-ordem-de-coleta"
                        >1. Ordem de Coleta
                    </v-tab>

                    <v-tab
                    href="#tab-mercadorias"
                        >2. Mercadorias
                    </v-tab>

                    <v-tab
                    href="#tab-dados-opcionais"
                        >3. Dados Opcionais
                    </v-tab>

                    <v-tab-item value="tab-ordem-de-coleta">
                        <v-card flat title>

                            <v-card-text>
                                <ordem-de-coleta></ordem-de-coleta>
                            </v-card-text>

                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-mercadorias">
                        <v-card flat title>

                            <v-card-text>
                                <mercadorias></mercadorias>
                            </v-card-text>

                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-dados-opcionais">
                        <v-card flat title>

                            <v-card-text>
                                <dados-opcionais></dados-opcionais>
                            </v-card-text>

                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>

        </v-dialog>
    </div>
</template>

<style lang="scss" src="./GerarOs.scss"></style>

<script>
import OrdemDeColeta from '@/pages/Comercial/GerarOS/OrdemDeColeta'
import Mercadorias from '@/pages/Comercial/GerarOS/Mercadorias'
import DadosOpcionais from '@/pages/Comercial/GerarOS/DadosOpcionais'

export default {
    components: { 
        OrdemDeColeta,
        Mercadorias,
        DadosOpcionais
    },
    data() {
        return {
            showDialog: false
        }
    },
    methods: {
        showDialogOS() {
            this.showDialog = true
        }
    }
}
</script>