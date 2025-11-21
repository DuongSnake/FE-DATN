import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteRoleAction, getListRoleAction, resetDept } from './RoleActionManagement.reducer'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditRoleAction from './edit/EditRoleActionManagement.tsx';
const RoleAction = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.roleActionManagementReducer.loading);
    const listRoleAction = useAppSelector(state => state.roleActionManagementReducer.listRoleAction);
    const [roleCd, setRoleCd] = useState('');
    const [listSelected, setListSelected] = useState([]);
    const [showForm, setShowForm] = useState('add');
    
    const dataGridRef = useRef(null);
    
    const scrollToBottom = () => {
        setShowForm('add');
    
        onScrollToBottom();
    };
    
    const _handleChangeRoleCd = e => {
        const { value } = e.target;
        setRoleCd(value);
    };
    
    const _onChangeShowForm = value => {
        onScrollToBottom();
        setShowForm(value);
    };
    
    const _onChangeFormAdd = () => {
        setShowForm('add');
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
    
    const _onSearchAction = async () => {
        setListSelected([]);
        dataGridRef.current.instance.clearSelection();
        let pageRequestDto = {
            pageNum: 0,
            pageSize: 10
        }
        const payload = createCommonIParamsDuong({ roleCd, pageRequestDto });
        dispatch(getListRoleAction(payload));
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
                role Action Management
                <span className="sub-heading-template"></span>
            </h3>
        </div>

        <div className="page-content-template">
            <div className="page-search-template">
                <Row style={{ marginBottom: 18 }} align="middle">
                    <Col xl={3} xxl={3}>
                        <label className="cms-search-label label-padding-left">Role code</label>
                    </Col>

                    <Col xl={5} xxl={4}>
                        <Input
                            className="cms-form-control"
                            value={roleCd}
                            onChange={_handleChangeRoleCd}
                            maxLength={80}
                            onKeyPress={_onEnter}
                            placeholder={i18next.t('cms-common.please-input-infomation')}
                        />
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
                </div>

                <Spin spinning={loading} tip={i18next.t('getData')}>
                    <div className="table-data">
                        <DataGrid
                            id="gridContainer"
                            dataSource={listRoleAction}
                            showBorders={true}
                            keyExpr="roleCd"
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
                                caption='no'
                                alignment="center"
                                width={40}
                                cellRender={cellIndexRender}
                            />
                            <Column
                                dataField="roleCd"
                                alignment="left"
                                allowFiltering={false}
                                allowSorting={true}
                                caption='Role code'
                                dataType="string"
                            />
                            <Column
                                dataField="roleNm"
                                alignment="left"
                                allowFiltering={false}
                                allowSorting={true}
                                caption='Role name'
                                dataType="string"
                            />
                        </DataGrid>
                    </div>
                </Spin>
            </div>

            <EditRoleAction
                isEdit={showForm === 'edit'}
                onSearch={_onSearchAction}
                selected={listSelected[0]}
                onChangeFormAdd={_onChangeFormAdd}
            />
        </div>
    </div>
)}
export default RoleAction;