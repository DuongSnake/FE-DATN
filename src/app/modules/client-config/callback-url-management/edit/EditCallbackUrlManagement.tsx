import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect,useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertCallbackUrl, updateCallbackUrl } from '../CallbackUrlManagement.reducer';
const EditCallbackUrlManagement = ({ isEdit, onSearch, selected, listBankCode, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();
  const [bankCd, setBankCd] = useState('');

  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.callbackUrlManagementReducer);

  const [formRegis] = Form.useForm();

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      const payload = createCommonIParamsDuong({ idx: values.idx.trim(), clientIdCms: values.clientIdCms.trim(), bankCd: values.bankCd.trim(), cbType: values.cbType.trim(), url: values.url.trim() });
      dispatch(updateCallbackUrl(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
      return;
    }
    const payload = createCommonIParamsDuong({ clientIdCms: values.clientIdCms.trim(), bankCd: values.bankCd.trim(), cbType: values.cbType.trim(), url: values.url.trim() });
    dispatch(insertCallbackUrl(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  };

  const _handleChangeBankCd = e => {
      setBankCd(e);
  };

  const _onResetForm = () => {
    if (isEdit) return;

    formRegis.resetFields();
    formRegis.setFieldsValue({
      regDate: moment().format(APP_DATE_FORMAT),
      regTime: moment().format('HH:mm')
    });
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
        <h3>{isEdit ? 'edit callback Url Management' : 'register callback Url Management'}</h3>
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

                <Col style={{display: 'none'}}>
                  <Form.Item name="idx">
                    <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <>
              </>
            )}

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

            <Col xs={10} md={3}>
              <span className="cms-search-label">Bank code</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="bankCd" style={{ width: 220 }}
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Select value={bankCd} onChange={_handleChangeBankCd} placeholder={i18next.t('label.all')} allowClear>
                  <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                  {listBankCode.map((obj, i) => {
                    return (
                      <Select.Option key={i} value={obj.bankCd}>
                        {obj.bankNm}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Callback type</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="cbType"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
          </Row>
          <Row>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Url</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="url"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
            {isEdit ? (
              <>
                <Col xs={10} md={3}>
                  <span className="cms-search-label">Register date time</span>
                </Col>

                <Col xs={14} md={5}>
                  <Form.Item name="regTm">
                    <Input disabled
                      className="cms-form-control" maxLength={30} />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <></>
            )}
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


export default EditCallbackUrlManagement;