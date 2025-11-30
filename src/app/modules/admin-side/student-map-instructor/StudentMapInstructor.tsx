import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, DatePicker, Pagination } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteStudentMapInstructor, getListStudentMapInstructor, resetDept} from './StudentMapInstructor.reducer';

import { selectAllInstructorActive, selectAllStudentActive} from '../user-management/UserManagement.reducer';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
import EditStudentMapInstructor from './edit/EditStudentMapInstructor';
import { APP_DATE_FORMAT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants.ts';
import moment from 'moment';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
const { RangePicker } = DatePicker;
const StudentMapInstructor = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.studentMapInstructor.loading);
  const loadingDelete = useAppSelector(state => state.studentMapInstructor.loadingDelete);
  const listStudentMapInstructor = useAppSelector(state => state.studentMapInstructor.listStudentMapInstructor);
  const totalRecord = useAppSelector(state => state.studentMapInstructor.totalRecord);
  const [studentMapInstructorId, setStudentMapInstructorId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listStudentMapInstructorType, setListStudentMapInstructorType] = useState(RESPONSE_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);
  const [listInstructor, setListInstructor] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });
  const dataGridRef = useRef(null);

  const scrollToBottom = () => {
    setShowForm('add');

    onScrollToBottom();
  };

  const _handleChangeStudentMapInstructorId = e => {
    const { value } = e.target;
    setStudentMapInstructorId(value);
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
    _onSearchStudentMapInstructor(page, pageSize);
  };

    const _onSearchStudentMapInstructor = async (pageNum, pageSize) => {
      setListSelected([]);
      dataGridRef.current.instance.clearSelection();
      let pageRequestDto = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
    const payload = createCommonIParamsDuong({ studentMapInstructorId, instructorId, fromDate, toDate, status, studentId, pageRequestDto });
    dispatch(getListStudentMapInstructor(payload));
    };
  
    ///For search button
    const _onSearchStudentMapInstructor2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
    let pageRequestDto = {
      pageNum: 1,
      pageSize: 10,
    };
    const payload = createCommonIParamsDuong({ studentMapInstructorId, instructorId, fromDate, toDate, status, studentId, pageRequestDto });
    dispatch(getListStudentMapInstructor(payload));
    };

  const getAllStudent = () => {
   dispatch(selectAllStudentActive()).then(res => {
      if (checkSuccessDispatch(res)) {
        const objectResponse: IParamCommonDuong = res.payload;
        setListStudent(objectResponse?.data ?? []);
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
    const StudentMapInstructorFromDt = value && value.length === 2 ? moment(value[0]).format(APP_DATE_FORMAT) : '';
    const StudentMapInstructorToDt = value && value.length === 2 ? moment(value[1]).format(APP_DATE_FORMAT) : '';
    setFromDate(StudentMapInstructorFromDt);
    setToDate(StudentMapInstructorToDt);
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

  const _onDeleteStudentMapInstructor = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <QuestionCircleOutlined />,
      content: i18next.t('confirm.description'),
      okText: i18next.t('button.delete'),
      wrapClassName: 'cms-confirm-modal',
      cancelText: i18next.t('button.close'),
      async onOk() {
        await _onDelete();
        await _onSearchStudentMapInstructor(pager.pageNum, pager.pageSize);
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];
    listSelected.forEach(item => listDelete.push(item.studentMapInstructorId));
    dispatch(deleteStudentMapInstructor(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchStudentMapInstructor(pager.pageNum, pager.pageSize);
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
      _onSearchStudentMapInstructor(pager.pageNum, pager.pageSize);
    }
  };

  useEffect(() => {
    _onSearchStudentMapInstructor(pager.pageNum, pager.pageSize);
    //Get all list intructor and period 
    getAllStudent();
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
                value={studentMapInstructorId}
                onChange={_handleChangeStudentMapInstructorId}
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
                {listStudentMapInstructorType.map((obj, i) => {
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
              <label className="cms-search-label label-padding-left">Tên sinh viên</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Select value={studentId} onChange={_handleChangeStudentId} placeholder={i18next.t('label.all')} allowClear>
                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                {Array.isArray(listStudent) &&
                listStudent.map((obj, i) => {
                  return (
                    <Select.Option key={i} value={obj.id}>
                      {obj.fullName}
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
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchStudentMapInstructor2}>
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
              onClick={_onDeleteStudentMapInstructor}
            >
              {i18next.t('button.delete')}
            </Button>
          </div>

          <Spin spinning={loading} tip={i18next.t('getData')}>
            <div className="table-data">
              <DataGrid
                id="gridContainer"
                dataSource={listStudentMapInstructor}
                showBorders={true}
                keyExpr="studentMapInstructorId"
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
                  dataField="studentMapInstructorId"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã giáo viên - sinh viên"
                  dataType="string"
                  width={150}
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
                  dataField="studentName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên sinh viên"
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

        <EditStudentMapInstructor
          isEdit={showForm === 'edit'}
          onSearch={_onSearchStudentMapInstructor}
          selected={listSelected[0]}
          onChangeFormAdd={_onChangeFormAdd}
          listInstructor = {listInstructor}
          listStudent = {listStudent}
        />
      </div>
    </div>
  );
};
export default StudentMapInstructor;
