import { Menu, Modal } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useAppDispatch } from '@/app/config/redux/store';
import React from 'react';
import { CaretDownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import i18next from '@/i18n/i18n';
import { reset } from '../tab/tabs.reducer';
import { logout } from '../../reducers/authentication';
import ChangePasswordPopup from '../../../modules/change-password/change-password-popup';

export const ActionMenu = () => {
  const dispatch = useAppDispatch();

  const _confirmLogout = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('contentLogout'),
      okText: i18next.t('logout'),
      cancelText: i18next.t('button.close'),
      onOk() {
        _onLogout();
      },
    });
  };

  const _onLogout = () => {
    Modal.destroyAll();
    dispatch(reset());
    dispatch(logout());
  };

  return (
    <>
      <Menu mode="horizontal" key="language">
        <SubMenu key={'language-menu'} title={<CaretDownOutlined style={{ color: 'white' }} />} popupClassName="action-user-submenu">
          <Menu.Item key="1">
            <ChangePasswordPopup />
          </Menu.Item>
          <Menu.Item key="2" onClick={_confirmLogout}>
            <span>{i18next.t('logout')}</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};
