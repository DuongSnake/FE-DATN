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
    title: 'Quản lý chung',
    icon: <MenuReportIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0016,
        title: 'menu.user',
      },
      {
        id: ID_MENU_TAB.Z0022,
        title: 'menu.majorManagement',
      },
      {
        id: ID_MENU_TAB.Z0023,
        title: 'Kỳ học',
      }
    ],
  },
  {
    title: 'Quản lý thông tin đồ án',
    icon: <MenuSidebarBasicIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0024,
        title: 'Kỳ hạn đồ án',
      },
      {
        id: ID_MENU_TAB.Z0025,
        title: 'Map giáo viên và chuyên ngành',
      },
      {
        id: ID_MENU_TAB.Z0026,
        title: 'Map sinh viên và giáo viên',
      },
      {
        id: ID_MENU_TAB.Z0027,
        title: 'Đăng ký đề tài',
      },
    ],
  },
  {
    title: 'Điểm và tệp tin đồ án',
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
