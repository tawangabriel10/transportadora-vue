<template>
  <div>
    <crud ref="crud"
          entity="ordemServico"
          title="Ordem De Serviço"
          :headers="headers"
          :sort-by="['id']"
          :show-kpis="false"
          :on-click-adicionar="onClickAdicionar"
          :on-click-edit-row="onClickEditRow"
    >
    </crud>
  </div>
</template>

<script>
import Crud from '@/components/Crud'

export default {
  components: {
    Crud
  },
  data () {
    return {
      headers: [
        { text: 'Ações', value: 'action', sortable: false },
        { text: 'ID', value: 'id', options: { disabled: true }, hideOnAdd: true },
        { text: 'Local Emissão Cod. IBGE', value: 'localEmissaoCodIbge' },
        { text: 'Local Emissão Desc.', value: 'localEmissaoDesc' },
        { text: 'Data Coleta', value: 'dataColeta', type: 'date' },
        { text: 'Local Coleta', value: 'localColeta' },
        { text: 'Local Entrega', value: 'localEntrega' },
        { text: 'Nome Solicitante', value: 'nomeSolicitante' },
        { text: 'Remetente', value: 'idRemetente', lookup: 'clienteOuFornecedor' },
        { text: 'Destinatario', value: 'idDestinatario', lookup: 'clienteOuFornecedor' },
        { text: 'VeículoPrincipal', value: 'idVeiculoPrincipal', lookup: 'veiculos' },
        { text: 'Motorista', value: 'idMotorista', lookup: 'motorista' },
        { text: 'Chapa', value: 'chapa' },
        { text: 'Consignatário', value: 'idConsignatario' },
      ]
    }
  },
  methods: {
    async onClickAdicionar () {
      await this.$router.push({ path: `/comercial/ordem-de-servico` })
    },
    async onClickEditRow (row) {
      await this.$router.push({ path: `/comercial/ordem-de-servico/${row.id}` })
    }
  }
}
</script>
