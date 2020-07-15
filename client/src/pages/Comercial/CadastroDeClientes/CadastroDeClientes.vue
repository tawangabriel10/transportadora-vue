<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" max-width="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Cadastro de Clientes</span>
                </v-card-title>
                <v-card-text>
                    <v-tabs>
                        <v-tab
                        href="#tab-dados-cadastrais"
                            >1. Dados Cadastrais
                        </v-tab>

                        <v-tab-item value="tab-dados-cadastrais">

                            <dados-cadastrais-cliente :form="form.dadosCadastrais"></dados-cadastrais-cliente>
                        
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialog = false">Cancelar</v-btn>
                    <v-btn color="blue" @click="onCadastrar">Cadastrar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import DadosCadastraisCliente from '@/pages/Comercial/CadastroDeClientes/DadosCadastraisCliente'

export default {
    components: { DadosCadastraisCliente },
    data() {
        return {
            showDialog: true,
            form: {
                dadosCadastrais: {}
            }
        }
    },
    methods: {
        onCadastrar() {

        }
    }
}
</script>