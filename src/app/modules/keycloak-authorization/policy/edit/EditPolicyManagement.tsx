import { ClearOutlined, SaveOutlined, ToTopOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import '../../../cms-config/cms-app-url/edit/TableCmsAppUrl.scss';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertPolicy, updatePolicy } from '../PolicyManagement.reducer';
import { getListRole } from '../../role/RoleManagement.reducer';
const EditPolicyManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();

    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.userKeycloakManagementReducer);
    const [roleSelected, setRoleSelected] = useState('');
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
            policyId: values.policyId, policyName: values.policyName.trim(), policyDesc: values.policyDesc.trim()
            , listRoleId: values.listRoleId
        });
        if (isEdit) {
            dispatch(updatePolicy(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
            return;
        }
        dispatch(insertPolicy(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                _onSuccess();
            }
        });
    };

    const _onResetForm = () => {
        if (isEdit) return;

        formRegis.resetFields();
    };

    const getAllRole = () => {
        const payload = createCommonIParamsDuong({ roleName: '' });
        dispatch(getListRole(payload)).then(res => {
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
        getAllRole();
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
                <h3>{isEdit ? 'edit policy Management' : 'policy Management'}</h3>
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
                            <Form.Item name="policyId" style={{ display: 'none' }}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Policy name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="policyName">
                                <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Policy description</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="policyDesc">
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        <Form.List name="listRoleId" initialValue={selected?.listRoleId}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        <Row align="middle" style={{ marginBottom: 12 }} justify="end">
                                            <Col>
                                                <Button onClick={() => add({ id: '', required: true })} className="mb-2">
                                                    <PlusOutlined /> Add
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div className='TableCustom'>
                                            <table className="custom-table">
                                                <thead>
                                                    <tr>
                                                        <th rowSpan={1}>No</th>
                                                        <th colSpan={1}>Role</th>
                                                        <th rowSpan={1}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fields.map((field, index) => (
                                                            <tr key={index}>
                                                                <td>{`${index + 1}`}</td>
                                                                <td>
                                                                    <Form.Item
                                                                        name={[field.name, 'id']}
                                                                        rules={[
                                                                            { required: true, message: "Please choose role" }
                                                                        ]}>
                                                                        <Select placeholder={i18next.t('label.all')} allowClear>
                                                                            {listRoleSelected.map((obj, i) => {
                                                                                return (
                                                                                    <Select.Option key={i} value={obj.id}>
                                                                                        {i18next.t(obj.name)}
                                                                                    </Select.Option>
                                                                                );
                                                                            })}
                                                                        </Select>
                                                                    </Form.Item></td>
                                                                <td>
                                                                    <Button
                                                                        onClick={() => remove(field.name)}
                                                                        disabled={fields.length === 0}
                                                                        icon={<DeleteOutlined />}
                                                                    />
                                                                </td>

                                                            </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }}
                        </Form.List>
                    </div>
                    <Row className="form__action-footer" style={{ marginTop: 12 }}>
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


export default EditPolicyManagement;