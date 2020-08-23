<template>
  <div>
    <crud ref="crud"
          entity="proposta"
          title="Cadastrar Proposta"
          :headers="headers"
          :sort-by="['id']"
          :show-kpis="false"
          :on-click-adicionar="onClickAdicionar"
          :on-click-edit-row="onClickEditRow"
    >
    </crud>

    <modal-cadastrar-proposta :show-dialog="showDialog"></modal-cadastrar-proposta>
  </div>
</template>

<script>
import Crud from '@/components/Crud'
import ModalCadastrarProposta from '@/pages/Comercial/Proposta/ModalCadastrarProposta'

export default {
  components: {
    Crud,
    ModalCadastrarProposta
  },
  data () {
    return {
      headers: [
        { text: 'Número da Proposta', value: 'numProposta', type: 'number' },
        { text: 'Situação', value: 'situacao', type: 'text' },
        { text: 'Data da Proposta', value: 'validade', type: 'date' },
        { text: 'Cliente', value: 'idCliente', type: 'text'  },
        { text: 'Serviço / Orgão', type: 'text', value: 'idClienteCalculo' },
        { text: 'Origem', value: 'origem', type: 'text' },
        { text: 'Destino', value: 'destino', type: 'text' },
        { text: 'Valor da Proposta', value: 'valorSeguro', type: 'currency'  },
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
      await this.$router.push({ path: `/comercial/proposta/${row.id}` })
    },
    async onClickDeleteRow (row) {
        console.log('Excluir Proposta', row)
    }
  }
}
</script>
