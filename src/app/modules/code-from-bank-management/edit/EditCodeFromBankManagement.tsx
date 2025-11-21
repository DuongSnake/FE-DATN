import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertCodeFromBank, updateCodeFromBank } from '../CodeFromBankManagement.reducer';
const EditCodeFromBankManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();
  
    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.actionManagementReducer);
  
    const [formRegis] = Form.useForm();
  
    const _onSuccess = () => {
      _onResetForm();
      onSearch();
      onChangeFormAdd();
      onScrollToTop();
    };
  
    const _onSubmit = async (values: any) => {
      const payload = createCommonIParamsDuong({ idx: values.idx, typeCode: values.typeCode, bankCodeNapas: values.bankCodeNapas.trim(), bankCodeCitad: values.bankCodeCitad.trim()
        , bankCode3: values.bankCode3.trim(), bankCodeName: values.bankCodeName.trim(), bankCodeLocation: values.bankCodeLocation.trim()
       });
      if (isEdit) {
        dispatch(updateCodeFromBank(payload)).then(res => {
          if (checkSuccessDispatch(res)) {
            _onSuccess();
          }
        });
        return;
      }
      dispatch(insertCodeFromBank(payload)).then(res => {
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
          <h3>{isEdit ? 'edit code from bank Management' : 'register code from bank Management'}</h3>
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
  
                <Col>
                  <Form.Item name="idx" style={{display : 'none'}}>
                    <Input className="cms-form-control" disabled={isEdit} />
                  </Form.Item>
                </Col>

            <Row align="middle" style={{ marginBottom: 12 }}>
                <Col xs={10} md={3}>
                <span className="cms-search-label">Group Code</span>
                <span className="cms-required-field"> *</span>
              </Col>
              <Col xs={14} md={5}>
              <Form.Item name="typeCode"
               rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input
                className="cms-form-control" maxLength={30}   disabled={isEdit}/>
                </Form.Item>
              </Col>
              <Col xs={10} md={3}>
                <span className="cms-search-label">Code 1</span>
              </Col>
              <Col xs={14} md={5}>
                <Form.Item name="bankCodeCitad">
                  <Input className="cms-form-control" maxLength={255}  disabled={isEdit}/>
                </Form.Item>
              </Col>

              <Col xs={10} md={3}>
                <span className="cms-search-label label-padding-left">Code 2</span>
              </Col>

              <Col xs={14} md={5}>
                <Form.Item name="bankCodeNapas">
                  <Input className="cms-form-control" maxLength={200}   disabled={isEdit}/>
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle" style={{ marginBottom: 12 }}>
              <Col xs={10} md={3}>
                <span className="cms-search-label">Code 3</span>
              </Col>
              <Col xs={14} md={5}>
              <Form.Item name="bankCode3">
                <Input
                className="cms-form-control" maxLength={30}   disabled={isEdit}/>
                </Form.Item>
              </Col>
              <Col xs={10} md={3}>
                <span className="cms-search-label">Code Name</span>
              </Col>
              <Col xs={14} md={5}>
              <Form.Item name="bankCodeName">
                <Input
                className="cms-form-control" maxLength={30} />
                </Form.Item>
              </Col>
              <Col xs={10} md={3}>
                <span className="cms-search-label">Code 2 name</span>
              </Col>
              <Col xs={14} md={5}>
              <Form.Item name="bankCodeLocation">
                <Input
                className="cms-form-control" maxLength={30} />
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
  

export default EditCodeFromBankManagement;