import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState  } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertClientGatewayMap, updateClientGatewayMap } from '../ClientGatewayMapManagement.reducer';
import { ALGORITHM_TYPE,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const EditClientGatewayMapManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();

  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.clientGatewayMapManagementReducer);

  const [formRegis] = Form.useForm();
  const [listAlgorithmType, setListAlgorithmType] = useState(ALGORITHM_TYPE);
  const [isChecked, setIsChecked] = useState(true);
  const [listBankCodeType, setListBankCodeType] = useState(BANK_CODE_STATUS);

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      const payload = createCommonIParamsDuong({ idx: values.idx.trim(),bankCd: values.bankCd.trim(), clientIdGw: values.clientIdGw.trim(), clientIdCms: values.clientIdCms.trim()
        , clientSecretCms: values.clientSecretCms.trim(), masterId: values.masterId.trim(), openApiAlgorithmType: values.openApiAlgorithmType.trim()
        , openApiAlgorithmApplyYn: values.openApiAlgorithmApplyYn.trim(), openApiPubKey: values.openApiPubKey.trim(), openApiPassCode: values.openApiPassCode.trim()
        , gatewayPriKey: values.gatewayPriKey.trim(), gatewayPubKey: values.gatewayPubKey.trim()
       });
      dispatch(updateClientGatewayMap(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
      return;
    }
    const payload = createCommonIParamsDuong({ bankCd: values.bankCd.trim(), clientIdGw: values.clientIdGw.trim(), clientIdCms: values.clientIdCms.trim()
      , clientSecretCms: values.clientSecretCms.trim(), masterId: values.masterId.trim(), openApiAlgorithmType: values.openApiAlgorithmType.trim()
      , openApiAlgorithmApplyYn: values.openApiAlgorithmApplyYn.trim(), openApiPubKey: values.openApiPubKey.trim(), openApiPassCode: values.openApiPassCode.trim()
      , gatewayPriKey: values.gatewayPriKey.trim(), gatewayPubKey: values.gatewayPubKey.trim()
     });
    dispatch(insertClientGatewayMap(payload)).then(res => {
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

  const handleStatus = (event) => {
    setIsChecked(event.target.checked);
  };

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
  }, [isEdit, selected]);

  return (
    <div className="insert edit-department">
      <div className="heading">
        <h3>{isEdit ? 'edit client Gateway Map Management' : 'register client Gateway Map Management'}</h3>
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
            {isEdit ? (
              <>
                <Col>
                  <Form.Item name="idx" style={{display : 'none'}}>
                    <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                  </Form.Item>
                </Col>
              </>) : (<></>)}

            <Col xs={10} md={3}>
              <span className="cms-search-label">Bank code</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="bankCd"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Client Id gateway</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientIdGw"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Client Id cms</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientIdCms"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">clientSecretCms</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="clientSecretCms"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Master Id</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="masterId"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Algorithm type</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="openApiAlgorithmType" style={{ width: 220 }}
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                {(selected == undefined) && !isEdit ? (
                  <Select placeholder={i18next.t('label.all')} allowClear disabled={isEdit ? true : false}>
                    <>
                      {listAlgorithmType.map((obj, i) => {
                        return (
                          <Select.Option key={i} value={obj.val}>
                            {i18next.t(obj.text)}
                          </Select.Option>
                        )
                      })}
                    </>
                  </Select>
                ) : (
                  <Select placeholder={i18next.t('label.all')} allowClear>
                    <>
                      {listAlgorithmType.map((obj, i) => {
                        return (
                          selected != undefined && obj.val === selected.openApiAlgorithmType ?
                            (
                              <Select.Option key={i} value={obj.val} selected>
                                {i18next.t(obj.text)}
                              </Select.Option>
                            ) :

                            (
                              <Select.Option key={i} value={obj.val}>
                                {i18next.t(obj.text)}
                              </Select.Option>
                            )
                        )

                      })}
                    </>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Status algorithm</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="openApiAlgorithmApplyYn" style={{ width: 220 }}
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                {(selected == undefined) && !isEdit ? (
                  <Select placeholder={i18next.t('label.all')} allowClear disabled={isEdit ? true : false}>
                    <>
                      {listBankCodeType.map((obj, i) => {
                        return (
                          <Select.Option key={i} value={obj.val}>
                            {i18next.t(obj.text)}
                          </Select.Option>
                        )
                      })}
                    </>
                  </Select>
                ) : (
                  <Select placeholder={i18next.t('label.all')} allowClear>
                    <>
                      {listBankCodeType.map((obj, i) => {
                        return (
                          selected != undefined && obj.val === selected.openApiAlgorithmApplyYn ?
                            (
                              <Select.Option key={i} value={obj.val} selected>
                                {i18next.t(obj.text)}
                              </Select.Option>
                            ) :

                            (
                              <Select.Option key={i} value={obj.val}>
                                {i18next.t(obj.text)}
                              </Select.Option>
                            )
                        )

                      })}
                    </>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Open api public key</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="openApiPubKey"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Pass code</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="openApiPassCode"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Gateway private key</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="gatewayPriKey"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Gateway public key</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="gatewayPubKey"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
          </Row>
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


export default EditClientGatewayMapManagement;