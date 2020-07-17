<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" persistent max-width="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Gerar nova OS</span>
                </v-card-title>
                <v-card-text>
                    <v-tabs v-model="currentTab">
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

                        <v-tab
                        href="#tab-ocorrencias"
                            >4. Ocorrências
                        </v-tab>

                        <v-tab-item value="tab-ordem-de-coleta">
                            <ordem-de-coleta :form="form.ordemDeColeta"></ordem-de-coleta>
                        </v-tab-item>

                        <v-tab-item value="tab-mercadorias">
                            <mercadorias :form="form.mercadorias"></mercadorias>
                        </v-tab-item>

                        <v-tab-item value="tab-dados-opcionais">
                            <dados-opcionais :form="form.dadosOpcionais"></dados-opcionais>
                        </v-tab-item>

                        <v-tab-item value="tab-ocorrencias">
                            <ocorrencias :form="form.ocorrencias"></ocorrencias>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialog = false">Cancelar</v-btn>
                    <v-btn color="blue" :disabled="currentTab === 'tab-ordem-de-coleta'" @click="onVoltarDados">Voltar</v-btn>
                    <v-btn color="blue" :disabled="currentTab === 'tab-ocorrencias'" @click="onAvancarDados">Avançar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import OrdemDeColeta from '@/pages/Comercial/GerarOS/OrdemDeColeta'
import Mercadorias from '@/pages/Comercial/GerarOS/Mercadorias'
import DadosOpcionais from '@/pages/Comercial/GerarOS/DadosOpcionais'
import Ocorrencias from '@/pages/Comercial/GerarOS/Ocorrencias'

import { mapActions } from 'vuex'

const TAB_ORDEM_DE_COLETA = 'tab-ordem-de-coleta';
const TAB_MERCADORIAS = 'tab-mercadorias';
const TAB_DADOS_OPCIONAIS = 'tab-dados-opcionais';
const TAB_OCORRENCIAS = 'tab-ocorrencias';

export default {
    components: { 
        OrdemDeColeta,
        Mercadorias,
        DadosOpcionais,
        Ocorrencias
    },
    props: {
        showDialog: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            form: {
                ordemDeColeta: {},
                mercadorias: {},
                dadosOpcionais: {},
                ocorrencias: {}
            },
            currentTab: TAB_ORDEM_DE_COLETA
        }
    },
    methods: {
        ...mapActions('OrdemDeServico', ['loginAction']),
        onVoltarDados() {
            if (this.currentTab === TAB_OCORRENCIAS) {
                this.currentTab = TAB_DADOS_OPCIONAIS
            } else if (this.currentTab === TAB_DADOS_OPCIONAIS) {
                this.currentTab = TAB_MERCADORIAS
            } else if (this.currentTab === TAB_MERCADORIAS) {
                this.currentTab = TAB_ORDEM_DE_COLETA
            }
            console.log('Tab Atual: ', this.currentTab)
        },
        onAvancarDados() {
            if (this.currentTab === TAB_ORDEM_DE_COLETA) {
                this.currentTab = TAB_MERCADORIAS
            } else if (this.currentTab === TAB_MERCADORIAS) {
                this.currentTab = TAB_DADOS_OPCIONAIS
            } else if (this.currentTab === TAB_DADOS_OPCIONAIS) {
                this.currentTab = TAB_OCORRENCIAS
            }
            console.log('Tab Atual: ', this.currentTab)
        }
    }
}
</script>