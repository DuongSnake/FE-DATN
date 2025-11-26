import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, DatePicker, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, IParamCommonDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertPeriodAssignment, updatePeriodAssignment, selectPeriodAssignment } from '../PeriodAssignment.reducer';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const { RangePicker } = DatePicker;
const EditPeriodAssignmentManagement = ({ isEdit, onSearch, selected, listMajor, listAdmissionPeriod, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();
    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.periodAssignmentManagementReducer);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [admissionPeriodId, setAdmissionPeriodId] = useState('');
    const [majorId, setMajorId] = useState('');
    const [formRegis] = Form.useForm();

    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const onChangeDate = value => {
        const majorFromDt = value && value.length === 2 ? value[0].format(APP_DATE_FORMAT) : '';
        const majorToDt = value && value.length === 2 ? value[1].format(APP_DATE_FORMAT) : '';
        setFromDate(majorFromDt);
        setToDate(majorToDt);
    };

    const _handleChangeAdmissionPeriod = e => {
        setAdmissionPeriodId(e);
    };

    const _handleChangeMajorId = e => {
        setMajorId(e);
    };

    const _onSubmit = async (values: any) => {
        if (isEdit) {
            _onUpdatePeriodAssignment(values);
            return;
        } else {
            const payload = createCommonIParamsDuong({
            admissionPeriodId: admissionPeriodId, majorId: majorId
            , startPeriod: fromDate, endPeriod: toDate, note : values.note
            });
            dispatch(insertPeriodAssignment(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
        }
    };
    const _onUpdatePeriodAssignment = (values: any) => {
        const payload = createCommonIParamsDuong({
            periodAssignmentId: values.periodAssignmentId, admissionPeriodId: values.admissionPeriodId, majorId: values.majorId
            , startPeriod: fromDate, endPeriod: toDate, note : values.note
        });
        dispatch(updatePeriodAssignment(payload)).then(res => {
            if (checkSuccessDispatch(res)) {
                _onSuccess();
            }
        });
    }
    const _onResetForm = () => {
        if (isEdit) return;

        formRegis.resetFields();
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
            //Set default value date for form regis and variable fromDate and toDate
            formRegis.setFieldsValue({
                date: [
                    dayjs(selected.startPeriod, APP_DATE_FORMAT),
                    dayjs(selected.endPeriod, APP_DATE_FORMAT),
                ],
                admissionPeriodId:selected.admissionPeriodId,
                majorId:selected.majorId
            });
        setFromDate(selected.startPeriod);
        setToDate(selected.endPeriod);
        setAdmissionPeriodId(selected.setAdmissionPeriodId);
        setMajorId(selected.setMajorId);
        }
    }, [isEdit, selected]);

    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{isEdit ? 'Chỉnh kỳ học' : 'Kỳ học'}</h3>
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
                            <span className="cms-search-label">Mã hạn làm đồ án</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="periodAssignmentId">
                                <Input className="cms-form-control" maxLength={255} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xl={10} xxl={3}>
                            <label className="cms-search-label">Thời hạn làm đồ án</label>
                            <span className="cms-required-field"> *</span>
                        </Col>


                        {isEdit ? (
                            <>
                                <Col xl={5} xxl={4}>
                                    <Form.Item name="date"
                                    rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}
                                    >
                                        <RangePicker className="date" id="date" onChange={onChangeDate}  style={{width: '220px'}}/>
                                    </Form.Item>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col xl={5} xxl={4}>
                                    <RangePicker className="date" id="date" onChange={onChangeDate}  style={{width: '220px'}}/>
                                </Col>
                            </>
                        )}
                        
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Kỳ học</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="admissionPeriodId"
                            rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Select value={admissionPeriodId} onChange={_handleChangeAdmissionPeriod} placeholder={i18next.t('label.all')} allowClear style={{width: '220px'}}>
                                    <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                                    {Array.isArray(listAdmissionPeriod) &&
                                        listAdmissionPeriod.map((obj, i) => {
                                            return (
                                                <Select.Option key={i} value={obj.admissionPeriodId}>
                                                    {obj.admissionPeriodName}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Chuyên ngành</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="majorId"
                            rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Select value={majorId} onChange={_handleChangeMajorId} placeholder={i18next.t('label.all')} allowClear style={{width: '220px'}}>
                                    <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                                    {Array.isArray(listMajor) &&
                                        listMajor.map((obj, i) => {
                                            return (
                                                <Select.Option key={i} value={obj.majorId}>
                                                    {obj.majorName}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Ghi chú</span>
                        </Col>

                        <Col xl={5} xxl={4}>
                            <Form.Item name="note">
                                <Input className="cms-form-control" maxLength={200}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row className="form__action-footer">
                        <Button className="button-add" htmlType="submit" loading={isEdit ? loadingUpdate : loadingAdd}
                            icon={<SaveOutlined />}>
                            {i18next.t('button.save')}
                        </Button>
                        {/* <Form.Item name="majorId"></Form.Item> */}
                    </Row>
                </Form>
            </div>
        </div>
    );
};


export default EditPeriodAssignmentManagement;