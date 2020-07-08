<template>
    <div class="manter-os">

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
                <v-card flat tile>
                
                    <informacoes></informacoes>     

                </v-card>
            </v-tab-item>

            <v-tab-item value="tab-previsao">
                <v-card flat tile>

                    <previsao></previsao>

                </v-card>
            </v-tab-item>

            <v-tab-item value="tab-trajeto">
                <v-card flat tile>

                    <trajeto></trajeto>

                </v-card>
            </v-tab-item>

        </v-tabs>
    </div>
</template>

<script>
import Informacoes from '@/pages/Logistica/MapaDeViagem/Informacoes'
import Previcao from '@/pages/Logistica/MapaDeViagem/Previsao'
import Trajeto from '@/pages/Logistica/MapaDeViagem/Trajeto'

export default {
    components: { 
        Informacoes,
        Previcao,
        Trajeto
     }
}
</script>