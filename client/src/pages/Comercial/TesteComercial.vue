<template>
  <div>
    <div>
      <modal-gerar-o-s></modal-gerar-o-s>
    </div>

    <div>
      <cadastro-de-clientes></cadastro-de-clientes>
    </div>

    <div>
      <cadastro-de-fornecedor></cadastro-de-fornecedor>
    </div>
  </div>
</template>

<script>
import ModalGerarOS from '@/pages/Comercial/GerarOS/ModalGerarOS'
import CadastroDeClientes from '@/pages/Comercial/CadastroDeClientes/CadastroDeClientes'
import CadastroDeFornecedor from '@/pages/Comercial/CadastroDeFornecedor/CadastroDeFornecedor'

export default {
  components: {
   ModalGerarOS,
   CadastroDeClientes,
   CadastroDeFornecedor
  },
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>