import { FundViewOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Spin, Pagination, DatePicker, Tag, Select } from 'antd';
import { Column, DataGrid, Pager, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { getListEventKafka, resetDept, reSendMessageFail } from './EventKafkaManagement.reducer.ts';

import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction.tsx';
import EditEventKafka from './edit/EditEventKafkaManagement';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { PRODUCER_TYPE } from '@/app/config/constant/enum';
import { IScreenButton } from '@/app/shared/model/myRequest.model.ts';

import '../../../shared/layout/content-task.scss';

const { RangePicker } = DatePicker;

const EventKafka = () => {
  const dispatch = useAppDispatch();
  const [screenButtonModel, setScreenButtonModel] = useState<IScreenButton>({} as IScreenButton);
  const loading = useAppSelector(state => state.eventKafkaManagementReducer.loading);
  const totalRecord = useAppSelector(state => state.eventKafkaManagementReducer.totalRecord);
  const listEventKafka = useAppSelector(state => state.eventKafkaManagementReducer.listEventKafka);
  const [_id, set_Id] = useState('');
  const [topicName, setTopicName] = useState('');
  const [consumerStatus, setConsumerStatus] = useState('');
  const [producerStatus, setProducerStatus] = useState('');
  const [startDate, setStartDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [endDate, setEndDate] = useState(moment().format(FORMAT_YYYYMMDD));
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const dataGridRef = useRef(null);
  const [listProducerStatus, setListProducerStatus] = useState(PRODUCER_TYPE);
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  const _onChangeShowForm = value => {
    onScrollToBottom();
    setShowForm(value);
  };

  const _onRetrySendMessageToKafKa = () => {
    dataGridRef.current.instance.getSelectedRowsData().then(sleds => {
      let valueId = '';
      sleds?.forEach(function (item) {
        valueId = item._id;
      });
      const payload = createCommonIParamsDuong({ _id: valueId });
      dispatch(reSendMessageFail(createCommonIParamsListDuong(payload))).then(res => {
        if (checkSuccessDispatch(res)) {
          onScrollToTop();
          _onSearchEventKafka2();
        }
      });
    });
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleConsumerStatus = e => {
    setConsumerStatus(e);
  };

  const _handleProducerStatus = e => {
    setProducerStatus(e);
  };

  const _handleToppicName = e => {
    const { value } = e.target;
    setTopicName(value);
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
        let canDelete = true;
        let updateButton = false;
        if (data.producerStatus === '1' && data.consumerStatus === '1') {
          canDelete = false;
        }
        listData.push(data);
        setScreenButtonModel({ ...screenButtonModel, updateButton, deleteButton: canDelete });
      });
    });
    setListSelected(listData);
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchEventKafka(page, pageSize);
  };

  const _onSearchEventKafka = async (pageNum, pageSize) => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    const payload = createCommonIParamsDuong({
      _id,
      topicName,
      consumerStatus,
      producerStatus,
      startDate,
      endDate,
      pageRequestDto,
    });
    dispatch(getListEventKafka(payload)).then(res => {
      if (checkSuccessDispatch(res)) {
      }
    });
  };

  const _onSearchEventKafka2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 1,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({
      _id,
      topicName,
      consumerStatus,
      producerStatus,
      startDate,
      endDate,
      pageRequestDto,
    });
    dispatch(getListEventKafka(payload)).then(res => {
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

  useEffect(() => {
    _onSearchEventKafka(pager.pageNum, pager.pageSize);
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
          event Kafka Management
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Topic name</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={topicName}
                onChange={_handleToppicName}
                maxLength={60}
                placeholder={i18next.t('cms-common.please-input-infomation')}
              />
            </Col>
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Consumer status</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={consumerStatus} onChange={_handleConsumerStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listProducerStatus.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Producer status</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={producerStatus} onChange={_handleProducerStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listProducerStatus.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Register date time</label>
            </Col>
            <Col xl={5} xxl={4}>
              <RangePicker defaultValue={[moment(), moment()]} className="date" id="date" onChange={onChangeDate} />
            </Col>
            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchEventKafka2}>
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
            <Button
              disabled={!screenButtonModel.deleteButton}
              className="button-add"
              icon={<EditOutlined />}
              onClick={_onRetrySendMessageToKafKa}
            >
              Re-try
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listEventKafka}
                showBorders={true}
                onSelectionChanged={onSelectionChanged}
                onRowClick={_onRowClick}
                onRowDblClick={_onDoubleClickRow}
                keyExpr="_id"
                ref={dataGridRef}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnResizingMode={'nextColumn'}
                columnMinWidth={50}
                hoverStateEnabled={true}
                wordWrapEnabled={true}
              >
                <Selection mode="single" showCheckBoxesMode={'always'} deferred={true} />
                <Pager visible={false} showNavigationButtons={false} />
                <Column
                  allowFiltering={false}
                  allowSorting={false}
                  caption="no"
                  alignment="center"
                  width={40}
                  cellRender={cellIndexRender}
                />
                <Column
                  dataField="clientName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Client Gateway Name"
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
                  dataField="topicName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Topic name"
                  dataType="string"
                />
                <Column
                  dataField="producerStatus"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Producer status"
                  dataType="string"
                  width={120}
                  cellRender={row => {
                    if (!row.data.producerStatus) {
                      return <></>;
                    }
                    const requestStatusData = listProducerStatus.find(obj => obj.val === row.data.producerStatus);

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
                  dataField="consumerStatus"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Consumer status"
                  dataType="string"
                  width={120}
                  cellRender={row => {
                    if (!row.data.consumerStatus) {
                      return <></>;
                    }
                    const requestStatusData = listProducerStatus.find(obj => obj.val === row.data.consumerStatus);

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
                  dataField="_class"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="_class"
                  dataType="string"
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

        <EditEventKafka isEdit={showForm === 'edit'} selected={listSelected[0]} onChangeFormAdd={_onChangeFormAdd} />
      </div>
    </div>
  );
};
export default EventKafka;
