import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import i18next from '@/i18n/i18n';
import { DEFAULT_LOCALE, LOCALE } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { forgotPassword } from '@/app/shared/reducers/authentication';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '@/app/shared/util/entity-utils';
import { noWhitespaceStr, Storage } from '@/app/shared/helpers/cms-helper';
import { NOTIFICATION } from '@/app/config/constant/enum';
import logoLogin from '@/content/images/logo/logo_login.svg';
import logoHeader from '@/content/images/logo/logo_header.svg';
import logoInfo from '@/content/images/login/logoInfo.svg';

import vnPath from '@/content/images/icons/vietnamese.svg';
import enPath from '@/content/images/icons/english.svg';

const ForgotPassword = () => {
  const locate = Storage.local.get(LOCALE);
  const dispatch = useAppDispatch();
  const loadingReset = useAppSelector(state => state.authentication.loadingReset);
  const [langActive, setLangActive] = useState(locate || DEFAULT_LOCALE);
  const navigate = useNavigate();

  const _handleChangeLanguage = (key: string) => {
    setLangActive(key);
    Storage.local.set(LOCALE, key);
    window.location.reload();
  };

  const _onBack = () => {
    navigate('/');
  };

  const _onSubmit = ({ email }) => {
    dispatch(forgotPassword({ email })).then(res => {
      if (checkSuccessDispatch(res)) {
        openNotification(NOTIFICATION.SUCCESS, 'success.reset-email', '', '');
        navigate('/');
      }
    });
  };

  const _renderLabel = (key: string) => {
    return <p className="text-label">{i18next.t(key)}</p>;
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="login-header">
          <div className="login-logo">
            <img src={logoHeader} alt="logo" />
            <div className="info">management system</div>
          </div>
        </div>

        <div className="login-body">
          <Form name="login-form" className="login-form" layout="vertical" autoComplete="off" onFinish={_onSubmit}>
            <img src={logoLogin} alt="logo" />
            <p className="text">{i18next.t('forgotPassword.title')}</p>
            <Form.Item
              normalize={noWhitespaceStr}
              className="login-password"
              rules={[
                {
                  type: 'email',
                  message: i18next.t('validation-message.not-an-email')
                },
                {
                  required: true,
                  message: i18next.t('forgotPassword.validate.email')
                }
              ]}
              label={_renderLabel('forgotPassword.email')}
              name="email"
            >
              <Input className="item-password" placeholder={i18next.t('changePassword.placeholder')} />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button className="btn-send" disabled={loadingReset} type="primary" htmlType="submit"
                      loading={loadingReset}>
                {i18next.t('changePassword.button')}
              </Button>
              <Button style={{ marginLeft: 12 }} className="btn-send" onClick={_onBack} disabled={loadingReset}
                      loading={loadingReset}>
                {i18next.t('changePassword.back')}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-language">
          <Select className="login-select-custom" value={langActive} onChange={_handleChangeLanguage}>
            <Select.Option value="vi">
              <img src={vnPath} alt="vietnamese" />
              <span className="language-name">{i18next.t('i18n.vn')}</span>
            </Select.Option>
            <Select.Option value="en">
              <img src={enPath} alt="english" />
              <span className="language-name">{i18next.t('i18n.en')}</span>
            </Select.Option>
          </Select>
        </div>

        <div className="login-footer">
          <img src={logoInfo} alt="logo info" />
          <span>Copyright © 2021 of Infoplus. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
