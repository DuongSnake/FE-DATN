import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, DatePicker } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
// import { deleteScoreAssignment, getListScoreAssignment, resetDept} from './ScoreAssignmentManagement.reducer';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
// import EditScoreAssignment from './edit/EditScoreAssignmentManagement';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const { RangePicker } = DatePicker;
const ScoreAssignment = () => {
  const dispatch = useAppDispatch();
  const loading = [];
  const loadingDelete = [];
  const listScoreAssignment = [    {
      "id": "1",
      "sorceName": "Quản lý sinh viên",
      "sorceName123": "7.5",
      "status": "1",
      "createAt": "2025-11-24"
    }];
  const [ScoreAssignmentId, setScoreAssignmentId] = useState('');
  const [ScoreAssignmentname, setScoreAssignmentname] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [createUser, setCreateUser] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listScoreAssignmentType, setListScoreAssignmentType] = useState(RESPONSE_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);

  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeScoreAssignmentId = e => {
    const { value } = e.target;
    setScoreAssignmentId(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeScoreAssignmentName = e => {
    const { value } = e.target;
    setScoreAssignmentname(value);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
  };

  const onChangeDate = value => {
    const ScoreAssignmentFromDt = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const ScoreAssignmentToDt = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDate(ScoreAssignmentFromDt);
    setToDate(ScoreAssignmentToDt);
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

  const _onDeleteScoreAssignment = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchScoreAssignment();
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];

    listSelected.forEach(item => listDelete.push(item.ScoreAssignmentId));

    // dispatch(deleteScoreAssignment(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
    //   if (checkSuccessDispatch(res)) {
    //     onScrollToTop();
    //     _onSearchScoreAssignment();
    //   }
    // });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchScoreAssignment = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 0,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ ScoreAssignmentId, ScoreAssignmentname, fromDate, toDate, status, createUser, pageRequestDto });
    // dispatch(getListScoreAssignment(payload));
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchScoreAssignment();
    }
  };

  useEffect(() => {
    _onSearchScoreAssignment();
    return () => {
    //   dispatch(resetDept());
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
          Điểm đồ án
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Mã điểm đồ án</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={ScoreAssignmentId}
                onChange={_handleChangeScoreAssignmentId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Tên đồ án</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listScoreAssignmentType.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.val}>
                      {i18next.t(obj.text)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Trạng thái</label>
            </Col>
            <Col xl={5} xxl={4}>
              <Select value={status} onChange={_handleChangeStatus} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {listScoreAssignmentType.map((obj, i) => {
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
                <label className="cms-search-label label-padding-left">Ngày nhập điểm</label>
            </Col>
            <Col xl={5} xxl={4}>
                    <RangePicker className="date" id="date" onChange={onChangeDate} />
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} className="button-search" onClick={_onSearchScoreAssignment}>
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
              className="button-delete"
              icon={<DeleteOutlined />}
              onClick={_onDeleteScoreAssignment}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listScoreAssignment}
                showBorders={true}
                keyExpr="id"
                ref={dataGridRef}
                allowColumnResizing={true}
                columnResizingMode={'nextColumn'}
                columnMinWidth={50}
                allowColumnReordering={true}
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
                  caption="Mã điểm đồ án"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="sorceName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên đồ án"
                  dataType="string"
                />
                <Column
                  dataField="sorceName123"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Điểm trung bình"
                  dataType="string"
                />
                <Column
                  dataField="status"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Trạng thái"
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
                  caption="Ngày nhập điểm"
                  dataType="string"
                  width={180}
                />
              </DataGrid>
            </div>
          </Spin>
        </div>

        {/* <EditScoreAssignment
          isEdit={showForm === 'edit'}
          onSearch={_onSearchScoreAssignment}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
        /> */}
      </div>
    </div>
  );
};
export default ScoreAssignment;
