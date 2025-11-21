import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deletePolicy, getListPolicy, resetDept } from './PolicyManagement.reducer.ts';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditPolicy from './edit/EditPolicyManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';

const Policy = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.policyKeycloakManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.policyKeycloakManagementReducer.loadingDelete);
  const listPolicy = useAppSelector(state => state.policyKeycloakManagementReducer.listPolicy);
  const [policyName, setPolicyName] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangePolicyName = e => {
    const { value } = e.target;
    setPolicyName(value);
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
    let listDelete = '';

    listSelected.forEach(item => (listDelete = item.policyId));

    dispatch(deletePolicy(createCommonIParamsListDuong({ policyId: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchAction();
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchAction = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    const payload = createCommonIParamsDuong({ policyName });
    dispatch(getListPolicy(payload));
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
  useEffect(() => {
    _onSearchAction();
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
          Policy Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Policy name</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={policyName}
                onChange={_handleChangePolicyName}
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

            <Button
              disabled={listSelected.length !== 1}
              className="button-edit"
              icon={<EditOutlined />}
              onClick={() => _onChangeShowForm('edit')}
            >
              {i18next.t('button.edit')}
            </Button>

            <Button
              disabled={listSelected.length === 0}
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
                dataSource={listPolicy}
                showBorders={true}
                keyExpr="policyId"
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
                  dataField="policyName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Policy name"
                  dataType="string"
                />
                <Column
                  dataField="policyDesc"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Policy Description"
                  dataType="string"
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditPolicy isEdit={showForm === 'edit'} onSearch={_onSearchAction} selected={listSelected[0]} onChangeFormAdd={_onChangeFormAdd} />
      </div>
    </div>
  );
};
export default Policy;
