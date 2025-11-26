import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, DatePicker, Pagination } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteAssignmentStudentRegister, getListAssignmentStudentRegister, resetDept} from './AssignmentStudentRegister.reducer';

import { getListStudentMapInstructorAll} from '../student-map-instructor/StudentMapInstructor.reducer';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
import EditAssignmentStudentRegister from './edit/EditAssignmentStudentRegister';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const { RangePicker } = DatePicker;
const AssignmentStudentRegister = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.assignmentStudentRegister.loading);
  const loadingDelete = useAppSelector(state => state.assignmentStudentRegister.loadingDelete);
  const listAssignmentStudentRegister = useAppSelector(state => state.assignmentStudentRegister.listAssignmentStudentRegister);
  const totalRecord = useAppSelector(state => state.assignmentStudentRegister.totalRecord);
  const [assignmentStudentRegisterId, setAssignmentStudentRegisterId] = useState('');
  const [assignmentStudentRegisterName, setAssignmentStudentRegisterName] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listAssignmentStudentRegisterType, setListAssignmentStudentRegisterType] = useState(RESPONSE_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);
  const [listStudentMapInstructor, setListStudentMapInstructor] = useState([]);
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeAssignmentStudentRegisterId = e => {
    const { value } = e.target;
    setAssignmentStudentRegisterId(value);
  };

  const _handleChangeAssignmentStudentRegisterName = e => {
    const { value } = e.target;
    setAssignmentStudentRegisterName(value);
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

  const _handleChangeStudentId = e => {
    setStudentId(e);
  };

  const _handleChangeStatus = e => {
    setStatus(e);
  };
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchAssignmentStudentRegister(page, pageSize);
  };

    const _onSearchAssignmentStudentRegister = async (pageNum, pageSize) => {
      setListSelected([]);
      dataGridRef.current.instance.clearSelection();
      let pageRequestDto = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
    const payload = createCommonIParamsDuong({ assignmentStudentRegisterId, assignmentStudentRegisterName, fromDate, toDate, status, pageRequestDto });
    dispatch(getListAssignmentStudentRegister(payload));
    };
  
    ///For search button
    const _onSearchAssignmentStudentRegister2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 1,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ assignmentStudentRegisterId, assignmentStudentRegisterName, instructorId, fromDate, toDate, status, pageRequestDto });
    dispatch(getListAssignmentStudentRegister(payload));
    };

  const getAllStudentMapInstructor = () => {
   dispatch(getListStudentMapInstructorAll()).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListStudentMapInstructor(objectResponse?.data.data ?? []);
      }
    });
  };

  const onChangeDate = value => {
    const AssignmentStudentRegisterFromDt = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const AssignmentStudentRegisterToDt = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDate(AssignmentStudentRegisterFromDt);
    setToDate(AssignmentStudentRegisterToDt);
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

  const _onDeleteAssignmentStudentRegister = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchAssignmentStudentRegister(pager.pageNum, pager.pageSize);
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];
    listSelected.forEach(item => listDelete.push(item.AssignmentStudentRegisterId));
    dispatch(deleteAssignmentStudentRegister(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchAssignmentStudentRegister(pager.pageNum, pager.pageSize);
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
      _onSearchAssignmentStudentRegister(pager.pageNum, pager.pageSize);
    }
  };

  useEffect(() => {
    _onSearchAssignmentStudentRegister(pager.pageNum, pager.pageSize);
    //Get all list student map instrucor
    getAllStudentMapInstructor();
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
              <label className="cms-search-label label-padding-left">Mã tên đề tài đăng ký</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={assignmentStudentRegisterId}
                onChange={_handleChangeAssignmentStudentRegisterId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Tên đề tài đăng ký</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={assignmentStudentRegisterName}
                onChange={_handleChangeAssignmentStudentRegisterId}
                maxLength={80}
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
                {listAssignmentStudentRegisterType.map((obj, i) => {
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
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchAssignmentStudentRegister2}>
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
              onClick={_onDeleteAssignmentStudentRegister}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listAssignmentStudentRegister}
                showBorders={true}
                keyExpr="assignmentStudentRegisterId"
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
                <Pager visible={false} showNavigationButtons={false} />
                <Column
                  dataField="assignmentStudentRegisterId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã đăng ký đề tài"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="assignmentStudentRegisterName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên đề tài"
                  dataType="string"
                />
                <Column
                  dataField="studentMapInstructorId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã sinh viên map giáo viên"
                  dataType="string"
                />
                <Column
                  dataField="studentName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên sinh viên"
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

        <EditAssignmentStudentRegister
          isEdit={showForm === 'edit'}
          onSearch={_onSearchAssignmentStudentRegister}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
          listStudentMapInstructor = {listStudentMapInstructor}
        />
      </div>
    </div>
  );
};
export default AssignmentStudentRegister;
