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
import { insertScoreAssigment, updateScoreAssigment, selectScoreAssigment } from '../ScoreAssignment.reducer';
const EditScoreAssigmentManagement = ({ isEdit, onSearch, selected, onChangeFormAdd, listAssignmentRegister }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.scoreAssignement);
  const [assignmentRegisterId, setAssignmentRegisterId] = useState('');
  const [listUnCheck, setListUnCheck] = useState([]);
  const [formRegis] = Form.useForm();

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      _onUpdateScoreAssigment(values);
      return;
    } else {
        const payload = createCommonIParamsDuong({assignmentRegisterId: values.assignmentRegisterId,
        scoreInstructor: values.scoreInstructor,scoreExaminer: values.scoreExaminer,scoreCritical: values.scoreCritical,
      });
      dispatch(insertScoreAssigment(payload)).then(res => {
          if (checkSuccessDispatch(res)) {
              _onSuccess();
          }
      });
    }
  };
  const _onUpdateScoreAssigment = (values: any) => {
      const payload = createCommonIParamsDuong({
        scoreAssignmentId: values.scoreAssignmentId, assignmentRegisterId: values.assignmentRegisterId,
        scoreInstructor: values.scoreInstructor,scoreExaminer: values.scoreExaminer,scoreCritical: values.scoreCritical,
      });
      dispatch(updateScoreAssigment(payload)).then(res => {
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
      console.log("object:"+JSON.stringify(listAssignmentRegister));
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
        <h3>{isEdit ? 'Chỉnh sửa diem do an' : 'Diem do an'}</h3>
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
              <span className="cms-search-label">Mã diem do an</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="scoreAssignmentId">
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Ma do an da duyet</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="assignmentRegisterId"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Select value={assignmentRegisterId} placeholder={i18next.t('label.all')} allowClear>
                  <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                  {Array.isArray(listAssignmentRegister) &&
                    listAssignmentRegister.map((obj, i) => {
                      return (
                        <Select.Option key={i} value={obj.assignmentRegisterId}>
                          {obj.assignmentRegisterName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Diem hoi dong</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="scoreExaminer"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input  type="number" pattern="[0-9]*[.,]?[0-9]*"/>
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Diem giao vien huong dan</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="scoreInstructor"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input  type="number" pattern="[0-9]*[.,]?[0-9]*"/>
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Diem giao vien phan bien</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="scoreCritical"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input type="number" pattern="[0-9]*[.,]?[0-9]*"/>
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


export default EditScoreAssigmentManagement;