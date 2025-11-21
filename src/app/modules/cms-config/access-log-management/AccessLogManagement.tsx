import { FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Pagination, Row, Spin, Select, DatePicker, Tag } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { getListAccess, resetDept } from './AccessManagement.reducer.ts';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction.tsx';
import EditAccess from './edit/EditAccessManagement';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import '../../../shared/layout/content-task.scss';
import { TYPE_REQUEST_METHOD, RESPONSE_CODE_STATUS } from '@/app/config/constant/enum';

const { RangePicker } = DatePicker;

const Access = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.accessManagementReducer.loading);
  const listAccess = useAppSelector(state => state.accessManagementReducer.listAccess);
  const totalRecord = useAppSelector(state => state.accessManagementReducer.totalRecord);
  const [_id, set_Id] = useState('');
  const [clientIdGw, setClientIdGw] = useState('');
  const [status, setStatus] = useState('');
  const [reqMethod, setReqMethod] = useState('');
  const [reqUrl, setReqUrl] = useState('');
  const [startDate, setStartDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [endDate, setEndDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listAccessType, setListAccessType] = useState(TYPE_REQUEST_METHOD);
  const [listResponseCode, setListResponseCode] = useState(RESPONSE_CODE_STATUS);
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

  const _handleChangeReqMethod = e => {
    setReqMethod(e);
  };

  const _handleChangeStatus = e => {
    console.log("Value select status:"+e);
    setStatus(e);
  };

  const _handleChangeReqUrl = e => {
    const { value } = e.target;
    setReqUrl(value);
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

  const _onSearchAccess = async (pageNum, pageSize) => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    const payload = createCommonIParamsDuong({ _id, clientIdGw, reqMethod, reqUrl, status, startDate, endDate, pageRequestDto });
    dispatch(getListAccess(payload)).then(res => {
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
    const payload = createCommonIParamsDuong({ _id, clientIdGw, reqMethod, reqUrl, status, startDate, endDate, pageRequestDto });
    dispatch(getListAccess(payload)).then(res => {
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
      _onSearchAccess(pager.pageNum, pager.pageSize);
    }
  };

  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchAccess(page, pageSize);
  };

  useEffect(() => {
    _onSearchAccess(pager.pageNum, pager.pageSize);
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
          access Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Client Id gateway</label>
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
              <label className="cms-search-label label-padding-left">Status</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listResponseCode.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Request Url</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={reqUrl}
                onChange={_handleChangeReqUrl}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Request method</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={reqMethod} onChange={_handleChangeReqMethod} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listAccessType.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
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
                dataSource={listAccess}
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
                  dataField="clientName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Client gateway name"
                  dataType="string"
                />
                <Column
                  dataField="bankName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Bank Name"
                  dataType="string"
                />
                <Column
                  dataField="cmsCommonRequestId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Cms Common Request Id"
                  dataType="string"
                  width={290}
                />
                <Column
                  dataField="reqUrl"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Request url"
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
                    const requestStatusData = listResponseCode.find(obj => obj.val === row.data.status);

                    if (requestStatusData) {
                      return (
                        <>
                          <span className="req-status-tg">
                            <Tag color={requestStatusData.textColor}>{i18next.t(requestStatusData.text)}</Tag>
                          </span>
                        </>
                      );
                    }
                  }}
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
