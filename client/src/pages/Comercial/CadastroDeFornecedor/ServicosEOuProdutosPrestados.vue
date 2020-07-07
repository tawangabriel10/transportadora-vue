<template>
    <v-card-text>
        <h3>Serviços</h3>
        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Serviço ou Produto Prestado', value: '' }"
                :edited-item="form"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <custom-input
                :header="{ type: 'text', text: 'Horário de Atendimento', value: '' }"
                :edited-item="form"
                />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <h3>Anexos</h3>
                <v-row>
                    <v-col>
                        <h4>O formato dos arquivos deverão ser PDF, DOC ou DOCX. O limite para o tamanho dos arquivos é de 1MB</h4>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h3>Cartão CNPJ</h3>
                        <input type="file" @change="processFile($event)">
                    </v-col>
                    <v-col>
                        <h3>Cópia do Alvará de Funcionamento</h3>
                        <input type="file" @change="processFile($event)">
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <h3>Comprovante de Inscrições Estadual/Municipal</h3>
                        <input type="file" @change="processFile($event)">
                    </v-col>
                    <v-col>
                        <h3>Fotos da Empresa</h3>
                        <input type="file" @change="processFile($event)">
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
import CustomInput from '@/components/CustomInput'

export default {
    components: { CustomInput },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        processFile(event) {

        }
    },
}
</script>