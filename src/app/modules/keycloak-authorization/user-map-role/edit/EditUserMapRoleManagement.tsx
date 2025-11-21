import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertUserMapRole, updateUserMapRole, selectListByUserMapRoleId } from '../UserMapRoleManagement.reducer';
import { unAssignRole, roleMapping } from '../../role/RoleManagement.reducer';
const EditUserMapRoleManagement = ({ isEdit, onSearch, selected, onChangeFormAdd, listAllRole, listAllUser }) => {
    const dispatch = useAppDispatch();

    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.userKeycloakManagementReducer);
    const [userId, setUserId] = useState('');
    const [formRegis] = Form.useForm();
    const [listRoleSelected, setListRoleSelected] = useState([]);
    const [listRoleSelectedFirst, setListRoleSelectedFirst] = useState([]);
    const [listUnCheck, setListUnCheck] = useState([]);


    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const _onSubmit = async (values: any) => {
        if (isEdit) {
                    _onUpdateRole(values.id);
                    _onSuccess();
            return;
        }else{
            const payload = createCommonIParamsDuong({
                userId: values.id, listRole: listRoleSelected
            });
            dispatch(roleMapping(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
        }
    };
    const _onUpdateRole = (valueUserMapRoleId: string) => {
        if (listRoleSelectedFirst.length === 0 && listRoleSelected.length > 0) {
            const payload = createCommonIParamsDuong({
                userId: valueUserMapRoleId, listRole: listRoleSelected
            });
            dispatch(roleMapping(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
        } else if ((listRoleSelectedFirst.length === 0 || listRoleSelectedFirst.length > 0) && listRoleSelected.length === 0) {
            const payload = createCommonIParamsDuong({
                userId: valueUserMapRoleId, listRole: listUnCheck
            });
            dispatch(unAssignRole(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
        } else {
            const payload = createCommonIParamsDuong({
                userId: valueUserMapRoleId, listRole: listUnCheck
            });
            dispatch(unAssignRole(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    //Role maping call
                    const payload = createCommonIParamsDuong({
                        userId: valueUserMapRoleId, listRole: listRoleSelected
                    });
                    dispatch(roleMapping(payload)).then(res => {
                        if (checkSuccessDispatch(res)) {
                            _onSuccess();
                        }
                    });
                }
            });
        }
    }

    const _onResetForm = () => {
        if (isEdit) return;

        formRegis.resetFields();
        formRegis.setFieldsValue({
            regDate: moment().format(APP_DATE_FORMAT),
            regTime: moment().format('HH:mm')
        });
    };

    const _handleChangeUserId = e => {
        setUserId(e);
    };


    //Get all role by userId
    const getAllRole = (valueUserMapRoleId: string) => {
        const payload = createCommonIParamsDuong({ userId: valueUserMapRoleId });
        dispatch(selectListByUserMapRoleId(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                const objectResponse: IParamCommonDuong = res.payload;
                setListRoleSelected(objectResponse.data.listData);
                setListRoleSelectedFirst(objectResponse.data.listData);
            }
        });
    }

    const handleCheckboxChange = (role) => {
        const isSelected = listRoleSelected.some(selected => selected.name === role.name);
        if (isSelected) {
            // Remove from selected
            setListRoleSelected(prev =>
                prev.filter(selected => selected.name !== role.name)
            );
        } else {
            // Add to selected
            setListRoleSelected(prev => [...prev, role]);
        }
    };

    const updateUncheckedRoleNames = () => {
        if (!listRoleSelected || listRoleSelected.length === 0) {
            // No roles selected: all roles are unchecked
            setListUnCheck(listAllRole.map(role => role));
        } else {
            // Some roles selected: filter the rest
            const selectedNames = listRoleSelected.map(role => role.name);
            const uncheckedNames = listAllRole
                .filter(role => !selectedNames.includes(role.name))
                .map(role => role);
            setListUnCheck(uncheckedNames);
        }
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
        updateUncheckedRoleNames();
    }, [listRoleSelected, listAllRole]);

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
                                <Select value={userId} onChange={_handleChangeUserId} placeholder={i18next.t('label.all')} allowClear disabled={isEdit} >
                                    <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                                    {listAllUser.map((obj, i) => {
                                        return (
                                            <Select.Option key={i} value={obj.id}>
                                                {obj.username}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Role</span>
                        </Col>
                        <Col xs={14} md={5}>
                            {listAllRole.map((role, i) => {
                                const isSelected = listRoleSelected.some(selected => selected.name === role.name);
                                return (
                                    <div key={role.id}>
                                        <label htmlFor={role.id} className="cms-search-label">{role.name}</label>
                                        <input
                                            id={role.id}
                                            type="checkbox"
                                            name="ParticipantSelection"
                                            value={role.id}
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(role)}
                                        />
                                    </div>
                                );
                            })}
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


export default EditUserMapRoleManagement;