<template>
  <div>
    <crud ref="crud" entity="usuarios" title="Usuário" :headers="headers" :sort-by="['id']" :show-kpis="false">
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
        { text: 'ID', value: 'id', options: { disabled: true }, hideOnAdd: true },
        { text: 'Nome', value: 'nomeUsuario', rules: ['required'] },
        { text: 'Perfil', value: 'idPerfil', rules: ['required'], lookup: 'perfil' },
        { text: 'Situação', value: 'situacao', rules: ['required'], items: ['ATIVO', 'INATIVO'] },
        { text: 'Ações', value: 'action', sortable: false }
      ]
    }
  }
}
</script>
