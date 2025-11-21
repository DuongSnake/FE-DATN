import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteBankCode, getListBankCode, resetDept } from './BankCodeManagement.reducer';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../common/JSXFunction';
import '../../shared/layout/content-task.scss';
import EditBankCode from './edit/EditBankCodeManagement';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS } from '@/app/config/constant/enum';

const Demo1 = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.bankCodeManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.bankCodeManagementReducer.loadingDelete);
  const listBankCode = useAppSelector(state => state.bankCodeManagementReducer.listBankCode);
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [[phone], setPhone] = useState('');
  const [[identityCard], setIdentityCard] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeId = e => {
    const { value } = e.target;
    setId(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeUserName = e => {
    const { value } = e.target;
    setUsername(value);
  };

  const _handleChangeEmail = e => {
    const { value } = e.target;
    setEmail(value);
  };

  const _handleChangePhone = e => {
    const { value } = e.target;
    setEmail(value);
  };

  const _handleChangeIdentityCard = e => {
    const { value } = e.target;
    setIdentityCard(value);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
  };

  const onSelectionChanged = async () => {
    const listData = [];
    await dataGridRef.current.instance.getSelectedRowsData().then(list => {
      list.map(data => {
    console.log("value object:"+JSON.stringify(list));
        listData.push(data);
      });
    });
    setListSelected(listData);
  };

  const _onDeleteBankCode = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchBankCode();
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];

    listSelected.forEach(item => listDelete.push(item.bankCd));

    dispatch(deleteBankCode(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchBankCode();
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchBankCode = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ id, username, email, phone, identityCard, fullName, status, pageRequestDto });
    dispatch(getListBankCode(payload));
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchBankCode();
    }
  };

  useEffect(() => {
    _onSearchBankCode();
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
          {i18next.t('bankCodeManagement.heading')}
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('bankCodeManagement.search.bankCode')}</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={id}
                onChange={_handleChangeId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('bankCodeManagement.search.bankName')}</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={username}
                onChange={_handleChangeUserName}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('bankCodeManagement.search.openApiBankCd')}</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={identityCard}
                onChange={_handleChangeEmail}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
          </Row>

          <Row align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">{i18next.t('bankCodeManagement.search.status')}</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listBankCodeType.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchBankCode}>
                {i18next.t('bankCodeManagement.button')}
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
              onClick={_onDeleteBankCode}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listBankCode}
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
                  dataField="id"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.bankCode')}
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="username"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.bankName')}
                  dataType="string"
                />
                <Column
                  dataField="fullName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.baseUrl')}
                  dataType="string"
                />
                <Column
                  dataField="status"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.status')}
                  dataType="string"
                  width={120}
                  cellRender={row => {
                    if (!row.data.status) {
                      return <>{row.data.status}</>;
                    }
                    const requestStatusData = listBankCodeType.find(obj => obj.val === row.data.status);

                    if (requestStatusData) {
                      return <>{i18next.t(requestStatusData.text)}</>;
                    }
                  }}
                />
                <Column
                  dataField="majorName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.openApiBankCd')}
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="createAt"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={i18next.t('bankCodeManagement.table.regTm')}
                  dataType="string"
                  width={180}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditBankCode
          isEdit={showForm === 'edit'}
          onSearch={_onSearchBankCode}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
        />
      </div>
    </div>
  );
};
export default Demo1;
