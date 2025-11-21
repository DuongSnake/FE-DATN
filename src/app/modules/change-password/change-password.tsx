import React, { useState } from 'react';
import { Storage, translate } from 'react-jhipster';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

import { DEFAULT_LOCALE, LOCALE } from '../../config/constant/constants';
import { NOTIFICATION } from '../../config/constant/enum';
import { useAppDispatch, useAppSelector } from '../../config/redux/store';
import { createCommonIParamsListDuong } from '../../shared/model/common.model';
import { resetPassword } from '../../modules/keycloak-authorization/user/UserManagement.reducer';
import { setLocale } from '../../shared/reducers/locale';
import { openNotificationAction } from '../../shared/util/entity-utils';
import { checkSuccessDispatch } from '../../shared/util/global-function';

const vnPath = '../../../../content/images/icons/vietnamese.svg';
const enPath = '../../../../content/images/icons/english.svg';

const ChangePassword = () => {
  const locate = Storage.local.get(LOCALE);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.authentication.loading);
  const [langActive, setLangActive] = useState(locate || DEFAULT_LOCALE);

  const _handleChangeLanguage = (key: string) => {
    setLangActive(key);
    dispatch(setLocale(key));
  };

  const _onChangePassword = ({ password, rePassword }) => {
    if (password !== rePassword) {
      openNotificationAction(NOTIFICATION.ERROR, 'changePassword.validate.match', '', '');
      return;
    }
    dispatch(resetPassword(createCommonIParamsListDuong({ newPassword: password }))).then(res => {
      if (checkSuccessDispatch(res)) {
        navigate('/');
      }
    });
  };

  const _renderLabel = (key: string) => {
    return <p className="text-label">{translate(key)}</p>;
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="login-header">
          <div className="login-logo">
            <img src="../../../content/images/logo/logo_login.svg" alt="logo" />
            <div className="info">management system</div>
          </div>
        </div>

        <div className="login-body">
          <Form name="login-form" className="login-form" layout="vertical" autoComplete="off" onFinish={_onChangePassword}>
            <img src="../../../content/images/logo/logo_login.svg" alt="logo" />

            <Form.Item
              className="login-password"
              rules={[
                {
                  required: true,
                  message: translate('changePassword.validate.required'),
                },
              ]}
              label={_renderLabel('changePass.newPass')}
              name="password"
            >
              <Input.Password className="item-password" placeholder={translate('changePassword.placeholder')} />
            </Form.Item>

            <Form.Item
              className="login-password"
              rules={[
                {
                  required: true,
                  message: translate('changePassword.validate.required2'),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(translate('forgotPassword.form.confirmPassword.match')));
                  },
                }),
              ]}
              label={_renderLabel('changePass.reTypeNew')}
              name="rePassword"
            >
              <Input.Password className="item-password" placeholder={translate('changePassword.placeholder2')} />
            </Form.Item>

            <Form.Item>
              <Button className="btn-login" disabled={loading} type="primary" htmlType="submit" loading={loading}>
                {translate('changePassword.button')}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="login-language">
          <Select className="login-select-custom" value={langActive} onChange={_handleChangeLanguage}>
            <Select.Option value="vi">
              <img src={vnPath} alt="vietnamese" />
              <span className="language-name">{translate('i18n.vn')}</span>
            </Select.Option>
            <Select.Option value="en">
              <img src={enPath} alt="english" />
              <span className="language-name">{translate('i18n.en')}</span>
            </Select.Option>
          </Select>
        </div>

        <div className="login-footer">
          <img src="../../../content/images/login/logoInfo.svg" alt="logo info" />
          <span>Copyright © 2021 of Infoplus. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
