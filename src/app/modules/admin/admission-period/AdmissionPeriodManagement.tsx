import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, DatePicker } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteAdmissionPeriod, getListAdmissionPeriod, resetDept} from './AdmissionPeriod.reducer';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
import EditAdmissionPeriod from './edit/EditAdmissionPeriod';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const { RangePicker } = DatePicker;
const AdmissionPeriod = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.admissionPeriodManagementReducer.loading);
  const loadingDelete = useAppSelector(state => state.admissionPeriodManagementReducer.loadingDelete);
  const listAdmissionPeriod = useAppSelector(state => state.admissionPeriodManagementReducer.listAdmissionPeriod);
  const [admissionPeriodId, setAdmissionPeriodId] = useState('');
  const [admissionPeriodName, setAdmissionPeriodname] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [createUser, setCreateUser] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listAdmissionPeriodType, setListAdmissionPeriodType] = useState(RESPONSE_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeAdmissionPeriodId = e => {
    const { value } = e.target;
    setAdmissionPeriodId(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeAdmissionPeriodName = e => {
    const { value } = e.target;
    setAdmissionPeriodname(value);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
  };

  const onChangeDate = value => {
    const AdmissionPeriodFromDt = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const AdmissionPeriodToDt = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDate(AdmissionPeriodFromDt);
    setToDate(AdmissionPeriodToDt);
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

  const _onDeleteAdmissionPeriod = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchAdmissionPeriod();
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];

    listSelected.forEach(item => listDelete.push(item.admissionPeriodId));

    dispatch(deleteAdmissionPeriod(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchAdmissionPeriod();
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchAdmissionPeriod = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ admissionPeriodId, admissionPeriodName, fromDate, toDate, status, createUser, pageRequestDto });
    dispatch(getListAdmissionPeriod(payload));
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchAdmissionPeriod();
    }
  };

  useEffect(() => {
    _onSearchAdmissionPeriod();
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
          Kỳ học
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Mã kỳ học</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={admissionPeriodId}
                onChange={_handleChangeAdmissionPeriodId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Tên kỳ học</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={admissionPeriodName}
                onChange={_handleChangeAdmissionPeriodName}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Trạng thái</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listAdmissionPeriodType.map((obj, i) => {
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
                <label className="cms-search-label label-padding-left">Ngày đăng ký</label>
            </Col>
            <Col xl={5} xxl={4}>
                    <RangePicker className="date" id="date" onChange={onChangeDate} />
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchAdmissionPeriod}>
                Tìm kiếm
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
              onClick={_onDeleteAdmissionPeriod}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listAdmissionPeriod}
                showBorders={true}
                keyExpr="admissionPeriodId"
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
                  dataField="admissionPeriodId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã kỳ học"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="admissionPeriodName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên kỳ học"
                  dataType="string"
                />
                <Column
                  dataField="startPeriod"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Ngày bắt đầu kỳ học"
                  dataType="string"
                />
                <Column
                  dataField="endPeriod"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Ngày kết thúc kỳ học"
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
                  dataField="createAt"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Ngày đăng ký"
                  dataType="string"
                  width={180}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        <EditAdmissionPeriod
          isEdit={showForm === 'edit'}
          onSearch={_onSearchAdmissionPeriod}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
        />
      </div>
    </div>
  );
};
export default AdmissionPeriod;
