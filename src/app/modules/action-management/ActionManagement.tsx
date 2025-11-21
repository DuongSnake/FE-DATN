import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteAction, getListAction, resetDept } from './ActionManagement.reducer.ts';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../common/JSXFunction';
import '../../shared/layout/content-task.scss';
import EditAction from './edit/EditActionManagement';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { BANK_CODE_STATUS } from '@/app/config/constant/enum';

const Action = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.actionManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.actionManagementReducer.loadingDelete);
  const listAction = useAppSelector(state => state.actionManagementReducer.listAction);
  const [actionCd, setActionCd] = useState('');
  const [actionNm, setActionNm] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listActionType, setListActionType] = useState(BANK_CODE_STATUS);

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeActionCd = e => {
    const { value } = e.target;
    setActionCd(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeACtionNm = e => {
    const { value } = e.target;
    setActionNm(value);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
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
    const listDelete = [];

    listSelected.forEach(item => listDelete.push(item.actionCd));

    dispatch(deleteAction(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
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
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ actionCd, actionNm, status, pageRequestDto });
    dispatch(getListAction(payload));
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
          {i18next.t('actionManagement.heading')}
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label">{i18next.t('actionManagement.search.actionCode')}</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={actionCd}
                onChange={_handleChangeActionCd}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('actionManagement.search.actionName')}</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={actionNm}
                onChange={_handleChangeACtionNm}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('actionManagement.search.status')}</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listActionType.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchAction}>
                {i18next.t('actionManagement.button')}
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
                dataSource={listAction}
                showBorders={true}
                keyExpr="actionCd"
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
                  caption={i18next.t('cms-common.table.no')}
                  alignment="center"
                  width={40}
                  cellRender={cellIndexRender}
                />
                <Column
                  dataField="actionCd"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('actionManagement.table.actionCode')}
                  dataType="string"
                  width={140}
                />
                <Column
                  dataField="actionNm"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('actionManagement.table.actionName')}
                  dataType="string"
                />
                <Column
                  dataField="status"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('actionManagement.table.status')}
                  dataType="string"
                  width={120}
                  cellRender={row => {
                    if (!row.data.status) {
                      return <>{row.data.status}</>;
                    }
                    const requestStatusData = listActionType.find(obj => obj.val === row.data.status);

                    if (requestStatusData) {
                      return <>{i18next.t(requestStatusData.text)}</>;
                    }
                  }}
                />
                <Column
                  dataField="regTm"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('actionManagement.table.regTm')}
                  dataType="string"
                  width={180}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditAction isEdit={showForm === 'edit'} onSearch={_onSearchAction} selected={listSelected[0]} onChangeFormAdd={_onChangeFormAdd} />
      </div>
    </div>
  );
};
export default Action;
