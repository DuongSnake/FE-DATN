import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, DatePicker, Pagination } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteInstructorMapPeriodAssignment, getListInstructorMapPeriodAssignment, resetDept} from './InstructorMapPeriodAssignment.reducer';
import { getAllPeriodAssignmentActive} from '../period-assignment/PeriodAssignment.reducer';
import { selectAllInstructorActive} from '../user-management/UserManagement.reducer';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
import EditInstructorMapPeriodAssignment from './edit/EditInstructorMapPeriodAssignment';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const { RangePicker } = DatePicker;
const InstructorMapPeriodAssignment = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.instructorMapPeriodAssignment.loading);
  const loadingDelete = useAppSelector(state => state.instructorMapPeriodAssignment.loadingDelete);
  const listInstructorMapPeriodAssignment = useAppSelector(state => state.instructorMapPeriodAssignment.listInstructorMapPeriodAssignment);
  const totalRecord = useAppSelector(state => state.instructorMapPeriodAssignment.totalRecord);
  const [instructorMapPeriodAssignmentId, setInstructorMapPeriodAssignmentId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [periodAssignmentId, setPeriodAssignmentId] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listInstructorMapPeriodAssignmentType, setListInstructorMapPeriodAssignmentType] = useState(RESPONSE_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);
  const [listInstructor, setListInstructor] = useState([]);
  const [listPeriodAssignment, setListPeriodAssignment] = useState([]);
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeInstructorMapPeriodAssignmentId = e => {
    const { value } = e.target;
    setInstructorMapPeriodAssignmentId(value);
  };

  const _onChangeShowForm = value => {
    onScrollToBottom();

    setShowForm(value);
  };

  const _onChangeFormAdd = () => {
    setShowForm('add');
  };

  const _handleChangeInstructorId = e => {
    setInstructorId(e);
  };

  const _handleChangePeriodAssignmentId = e => {
    setPeriodAssignmentId(e);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
  };
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchInstructorMapPeriodAssignment(page, pageSize);
  };

    const _onSearchInstructorMapPeriodAssignment = async (pageNum, pageSize) => {
      setListSelected([]);
      dataGridRef.current.instance.clearSelection();
      let pageRequestDto = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
    const payload = createCommonIParamsDuong({ instructorMapPeriodAssignmentId, instructorId, fromDate, toDate, status, periodAssignmentId, pageRequestDto });
    dispatch(getListInstructorMapPeriodAssignment(payload));
    };
  
    ///For search button
    const _onSearchInstructorMapPeriodAssignment2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 1,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ instructorMapPeriodAssignmentId, instructorId, fromDate, toDate, status, periodAssignmentId, pageRequestDto });
    dispatch(getListInstructorMapPeriodAssignment(payload));
    };

  const getAllPeriodAssignment = () => {
   dispatch(getAllPeriodAssignmentActive()).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListPeriodAssignment(objectResponse?.data.data ?? []);
      }
    });
  };

  const getAllIntructor = () => {
   dispatch(selectAllInstructorActive()).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListInstructor(objectResponse?.data ?? []);
      }
    });
  };

  const onChangeDate = value => {
    const InstructorMapPeriodAssignmentFromDt = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const InstructorMapPeriodAssignmentToDt = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDate(InstructorMapPeriodAssignmentFromDt);
    setToDate(InstructorMapPeriodAssignmentToDt);
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

  const _onDeleteInstructorMapPeriodAssignment = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchInstructorMapPeriodAssignment(pager.pageNum, pager.pageSize);
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];
    listSelected.forEach(item => listDelete.push(item.InstructorMapPeriodAssignmentId));
    dispatch(deleteInstructorMapPeriodAssignment(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchInstructorMapPeriodAssignment(pager.pageNum, pager.pageSize);
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onDoubleClickRow = e => {
    _onChangeShowForm('edit');
    const lstSelected = [];
    lstSelected.push(e.data);
    setListSelected(lstSelected);
  };

  const _onEnter = e => {
    if (e.key === 'Enter') {
      _onSearchInstructorMapPeriodAssignment(pager.pageNum, pager.pageSize);
    }
  };

  useEffect(() => {
    _onSearchInstructorMapPeriodAssignment(pager.pageNum, pager.pageSize);
    //Get all list intructor and period assignment
    getAllPeriodAssignment();
    getAllIntructor();
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
          Map giáo viên và kỳ hạn của chuyên ngành
          <span className="sub-heading-template"></span>
        </h3>
      </div>

      <div className="page-content-template">
        <div className="page-search-template">
          <Row style={{ marginBottom: 18 }} align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Mã giáo viên - kỳ hạn</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={instructorMapPeriodAssignmentId}
                onChange={_handleChangeInstructorMapPeriodAssignmentId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Tên giáo viên</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select value={instructorId} onChange={_handleChangeInstructorId} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {Array.isArray(listInstructor) &&
                listInstructor.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.id}>
                      {obj.fullName}
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
                {listInstructorMapPeriodAssignmentType.map((obj, i) => {
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
              <label className="cms-search-label label-padding-left">Loại kỳ hạn</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select value={periodAssignmentId} onChange={_handleChangePeriodAssignmentId} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {Array.isArray(listPeriodAssignment) &&
                listPeriodAssignment.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.periodAssignmentId}>
                      {obj.admissionPeriodIdName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col xl={3} xxl={3}>
                <label className="cms-search-label label-padding-left">Ngày đăng ký</label>
            </Col>
            <Col xl={5} xxl={4}>
                    <RangePicker className="date" id="date" onChange={onChangeDate} />
            </Col>

            <Col className="form-btn-search">
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchInstructorMapPeriodAssignment2}>
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
              onClick={_onDeleteInstructorMapPeriodAssignment}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listInstructorMapPeriodAssignment}
                showBorders={true}
                keyExpr="instructorMapPeriodAssignmentId"
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
                  dataField="instructorMapPeriodAssignmentId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã giáo viên - kỳ hạn"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="instructorMapPeriodAssignmentId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã kỳ hạn làm đồ án"
                  dataType="string"
                />
                <Column
                  dataField="majorName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên chuyên ngành"
                  dataType="string"
                />
                <Column
                  dataField="instructorName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên giáo viên"
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

        <EditInstructorMapPeriodAssignment
          isEdit={showForm === 'edit'}
          onSearch={_onSearchInstructorMapPeriodAssignment}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
          listInstructor = {listInstructor}
          listPeriodAssignment = {listPeriodAssignment}
        />
      </div>
    </div>
  );
};
export default InstructorMapPeriodAssignment;
