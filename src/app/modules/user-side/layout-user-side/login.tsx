import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { DEFAULT_LOCALE, LOCALE } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { login } from '@/app/shared/reducers/authentication';
import logoLogin from '@/content/images/logo/logo_login.svg';
import logoHeader from '@/content/images/logo/logo_header.svg';
import logoInfo from '@/content/images/login/logoInfo.svg';
import { useTranslation } from 'react-i18next';

import '../../login/login.scss';

import vnPath from '@/content/images/icons/vietnamese.svg';
import enPath from '@/content/images/icons/english.svg';
import { Storage } from '@/app/shared/helpers/cms-helper';

export const Login = (props: any) => {
  const { t, i18n } = useTranslation();
  const locate = Storage.local.get(LOCALE);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loading = useAppSelector(state => state.authentication.loading);
  const [langActive, setLangActive] = useState(locate || DEFAULT_LOCALE);
  const [remember, setRemember] = useState<string>('N');
  const _onLogin = async ({ userId, password }) => {
    dispatch(login(userId, password, remember));
  };

  const { location = {} } = props;
  const { from } = (location.state as any) || { from: { pathname: '/user', search: location.search } };

  if (isAuthenticated) {
    return <Navigate to={from} />;
  }

  const _renderLabel = (key: string) => {
    return <p className="text-label">{t(key)}</p>;
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="login-header">
        </div>

        <div className="login-body">
          <div className="login-logo">
            <div className="info">Đăng nhập user</div>
          </div>
          <Form name="login-form" className="login-form" layout="vertical" autoComplete="off" onFinish={_onLogin}>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('login.validate.username.required')
                }
              ]}
              label={_renderLabel('login.form.username.label')}
              name="userId"
            >
              <Input placeholder={t('login.form.username.placeholder')} />
            </Form.Item>

            <Form.Item
              className="login-password"
              rules={[
                {
                  required: true,
                  message: t('login.validate.password.required')
                }
              ]}
              label={_renderLabel('login.form.password.label')}
              name="password"
            >
              <Input.Password className="item-password" placeholder={t('login.form.password.placeholder')} />
            </Form.Item>

            <div className="form-action">
              {/* <div className="form-remember">
                <Checkbox className="remember-me" onChange={_handleChangeRemember}>
                  {t('login.form.remember')}
                </Checkbox>
              </div>
              <div className="form-forget">
                <p className="forget-password">
                  <Link to="/account/forgot-password">
                    <span>{t('login.form.password.forgot')}</span>
                  </Link>
                </p>
              </div> */}
            </div>

            <Form.Item>
              <Button className="btn-login" disabled={loading} type="primary" htmlType="submit" loading={loading}>
                {t('login.form.button')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
