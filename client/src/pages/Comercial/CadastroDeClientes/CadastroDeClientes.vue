<template>
    <div class="manter-os">

        <v-btn color="dark" @click="showDialogClientes" dark>Cadastrar Cliente</v-btn>

        <v-dialog v-model="showDialog" max-width="1000px" max-heigth="1000px">
            <div>
                <v-tabs>
                    <v-tab
                    href="#tab-dados-cadastrais"
                        >1. Dados Cadastrais
                    </v-tab>

                    <v-tab-item value="tab-dados-cadastrais">
                        <v-card flat title>

                            <dados-cadastrais></dados-cadastrais>

                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>

        </v-dialog>
    </div>
</template>

<style lang="scss" src="../GerarOS/GerarOs.scss"></style>

<script>
import DadosCadastrais from '@/pages/Comercial/CadastroDeClientes/DadosCadastrais'

export default {
    components: { DadosCadastrais },
    data() {
        return {
            showDialog: false
        }
    },
    methods: {
        showDialogClientes() {
            this.showDialog = true
        }
    }
}
</script>