import { ClearOutlined, SaveOutlined, ToTopOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { UploadFile } from 'antd/es/upload/interface';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertAssignmentStudentRegister, updateAssignmentStudentRegister, selectAssignmentStudentRegister } from '../AssignmentStudentRegister.reducer';
const EditAssignmentStudentRegister = ({ isEdit, onSearch, selected, onChangeFormAdd, listStudentMapInstructor }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.assignmentStudentRegister);
  const [formRegis] = Form.useForm();
  const [studentMapInstructorId, setStudentMapInstructorId] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };
  const handleChange = (info) => {
    console.log(info);
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      _onUpdateAssignmentStudentRegister(values);
      return;
    } else {
    const formData = new FormData();
    if(fileList[0].url != ""){
    formData.append("fileUpload", fileList[0].originFileObj);
    }
    formData.append("assignmentStudentRegisterId", values.assignmentStudentRegisterId);
    formData.append("assignmentStudentRegisterName", values.assignmentStudentRegisterName);
    formData.append("studentMapInstructorId", values.studentMapInstructorId);
      dispatch(insertAssignmentStudentRegister(formData)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
    }
  };
  const _onUpdateAssignmentStudentRegister = (values: any) => {
    const formData = new FormData();
    if(fileList[0].url != ""){
    formData.append("fileUpload", fileList[0].originFileObj);
    }
    formData.append("assignmentStudentRegisterId", values.assignmentStudentRegisterId);
    formData.append("assignmentStudentRegisterName", values.assignmentStudentRegisterName);
    formData.append("studentMapInstructorId", values.studentMapInstructorId);
    dispatch(updateAssignmentStudentRegister(formData)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  }

  const _onResetForm = () => {
    if (isEdit) return;

    setFileList([]);
    formRegis.resetFields();
  };
  const _handleChangeStudentMapInstructorId = e => {
    setStudentMapInstructorId(e);
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
        studentMapInstructorId: selected.studentMapInstructorId
      });
      const defaultFile: UploadFile = {
        uid: '-1',
        name: selected.fileName,
        status: 'done',
        url: '', // optional: link to file if available
      };
      setFileList([defaultFile]);

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
              <span className="cms-search-label">Mã map giáo viên - sinh viên</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="assignmentStudentRegisterId">
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Tên đề tài đăng ký</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="assignmentStudentRegisterName"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={255} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">File đăng ký đề tài</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="contentAssignment">
                <Upload
                  beforeUpload={() => false}
                  onChange={handleChange}
                  fileList={fileList}
                  multiple={false}
                  showUploadList={false} // hide default file list display
                >
                  <Button icon={<UploadOutlined />}>
                    {fileList.length > 0 ? fileList[0].name : 'Click to Upload'}
                  </Button>
                </Upload>

              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Tên sinh viên - Giáo viên</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={8}>
              <Form.Item name="studentMapInstructorId"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Select value={studentMapInstructorId} onChange={_handleChangeStudentMapInstructorId} placeholder={i18next.t('label.all')} allowClear>
                  <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                  {Array.isArray(listStudentMapInstructor) &&
                    listStudentMapInstructor.map((obj, i) => {
                      return (
                        <Select.Option key={i} value={obj.studentMapInstructorId}>
                          {obj.studentName} - {obj.instructorName}
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


export default EditAssignmentStudentRegister;