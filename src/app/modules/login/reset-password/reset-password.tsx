import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { DEFAULT_LOCALE, LOCALE } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { IParamReset } from '@/app/shared/model/common.model';
import { checkResetCode, resetPassword } from '@/app/shared/reducers/authentication';
import { openNotification } from '@/app/shared/util/entity-utils';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { NOTIFICATION } from '@/app/config/constant/enum';

import logoLogin from '@/content/images/logo/logo_login.svg';
import logoHeader from '@/content/images/logo/logo_header.svg';
import logoInfo from '@/content/images/login/logoInfo.svg';

import vnPath from '@/content/images/icons/vietnamese.svg';
import enPath from '@/content/images/icons/english.svg';
import { Storage } from '@/app/shared/helpers/cms-helper';
import i18next from '@/i18n/i18n';

const ResetPassword = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const resetData = useAppSelector(state => state.authentication.resetData) as IParamReset;
  const loadingChangePass = useAppSelector(state => state.authentication.loadingChangePass);

  const locate = Storage.local.get(LOCALE);

  const [langActive, setLangActive] = useState(locate || DEFAULT_LOCALE);

  const [formPass] = Form.useForm();

  const _handleChangeLanguage = (key: string) => {
    setLangActive(key);
    Storage.local.set(LOCALE, key);
    window.location.reload();
  };

  useEffect(() => {
    const code = props.location.search?.split('?token=')?.[1];
    if (code) {
      dispatch(
        checkResetCode({
          code
        })
      ).then(res => {
        if (!checkSuccessDispatch(res)) {
          navigate('/');
        }
      });
    }
  }, []);

  const _onSubmit = () => {
    const data = { newPassword: formPass.getFieldValue('password'), userId: resetData.userId };
    dispatch(resetPassword(data)).then(res => {
      if (checkSuccessDispatch(res)) {
        openNotification(NOTIFICATION.SUCCESS, 'success.reset-pass', '', '');
        navigate('/');
      } else {
        openNotification(NOTIFICATION.ERROR, '', '', 'Thay đổi mật khẩu thất bại.');
      }
    });
  };

  const _onBack = () => {
    navigate('/');
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
          <Form form={formPass} name="login-form" className="login-form" layout="vertical" autoComplete="off"
                onFinish={_onSubmit}>
            <img src={logoLogin} alt="logo" />

            <Form.Item
              className="login-password"
              rules={[
                {
                  required: true,
                  message: i18next.t('changePassword.validate.required')
                }
              ]}
              label={_renderLabel('changePassword.label')}
              name="password"
            >
              <Input.Password className="item-password" placeholder={i18next.t('changePassword.placeholder')} />
            </Form.Item>

            <Form.Item
              className="login-password"
              rules={[
                {
                  required: true,
                  message: i18next.t('changePassword.validate.required2')
                }
              ]}
              label={_renderLabel('changePassword.label2')}
              name="re-password"
            >
              <Input.Password className="item-password" placeholder={i18next.t('changePassword.placeholder2')} />
            </Form.Item>

            <Form.Item className="form-reset__actions">
              <Button className="btn-send" disabled={loadingChangePass} type="primary" htmlType="submit"
                      loading={loadingChangePass}>
                {i18next.t('changePassword.button')}
              </Button>
              <Button
                style={{ marginLeft: 12 }}
                className="btn-send"
                onClick={_onBack}
                disabled={loadingChangePass}
                loading={loadingChangePass}
              >
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
export default ResetPassword;
