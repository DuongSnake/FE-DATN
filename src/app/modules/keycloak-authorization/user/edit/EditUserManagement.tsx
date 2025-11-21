import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertUser, updateUser, selectListByUserId } from '../UserManagement.reducer';
const EditUserManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();

    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.userKeycloakManagementReducer);

    const [formRegis] = Form.useForm();
    const [listRoleSelected, setListRoleSelected] = useState([]);


    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const _onSubmit = async (values: any) => {
        const payload = createCommonIParamsDuong({
            id: values.id, userName: values.username.trim(), email: values.email.trim()
            , firstName: values.firstName.trim(), lastName: values.lastName.trim()
        });
        if (isEdit) {
            dispatch(updateUser(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
            return;
        }
        dispatch(insertUser(payload)).then(res => {
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

    const getAllRole = (valueUserId: string) => {
        const payload = createCommonIParamsDuong({ userId: valueUserId });
        dispatch(selectListByUserId(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                const objectResponse: IParamCommonDuong = res.payload;
                setListRoleSelected(objectResponse.data.listData);
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
        if (!isEdit) {
            _onResetForm();
            return;
        }
        if (selected && isEdit) {
            formRegis.setFieldsValue({
                ...selected
            });

            getAllRole(selected.id);
        }
    }, [isEdit, selected]);

    useEffect(() => {
    }, [listRoleSelected]);

    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{isEdit ? 'edit user Management' : 'user Management'}</h3>
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
                        <Col>
                            <Form.Item name="id" style={{ display: 'none' }}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">User name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="username">
                                <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Email</span>
                            <span className="cms-required-field"> *</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="email"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">First Name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="firstName">
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Last Name</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="lastName">
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


export default EditUserManagement;