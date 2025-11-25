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
import { insertBankCode, updateBankCode, selectBankCode } from '../UserManagement.reducer';
const EditUserManagement = ({ isEdit, onSearch, selected, listAllRole, onChangeFormAdd }) => {
  const dispatch = useAppDispatch();
  const { loadingAdd, validateError, loadingUpdate } = useAppSelector(state => state.bankCodeManagementReducer);

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
  //Get all role by userId
  const getAllRole = (valueUserMapRoleId: string) => {
    let id = valueUserMapRoleId;
    const payload = createCommonIParamsDuong({ id });
    dispatch(selectBankCode(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListRoleSelected(objectResponse.data.roles);
        setListRoleSelectedFirst(objectResponse.data.roles);
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

  const _onSubmit = async (values: any) => {
    if (isEdit) {
      _onUpdateBankCode(values);
      return;
    } else {
      const listStringRole: string[] = listRoleSelected.map((role) => role.id.toString());
        const payload = createCommonIParamsDuong({
        id: values.id, username: values.username.trim(), email: values.email, fullName: values.fullName
        , phone: values.phone, identityCard: values.identityCard, address: values.address
        , status: values.status, note: values.note, roles: listStringRole
      });
      dispatch(insertBankCode(payload)).then(res => {
          if (checkSuccessDispatch(res)) {
              _onSuccess();
          }
      });
    }
  };
  const _onUpdateBankCode = (values: any) => {
    if (listRoleSelectedFirst.length === 0 && listRoleSelected.length > 0) {
      //, listRole: listRoleSelected
      const payload = createCommonIParamsDuong({
        id: values.id, username: values.username.trim(), email: values.email, fullName: values.fullName
        , phone: values.phone, identityCard: values.identityCard, address: values.address
        , status: values.status, note: values.note
      });
      dispatch(updateBankCode(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
    } else if ((listRoleSelectedFirst.length === 0 || listRoleSelectedFirst.length > 0) && listRoleSelected.length === 0) {
      //, listRole: listUnCheck
      const payload = createCommonIParamsDuong({
        id: values.id, username: values.username.trim(), email: values.email, fullName: values.fullName
        , phone: values.phone, identityCard: values.identityCard, address: values.address
        , status: values.status, note: values.note
      });
      dispatch(updateBankCode(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
        }
      });
    } else {
      //,listRole: listUnCheck
      const payload = createCommonIParamsDuong({
        id: values.id, username: values.username.trim(), email: values.email, fullName: values.fullName
        , phone: values.phone, identityCard: values.identityCard, address: values.address
        , status: values.status, note: values.note
      });
      dispatch(updateBankCode(payload)).then(res => {
        if (checkSuccessDispatch(res)) {
          _onSuccess();
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

  const updateUncheckedRoleNames = () => {
    if (!listRoleSelected || listRoleSelected.length === 0) {
      // No roles selected: all roles are unchecked
      setListUnCheck(listAllRole.map(role => role));
    } else {
      // Some roles selected: filter the rest
      const selectedNames = listRoleSelected.map(role => role.name);
      const uncheckedNames = listAllRole
        .filter(role => !selectedNames.includes(role.text))
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
        <h3>{isEdit ? 'Chỉnh sửa người dùng' : 'Người dùng'}</h3>
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
              <span className="cms-search-label">Mã người dùng</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="id">
                <Input className="cms-form-control" maxLength={255} disabled={true} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Tên đăng nhập</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="username"
                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Email</span>
              <span className="cms-required-field"> *</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="email">
                <Input className="cms-form-control" maxLength={200} />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" style={{ marginBottom: 12 }}>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Họ và tên</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="fullName">
                <Input className="cms-form-control" maxLength={30} />
              </Form.Item>
            </Col>

            <Col xs={10} md={3}>
              <span className="cms-search-label">Số điện thoại</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="phone">
                <Input className="cms-form-control" maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Mã sinh viên</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="identityCard">
                <Input className="cms-form-control" maxLength={20} />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: 12 }}>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Địa chỉ</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="address">
                <Input className="cms-form-control" maxLength={255} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Ghi chú</span>
            </Col>

            <Col xs={14} md={5}>
              <Form.Item name="note">
                <Input className="cms-form-control" maxLength={255} />
              </Form.Item>
            </Col>
            <Col xs={10} md={3}>
              <span className="cms-search-label">Quyền</span>
            </Col>

            <Col xs={14} md={5}>
              {listAllRole.map((role, i) => {
                const isSelected = listRoleSelected.some(selected => (selected.id == role.id));
                return (
                  <div key={role.name}>
                    <label htmlFor={role.name} className="cms-search-label">{role.name}</label>
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

          <Row align="middle" style={{ marginBottom: 12 }}>

            {isEdit ? (
              <>
                <Col xs={10} md={3}>
                  <span className="cms-search-label">{i18next.t('bankCodeManagement.regTm')}</span>
                </Col>

                <Col xs={14} md={5}>
                  <Form.Item name="createAt">
                    <Input disabled
                      className="cms-form-control" maxLength={30} />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <></>
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


export default EditUserManagement;