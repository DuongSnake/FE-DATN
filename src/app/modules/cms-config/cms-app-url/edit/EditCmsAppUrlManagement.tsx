import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, TableColumnsType } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, IParamCommonDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertCmsAppUrl, updateCmsAppUrl } from '../CmsAppUrlManagement.reducer';
import { getListGatewayApi } from '../../gateway-api/GatewayApiManagement.reducer';
import { getListBankCode } from '../../../bank-code-management/BankCodeManagement.reducer';
import '../edit/TableCmsAppUrl.scss'
const EditCmsAppUrlManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.cmsAppUrlManagementReducer);
  const [formRegis] = Form.useForm();
  const [gatewayApi, setGatewayApi] = useState([]);
  const [listBankCode, setListBankCode] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    let statusActive = isChecked ? "Y" : "N";
    const payload = createCommonIParamsDuong({
      idx: values.idx, bankCd: values.bankCd.trim(), apiId: values.apiId, cmsUrl: values.cmsUrl.trim()
      , status: statusActive
    });
    if (isEdit) {
      dispatch(updateCmsAppUrl(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
      return;
    }
    dispatch(insertCmsAppUrl(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  };

  const findListGateway = async () => {
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10
    }
    const payload = createCommonIParamsDuong({ apiId: null, apiNm: null, status: '1', pageRequestDto });
    dispatch(getListGatewayApi(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setGatewayApi(objectResponse.data.listData);
      }
    });
  };

  const findListBankCode = async () => {
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10
    }
    const payload = createCommonIParamsDuong({ bankCd: null, bankNm: null, openApiBankCd: null, status: '1', pageRequestDto });
    dispatch(getListBankCode(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListBankCode(objectResponse.data.listData);
      }
    });
  };

  const _onResetForm = () => {
    if (isEdit) return;

    formRegis.resetFields();
  };

  const handleStatus = (event) => {
    setIsChecked(event.target.checked);
  };

  const _handleChangeGatewayCode = e => {
    formRegis.setFieldValue("apiId", e);
    gatewayApi.map((obj, i) => {
      if (e == obj.apiId) {
        //Set value name apiId when change gateway code
        (document.getElementById("apiNmGw") as HTMLInputElement).value = obj.apiUrl;
      }
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
    findListBankCode();
    findListGateway();
  }, []);

  useEffect(() => {
    if (!isEdit) {
      _onResetForm();
      return;
    }
    if (selected && isEdit) {
      formRegis.setFieldsValue({
        ...selected
      });
      //Set value status when edit
      "Y" == selected.status ? setIsChecked(true) : setIsChecked(false);
    }
  }, [isEdit, selected]);

  return (
    <div className="insert edit-department">
      <div className="heading">
        <h3>{isEdit ? 'edit cms App Url Management' : 'register cms App Url Management'}</h3>
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
              <span className="cms-search-label">Bank code</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="bankCd" style={{ width: 220 }}>
                {(selected == undefined) && !isEdit ? (
                  <Select placeholder={i18next.t('label.all')} allowClear disabled={isEdit ? true : false}>
                    <>
                      {listBankCode.map((obj, i) => {
                        return (
                          <Select.Option key={i} value={obj.bankCd}>
                            {i18next.t(obj.bankCd)} - {i18next.t(obj.bankNm)}
                          </Select.Option>
                        )

                      })}
                    </>
                  </Select>
                ) : (
                  <Select placeholder={i18next.t('label.all')} allowClear disabled={isEdit ? true : false}>
                    <>
                      {listBankCode.map((obj, i) => {
                        return (
                          selected != undefined && obj.bankCd === selected.bankCd ?
                            (
                              <Select.Option key={i} value={obj.bankCd} selected>
                                {i18next.t(obj.bankCd)} - {i18next.t(obj.bankNm)}
                              </Select.Option>
                            ) :

                            (
                              <Select.Option key={i} value={obj.bankCd}>
                                {i18next.t(obj.bankCd)} - {i18next.t(obj.bankNm)}
                              </Select.Option>
                            )
                        )

                      })}
                    </>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="idx" hidden={true}>
                <Input className="cms-form-control" defaultValue={null} disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <div className='TableCustom'>
            <table className="custom-table">
              <thead>
                <tr>
                  <th rowSpan={2}>No</th>
                  <th colSpan={2}>Gateway</th>
                  <th colSpan={1}>CMS</th>
                  <th rowSpan={2}>Active</th>
                </tr>
                <tr>
                  <th>Gateway Api Id</th>
                  <th>Gateway url</th>
                  <th>CMS url</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <Form.Item name="apiId" style={{ marginBottom: 0 }}
                      rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                      {(selected == undefined) && !isEdit ?
                        (
                          <Select placeholder={i18next.t('label.all')} allowClear onChange={_handleChangeGatewayCode} disabled={isEdit ? true : false}>
                            {gatewayApi.map((obj, i) => {
                              return (
                                <Select.Option key={i} value={obj.apiId}>
                                  {i18next.t(obj.apiId)} - {i18next.t(obj.apiNm)}
                                </Select.Option>
                              )
                            })}
                          </Select>
                        ) :
                        (

                          <Select placeholder={i18next.t('label.all')} allowClear onChange={_handleChangeGatewayCode} disabled={isEdit ? true : false}>
                            {gatewayApi.map((obj, i) => {
                              return (
                                selected != undefined && obj.apiId === selected.apiIdGw ?
                                  (
                                    <Select.Option key={i} value={obj.apiId} selected>
                                      {i18next.t(obj.apiId)} - {i18next.t(obj.apiNm)}
                                    </Select.Option>
                                  ) :
                                  (
                                    <Select.Option key={i} value={obj.apiId}>
                                      {i18next.t(obj.apiId)} - {i18next.t(obj.apiNm)}
                                    </Select.Option>
                                  )
                              )
                            })}
                          </Select>
                        )}

                    </Form.Item>
                  </td>
                  <td>
                    <Form.Item name="apiNmGw" style={{ marginBottom: 0 }}>
                      <Input className="cms-form-control" id="apiNmGw" maxLength={255} disabled={true} />
                    </Form.Item>
                  </td>
                  <td>
                    <Form.Item name="cmsUrl" style={{ marginBottom: 0 }}
                      rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                      <Input className="cms-form-control" maxLength={255} />
                    </Form.Item>
                  </td>
                  <td>
                    <Form.Item name="status" style={{ marginBottom: 0 }}>
                      {(selected == undefined) && !isEdit ? (
                        <input className="cms-form-control" type="checkbox" onChange={handleStatus} checked={isChecked} />
                      ) : (
                        <Input className="cms-form-control" type="checkbox" onChange={handleStatus} checked={isChecked} />
                      )}
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Row className="form__action-footer" style={{ marginTop: 15 }}>
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


export default EditCmsAppUrlManagement;