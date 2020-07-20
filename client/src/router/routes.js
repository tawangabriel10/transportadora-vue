import Home from '@/pages/Home'
import Usuarios from '@/pages/Administracao/Usuarios/List'
import Configuracoes from '@/pages/Administracao/Configuracoes/Configuracoes'
import OrdemDeServico from '@/pages/Comercial/OrdemDeServico'
import ManterOrdemDeServico from '@/pages/Comercial/ManterOrdemDeServico'
import MapaDeViagem from '@/pages/Logistica/MapaDeViagem/MapaDeViagem'
import AcertoDeViagem from '@/pages/Logistica/AcertoDeViagem/AcertoDeViagem'
import CadastroDeClientes from '@/pages/Comercial/CadastroDeClientes/CadastroDeClientes'
import CadastroDeFornecedor from '@/pages/Comercial/CadastroDeFornecedor/CadastroDeFornecedor'
import GerarFatura from '@/pages/Financeiro/GerarFatura/GerarFatura'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      active: true,
      hideFromMenu: true
    }
  },
  {
    path: '/administracao',
    name: 'administracao',
    component: Home,
    redirect: '/administracao/usuarios',
    meta: {
      icon: 'mdi mdi-clipboard-alert',
      parent: true,
      title: 'Sistema',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/administracao/usuarios',
        component: Usuarios,
        meta: {
          icon: 'mdi mdi-account-switch',
          title: 'Usuários',
          userPerfil: ['ADM']
        }
      },
      {
        path: '/administracao/configuracoes',
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
    path: '/comercial',
    name: 'comercial',
    component: Home,
    redirect: '/comercial/ordem-de-servicos',
    meta: {
      icon: 'mdi mdi-shopping',
      parent: true,
      title: 'Comercial',
      userPerfil: ['ADM']
    },
    children: [
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
  }
]

export default routes
