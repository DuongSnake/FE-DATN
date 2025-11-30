import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, IParamCommonDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertInstructorMapPeriodAssignment, updateInstructorMapPeriodAssignment, selectInstructorMapPeriodAssignment } from '../InstructorMapPeriodAssignment.reducer';
const EditInstructorMapPeriodAssignment = ({ isEdit, onSearch, selected, onChangeFormAdd, listInstructor, listPeriodAssignment }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.instructorMapPeriodAssignment);
  const [formRegis] = Form.useForm();
  const [periodAssignmentId, setPeriodAssignmentId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      _onUpdateInstructorMapPeriodAssignment(values);
      return;
    } else {
      const payload = createCommonIParamsDuong({
       instructorId: values.instructorId, periodAssignmentId: values.periodAssignmentId
      });
      dispatch(insertInstructorMapPeriodAssignment(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
    }
  };
  const _onUpdateInstructorMapPeriodAssignment = (values: any) => {
    const payload = createCommonIParamsDuong({
      instructorMapPeriodAssignmentId: values.instructorMapPeriodAssignmentId , instructorId: values.instructorId, periodAssignmentId: values.periodAssignmentId
    });
    dispatch(updateInstructorMapPeriodAssignment(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  }
  const _onResetForm = () => {
    if (isEdit) return;

    formRegis.resetFields();
    formRegis.setFieldsValue({
      regDate: moment().format(APP_DATE_FORMAT),
      regTime: moment().format('HH:mm')
    });
  };
  const _handleChangeInstructor = e => {
    setInstructorId(e);
  };
  const _handleChangePeriodAssignment = e => {
    setPeriodAssignmentId(e);
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
        instructorId: selected.instructorId,
        periodAssignmentId: selected.periodAssignmentId
      });
    }
  }, [isEdit, selected]);

  return (
    <div className="insert edit-department">
      <div className="heading">
        <h3>{isEdit ? 'Chỉnh sửa chuyên ngành' : 'Chuyên ngành'}</h3>
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
              <span className="cms-search-label">Mã chuyên ngành</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="instructorMapPeriodAssignmentId">
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Tên giáo viên</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="instructorId"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Select value={instructorId} onChange={_handleChangeInstructor} placeholder={i18next.t('label.all')} allowClear style={{ width: '220px' }}>
                  <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                  {Array.isArray(listInstructor) &&
                    listInstructor.map((obj, i) => {
                      return (
                        <Select.Option key={i} value={obj.id}>
                          {obj.username}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Loại kỳ hạn đồ án</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={8}>
              <Form.Item name="periodAssignmentId"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Select value={periodAssignmentId} onChange={_handleChangeInstructor} placeholder={i18next.t('label.all')} allowClear>
                  <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                  {Array.isArray(listPeriodAssignment) &&
                    listPeriodAssignment.map((obj, i) => {
                      return (
                        <Select.Option key={i} value={obj.periodAssignmentId}>
                          {obj.admissionPeriodIdName} - {obj.majorName}
                        </Select.Option>
                      );
                    })}
                </Select>
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


export default EditInstructorMapPeriodAssignment;