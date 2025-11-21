import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, IParamCommonDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertClientGateway, updateClientGateway, generateClientKey } from '../ClientGatewayManagement.reducer';
const EditClientGatewayManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();

  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.clientGatewayManagementReducer);

  const [formRegis] = Form.useForm();
  const [disabledStatus, setDisabledStatus] = useState(true);

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    const payload = createCommonIParamsDuong({ clientIdGw: values.clientIdGw.trim(), clientNm: values.clientNm.trim(), clientSecretGw: values.clientSecretGw.trim(), clientPubKey: values.clientPubKey.trim(), clientIp: values.clientIp.trim() });
    if (isEdit) {
      dispatch(updateClientGateway(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
      return;
    }
    dispatch(insertClientGateway(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  };

  const _onResetForm = () => {
    if (isEdit) return;

    formRegis.resetFields();
    formRegis.setFieldsValue({
      regDate: moment().format(APP_DATE_FORMAT),
      regTime: moment().format('HH:mm')
    });
  };

  const generateClienKey = () => {
    const payload = createCommonIParamsDuong({ clientIp: formRegis.getFieldValue('clientIp').trim()});
        dispatch(generateClientKey(payload)).then(res => {
          if (checkSuccessDispatch(res)) {
            const objectResponse:IParamCommonDuong = res.payload;
            formRegis.setFieldValue('clientIdGw', objectResponse.data.clientId);
            formRegis.setFieldValue('clientSecretGw', objectResponse.data.clientSecret);
          }else{
            alert("FAil");
          }
        });
  }

    const _handleChangeClientIp = e => {
    const { value } = e.target;
    setDisabledStatus(value.length === 0);
  };

    useEffect(() => {
    if (!isEdit) {
      _onResetForm();
      return;
    }
    if (selected && isEdit) {
      formRegis.setFieldsValue({
        ...selected
      });
    }
    setDisabledStatus(true);
  }, [isEdit, selected]);

  useEffect(() => {
    if (validateError && validateError.length > 0) {
      formRegis.setFields([
        {
          name: 'deptCd',
          errors: [i18next.t('departmentManagement.groupCdExits')]
        }
      ]);
    }
  }, [validateError]);

  useEffect(() => {
    if (!isEdit) {
      _onResetForm();
      return;
    }
    if (selected && isEdit) {
      formRegis.setFieldsValue({
        ...selected
      });
    }
    setDisabledStatus(true);
  }, [isEdit, selected]);

  return (
    <div className="insert edit-department">
      <div className="heading">
        <h3>{isEdit ? 'edit client Gateway Management' : 'register client Gateway Management'}</h3>
      </div>

      <div className="content">
        <div className="actions">
          <Button className="button-add" onClick={onScrollToTop} icon={<ToTopOutlined />}>
            {i18next.t('button.go-to-list')}
          </Button>

          <Button className="button-edit" disabled={isEdit} icon={<ClearOutlined />} onClick={_onResetForm}>
            {i18next.t('button.clear')}
          </Button>
        </div>

        <Form form={formRegis} onFinish={_onSubmit} className="custom-form edit-department__form">
          <Row align="middle" style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Client Ip</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientIp"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" id='clientIp' maxLength={200} disabled={isEdit} onChange={_handleChangeClientIp}/>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
                <Button className="button-add" onClick={generateClienKey} disabled= {disabledStatus}>Generate key</Button>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Client Id gateway</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientIdGw">
                <Input className="cms-form-control" maxLength={255}  disabled={true}/>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Client name</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientNm"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Client public key</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientPubKey"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Client secret gateway</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientSecretGw">
                <Input className="cms-form-control" maxLength={200} disabled={true}/>
              </Form.Item>
            </Col>
          </Row>
           {isEdit ? (
              <Row align="middle">
                <Col xs={10} md={3}>
                  <span className="cms-search-label">Register date time</span>
                </Col>

                <Col xs={14} md={5}>
                  <Form.Item name="regTm">
                    <Input disabled
                      className="cms-form-control" maxLength={30} />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            )}

          <Row className="form__action-footer">
            <Button className="button-add" htmlType="submit" loading={isEdit ? loadingUpdate : loadingAdd}
              icon={<SaveOutlined />}>
              {i18next.t('button.save')}
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};


export default EditClientGatewayManagement;