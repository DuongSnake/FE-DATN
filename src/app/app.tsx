import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import enUS from 'antd/lib/locale/en_US';
import koKR from 'antd/lib/locale/ko_KR';
import viVN from 'antd/lib/locale/vi_VN';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Storage } from './shared/helpers/cms-helper';
import { LOCALE } from './config/constant/constants';
import { LOCALES_SUPPOST } from './config/constant/enum';
import { IRootState, useAppDispatch, useAppSelector } from './config/redux/store';
import './shared/util/dayjs';
import { loadMessage } from './shared/util/validate-messages';
import AppRoutes from './routes';
import ErrorBoundary from './shared/error/error-boundary';
import { checkHasAuth, clearAuthToken, logout } from './shared/reducers/authentication';
import { getAuthToken } from './shared/util/store-utils';

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();
  const [antdLocal, setAntdLocal] = useState(viVN);
  const [validateMessages, setValidateMessages] = useState(null);

  const locale = Storage.local.get(LOCALE);
  const isFirstLogin = useAppSelector(state => state.authentication.isFirstLogin);

  useEffect(() => {
    if (isFirstLogin === 'N') {
      checkAuthenticated();
    }
  }, []);

  useEffect(() => {
    if (locale) {
      switch (locale) {
        case LOCALES_SUPPOST.en:
          setAntdLocal(enUS);
          break;
        case LOCALES_SUPPOST.ko:
          setAntdLocal(koKR);
          break;
        default:
          setAntdLocal(viVN);
          break;
      }

      setValidateMessages(loadMessage);
    }
  }, [locale]);

  const checkAuthenticated = () => {
    const accessToken = getAuthToken();

    if (accessToken) {
      const jwtPayload: JwtPayload = jwtDecode(accessToken);

      if (jwtPayload.exp > Date.now() / 1000) {
        dispatch(checkHasAuth());
      } else {
        clearAuthToken();
      }
    } else {
      clearAuthToken();
    }
  };

  return (
    <Router basename={baseHref}>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
      <ConfigProvider form={{ validateMessages }} locale={antdLocal}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </ConfigProvider>
    </Router>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(App);
