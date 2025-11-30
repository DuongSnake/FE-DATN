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
    title: 'Quản lý thông tin đồ án',
    icon: <MenuReportIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0016,
        title: 'Đăng ký đồ án',
      },
      {
        id: ID_MENU_TAB.Z0022,
        title: 'Quản lý tệp tin đồ án',
      },
      {
        id: ID_MENU_TAB.Z0023,
        title: 'Tra cứu điểm dồ án',
      }
    ],
  },
];
