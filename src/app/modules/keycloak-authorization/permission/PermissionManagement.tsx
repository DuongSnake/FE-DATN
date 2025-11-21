import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deletePermission, getListPermission, resetDept, selectPermission } from './PermissionManagement.reducer.ts';
import { getListResource } from '../resource/ResourceManagement.reducer.ts';
import { getListPolicy } from '../policy/PolicyManagement.reducer.ts';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { cellIndexRender, warningSuccess } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditPermission from './edit/EditPermissionManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { IScreenButton } from '@/app/shared/model/myRequest.model.ts';

const Permission = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.permissionKeycloakManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.permissionKeycloakManagementReducer.loadingDelete);
  const listPermission = useAppSelector(state => state.permissionKeycloakManagementReducer.listPermission);
  const singlePermission = useAppSelector(state => state.permissionKeycloakManagementReducer.data);
  const [screenButtonModel, setScreenButtonModel] = useState<IScreenButton>({} as IScreenButton);
  const [permissionName, setPermissionName] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [listAllRources, setListAllRources] = useState([]);
  const [showForm, setShowForm] = useState('add');

  const dataGridRef = useRef(null);

  const _handleChangePermissionName = e => {
    const { value } = e.target;
    setPermissionName(value);
  };

  const _onClickEdit = () => {
    dataGridRef.current.instance.getSelectedRowsData().then(sleds => {
      const idxs = [];
      sleds?.forEach(function (item) {
        idxs.push({ permissionId: item.id });
      });

      if (idxs.length !== 1) {
        return;
      }
      const payload = createCommonIParamsDuong(idxs[0]);
      dispatch(selectPermission(createCommonIParamsListDuong(payload))).then(res => {
        if (checkSuccessDispatch(res)) {
          onScrollToBottom();
          setShowForm('edit');
        }
      });
    });
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const onSelectionChanged = async () => {
    dataGridRef.current.instance.getSelectedRowsData().then(sleds => {
      const idxs = [];
      let updateButton = false;
      let canDelete = true;

      if (sleds.length !== 1) {
        canDelete = false;
      }

      if (sleds.length === 1) {
        updateButton = true;
      }

      setScreenButtonModel({ ...screenButtonModel, updateButton, deleteButton: canDelete });
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchAction = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    const payload = createCommonIParamsDuong({ permissionName });
    dispatch(getListPermission(payload));
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchAction();
    }
  };

  const _onDeleteAction = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchAction();
      },
    });
  };

  const _onDelete = async () => {
    dataGridRef.current.instance.getSelectedRowsData().then(sleds => {
      const idxs = [];
      sleds?.forEach(function (item) {
        idxs.push({ permissionId: item.id });
      });

      if (idxs.length !== 1) {
        warningSuccess('Please select a permission');
        return;
      }
      dispatch(deletePermission(createCommonIParamsListDuong(idxs[0]))).then(res => {
        if (checkSuccessDispatch(res)) {
          onScrollToTop();
          _onSearchAction();
        }
      });
    });
  };

  const getAllPolicy = () => {
    const payload = createCommonIParamsDuong({ policyName: '' });
    dispatch(getListPolicy(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListRole(objectResponse.data.listData);
      }
    });
  };

  const getAllRources = () => {
    const payload = createCommonIParamsDuong({ resourceName: '' });
    dispatch(getListResource(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListAllRources(objectResponse.data.listData);
      }
    });
  };

  useEffect(() => {
    _onSearchAction();
    getAllPolicy();
    getAllRources();
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
          permission Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Permission name</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={permissionName}
                onChange={_handleChangePermissionName}
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
            <Button className="button-add" icon={<PlusOutlined />} onClick={scrollToBottom}>
              {i18next.t('button.register')}
            </Button>

            <Button disabled={!screenButtonModel.updateButton} className="button-edit" icon={<EditOutlined />} onClick={_onClickEdit}>
              {i18next.t('button.edit')}
            </Button>

            <Button
              disabled={!screenButtonModel.deleteButton}
              loading={loadingDelete}
              className="button-delete"
              icon={<DeleteOutlined />}
              onClick={_onDeleteAction}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listPermission}
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
                onRowDblClick={_onClickEdit}
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
                  dataField="name"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Permission name"
                  dataType="string"
                />
                <Column
                  dataField="description"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Permission description"
                  dataType="string"
                />
                <Column
                  dataField="type"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Type"
                  dataType="string"
                  width={150}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditPermission
          isEdit={showForm === 'edit'}
          onSearch={_onSearchAction}
          selected={singlePermission}
          onChangeFormAdd={_onChangeFormAdd}
          listAllPolicy={listRole}
          listAllRources={listAllRources}
        />
      </div>
    </div>
  );
};
export default Permission;
