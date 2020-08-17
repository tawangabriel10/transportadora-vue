<template>
  <div class="manter-os">
    <v-dialog v-model="showDialog" persistent max-width="1000px">
      <v-card flat tile>
        <v-card-title>
          <span class="headline">Gerar nova OS</span>
        </v-card-title>
        <v-card-text>
          <v-tabs v-model="currentTab">
            <v-tab class="disabledTab" href="#tab-dados-proposta">Dados Proposta</v-tab>

            <v-tab-item value="tab-dados-proposta">
              <v-form ref="form" v-model="form.valid">
                <v-col>
                    <h3>Dados Proposta</h3>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: 'Nº Proposta', value: 'numProposta' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <custom-input
                            :header="{ type: 'text', text: '', value: '' }"
                            :edited-item="form"
                            />
                        </v-col>
                    </v-row>
                </v-col>
              </v-form>
            </v-tab-item>

          </v-tabs>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="blue" @click="showDialog = false">Cancelar</v-btn>
          <v-btn
            color="blue"
            @click="onShowOcorrencias"
          >Ocorrências</v-btn>
          <v-btn
            color="blue"
            @click="onVoltarDados"
          >Voltar</v-btn>
          <v-btn
            color="blue"
            @click="onAvancarDados"
          >Avançar</v-btn>
          <v-btn color="blue" @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<style scoped>
.disabledTab {
  pointer-events: none;
}
</style>

<script>

import { mapActions } from "vuex";
import CustomInput from "@/components/CustomInput";

export default {
  components: {
    CustomInput
  },
  props: {
    showDialog: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    ...mapActions("Crud", ["find", "updateRow", "insertRow"]),
    async getCurrentProposta(id) {
      this.currentProposta =
        (
          await this.find({
            entity: "proposta",
            params: {
              where: {
                id,
              }
            },
          })
        )[0] || {};
      console.log("CURRENT PROPOSTA", this.currentProposta);
      this.form = {
        ...this.form,
        ...this.currentProposta,
      };
    },
    async salvar() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let entity = {
        ...this.form
        };
      console.log("ENTITY", entity);
      if (this.id) {
        await this.updateRow({
          updateState: false,
          entity: "proposta",
          key: this.id,
          values: entity,
        });
        await this.getCurrentOs(this.id);
      } else {
        const os = await this.insertRow({
          updateState: false,
          entity: "proposta",
          values: entity,
        });
        //  await this.$router.push({ path: `/comercial/ordem-de-servicos` });
        this.showDialog = false;
        this.getCurrentOs(os.id);
      }
    },
  },
};
</script>