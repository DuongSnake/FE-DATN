import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, IParamCommonDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertAdmissionPeriod, updateAdmissionPeriod, selectAdmissionPeriod } from '../AdmissionPeriod.reducer';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const { RangePicker } = DatePicker;
const EditAdmissionPeriodManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const dispatch = useAppDispatch();
    const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.admissionPeriodManagementReducer);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [listRoleSelected, setListRoleSelected] = useState([]);
    const [listRoleSelectedFirst, setListRoleSelectedFirst] = useState([]);
    const [listUnCheck, setListUnCheck] = useState([]);
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

    const _onSubmit = async (values: any) => {
        if (isEdit) {
            _onUpdateAdmissionPeriod(values);
            return;
        } else {
            const payload = createCommonIParamsDuong({
                admissionPeriodName: values.admissionPeriodName
            });
            dispatch(insertAdmissionPeriod(payload)).then(res => {
                if (checkSuccessDispatch(res)) {
                    _onSuccess();
                }
            });
        }
    };
    const _onUpdateAdmissionPeriod = (values: any) => {
        const payload = createCommonIParamsDuong({
            admissionPeriodId: values.admissionPeriodId, admissionPeriodName: values.admissionPeriodName
            ,startPeriod:fromDate ,endPeriod:toDate
        });
        dispatch(updateAdmissionPeriod(payload)).then(res => {
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
      });
        setFromDate(selected.startPeriod);
        setToDate(selected.endPeriod);
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
                            <span className="cms-search-label">Mã kỳ học</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="admissionPeriodId">
                                <Input className="cms-form-control" maxLength={255} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Tên kỳ học</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="admissionPeriodName"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>

                        <Col xl={3} xxl={3}>
                            <label className="cms-search-label label-padding-left">Thời gian kỳ học</label>
                        </Col>


                        {isEdit ? (
                            <>
                                <Col xl={5} xxl={4}>
                            <Form.Item name="date"
                                >
                                    <RangePicker className="date" id="date" onChange={onChangeDate} />
                            </Form.Item>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col xl={5} xxl={4}>
                                    <RangePicker className="date" id="date" onChange={onChangeDate} />
                                </Col>
                            </>
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


export default EditAdmissionPeriodManagement;