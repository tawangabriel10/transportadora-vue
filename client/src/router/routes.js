import Home from '@/pages/Home'
import Usuarios from '@/pages/Administracao/Usuarios/List'
import Configuracoes from '@/pages/Administracao/Configuracoes/Configuracoes'
import OrdemDeServico from '@/pages/Comercial/OrdemDeServico'
import ManterOrdemDeServico from '@/pages/Comercial/ManterOrdemDeServico'
import TesteComercial from '@/pages/Comercial/TesteComercial'
import MapaDeViagem from '@/pages/Logistica/MapaDeViagem/MapaDeViagem'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
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
          icon: 'mdi mdi-account-tie',
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
      icon: 'mdi mdi-clipboard-alert',
      parent: true,
      title: 'Comercial',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/comercial/ordem-de-servicos',
        component: OrdemDeServico,
        meta: {
          icon: 'mdi mdi-account-tie',
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
          icon: 'mdi mdi-account-tie',
          title: 'Manter Ordem de Serviço',
          userPerfil: ['ADM'],
          hideFromMenu: true
        }
      },
      {
        path: '/comercial/teste',
        component: TesteComercial,
        meta: {
          icon: 'mdi mdi-account-tie',
          title: 'Teste Comercial',
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
      icon: 'mdi mdi-clipboard-alert',
      parent: true,
      title: 'Logística',
      userPerfil: ['ADM']
    },
    children: [
      {
        path: '/logistica/mapa-de-viagem',
        component: MapaDeViagem,
        meta: {
          icon: 'mdi mdi-settings',
          title: 'Mapa de Viagem',
          userPerfil: ['ADM']
        }
      }
    ]
  }
]

export default routes
