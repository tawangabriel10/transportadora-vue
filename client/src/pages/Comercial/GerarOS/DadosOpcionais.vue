<template>
  <div>
    <v-form v-model="form.valid">
      <v-row>
        <v-col>
          <h3>Importação/Exportação</h3>
          <v-row>
            <v-col>
              <v-select label="Tipo do Contêiner" :items="[]" v-model="form.tipoContainer"></v-select>
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Nº Contêiner', value: 'numeroContainer' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Navio', value: 'navio' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Armador', value: 'armador' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Booking', value: 'booking' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'DI/DTA', value: 'diDta' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Agência', value: 'agencia' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Porto', value: 'porto' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Doc. Aduaneiro', value: 'docAduaneiro' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Seguro</h3>
          <v-row>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Seguradora', value: 'seguradora' }"
                :edited-item="form"
              />
            </v-col>
            <v-col>
              <custom-input
                :header="{ type: 'text', text: 'Nº Apólice', value: 'numeroApolice' }"
                :edited-item="form"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<style lang="scss" src="@/pages/Comercial/Comercial.scss"></style>

<script>
import { mapActions } from "vuex";
import CustomInput from "@/components/CustomInput";

export default {
  components: { CustomInput },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dynamicValues: {
        consignatario: {},
        redespacho: {},
        dadosFrete: {},
      },
      customInputs: {
        consignatarioProps: {
          header: {
            type: "grid-select-item-crud",
            text: "Dados do Consignatário",
            value: "consignatario",
            entity: "clienteOuFornecedor",
            headers: [
              { text: "Nome / Razão Social", value: "razaoSocial" },
              { text: "Nome do Responsável", value: "nomeResponsavel" },
              { text: "Contato do Responsável", value: "contatoResponsavel" },
              { text: "Endereço", value: "enderecoGeradoPeloCep" },
              { text: "Bairro", value: "enderecoBairro" },
              { text: "Cidade", value: "enderecoGeradoCidade" },
              { text: "UF", value: "enderecoGeradoUf" },
              { text: "Telefone", value: "telefone" },
            ],
            onSelectRow: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
          },
        },
        redespachoProps: {
          header: {
            type: "grid-select-item-crud",
            text: "Dados do Redespacho",
            value: "redespacho",
            entity: "clienteOuFornecedor",
            headers: [
              { text: "Nome / Razão Social", value: "razaoSocial" },
              { text: "Nome do Responsável", value: "nomeResponsavel" },
              { text: "Contato do Responsável", value: "contatoResponsavel" },
              { text: "Endereço", value: "enderecoGeradoPeloCep" },
              { text: "Bairro", value: "enderecoBairro" },
              { text: "Cidade", value: "enderecoGeradoCidade" },
              { text: "UF", value: "enderecoGeradoUf" },
              { text: "Telefone", value: "telefone" },
            ],
            onSelectRow: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
          },
        },
        freteProps: {
          header: {
            type: "grid-select-item-crud",
            text: "Dados do Frete",
            value: "frete",
            entity: "clienteOuFornecedor",
            headers: [
              { text: "Nome / Razão Social", value: "razaoSocial" },
              { text: "Nome do Responsável", value: "nomeResponsavel" },
              { text: "Contato do Responsável", value: "contatoResponsavel" },
              { text: "Endereço", value: "enderecoGeradoPeloCep" },
              { text: "Bairro", value: "enderecoBairro" },
              { text: "Cidade", value: "enderecoGeradoCidade" },
              { text: "UF", value: "enderecoGeradoUf" },
              { text: "Telefone", value: "telefone" },
            ],
            onSelectRow: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
            onSave: async (item) => {
              //await this.buildVeiculoPrincipal(item.id)
            },
          },
        },
      },
    };
  },
  methods: {
    ...mapActions("Crud", ["find", "updateRow", "insertRow"]),
    async buildConsignatario(idConsignatario) {
      this.form.idConsignatario = idConsignatario;
      const consignatario = (
        await this.find({
          updateState: false,
          entity: "clienteOuFornecedor",
          params: {
            where: {
              id: idConsignatario,
            },
          },
        })
      )[0];
      if (consignatario) {
        this.dynamicValues = {
          ...this.dynamicValues,
          consignatario,
        };
      }
    },
    async buildRedespacho(idRedespacho) {
      this.form.idRedespacho = idRedespacho;
      const redespacho = (
        await this.find({
          updateState: false,
          entity: "clienteOuFornecedor",
          params: {
            where: {
              id: idRedespacho,
            },
          },
        })
      )[0];
      if (redespacho) {
        this.dynamicValues = {
          ...this.dynamicValues,
          redespacho,
        };
      }
    },
    async buildFrete(idFrete) {
      this.form.idFrete = idFrete;
      const frete = (
        await this.find({
          updateState: false,
          entity: "frete",
          params: {
            where: {
              id: idFrete,
            },
          },
        })
      )[0];
      if (frete) {
        this.dynamicValues = {
          ...this.dynamicValues,
          frete,
        };
      }
    },
  },
};
</script>