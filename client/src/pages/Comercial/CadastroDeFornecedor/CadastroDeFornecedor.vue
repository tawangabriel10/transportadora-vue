<template>
    <div class="manter-os">

        <v-btn color="dark" @click="showDialogFornecedores" dark>Cadastro de Fornecedores</v-btn>

        <v-dialog v-model="showDialog" max-width="1000px" max-heigth="1000px">
            <div>
                <v-tabs>
                    <v-tab
                    href="#tab-dados-cadastrais"
                        >1. Dados Cadastrais
                    </v-tab>
                    <v-tab
                    href="#tab-pamento-dados-bancarios-informacoes-fiscais"
                        >2. Pagamento, Dados Bancários e Informações Fiscais
                    </v-tab>
                    <v-tab
                    href="#tab-servicos-produtos-prestados"
                        >3. Serviços e/ou Produtos Prestados
                    </v-tab>

                    <v-tab-item value="tab-dados-cadastrais">
                        <v-card flat tile>

                            <dados-cadastrais></dados-cadastrais>

                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-pamento-dados-bancarios-informacoes-fiscais">
                        <v-card flat tile>

                            <pagamento-dados-bancarios-informacoes-fiscais></pagamento-dados-bancarios-informacoes-fiscais>

                        </v-card>
                    </v-tab-item>

                    <v-tab-item value="tab-servicos-produtos-prestados">
                        <v-card flat tile>

                            <servicos-e-ou-produtos-prestados></servicos-e-ou-produtos-prestados>

                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import DadosCadastrais from '@/pages/Comercial/CadastroDeFornecedor/DadosCadastrais'
import PagamentoDadosBancariosInformacoesFiscais from '@/pages/Comercial/CadastroDeFornecedor/PagamentoDadosBancariosInformacoesFiscais'
import ServicosEOuProdutosPrestados from '@/pages/Comercial/CadastroDeFornecedor/ServicosEOuProdutosPrestados'

export default {
    components: {
        DadosCadastrais,
        PagamentoDadosBancariosInformacoesFiscais,
        ServicosEOuProdutosPrestados
    },
    data() {
        return {
            showDialog: false
        }
    },
    methods: {
        showDialogFornecedores() {
            this.showDialog = true
        }
    }
}
</script>