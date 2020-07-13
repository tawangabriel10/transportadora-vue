<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" max-width="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Mapa de Viagem</span>
                </v-card-title>
                <v-card-text>
                    <v-tabs>
                        <v-tab
                            href="#tab-informacoes"
                            >1. Informações
                        </v-tab>
                        <v-tab
                            href="#tab-previsao"
                            >2. Previsão
                        </v-tab>
                        <v-tab
                            href="#tab-trajeto"
                            >3. Trajeto
                        </v-tab>

                        <v-tab-item value="tab-informacoes">
                            <informacoes></informacoes>     
                        </v-tab-item>

                        <v-tab-item value="tab-previsao">
                            <previsao></previsao>
                        </v-tab-item>

                        <v-tab-item value="tab-trajeto">
                            <trajeto></trajeto>
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
import Informacoes from '@/pages/Logistica/MapaDeViagem/Informacoes'
import Previsao from '@/pages/Logistica/MapaDeViagem/Previsao'
import Trajeto from '@/pages/Logistica/MapaDeViagem/Trajeto'

export default {
    components: { 
        Informacoes,
        Previsao,
        Trajeto
     },
     data() {
         return {
             showDialog: true
         }
     },
}
</script>