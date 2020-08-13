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

    <modal-gerar-o-s :show-dialog="showDialog"></modal-gerar-o-s>
  </div>
</template>

<script>
import Crud from '@/components/Crud'
import ModalGerarOS from '@/pages/Comercial/GerarOS/ModalGerarOS'

export default {
  components: {
    Crud,
    ModalGerarOS
  },
  data () {
    return {
      headers: [
        { text: 'ID', value: 'id', options: { disabled: true }, hideOnAdd: false },
        { text: 'Nº Ordem de Serviço', value: 'numOrdemServico', type: 'text' },
        { text: 'Data da Emissão', value: 'dataEmissao', type: 'date' },
        { text: 'Data Coleta', value: 'dataColeta', type: 'date' },
        { text: 'Status', value: 'status', type: 'text' },
        { text: 'Local Coleta', value: 'localColeta', type: 'text' },
        { text: 'Local Entrega', value: 'localEntrega', type: 'text' },
        { text: 'Nome Solicitante', value: 'nomeSolicitante', type: 'text' },
        { text: 'Nome Rementente', type: 'text', value: 'nomeRemetenteContatoResponsavel', hide: true },
        { text: 'Nome Destinatario', type: 'text', value: 'nomeRemetenteContatoResponsavel', hide: true  },
        { text: 'Remetente', value: 'idRemetente', lookup: 'clienteOuFornecedor', hide: true },
        { text: 'Ações', value: 'action', sortable: true },
      ],
      showDialog: false
    }
  },
  methods: {
    async onClickAdicionar () {
      //await this.$router.push({ path: `/comercial/ordem-de-servico` })
      this.showDialog = true
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
