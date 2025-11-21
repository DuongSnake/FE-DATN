import { ClearOutlined, SaveOutlined, ToTopOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Checkbox } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';

import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong } from '@/app/shared/model/common.model';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { insertRoleAction, updateRoleAction } from '../RoleActionManagement.reducer';
import { List } from 'reactstrap';
type ListActionRegister = {
  menuId: String; 
  menuNm: String;
  statusInsert: String;
  statusView: String;
  statusEdit: String;
  statusDelete: String;
  statusRequest: String;
}

type RowData = {
  roleCd: String; 
  roleNm: String;
  listActionRegister: ListActionRegister[];
}
const defaultSearch = {
  menuId: '',
  menuNm: '',
  statusInsert: 'N',
  statusView: 'N',
  statusEdit: 'N',
  statusDelete: 'N',
  statusRequest: 'N'
};

const EditRoleActionManagement = ({ isEdit, onSearch, selected, onChangeFormAdd }) => {
    const [rowData, setRowData] = useState<RowData>(selected);
    const [ationRegister, setAtionRegister] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [statusInsert, setStatusInsert] = useState("N");
    const { loadingAdd, validateError, loadingUpdate, data } = useAppSelector(state => state.roleManagementReducer);

    const [formRegis] = Form.useForm();
    let varriableDataTable = selected;
    const _onSuccess = () => {
        _onResetForm();
        onSearch();
        onChangeFormAdd();
        onScrollToTop();
    };

    const addNewCol = () => {
        const tableBody = document.getElementById('table_response')as HTMLTableElement;
        const newRow = tableBody.insertRow();
        const cell1 = newRow.insertCell();
        cell1.textContent = 'ma menu';
        const cell2 = newRow.insertCell();
        cell2.textContent = 'New Value 2';

        
        const cell3 = newRow.insertCell();
        cell3.textContent = 'statusInsert ';
        const cell4 = newRow.insertCell();
        cell4.textContent = 'statusView';

        
        const cell5 = newRow.insertCell();
        cell5.textContent = 'statusEdit';
        const cell6 = newRow.insertCell();
        cell6.textContent = 'statusDelete';

        
        const cell7 = newRow.insertCell();
        cell7.textContent = 'statusRequest';
        const cell8 = newRow.insertCell();
        let indexInObject = varriableDataTable.listActionRegister.length;
        cell8.innerHTML = '<Checkbox className="remember-me" onChange={clickDelete}>';
        cell1.className = 'text-center';
        cell2.className = 'text-center';
        cell3.className = 'text-center';
        cell4.className = 'text-center';
        cell5.className = 'text-center';
        cell6.className = 'text-center';
        cell7.className = 'text-center';
        //Set value in list action reg
        setAtionRegister([...ationRegister, defaultSearch]);

        setRowData(preState => {
            let eowwData = Object.assign({}, preState);
            eowwData.listActionRegister = ationRegister;
            return eowwData;
        });

    };

    const clickDelete = value => {
    console.log("checked:"+JSON.stringify(ationRegister));
    };

    const _onSubmit = async (values: any) => {
        console.log("click onsubmit :");
        // const payload = createCommonIParamsDuong({ roleCd: values.roleCd.trim(), roleNm: values.roleNm.trim(), sys: values.duong.trim() });
        // if (isEdit) {
        //     dispatch(updateRoleAction(payload)).then(res => {
        //         if (checkSuccessDispatch(res)) {
        //             _onSuccess();
        //         }
        //     });
        //     return;
        // }
        // dispatch(insertRoleAction(payload)).then(res => {
        //     if (checkSuccessDispatch(res)) {
        //         _onSuccess();
        //     }
        // });
    };

    const _onResetForm = () => {
        if (isEdit) return;

        formRegis.resetFields();
        formRegis.setFieldsValue({
            regDate: moment().format(APP_DATE_FORMAT),
            regTime: moment().format('HH:mm')
        });
    };

    useEffect(() => {
        setRowData(selected);
        console.log("tai visao:"+JSON.stringify(rowData));
        if (!isEdit) {
            _onResetForm();
            return;
        }
        if (selected && isEdit) {
            formRegis.setFieldsValue({
                ...selected
            });
        }
        setAtionRegister(selected.listActionRegister);
    }, [isEdit, selected, rowData]);

    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{i18next.t(`roleManagement.register.${isEdit ? 'editTitle' : 'title'}`)}</h3>
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

                <Form form={formRegis} className="custom-form edit-department__form">
                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Role code</span>
                            <span className="cms-required-field"> *</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="roleCd">
                                <Input className="cms-form-control" maxLength={255} disabled={isEdit} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Role name</span>
                            <span className="cms-required-field"> *</span>
                        </Col>
                        <Col xs={14} md={5}>
                            <Form.Item name="roleNm"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Đe gia tri cu vao */}
                    <Button className="button-add" onClick={addNewCol}>
                        Thêm cột
                    </Button>  
                    {isEdit ?
                    <>
                    
                    <table className='table' id="table_response" style={{ marginBottom: 18 }}>
                    <thead>
                        <tr>
                        <th rowSpan={2}>no</th>
                        <th rowSpan={2}>Menu Id</th>
                        <th rowSpan={2}>Menu name</th>
                        <th rowSpan={2}>Status insert</th>
                        <th rowSpan={2}>Status view</th>
                        <th rowSpan={2}>Status edit</th>
                        <th rowSpan={2}>Status delete</th>
                        <th colSpan={2}>Status request</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(rowData.listActionRegister).map(([key, value],i) => 
                        <tr key={i}>
                        <td rowSpan={1} className="text-center">{i +1}</td>
                        <td rowSpan={1} className="text-center">{value.menuNm}</td>
                        <td rowSpan={1} className="text-center">
                        <Checkbox className="remember-me"  onChange={() => clickDelete(i)} checked={"Y" == value.statusInsert ? true : false}>
                        </Checkbox></td>
                        <td rowSpan={1} className="text-center">
                         <Checkbox className="remember-me"  onChange={() => clickDelete(i)} checked={"Y" == value.statusView ? true : false}>
                        </Checkbox></td>
                        <td rowSpan={1} className="text-center">
                         <Checkbox className="remember-me"  onChange={() => clickDelete(i)} checked={"Y" == value.statusEdit ? true : false}>
                        </Checkbox></td>
                        <td rowSpan={1} className="text-center">
                         <Checkbox className="remember-me"  onChange={() => clickDelete(i)} checked={"Y" == value.statusDelete ? true : false}>
                        </Checkbox></td>
                        <td rowSpan={1} className="text-center">
                         <Checkbox className="remember-me"  onChange={() => clickDelete(i)} checked={"Y" == value.statusRequest ? true : false}>
                        </Checkbox></td>
                        <td rowSpan={1} className="text-center">
                        <Checkbox className="remember-me" onChange={() => clickDelete(i)} checked={"Y" == value.statusEdit ? true : false}>
                        </Checkbox>
                        </td>
                        </tr>
                    )}
                        </tbody>
                        </table>
                    </> 
                    : 
                    <></>
                    }
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


export default EditRoleActionManagement;