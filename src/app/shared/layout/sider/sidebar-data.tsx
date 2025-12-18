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
        title: 'Map sinh viên và chuyên ngành',
      },
      {
        id: ID_MENU_TAB.Z0026,
        title: 'Map sinh viên và giáo viên',
      },
      {
        id: ID_MENU_TAB.Z0027,
        title: 'Đăng ký đề tài',
      },
      {
        id: ID_MENU_TAB.Z0036,
        title: 'Quản lý điểm đồ án',
      },
    ],
  },

];
