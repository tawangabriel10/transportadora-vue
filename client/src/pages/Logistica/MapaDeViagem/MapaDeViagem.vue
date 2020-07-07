<template>
    <div class="manter-os">

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

                    <v-row>
                        <v-col>
                        <v-row>
                            <v-col>
                                <custom-input
                                    title="Veículo Principal"
                                    v-bind="customInputs.veiculoPrincipalProps"
                                    :edited-item="form"
                            />
                            </v-col>
                            <v-col>
                                <v-text-field disabled
                                    label="Descrição"
                                    v-if="form.idVeiculoPrincipal"
                                    :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nome" />
                            </v-col>
                            <v-col>
                                <v-text-field disabled
                                    label="Placa"
                                    v-if="form.idVeiculoPrincipal"
                                    :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.placa" />
                            </v-col>
                            <v-col>
                                <v-text-field disabled
                                    label="Marca/Modelo"
                                    v-if="form.idVeiculoPrincipal"
                                    :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.marcaModelo" />
                            </v-col>
                            <v-col>
                                <v-text-field disabled
                                    label="Tipo do Veículo"
                                    v-if="form.idVeiculoPrincipal"
                                    :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.tipoVeiculo && dynamicValues.veiculoPrincipal.tipoVeiculo.nome"
                            />
                            </v-col>
                            <v-col>
                                <v-text-field disabled
                                    label="Chassi"
                                    v-if="form.idVeiculoPrincipal"
                                    :value="dynamicValues.veiculoPrincipal && dynamicValues.veiculoPrincipal.nChassi"
                            />
                            </v-col>
                        </v-row>
                    </v-col>
                  </v-row>

                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import CustomInput from '@/components/CustomInput'

export default {
    components: { CustomInput }
}
</script>