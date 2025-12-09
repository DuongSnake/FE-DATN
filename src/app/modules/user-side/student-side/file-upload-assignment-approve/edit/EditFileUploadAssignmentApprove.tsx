import { ClearOutlined, SaveOutlined, ToTopOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import '../edit/TableCmsAppUrl.scss'
import { UploadFile } from 'antd/es/upload/interface';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { selectFileUploadAssignmentApprove, getListFileUploadAssignmentApprove, resetDept, updateFileUploadAssignmentApprove, insertFileUploadAssignmentApprove } from '../FileUploadAssignmentApprove.reducer';
const EditFileUploadAssignmentApprove = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.fileUploadAssignmentApprove);
  const [formRegis] = Form.useForm();
  const [listIdUpdate, setListIdUpdate] = useState([]);
  const [listIdDelete, setListIdDelete] = useState([]);
  const [listFileInsert, setListFileInsert] = useState([]);
  const [listFileUpdate, setListFileUpdate] = useState([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([
    { id: 1, fileList: [] }]);

  const _onSuccess = () => {
    _onResetForm();
    onSearch();
    onChangeFormAdd();
    onScrollToTop();
  };
const handleChange = (info, rowId) => {
  let newFileList = [...info.fileList];
  newFileList = newFileList.slice(-1);

  // Update rows state for UI
  setRows(prev =>
    prev.map(row =>
      row.id === rowId ? { ...row, fileList: newFileList } : row
    )
  );

  // Only store originFileObj in listFileInsert
  const onlyOriginFiles = newFileList
    .map(file => file.originFileObj)
    .filter(Boolean); // remove undefined/null

  setListFileInsert(prev => [...prev, ...onlyOriginFiles]);
};

  const _onSubmit = async (values: any) => {
    console.log("list file upload:"+JSON.stringify(listFileInsert));
    if (isEdit) {
      _onUpdateFileUploadAssignmentApprove(values);
      return;
    } else {
      const formData = new FormData();
      if (fileList[0].url != "") {
        formData.append("fileUpload", fileList[0].originFileObj);
      }
      formData.append("FileUploadAssignmentApproveId", values.FileUploadAssignmentApproveId);
      formData.append("assignmentRegisterName", values.assignmentRegisterName);
      formData.append("studentMapInstructorId", values.studentMapInstructorId);
      dispatch(insertFileUploadAssignmentApprove(formData)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
    }
  };
  const _onUpdateFileUploadAssignmentApprove = (values: any) => {
    const formData = new FormData();
  // Append all files under the same field name "fileUpload"
  listFileInsert.forEach(file => {
    formData.append("listFile", file);
  });


    formData.append("assignmentRegisterId", values.assignmentRegisterId);
    dispatch(insertFileUploadAssignmentApprove(formData)).then(res => {
      if (checkSuccessDispatch(res)) {
        _onSuccess();
      }
    });
  }
  const _onAddRowToTable = async () => {
    ///Add more row in table
    const newRow = {
      id: rows.length + 1,
      fileList: []
    };
    setRows([...rows, newRow]);

  };

  const _onResetForm = () => {
    if (isEdit) return;

    setFileList([]);
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
        <h3>{isEdit ? 'Chỉnh sửa danh sach de tai da duyet' : 'Danh sach de tai da duyet'}</h3>
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
              <span className="cms-search-label">Mã de tai dang ky</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="assignmentRegisterId">
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Tên đề tài đăng ký</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="assignmentRegisterName"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <div className='TableCustom'>
            <div style={{ float: 'right', marginBottom: '5px' }}>
              <Button className="button-add" onClick={_onAddRowToTable}>
                Them file
              </Button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th rowSpan={1}>No</th>
                  <th rowSpan={2}>Ten file</th>
                  <th rowSpan={2}>Active</th>
                </tr>
              </thead>
              {/* handle that table */}
              <tbody>
                {rows.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <Form.Item name={`contentAssignment_${row.id}`}>
                        <Upload
                          beforeUpload={() => false}
                          onChange={(info) => handleChange(info, row.id)}
                          fileList={row.fileList}
                          multiple={false}
                          showUploadList={false}
                        >
                          <Button icon={<UploadOutlined />}>
                            {row.fileList.length > 0 ? row.fileList[0].name : 'Click to Upload'}
                          </Button>
                        </Upload>
                      </Form.Item>
                    </td>
                    <td>
                      <Button
                        className="button-delete"
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setRows(rows.filter(r => r.id !== row.id))
                        }
                      >
                        {i18next.t('button.delete')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <Row className="form__action-footer" style={{ marginTop: 12 }}>
            <Button className="button-edit" htmlType="submit" loading={isEdit ? loadingUpdate : loadingAdd}
              icon={<SaveOutlined />}>
              {i18next.t('button.save')}
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};


export default EditFileUploadAssignmentApprove;