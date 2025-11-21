import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteCallbackUrl, getListBankCode, getListCallbackUrl, resetDept } from './CallbackUrlManagement.reducer.ts';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditCallbackUrl from './edit/EditCallbackUrlManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { BANK_CODE_STATUS } from '@/app/config/constant/enum';

const CallBackUrl = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.callbackUrlManagementReducer.loading);
    const loadingDelete = useAppSelector(state => state.callbackUrlManagementReducer.loadingDelete);
    const listCallbackUrl = useAppSelector(state => state.callbackUrlManagementReducer.listCallbackUrl);
    const listBankCode = useAppSelector(state => state.callbackUrlManagementReducer.listBankCode);
    const [clientIdCms, setClientIdCms] = useState('');
    const [bankNm, setBankNm] = useState('');
    const [bankCd, setBankCd] = useState('');
    const [bankCdList, setBankCdList] = useState('');
    const [cbType, setCbType] = useState('');
    const [url, setUrl] = useState('');
    const [useYn, setUseYn] = useState('');
    const [listSelected, setListSelected] = useState([]);
    const [showForm, setShowForm] = useState('add');
    const [listActionType, setListActionType] = useState(BANK_CODE_STATUS);

    const dataGridRef = useRef(null);

    const scrollToBottom = () => {
        setShowForm('add');

        onScrollToBottom();
    };

    const _handleChangeClientIdCms = e => {
        const { value } = e.target;
        setClientIdCms(value);
    };

    const _onChangeShowForm = value => {
        onScrollToBottom();

        setShowForm(value);
    };

    const _onChangeFormAdd = () => {
        setShowForm('add');
    };

    const _handleChangeBankCd = e => {
        setBankCd(e);
    };

    const _handleChangeCbType = e => {
        const { value } = e.target;
        setCbType(value);
    };

    const _handleChangeUseYn = e => {

        setUseYn(e);
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
            }
        });
    };

    const _onDelete = async () => {
        const listDelete = [];

        listSelected.forEach(item => listDelete.push(item.idx));

        dispatch(deleteCallbackUrl(createCommonIParamsListDuong({ "listData": listDelete }))).then(res => {
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
            pageSize: 10
        }
        const payload = createCommonIParamsDuong({ clientIdCms, bankCd, cbType, url, useYn, pageRequestDto });
        dispatch(getListCallbackUrl(payload));
        const payload2 = createCommonIParamsDuong({ bankCdList, bankNm, pageRequestDto });
        dispatch(getListBankCode(payload2));
    };

    const _onDoubleClickRow = e => {
        _onChangeShowForm('edit');
        const lstSelected = [];
        lstSelected.push(e.data);
        setListSelected(lstSelected);
    };

    const _onEnter = e => {
        if (e.key === 'Enter') {
            _onSearchAction();
        }
    };

    useEffect(() => {
        _onSearchAction();
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
                    CallbackUrl Management
                    <span className="sub-heading-template"></span>
                </h3>
            </div>

            <div className="page-content-template">
                <div className="page-search-template">
                    <Row style={{ marginBottom: 18 }} align="middle">
                        <Col xl={3} xxl={3}>
                            <label className="cms-search-label label-padding-left">Client Id cms</label>
                        </Col>

                        <Col xl={5} xxl={4}>
                            <Input
                                className="cms-form-control"
                                value={clientIdCms}
                                onChange={_handleChangeClientIdCms}
                                maxLength={80}
                                onKeyPress={_onEnter}
                                placeholder={i18next.t('cms-common.please-input-infomation')}
                            />
                        </Col>

                        <Col xl={3} xxl={3}>
                            <label
                                className="cms-search-label label-padding-left">Bank code</label>
                        </Col>

                        <Col xl={5} xxl={4}>
                            <Select value={bankCd} onChange={_handleChangeBankCd} placeholder={i18next.t('label.all')} allowClear>
                                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                                {listBankCode.map((obj, i) => {
                                    return (
                                        <Select.Option key={i} value={obj.bankCd}>
                                            {obj.bankNm}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Col>

                        <Col xl={3} xxl={3}>
                            <label
                                className="cms-search-label label-padding-left">Callback type</label>
                        </Col>

                        <Col xl={5} xxl={4}>
                            <Input
                                className="cms-form-control"
                                value={cbType}
                                onChange={_handleChangeCbType}
                                maxLength={60}
                                onKeyPress={_onEnter}
                                placeholder={i18next.t('cms-common.please-input-infomation')}
                            />
                        </Col>

                    </Row>
                    <Row align="middle">


                        <Col xl={3} xxl={3}>
                            <label
                                className="cms-search-label label-padding-left">Status</label>
                        </Col>
                        <Col xl={5} xxl={4}>
                            <Select value={useYn} onChange={_handleChangeUseYn} placeholder={i18next.t('label.all')} allowClear>
                                <Select.Option value="">{i18next.t('label.all')}</Select.Option>
                                {listActionType.map((obj, i) => {
                                    return (
                                        <Select.Option key={i} value={obj.val}>
                                            {i18next.t(obj.text)}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Col>
                        <Col xl={8} xxl={10} style={{ textAlign: 'left', marginLeft: '5px' }}>
                            <Button icon={<SearchOutlined />} loading={loading} className="button-search"
                                onClick={_onSearchAction}>
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
                                dataSource={listCallbackUrl}
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
                                    caption={i18next.t('cms-common.table.no')}
                                    alignment="center"
                                    width={40}
                                    cellRender={cellIndexRender}
                                />
                                <Column
                                    dataField="clientIdCms"
                                    alignment="left"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Client Id cms'
                                    dataType="string"
                                />
                                <Column
                                    dataField="bankNm"
                                    alignment="left"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Bank name'
                                    dataType="string"
                                />
                                <Column
                                    dataField="cbType"
                                    alignment="center"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Callback type'
                                    dataType="string"
                                    width={150}
                                />
                                <Column
                                    dataField="url"
                                    alignment="left"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Url'
                                    dataType="string"
                                />
                                <Column
                                    dataField="useYn"
                                    alignment="center"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Status'
                                    dataType="string"
                                    width={120}
                                    cellRender={row => {
                                        if (!row.data.useYn) {
                                            return <>{row.data.useYn}</>;
                                        }
                                        const requestStatusData = listActionType.find(obj => obj.val === row.data.useYn);

                                        if (requestStatusData) {
                                            return (
                                                <>
                                                    {i18next.t(requestStatusData.text)}
                                                </>
                                            );
                                        }
                                    }}
                                />
                                <Column
                                    dataField="regTm"
                                    alignment="center"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Register date time'
                                    dataType="string"
                                    width={180}
                                />
                            </DataGrid>
                        </div>
                    </Spin>
                </div>

                <EditCallbackUrl
                    isEdit={showForm === 'edit'}
                    onSearch={_onSearchAction}
                    selected={listSelected[0]}
                    listBankCode={listBankCode}
                    onChangeFormAdd={_onChangeFormAdd}
                />
            </div>
        </div>
    )
}
export default CallBackUrl;