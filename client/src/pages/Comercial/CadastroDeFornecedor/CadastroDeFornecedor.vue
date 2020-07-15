<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" max-width="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Cadastro de Fornecedor</span>
                </v-card-title>
                <v-card-text>
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

                            <dados-cadastrais-fornecedor :form="form.dadosCadastrais"></dados-cadastrais-fornecedor>

                        </v-tab-item>

                        <v-tab-item value="tab-pamento-dados-bancarios-informacoes-fiscais">

                            <pagamento-dados-bancarios-informacoes-fiscais :form="form.pagamentoDadosBancarios"></pagamento-dados-bancarios-informacoes-fiscais>

                        </v-tab-item>

                        <v-tab-item value="tab-servicos-produtos-prestados">

                            <servicos-e-ou-produtos-prestados :form="form.servicosProdutosPrestados"></servicos-e-ou-produtos-prestados>

                        </v-tab-item>
                    </v-tabs>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="blue" @click="dialog = false">Cadastrar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<script>
import DadosCadastraisFornecedor from '@/pages/Comercial/CadastroDeFornecedor/DadosCadastraisFornecedor'
import PagamentoDadosBancariosInformacoesFiscais from '@/pages/Comercial/CadastroDeFornecedor/PagamentoDadosBancariosInformacoesFiscais'
import ServicosEOuProdutosPrestados from '@/pages/Comercial/CadastroDeFornecedor/ServicosEOuProdutosPrestados'

export default {
    components: {
        DadosCadastraisFornecedor,
        PagamentoDadosBancariosInformacoesFiscais,
        ServicosEOuProdutosPrestados
    },
    data() {
        return {
            showDialog: true,
            form: {
                dadosCadastrais: {},
                pagamentoDadosBancarios: {},
                servicosProdutosPrestados: {}
            }
        }
    },
    methods: {

    }
}
</script>