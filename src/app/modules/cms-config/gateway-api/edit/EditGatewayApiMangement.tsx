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
import { insertGatewayApi, updateGatewayApi } from '../GatewayApiManagement.reducer';
const EditGatewayApiManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();

    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.gatewayApiManagementReducer);

    const [formRegis] = Form.useForm();

    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const _onSubmit = async (values: any) => {
        if (isEdit) {
            const payload = createCommonIParamsDuong({ apiId: values.apiId.trim(), apiUrl: values.apiUrl.trim(), apiNm: values.apiNm.trim() });
            dispatch(updateGatewayApi(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
            return;
        }
        const payload = createCommonIParamsDuong({ apiUrl: values.apiUrl.trim(), apiNm: values.apiNm.trim() });
        dispatch(insertGatewayApi(payload)).then(res => {
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
                <h3>{isEdit ? 'edit gateway Api Management' : 'register gateway Api Management'}</h3>
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
                                <Col xs={10} md={3}>
                                    <span className="cms-search-label">Api Id</span>
                                    <span className="cms-required-field"> *</span>
                                </Col>

                                <Col xs={14} md={5}>
                                    <Form.Item name="apiId">
                                        <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                                    </Form.Item>
                                </Col>
                            </>
                        ) : (
                            <></>
                        )}

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Api url</span>
                            <span className="cms-required-field"> *</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="apiUrl"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Api name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="apiNm"
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


export default EditGatewayApiManagement;