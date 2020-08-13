<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab href="#tab-colaboradores">Colaboradores</v-tab>
      <v-tab href="#tab-comunicacao">Comunicação</v-tab>

      <v-tab-item value="tab-colaboradores">
        <v-container>
          <v-row>
            <v-col lg="6" md="12">
              <mini-crud entity="colaboradoresFuncaoCargo" title="Função / Cargo"></mini-crud>
            </v-col>
            <v-col lg="6" md="12">
              <mini-crud entity="colaboradoresSetor" title="Setor"></mini-crud>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-comunicacao">
        <v-container>
          <v-row>
            <v-col lg="6" md="12">
              <mini-crud entity="avisosCategoria" title="Categorias de avisos"></mini-crud>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import MiniCrud from './MiniCrud.vue'

export default {
  components: {
    MiniCrud
  },
  name: 'adm-configuracoes',
  data () {
    return {
      tab: 'tab-gerais'
    }
  }
}
</script>
