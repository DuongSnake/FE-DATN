import { ClearOutlined, SaveOutlined, ToTopOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { insertPermission, updatePermission } from '../PermissionManagement.reducer';
import { IParamCommonDuong, createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
const EditPermissionManagement = ({ isEdit, onSearch, selected, onChangeFormAdd, listAllPolicy, listAllRources }) => {
    const dispatch = useAppDispatch();
    const [resourceSelected, setResourceSelected] = useState([]);
    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.userKeycloakManagementReducer);
    const [formRegis] = Form.useForm();


    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };


    const _onSubmit = async (values: any) => {
        const payload = createCommonIParamsDuong({
            permissionId: values.permissionId, permissionName: values.permissionName.trim(), permissionDesc: values.permissionDesc.trim()
            , listResources: values.listResources, listPolicies: values.listPolicies
        });
        if (isEdit) {
            dispatch(updatePermission(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
            return;
        }
        dispatch(insertPermission(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                _onSuccess();
            }
        });
    };

    const _onResetForm = () => {
        if (isEdit) return;
        formRegis.resetFields();
        formRegis.setFieldsValue({
            listResources: [],
        });
        formRegis.setFieldsValue({
            listPolicies: [],
        });
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
            const initialSelectedResourceIds = selected?.listResources.map(
                (resource) => resource._id
            );

            const initialSelectedPolicyIds = selected?.listPolicies.map(
                (policy) => policy.policyId
            );
            formRegis.setFieldsValue({
                listResources: initialSelectedResourceIds,
                listPolicies: initialSelectedPolicyIds
            });

        }
    }, [isEdit, selected]);


    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{isEdit ? 'edit user map role Management' : 'user map role Management'}</h3>
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
                            <Form.Item name="permissionId" style={{ display: 'none' }}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Permission name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="permissionName">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Permission description</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="permissionDesc">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Form.Item name={["listResources"]} label="Resources">
                            <Select style={{ width: 550 }}
                                mode="multiple"
                                options={listAllRources.map((rources) => ({
                                    label: rources.name,
                                    value: rources._id
                                }))}
                            />
                        </Form.Item>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Form.Item name={["listPolicies"]} label="Policies">
                            <Select style={{ width: 550 }}
                                mode="multiple"
                                options={listAllPolicy.map((rources) => ({
                                    label: rources.policyName,
                                    value: rources.policyId
                                }))}
                            />
                        </Form.Item>
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


export default EditPermissionManagement;