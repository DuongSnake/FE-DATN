import React, { useState } from 'react';
import { Button, Menu, MenuProps, Modal, Statistic } from 'antd';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ArrowIcon, ClockIcon } from '../components';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE, EXPIRES_TIME } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { logout } from '../reducers/authentication';
import { addTab, changeTabActive, reset } from '../layout/tab/tabs.reducer';
import { MENU_PRIVILEGES, NOTIFICATION } from '@/app/config/constant/enum';
import { openNotificationAction } from '../util/entity-utils';
import { sidebarMenu } from '@/app/shared/layout/sider/sidebar-data';
import adsImg from '@/content/images/layout/ads.png';
import { Storage } from '../helpers/cms-helper';
import i18next from 'i18next';
const { Countdown } = Statistic;

const SidebarContent = props => {
  const dispatch = useAppDispatch();
  const { time } = props;

  const rootSubmenuKeys = sidebarMenu.map(item => item.title);

  const token = Storage.session.get(ACCESS_TOKEN);
  const expireTime = Storage.session.get(EXPIRES_TIME);
  const loading = useAppSelector(state => state.authentication.loading);
  const accessToken = useAppSelector(state => state.authentication.accessToken);

  const [visible, setVisible] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState([rootSubmenuKeys[0]]);
  const [dateLine, setDateLine] = useState(Date.now() + 1000 * 300);

  const _onAddTab = value => {
    dispatch(
      addTab({
        id: value.id,
        title: value.title,
        panelComponent: value.panelComponent,
      }),
    );
    dispatch(changeTabActive(value.id));
  };

  const _onPermissionChecking = value => {
    const userType = Storage.session.get(USER_TYPE);
    const filtered = MENU_PRIVILEGES.filter(permission => permission.tabId === value.id);

    if (filtered.length > 0) {
      const permissionFiltered = filtered[0].userGroup.filter(userGroup => userGroup === userType);

      if (permissionFiltered.length > 0) {
        _onAddTab(value);
      } else {
        openNotificationAction(NOTIFICATION.ERROR, 'message.not-allow-to-access-menu', '', '');
      }
    } else {
      openNotificationAction(NOTIFICATION.ERROR, 'message.menu-not-found', '', '');
    }
  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [rootSubmenuKeys[0]]);
    }
  };

  // const _onExtendToken = () => {
  //   const refresh_idx = Storage.session.get(REFRESH_TOKEN);
  //   dispatch(extend(refresh_idx));
  // };

  const _closeModal = () => {
    setVisible(false);
    _onLogout();
  };

  const _confirmExtend = () => {
    // _onExtendToken();

    setTimeout(() => {
      setVisible(false);
      setDateLine(Date.now() + 1000 * 900);
    }, 1000);
  };

  const _onLogout = () => {
    dispatch(reset());
    dispatch(logout());
  };

  const onFinish = () => {
    if (accessToken !== null || token) {
      const endDate = (Number(expireTime) - 20 + 3600) * 1000;
      const currentDate = Date.now();

      if (currentDate >= endDate) {
        return _onLogout();
      }
    }

    setDateLine(Date.now() + 1000 * 300);
    setVisible(true);
  };

  return (
    <div className="info-sidebar-content">
      <div className="info-login">
        <div className="extra-time">
          <span className="info-time">
            <ClockIcon />
            <Countdown value={time} onFinish={onFinish} />
          </span>
          {/* <Button onClick={_onExtendToken} loading={loading}>
            {i18next.t('extend')}
          </Button> */}
        </div>
      </div>

      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
        {sidebarMenu.map(menu => {
          return (
            <Menu.SubMenu key={menu.title} title={i18next.t(menu.title)} popupClassName="sub-menu-private-custom" icon={menu.icon}>
              {menu.items.map(subMenu => {
                return (
                  <Menu.Item
                    key={subMenu.id}
                    icon={<ArrowIcon />}
                    onClick={() =>
                      _onPermissionChecking({
                        id: subMenu.id,
                        title: i18next.t(subMenu.title),
                      })
                    }
                  >
                    {i18next.t(subMenu.title)}
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        })}
      </Menu>

      {visible && (
        <Modal className="modal-size-sm hidden-footer" open={visible} title={''} onCancel={_closeModal} maskClosable={false} footer={[]}>
          <div className="content-confirm">
            <div className="icon">
              <QuestionCircleOutlined />
            </div>
            <div className="content">
              <span>Confirm</span>
              {i18next.t('message.extendToken')}
              {visible && <Countdown value={dateLine} format={'mm:ss'} onFinish={_closeModal} />}
            </div>
            <div className="actions">
              <Button key="register" className="button-add" onClick={_confirmExtend}>
                {i18next.t('button.extend')}
              </Button>
              <Button key="close" className="button-close" onClick={_closeModal}>
                {i18next.t('button.logout')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SidebarContent;
