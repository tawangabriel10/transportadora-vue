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
        { text: 'ID', value: 'id', options: { disabled: true }, hideOnAdd: false },
        { text: 'Data da Emissão', value: 'dataEmissao', type: 'date' },
        { text: 'Código IBGE', value: 'localEmissaoCodIbge', type: 'virtual' },
        { text: 'Data Coleta', value: 'dataColeta', type: 'date' },
        { text: 'Hora Limite', value: 'horaLimite', type: 'date' },
        { text: 'Status', value: 'status', type: 'virtual' },
        { text: 'Local Coleta', value: 'localColeta', type: 'virtual' },
        { text: 'Local Entrega', value: 'localEntrega', type: 'virtual' },
        { text: 'Nome Solicitante', value: 'nomeSolicitante', type: 'virtual' },
        { text: 'Código Remetente', type: 'virtual', value: 'idRemetente' },
        { text: 'Nome Rementente', type: 'virtual', value: 'nomeRemetenteContatoResponsavel' },
        { text: 'Código Destinatário', type: 'virtual', value: 'idRemetente' },
        { text: 'Nome Destinatario', type: 'virtual', value: 'nomeRemetenteContatoResponsavel' },
        { text: 'Remetente', value: 'idRemetente', lookup: 'clienteOuFornecedor', hide: true },
        { text: 'Ações', value: 'action', sortable: true },
      ]
    }
  },
  methods: {
    async onClickAdicionar () {
      await this.$router.push({ path: `/comercial/ordem-de-servico` })
    },
    async onClickEditRow (row) {
      await this.$router.push({ path: `/comercial/ordem-de-servico/${row.id}` })
    },
    async onClickDeleteRow (row) {
        console.log('Excluir ordem servico', row)
    }
  }
}
</script>
