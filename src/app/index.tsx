import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppComponent from './app';
import setupAxiosInterceptors, { apiClient } from './config/interceptor/axios-interceptor';
import getStore from './config/redux/store';
import ErrorBoundary from './shared/error/error-boundary';
import { clearAuthentication, revokeToken } from './shared/reducers/authentication';
import '@/i18n/i18n';
import { createRoot } from 'react-dom/client';

const store = getStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'), revokeToken, apiClient);

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </ErrorBoundary>
);
