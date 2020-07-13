<template>
    <div class="manter-os">

        <v-dialog v-model="showDialog" max-width="1000px" max-heigth="1000px">
            <v-card flat title>
                <v-card-title>
                    <span class="headline">Acerto de Viagem</span>
                </v-card-title>
                <v-card-text>
                    <v-tabs>
                        <v-tab
                            href="#tab-acerto"
                            >1. Informações
                        </v-tab>

                        <v-tab-item value="tab-acerto">
                            <acerto></acerto>     
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

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import Acerto from '@/pages/Logistica/AcertoDeViagem/Acerto'

export default {
    components: { Acerto },
    data() {
        return {
            showDialog: true
        }
    },
}
</script>