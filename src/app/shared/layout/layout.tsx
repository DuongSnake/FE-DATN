import { Layout, Modal } from 'antd';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { logout, logoutSession } from '../reducers/authentication';
import Header from './header/header';
import { collapsed } from './layout.reducer';
import Sidebar from './sider/sider';
import TabLayout from './tab/tabLayout';
import { reset } from './tab/tabs.reducer';
import { Storage } from '../helpers/cms-helper';

import './layout.scss';

const { Content } = Layout;

const PrivateSite = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.authentication.accessToken) || Storage.session.get(ACCESS_TOKEN);

  const { width } = useWindowDimensions();

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    if (width <= 1024) {
      dispatch(collapsed(true));
    }
  }, [width]);

  useEffect(() => {
    if (accessToken) {
      const jwtPayload: JwtPayload = jwtDecode(accessToken);
      const endDate = Date.now() + 900 * 1000;
      const currentDate = Date.now();
      if (currentDate >= endDate) {
        Modal.destroyAll();
        dispatch(reset());
        dispatch(logout());
      } else {
        return setTime(endDate);
      }
    } else {
      Modal.destroyAll();
      dispatch(reset());
      dispatch(logout());
    }

    return () => {
      dispatch(logoutSession());
    };
  }, [accessToken]);

  // if (isFirstLogin === 'Y') {
  //   return (
  //     <Navigate
  //       to={{
  //         pathname: '/account/change-password'
  //       }}
  //     />
  //   );
  // }

  return (
    <>
      {accessToken ? (
        <Layout className="info-app-layout">
          <Header />
          <Layout>
            <Sidebar time={time} />
            <Content className="content-wrapper">
              <div className="container-wrapper">
                <TabLayout />
              </div>
            </Content>
          </Layout>
        </Layout>
      ) : (
        !accessToken && (
          <Navigate
            to={{
              pathname: '/admin/login'
            }}
          />
        )
      )}
    </>
  );
};

export default PrivateSite;
