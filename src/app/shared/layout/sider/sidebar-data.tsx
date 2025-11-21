import React from 'react';
import {
  MenuReportIcon,
  MenuSidebarApprovalIcon,
  MenuSidebarBasicIcon,
  MenuSidebarCodeIcon,
  MenuSidebarContractIcon,
  MenuSidebarReconIcon,
  MenuSidebarServicesIcon,
} from '@/app/shared/components';
import { ID_MENU_TAB } from '@/app/config/constant/enum';

export const sidebarMenu = [
  {
    title: 'menu.bankCodeManagement',
    icon: <MenuReportIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z001,
        title: 'menu.bankCodeManagement',
      },
      {
        id: ID_MENU_TAB.Z002,
        title: 'menu.actionManagement',
      },
      {
        id: ID_MENU_TAB.Z0015,
        title: 'menu.codeFromBank',
      }
    ],
  },
  {
    title: 'menu.callbackUrl',
    icon: <MenuSidebarBasicIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z004,
        title: 'menu.clientGateway',
      },
      {
        id: ID_MENU_TAB.Z005,
        title: 'menu.clientGatewayMap',
      },
      {
        id: ID_MENU_TAB.Z0014,
        title: 'menu.mgmtClientCallBack',
      },
    ],
  },
  {
    title: 'menu.cmsAppUrl',
    icon: <MenuSidebarCodeIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0011,
        title: 'menu.gateWayApi',
      },
      {
        id: ID_MENU_TAB.Z006,
        title: 'menu.cmsAppUrlMap',
      },
      {
        id: ID_MENU_TAB.Z007,
        title: 'menu.menu',
      },
      {
        id: ID_MENU_TAB.Z008,
        title: 'menu.menuGroup',
      }
    ],
  },
  {
    title: 'menu.authentication',
    icon: <MenuSidebarApprovalIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z009,
        title: 'menu.role',
      },
      {
        id: ID_MENU_TAB.Z0016,
        title: 'menu.user',
      },
      {
        id: ID_MENU_TAB.Z0019,
        title: 'menu.userMap',
      },
      {
        id: ID_MENU_TAB.Z0020,
        title: 'menu.policyMapRole',
      },
      {
        id: ID_MENU_TAB.Z0017,
        title: 'menu.resource',
      },
      {
        id: ID_MENU_TAB.Z0018,
        title: 'menu.roleMap',
      }
    ],
  },
  {
    title: 'menu.systemManagement',
    icon: <MenuSidebarCodeIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0012,
        title: 'menu.accessLog',
      },
      {
        id: ID_MENU_TAB.Z0013,
        title: 'menu.eventKafkaLog',
      },
      {
        id: ID_MENU_TAB.Z0021,
        title: 'menu.scrapingLog',
      },
    ],
  }
];
