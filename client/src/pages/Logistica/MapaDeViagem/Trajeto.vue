<template>
    <div>
        <v-col>
            <h3>Trajeto</h3>
            <v-row>
                <v-col>
                    <google-map-loader
                        apiKey="AIzaSyAf-xnHv62Jr4C2nnd2Dl5HP4zWPhaDRMQ"
                    >
                        <template slot-scope="{ google, map }">
                            {{ map }}
                            {{ google }}
                        </template>
                    </google-map-loader>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Quilometragem Prevista', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Locais de Pedágio', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </div>
</template>

<script>
import GoogleMapLoader from '@/components/GoogleMapLoader'
import CustomInput from '@/components/CustomInput'

export default {
    components: {
        GoogleMapLoader,
        CustomInput
    },
    data() {
        return {
            form: {}
        }
    },
}
</script>