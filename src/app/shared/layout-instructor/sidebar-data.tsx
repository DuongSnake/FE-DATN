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
        id: ID_MENU_TAB.Z0032,
        title: 'Danh sach do an yeu cau duyet',
      },
      {
        id: ID_MENU_TAB.Z0033,
        title: 'Danh sach sinh vien duoc map',
      },
      {
        id: ID_MENU_TAB.Z0034,
        title: 'Danh sach do an da duyet',
      },
      {
        id: ID_MENU_TAB.Z0035,
        title: 'Quan ly diem do an',
      }
    ],
  },
    {
    title: 'Quản lý thông tin đồ án-Giao vien phan bien',
    icon: <MenuReportIcon />,
    items: [
      {
        id: ID_MENU_TAB.Z0034,
        title: 'Danh sach do an da duyet phan bien',
      },
      {
        id: ID_MENU_TAB.Z0035,
        title: 'Quan ly diem do an phan bien',
      }
    ],
  },
];
