import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteUserMapRole, getListUserMapRole, resetDept } from './UserMapRoleManagement.reducer.ts';
import { getListRole } from '../role/RoleManagement.reducer.ts';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditUserMapRole from './edit/EditUserMapRoleManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';

const UserMapRole = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.userMapRoleKeycloakManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.userMapRoleKeycloakManagementReducer.loadingDelete);
  const listUserMapRole = useAppSelector(state => state.userMapRoleKeycloakManagementReducer.listUserMapRole);
  const [userName, setUserMapRoleName] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [listAllUser, setListAllUser] = useState([]);
  const [showForm, setShowForm] = useState('add');

  const dataGridRef = useRef(null);

  const _handleChangeUserMapRoleName = e => {
    const { value } = e.target;
    setUserMapRoleName(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const onSelectionChanged = async () => {
    const listData = [];
    await dataGridRef.current.instance.getSelectedRowsData().then(list => {
      list.map(data => {
        listData.push(data);
      });
    });
    setListSelected(listData);
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchAction = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    const payload = createCommonIParamsDuong({ userName });
    dispatch(getListUserMapRole(payload));
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchAction();
    }
  };

  const getAllRole = () => {
    const payload = createCommonIParamsDuong({ roleName: '' });
    dispatch(getListRole(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListRole(objectResponse.data.listData);
      }
    });
  };

  const getAllUser = () => {
    const payload = createCommonIParamsDuong({ userName: '' });
    dispatch(getListUserMapRole(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListAllUser(objectResponse.data.listData);
      }
    });
  };

  useEffect(() => {
    _onSearchAction();
    getAllRole();
    getAllUser();
    return () => {
      dispatch(resetDept());
    };
  }, []);

  useEffect(() => {
    if (listSelected.length > 1) {
      setShowForm('add');
    }
  }, [listSelected.length]);

  return (
    <div className="page-content-template department-management">
      <div className="page-heading-template">
        <h3 className="heading-template">
          User Map Role Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">UserMapRole name</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={userName}
                onChange={_handleChangeUserMapRoleName}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchAction}>
                Search
              </Button>
            </Col>
          </Row>
        </div>

        <div className="page-table-template">
          <div className="table-actions">
            <Button
              disabled={listSelected.length !== 1}
              className="button-edit"
              icon={<EditOutlined />}
              onClick={() => _onChangeShowForm('edit')}
            >
              {i18next.t('button.edit')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listUserMapRole}
                showBorders={true}
                keyExpr="id"
                ref={dataGridRef}
                allowColumnResizing={true}
                columnResizingMode={'nextColumn'}
                columnMinWidth={50}
                allowColumnReordering={true}
                onSelectionChanged={onSelectionChanged}
                wordWrapEnabled={true}
                hoverStateEnabled={true}
                onRowDblClick={_onDoubleClickRow}
                onRowClick={_onRowClick}
              >
                <Selection mode="multiple" showCheckBoxesMode={'always'} deferred={true} />
                <Paging defaultPageSize={10} enabled={true} />
                <Pager visible={true} showNavigationButtons={true} />
                <Column
                  allowFiltering={false}
                  allowSorting={false}
                  caption="no"
                  alignment="center"
                  width={40}
                  cellRender={cellIndexRender}
                />
                <Column
                  dataField="username"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="UserMapRole name"
                  dataType="string"
                />
                <Column dataField="email" alignment="left" allowFiltering={false} allowSorting={true} caption="Email" dataType="string" />
                <Column
                  dataField="firstName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="First name"
                  dataType="string"
                />
                <Column
                  dataField="lastName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Last name"
                  dataType="string"
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditUserMapRole
          isEdit={showForm === 'edit'}
          onSearch={_onSearchAction}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
          listAllRole={listRole}
          listAllUser={listAllUser}
        />
      </div>
    </div>
  );
};
export default UserMapRole;
