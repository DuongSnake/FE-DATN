import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select, Pagination } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { IParamCommonDuong, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteBankCode, getListBankCode, resetDept, selectAllRole } from './UserManagement.reducer';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import '../../../shared/layout/content-task.scss';
import EditBankCode from './edit/EditUserManagement';
import { checkSuccessDispatch, checkInsertSuccessDispatch } from '@/app/shared/util/global-function';
import { RESPONSE_CODE_STATUS,BANK_CODE_STATUS } from '@/app/config/constant/enum';
import './popUpModal.scss';
import BatchRegisterPopup from './BatchRegisterPopup';
const User = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.userManagement.loading);
  const loadingDelete = useAppSelector(state => state.userManagement.loadingDelete);
  const listBankCode = useAppSelector(state => state.userManagement.listBankCode);
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [[phone], setPhone] = useState('');
  const [[identityCard], setIdentityCard] = useState('');
  const [fullName, setFullName] = useState('');
  const [listRole, setListRole] = useState([]);
  const [status, setStatus] = useState('');
  const [listSelected, setListSelected] = useState([]);
  const [showForm, setShowForm] = useState('add');
  const [listActionType, setListActionType] = useState(BANK_CODE_STATUS);
  const [listBankCodeType, setListBankCodeType] = useState(RESPONSE_CODE_STATUS);
  const totalRecord = useAppSelector(state => state.userManagement.totalRecord);
  const [pager, setPager] = useState({
      pageNum: 1,
      pageSize: 10,
    });
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
        await _onSearchBankCode(pager.pageNum, pager.pageSize);
      },
    });
  };

  const _onDelete = async () => {
    const listDelete = [];

    listSelected.forEach(item => listDelete.push(item.id));

    dispatch(deleteBankCode(createCommonIParamsListDuong({ listData: listDelete }))).then(res => {
      if (checkSuccessDispatch(res)) {
        onScrollToTop();
        _onSearchBankCode(pager.pageNum, pager.pageSize);
      }
    });
  };

  const _onRowClick = e => {
    dataGridRef.current.instance.selectRowsByIndexes(e.rowIndex);
  };

  const _onSearchBankCode = async (pageNum, pageSize) => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
      let pageRequestDto = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
    const payload = createCommonIParamsDuong({ id, username, email, phone, identityCard, fullName, status, pageRequestDto });
    dispatch(getListBankCode(payload));
  };

    const _onSearchBankCode2 = async () => {
    setListSelected([]);
    dataGridRef.current.instance.clearSelection();
      let pageRequestDto = {
        pageNum: 1,
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
      _onSearchBankCode(pager.pageNum, pager.pageSize);
    }
  };
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    _onSearchBankCode(page, pageSize);
  };
  
  const getAllRole = () => {
      dispatch(selectAllRole()).then(res => {
        if (checkSuccessDispatch(res)) {
          const objectResponse: IParamCommonDuong = res.payload;
          setListRole(objectResponse.data.data);
        }
      });
    };

  useEffect(() => {
    _onSearchBankCode(pager.pageNum, pager.pageSize);
    getAllRole();
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
              <label className="cms-search-label label-padding-left">Mã người dùng</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={id}
                onChange={_handleChangeId}
                maxLength={80}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Tên người dùng</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={username}
                onChange={_handleChangeUserName}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>

            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Email</label>
            </Col>

            <Col xl={5} xxl={4}>
              <Input
                className="cms-form-control"
                value={identityCard}
                onChange={_handleChangeEmail}
                maxLength={60}
                onKeyPress={_onEnter}
                placeholder="Nhập vào đi bạn"
              />
            </Col>
          </Row>

          <Row align="middle">
            <Col xl={3} xxl={3}>
              <label className="cms-search-label label-padding-left">Trạng thái</label>
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
              <Button icon={<SearchOutlined />} loading={loading} className="button-search" onClick={_onSearchBankCode2}>
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

            <BatchRegisterPopup fetchListAgain={() => null} />
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
                onSelectionChanged={onSelectionChanged}
                wordWrapEnabled={true}
                hoverStateEnabled={true}
                keyExpr="id"
                onRowClick={_onRowClick}
                onRowDblClick={_onDoubleClickRow}
                ref={dataGridRef}
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnResizingMode={'nextColumn'}
                columnMinWidth={50}
              >
                <Selection mode="multiple" showCheckBoxesMode={'always'} deferred={true} />
                <Pager visible={false} showNavigationButtons={false} />
                <Column
                  dataField="id"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Mã người dùng"
                  dataType="string"
                  width={150}
                />
                <Column
                  dataField="username"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên đăng nhập"
                  dataType="string"
                />
                <Column
                  dataField="fullName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption="Tên người dùng"
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

        <EditBankCode
          isEdit={showForm === 'edit'}
          onSearch={_onSearchBankCode}
          selected={listSelected[0]}
          listAllRole = {listRole}
          onChangeFormAdd={_onChangeFormAdd}
        />
      </div>
    </div>
  );
};
export default User;
