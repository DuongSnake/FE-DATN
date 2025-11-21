import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, DatePicker, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteCmsAppUrl, getListCmsAppUrl, resetDept } from './CmsAppUrlManagement.reducer.ts';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditCmsAppUrl from './edit/EditCmsAppUrlManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { BANK_CODE_STATUS } from '@/app/config/constant/enum';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants.ts';
import { getListBankCode } from '../../bank-code-management/BankCodeManagement.reducer.ts';
import moment from 'moment';
const { RangePicker } = DatePicker;
const CmsAppUrl = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.cmsAppUrlManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.cmsAppUrlManagementReducer.loadingDelete);
  const listAppUrl = useAppSelector(state => state.cmsAppUrlManagementReducer.listCmsAppUrl);
  const [bankCd, setBankCd] = useState('');
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [listBankCode, setListBankCode] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listActionType, setListActionType] = useState(BANK_CODE_STATUS);
  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');
    onScrollToBottom();
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeBankCd = e => {
    const { value } = e.target;
    setBankCd(value);
  };

  const onChangeDate = value => {
    const eventKafkaDtFrom = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const eventKafkaDtTo = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDt(eventKafkaDtFrom);
    setToDt(eventKafkaDtTo);
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

    listSelected.forEach(item => listDelete.push(item.idx));

    dispatch(deleteCmsAppUrl(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
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
    const payload = createCommonIParamsDuong({ bankCd, fromDt, toDt, pageRequestDto });
    dispatch(getListCmsAppUrl(payload));
  };

  const findListBankCode = async () => {
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ bankCd: null, bankNm: null, openApiBankCd: null, status: '1', pageRequestDto });
    dispatch(getListBankCode(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListBankCode(objectResponse.data.listData);
      }
    });
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _handleChangeBankCode = e => {
    setBankCd(e);
  };

  useEffect(() => {
    _onSearchAction();
    findListBankCode();
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
          {i18next.t('menu.cmsAppUrlMap')}
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Bank code</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select placeholder={i18next.t('label.all')} allowClear onChange={_handleChangeBankCode}>
                <>
                  {listBankCode.map((obj, i) => {
                    return (
                      <Select.Option key={i} value={obj.bankCd} selected>
                        {i18next.t(obj.bankCd)} -{i18next.t(obj.bankNm)}
                      </Select.Option>
                    );
                  })}
                </>
              </Select>
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Register date time</label>
            </Col>

            <Col xl={5} xxl={4}>
              <RangePicker className="date" id="date" onChange={onChangeDate} />
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
                dataSource={listAppUrl}
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
                  dataField="bankCd"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Bank code"
                  width={120}
                  dataType="string"
                />
                <Column
                  dataField="bankNm"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Bank name"
                  dataType="string"
                  width={170}
                />
                <Column
                  dataField="apiIdGw"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Api Id gateway"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="apiNmGw"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Api gateway url"
                  dataType="string"
                />
                <Column
                  dataField="cmsUrl"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="CMS url"
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
                  caption="Register date time"
                  dataType="string"
                  width={170}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditCmsAppUrl
          isEdit={showForm === 'edit'}
          onSearch={_onSearchAction}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
        />
      </div>
    </div>
  );
};
export default CmsAppUrl;
