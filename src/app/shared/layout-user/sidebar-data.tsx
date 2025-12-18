import React from 'react';
import {
  MenuReportIcon,
} from '@/app/shared/components';
import { ID_MENU_TAB } from '@/app/config/constant/enum';

export const sidebarMenu = [
  {
    title: 'Quản lý thông tin đồ án',
    icon: <MenuReportIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0028,
        title: 'Đăng ký đồ án',
      },
      {
        id: ID_MENU_TAB.Z0029,
        title: 'Quản lý tệp tin đồ án',
      },
      {
        id: ID_MENU_TAB.Z0031,
        title: 'Tra cứu điểm dồ án',
      }
    ],
  },
];
