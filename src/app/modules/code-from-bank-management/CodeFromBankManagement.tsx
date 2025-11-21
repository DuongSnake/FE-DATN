import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, Pagination } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteCodeFromBank, getListCodeFromBank, resetDept } from './CodeFromBankManagement.reducer.ts';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../common/JSXFunction';
import '../../shared/layout/content-task.scss';
import EditCodeFromBank from './edit/EditCodeFromBankManagement';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { BANK_CODE_STATUS } from '@/app/config/constant/enum';

const CodeFromBank = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.codeFromBankManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.codeFromBankManagementReducer.loadingDelete);
  const listCodeFromBank = useAppSelector(state => state.codeFromBankManagementReducer.listCodeFromBank);
  const totalRecord = useAppSelector(state => state.codeFromBankManagementReducer.totalRecord);
  const [bankCodeCitad, setBankCodeCitad] = useState('');
  const [bankCodeNapas, setBankCodeNapas] = useState('');
  const [bankCodeName, setBankCodeName] = useState('');
  const [bankCode3, setBankCode3] = useState('');
  const [typeCode, setTypeCode] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listCodeFromBankType, setListCodeFromBankType] = useState(BANK_CODE_STATUS);
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeBankCodeCitad = e => {
    const { value } = e.target;
    setBankCodeCitad(value);
  };

  const _handleChangeTypeCode = e => {
    const { value } = e.target;
    setTypeCode(value);
  };

  const _handleChangeBankCodeName = e => {
    const { value } = e.target;
    setBankCodeName(value);
  };

  const _handleChangeBankCode3 = e => {
    const { value } = e.target;
    setBankCode3(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchCodeFromBank(page, pageSize);
  };
  const _handleChangeBankCodeNapas = e => {
    const { value } = e.target;
    setBankCodeNapas(value);
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

  const _onDeleteCodeFromBank = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchCodeFromBank2();
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];
    dispatch(deleteCodeFromBank(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchCodeFromBank2();
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchCodeFromBank = async (pageNum, pageSize) => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    const payload = createCommonIParamsDuong({ bankCodeCitad, bankCodeNapas, bankCode3, typeCode, status, pageRequestDto });
    dispatch(getListCodeFromBank(payload));
  };

  const _onSearchCodeFromBank2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: pager.pageNum,
      pageSize: pager.pageSize,
    };
    const payload = createCommonIParamsDuong({ bankCodeCitad, bankCodeNapas, bankCode3, typeCode, status, bankCodeName, pageRequestDto });
    dispatch(getListCodeFromBank(payload));
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchCodeFromBank(pager.pageNum, pager.pageSize);
    }
  };

  useEffect(() => {
    _onSearchCodeFromBank(pager.pageNum, pager.pageSize);
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
          Code From Bank Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label">Code 1</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={bankCodeCitad}
                onChange={_handleChangeBankCodeCitad}
                maxLength={200}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Code 2</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={bankCodeNapas}
                onChange={_handleChangeBankCodeNapas}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Status</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listCodeFromBankType.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>

          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label">Code3</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={bankCode3}
                onChange={_handleChangeBankCode3}
                maxLength={200}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Group Code</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={typeCode}
                onChange={_handleChangeTypeCode}
                maxLength={200}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Code Name</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={bankCodeName}
                onChange={_handleChangeBankCodeName}
                maxLength={200}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchCodeFromBank2}>
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
              onClick={_onDeleteCodeFromBank}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listCodeFromBank}
                showBorders={true}
                keyExpr="idx"
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
                <Selection mode="single" showCheckBoxesMode={'always'} deferred={true} />
                <Pager visible={false} showNavigationButtons={false} />
                <Column
                  allowFiltering={false}
                  allowSorting={false}
                  caption={i18next.t('cms-common.table.no')}
                  alignment="center"
                  width={40}
                  cellRender={cellIndexRender}
                />
                <Column
                  dataField="typeCode"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Group Code"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="bankCodeCitad"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Code 1"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="bankCodeNapas"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Code 2"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="bankCode3"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Code 3"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="bankCodeName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Code Name"
                  dataType="string"
                />
                <Column
                  dataField="bankCodeLocation"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Code 2 name"
                  dataType="string"
                />
                <Column
                  dataField="status"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Status"
                  dataType="string"
                  width={120}
                  cellRender={row => {
                    if (!row.data.status) {
                      return <>{row.data.status}</>;
                    }
                    const requestStatusData = listCodeFromBankType.find(obj => obj.val === row.data.status);

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
                  caption="Register Time"
                  dataType="string"
                  width={180}
                />
              </DataGrid>
              <div className="pagination-bottom">
                <Pagination
                  showSizeChanger={false}
                  pageSize={pager.pageSize}
                  defaultCurrent={pager.pageNum}
                  current={pager.pageNum}
                  total={totalRecord}
                  onChange={_onChangePagination}
                />
              </div>
            </div>
          </Spin>
        </div>

        <EditCodeFromBank
          isEdit={showForm === 'edit'}
          onSearch={_onSearchCodeFromBank}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
        />
      </div>
    </div>
  );
};
export default CodeFromBank;
