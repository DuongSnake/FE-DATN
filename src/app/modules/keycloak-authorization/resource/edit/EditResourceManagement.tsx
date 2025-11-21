import { ClearOutlined, SaveOutlined, ToTopOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertResource, updateResource } from '../ResourceManagement.reducer';
import '../../../cms-config/cms-app-url/edit/TableCmsAppUrl.scss';
const EditResourceManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();
    const { loadingAdd, loadingUpdate } = useAppSelector(state => state.userKeycloakManagementReducer);

    const [formRegis] = Form.useForm();


    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const _onSubmit = async (values: any) => {
        const payload = createCommonIParamsDuong({
            resourceId: values._id, resourceName: values.name.trim(), resourceDisplayName: values.displayName.trim()
            , listUrl: values.uris
        });
        if (isEdit) {
            dispatch(updateResource(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
            return;
        }
        dispatch(insertResource(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                _onSuccess();
            }
        });
    };

    const _onResetForm = () => {
        if (isEdit) return;

        formRegis.resetFields();
        formRegis.setFieldsValue({
            uris: [],
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
        }
    }, [isEdit, selected]);

    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{isEdit ? 'edit resource Management' : 'resource Management'}</h3>
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
                            <Form.Item name="_id" style={{ display: 'none' }}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Resource name</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="name">
                                <Input className="cms-form-control" maxLength={255} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Resource display name</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="displayName">
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div>
                        <Form.List name="uris" initialValue={selected?.uris}>
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        <Row align="middle" style={{ marginBottom: 12 }} justify="end">
                                            <Col>
                                                <Button onClick={() => add()} className="mb-2">
                                                    <PlusOutlined /> Add
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div className='TableCustom'>
                                            <table className="custom-table">
                                                <thead>
                                                    <tr>
                                                        <th rowSpan={1}>No</th>
                                                        <th colSpan={1}>Url</th>
                                                        <th rowSpan={1}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fields.map((field, index) => (
                                                            <tr key={index}>
                                                                <td>{`${index + 1}`}</td>
                                                                <td><Form.Item style={{ marginBottom: 0 }}
                                                                    name={[field.name]}>
                                                                    <Input style={{ width: '90%' }} />
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


export default EditResourceManagement;