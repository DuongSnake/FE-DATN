import { FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Pagination, Row, Spin, Select, DatePicker, Tag } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { getListScraping, resetDept } from './ScrapingLogManagement.reducer.ts';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction.tsx';
import EditAccess from './edit/EditScrapingManagement.tsx';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import '../../../shared/layout/content-task.scss';
const { RangePicker } = DatePicker;

const Access = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.scrapingManagementReducer.loading);
  const listScraping = useAppSelector(state => state.scrapingManagementReducer.listScraping);
  const totalRecord = useAppSelector(state => state.scrapingManagementReducer.totalRecord);
  const [_id, set_id] = useState('');
  const [gatewayApiUrl, setGatewayApiUrl] = useState('');
  const [clientIdGw, setClientIdGw] = useState('');
  const [doznServiceUrl, setDoznServiceUrl] = useState('');
  const [doznServiceId, setDoznServiceId] = useState('');
  const [startDate, setStartDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [endDate, setEndDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });
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

  const _handleChangeClientIdGw = e => {
    const { value } = e.target;
    setClientIdGw(value);
  };

  const _handleChangeGatewayApiUrl = e => {
    const { value } = e.target;
    setGatewayApiUrl(value);
  };

  const _handleChangeDoznServiceUrl = e => {
    const { value } = e.target;
    setDoznServiceUrl(value);
  };

  const _handleChangeDoznServiceId = e => {
    const { value } = e.target;
    setDoznServiceId(value);
  };

  const _handleChange_id = e => {
    const { value } = e.target;
    set_id(value);
  };

  const onChangeDate = value => {
    const eventKafkaDtFrom = value && value.length === 2 ? moment(value[0]).format(FORMAT_YYYYMMDD) : '';
    const eventKafkaDtTo = value && value.length === 2 ? moment(value[1]).format(FORMAT_YYYYMMDD) : '';
    setStartDate(eventKafkaDtFrom);
    setEndDate(eventKafkaDtTo);
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

  const _onSearchScraping = async (pageNum, pageSize) => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    const payload = createCommonIParamsDuong({_id, clientIdGw, gatewayApiUrl, doznServiceUrl, doznServiceId, startDate, endDate, pageRequestDto });
    dispatch(getListScraping(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
      }
    });
  };

  ///For search button
  const _onSearchAccess2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 1,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({_id, clientIdGw, gatewayApiUrl, doznServiceUrl, doznServiceId, startDate, endDate, pageRequestDto });
    dispatch(getListScraping(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
      }
    });
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchScraping(pager.pageNum, pager.pageSize);
    }
  };

  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchScraping(page, pageSize);
  };

  useEffect(() => {
    _onSearchScraping(pager.pageNum, pager.pageSize);
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
          Scraping log Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">_id</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={_id}
                onChange={_handleChange_id}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Client Id Gateway</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={clientIdGw}
                onChange={_handleChangeClientIdGw}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Gateway Api Url</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={gatewayApiUrl}
                onChange={_handleChangeGatewayApiUrl}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: 18 }} align="middle">

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Dozn Service Id</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={doznServiceId}
                onChange={_handleChangeDoznServiceId}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Dozn Service Url</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={doznServiceUrl}
                onChange={_handleChangeDoznServiceUrl}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Register date time</label>
            </Col>
            <Col xl={5} xxl={4}>
              <RangePicker defaultValue={[moment(), moment()]} className="date" id="date" onChange={onChangeDate} />
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchAccess2}>
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
              icon={<FundViewOutlined />}
              onClick={() => _onChangeShowForm('edit')}
            >
              {i18next.t('button.view')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listScraping}
                showBorders={true}
                onSelectionChanged={onSelectionChanged}
                keyExpr="_id"
                onRowClick={_onRowClick}
                onRowDblClick={_onDoubleClickRow}
                ref={dataGridRef}
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnResizingMode={'nextColumn'}
                columnMinWidth={50}
                columnAutoWidth={true}
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
                  dataField="_id"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="_id"
                  dataType="string"
                />
                <Column
                  dataField="clientIdGw"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Client Id Gateway"
                  dataType="string"
                />
                <Column
                  dataField="clientGwName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Client gateway name"
                  dataType="string"
                />
                <Column
                  dataField="gatewayApiUrl"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Gateway api url"
                  dataType="string"
                />
                <Column
                  dataField="doznServiceUrl"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Dozn service url"
                  dataType="string"
                  width={290}
                />
                <Column
                  dataField="doznServiceId"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Dozn service id"
                  dataType="string"
                  width={120}
                />
                <Column
                  dataField="timestamp"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Timestamp"
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

        <EditAccess isEdit={showForm === 'edit'} selected={listSelected[0]} onChangeFormAdd={_onChangeFormAdd} />
      </div>
    </div>
  );
};
export default Access;
