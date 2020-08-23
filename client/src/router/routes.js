import Home from '@/pages/Home'

import OrdemDeServico from '@/pages/Comercial/GerarOS/OrdemDeServico'
import CadastroDeFornecedor from '@/pages/Comercial/CadastroDeFornecedor/CadastroDeFornecedor'
import CadastroDeClientes from '@/pages/Comercial/CadastroDeClientes/CadastroDeClientes'
import ManterOrdemDeServico from '@/pages/Comercial/GerarOS/ManterOrdemDeServico'
import PesquisarProposta from '@/pages/Comercial/Proposta/PesquisarProposta'

import MapaDeViagem from '@/pages/Logistica/MapaDeViagem/MapaDeViagem'
import AcertoDeViagem from '@/pages/Logistica/AcertoDeViagem/AcertoDeViagem'

import GerarFatura from '@/pages/Financeiro/GerarFatura/GerarFatura'

import Configuracoes from '@/pages/Administrativo/Configuracoes/Configuracoes'
import Usuarios from '@/pages/Administrativo/Usuarios/List'

import RecursosHumanos from '@/pages/RecursosHumanos/RecursosHumanos'

import AnaliseIndicadores from '@/pages/AnaliseIndicadores/AnaliseIndicadores'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      icon: 'mdi mdi-home',
      active: true,
      hideFromMenu: true
    }
  },
  {
    path: '/comercial',
    name: 'comercial',
    component: Home,
    redirect: '/comercial/proposta',
    meta: {
      icon: 'mdi mdi-shopping',
      parent: true,
      title: 'Comercial',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/comercial/proposta',
        component: PesquisarProposta,
        meta: {
          icon: 'mdi mdi-clipboard-text',
          title: 'Pesquisar Proposta',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/comercial/ordem-de-servicos',
        component: OrdemDeServico,
        meta: {
          icon: 'mdi mdi-arrow-right-bold-circle',
          title: 'Ordem de Serviço',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/comercial/ordem-de-servico/:id?',
        component: ManterOrdemDeServico,
        props: (route) => {
          return { id: route.params.id ? String(route.params.id) : void 0 }
        },
        meta: {
          icon: 'mdi mdi-arrow-right-bold-circle-outline',
          title: 'Manter Ordem de Serviço',
          userPerfil: ['ADM'],
          //hideFromMenu: true
        }
      },
      {
        path: '/comercial/cadastro-de-clientes',
        component: CadastroDeClientes,
        meta: {
          icon: 'mdi mdi-account',
          title: 'Cadastro de Clientes',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/comercial/cadastro-de-fornecedor',
        component: CadastroDeFornecedor,
        meta: {
          icon: 'mdi mdi-account-tie',
          title: 'Cadastro de Fornecedor',
          userPerfil: ['ADM']
        }
      }
    ]
  },
  {
    path: '/logistica',
    name: 'logistica',
    component: Home,
    redirect: '/logistica/mapa-de-viagem',
    meta: {
      icon: 'mdi mdi-car-estate',
      parent: true,
      title: 'Logística',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/logistica/mapa-de-viagem',
        component: MapaDeViagem,
        meta: {
          icon: 'mdi mdi-google-maps',
          title: 'Mapa de Viagem',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/logistica/acerto-de-viagem',
        component: AcertoDeViagem,
        meta: {
          icon: 'mdi mdi-wallet-travel',
          title: 'Acerto de Viagem',
          userPerfil: ['ADM']
        }
      }
    ]
  },
  {
    path: '/financeiro',
    name: 'financeiro',
    component: Home,
    redirect: '/financeiro/gerar-fatura',
    meta: {
      icon: 'mdi mdi-cash-multiple',
      parent: true,
      title: 'Financeiro',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/financeiro/gerar-fatura',
        component: GerarFatura,
        meta: {
          icon: 'mdi mdi-cash-usd',
          title: 'Gerar Fatura Final',
          userPerfil: ['ADM']
        }
      }
    ]
  },
  {
    path: '/recursos-humanos',
    name: 'Recursos Humanos',
    component: Home,
    redirect: '/recursos-humanos',
    meta: {
      icon: 'mdi mdi-calendar-account',
      parent: false,
      title: 'Recursos Humanos',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/recursos-humanos',
        component: RecursosHumanos,
        meta: {
          icon: 'mdi mdi-calendar-account-outline',
          title: 'Recursos Humanos',
          userPerfil: ['ADM']
        }
      }
    ]
  },
  {
    path: '/administrativo',
    name: 'administrativo',
    component: Home,
    redirect: '/administrativo/usuarios',
    meta: {
      icon: 'mdi mdi-file-document-edit-outline',
      parent: true,
      title: 'Administrativo',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/administrativo/usuarios',
        component: Usuarios,
        meta: {
          icon: 'mdi mdi-account-switch',
          title: 'Usuários',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/administrativo/configuracoes',
        component: Configuracoes,
        meta: {
          icon: 'mdi mdi-settings',
          title: 'Configurações do Sistema',
          userPerfil: ['ADM']
        }
      }
    ]
  },
  {
    path: '/analise-indicadores',
    name: 'Análise Indicadores',
    component: Home,
    redirect: '/analise-indicadores',
    meta: {
      icon: 'mdi mdi-trending-up',
      parent: true,
      title: 'Análise Indicadores',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/analise-indicadores',
        component: AnaliseIndicadores,
        meta: {
          icon: 'mdi mdi-trending-up',
          title: 'Análise Indicadores',
          userPerfil: ['ADM']
        }
      }
    ]
  }
]

export default routes
