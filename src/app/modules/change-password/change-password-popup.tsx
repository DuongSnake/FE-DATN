import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import i18next from '@/i18n/i18n';
import { useAppDispatch, useAppSelector } from '../../config/redux/store';
import { changeLoginPassword, logout, resetNeedChangePass } from '../../shared/reducers/authentication';
import { createCommonIParamsListDuong } from '../../shared/model/common.model';
import { checkSuccessDispatch } from '../../shared/util/global-function';
import { openNotification } from '../..//shared/util/entity-utils';
import { NOTIFICATION } from '../../config/constant/enum';
import { Storage} from 'react-jhipster';
import './change-password.scss';
import { USER_NAME} from '../../config/constant/constants';
interface Props {
  auto?: boolean;
}

const ChangePasswordPopup = ({ auto }: Props) => {
  const dispatch = useAppDispatch();
  const [visibleChange, setVisibleChange] = useState(false);
  const [formPass] = Form.useForm();
  const [error, setError] = useState(null);
  const newPassword = Form.useWatch('newPassword', formPass);
  const reTypeNewPassword = Form.useWatch('reTypeNewPassword', formPass);
  const userNm = useAppSelector(state => state.authentication.userNm) || Storage.session.get(USER_NAME);
  const loadingChangeLoginPass = useAppSelector(state => state.authentication.loadingChangeLoginPass);

  const _onSubmit = () => {
    if (error == null) {
      // dispatch(
      //   resetPassword(
      //     createCommonIParamsListDuong({
      //       userName: userNm,
      //       newPassword,
      //     })
      //   )
      // ).then(res => {
      //   if (checkSuccessDispatch(res)) {
      //     openNotification(NOTIFICATION.SUCCESS, 'changePassword.success', '', 'Change password success');
      //     _onClose();
      //     dispatch(logout());
      //   }
      // });
    }
  };
  const _onClose = () => {
    dispatch(resetNeedChangePass());
    setVisibleChange(false);
  };

  const _onOpen = () => {
    setVisibleChange(true);
  };

  useEffect(() => {
    if (newPassword && reTypeNewPassword) {
      if (newPassword !== reTypeNewPassword) {
        setError(i18next.t('changePassword.validate.match'));
      } else {
        setError(null);
      }
    }
  }, [newPassword, reTypeNewPassword]);

  useEffect(() => {
    formPass.resetFields();
  }, [visibleChange]);

  useEffect(() => {
    if (auto) setVisibleChange(true);
  }, [auto]);

  return (
    <>
      <span onClick={_onOpen} className={`${auto ? 'auto-change-pass' : ''}`}>
        {i18next.t('change-pass')}
      </span>
      <Modal
        className="modal-size-sm change-password"
        visible={visibleChange}
        title={
          <div className="header-modal">
            <span>{i18next.t('change-pass')}</span>
          </div>
        }
        onCancel={auto ? null : _onClose}
        maskClosable={false}
        footer={[
          <Button
            key="submit"
            htmlType="submit"
            form="formChangePass"
            className="button-add"
            type="primary"
            icon={<SaveOutlined />}
            loading={loadingChangeLoginPass}
          >
            <span>{i18next.t('button.save')}</span>
          </Button>,
          auto !== true && (
            <Button key="back" className="button-close" onClick={_onClose} icon={<CloseOutlined />}>
              <span>{i18next.t('button.close')}</span>
            </Button>
          ),
        ]}
      >
        <Form onFinish={_onSubmit} form={formPass} id="formChangePass">
          <Row style={{ marginBottom: 12 }}>
            <Col xs={7}>
              <span className="cms-label-pass">{i18next.t('changePass.newPass')}</span>
            </Col>
            <Col xs={17}>
              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: i18next.t('validation-message.required-field') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('currentPassword') !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(i18next.t('forgotPassword.validate.sameOldPassword')));
                    },
                  }),
                ]}
              >
                <Input.Password className="cms-form-control" placeholder={i18next.t('changePassword.placeholder')} />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 12 }}>
            <Col xs={7}>
              <span className="cms-label-pass">{i18next.t('changePass.reTypeNew')}</span>
            </Col>
            <Col xs={17}>
              <Form.Item
                name="reTypeNewPassword"
                rules={[
                  { required: true, message: i18next.t('validation-message.required-field') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(i18next.t('forgotPassword.form.confirmPassword.match')));
                    },
                  }),
                ]}
              >
                <Input.Password className="cms-form-control" placeholder={i18next.t('changePassword.placeholder2')} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} style={{ textAlign: 'center' }}>
              <span className="cms-required-field">{error}</span>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordPopup;
