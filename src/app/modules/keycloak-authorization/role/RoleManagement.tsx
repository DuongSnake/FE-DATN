import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Spin, Select } from 'antd';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import React, { useEffect, useRef, useState } from 'react';
import i18next from '@/i18n/i18n';

import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { onScrollToBottom, onScrollToTop } from '@/app/shared/helpers/cms-helper';
import { createCommonIParams, createCommonIParamsDuong, createCommonIParamsListDuong } from '@/app/shared/model/common.model';
import { deleteRole, getListRole, resetDept } from './RoleManagement.reducer.ts';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import { cellIndexRender } from '../../common/JSXFunction';
import '../../../shared/layout/content-task.scss';
import EditRole from './edit/EditRoleManagement.tsx';
import { checkSuccessDispatch } from '@/app/shared/util/global-function';
import { BANK_CODE_STATUS } from '@/app/config/constant/enum';

const Role = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.roleKeycloakManagementReducer.loading);
    const loadingDelete = useAppSelector(state => state.roleKeycloakManagementReducer.loadingDelete);
    const listRole = useAppSelector(state => state.roleKeycloakManagementReducer.listRole);
    const [roleName, setRoleName] = useState('');
    const [desc, setDesc] = useState('');
    const [listSelected, setListSelected] = useState([]);
    const [showForm, setShowForm] = useState('add');
    const [listActionType, setListActionType] = useState(BANK_CODE_STATUS);

    const dataGridRef = useRef(null);

    const scrollToBottom = () => {
        setShowForm('add');

        onScrollToBottom();
    };

    const _handleChangeRoleName = e => {
        const { value } = e.target;
        setRoleName(value);
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
        let listDelete = "";

        listSelected.forEach(item => listDelete=item.id);

        dispatch(deleteRole(createCommonIParamsListDuong({ "roleId": listDelete }))).then(res => {
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
        const payload = createCommonIParamsDuong({ roleName});
        dispatch(getListRole(payload));
    };

    const _onDoubleClickRow = e => {
        _onChangeShowForm('edit');
        const lstSelected = [];
        lstSelected.push(e.data);
        setListSelected(lstSelected);
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
                    role Management
                    <span className="sub-heading-template"></span>
                </h3>
            </div>

            <div className="page-content-template">
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
                                dataSource={listRole}
                                showBorders={true}
                                keyExpr="id"
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
                                    dataField="name"
                                    alignment="left"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Role name'
                                    dataType="string"
                                />
                                <Column
                                    dataField="description"
                                    alignment="left"
                                    allowFiltering={false}
                                    allowSorting={true}
                                    caption='Role description'
                                    dataType="string"
                                />
                            </DataGrid>
                        </div>
                    </Spin>
                </div>

                <EditRole
                    isEdit={showForm === 'edit'}
                    onSearch={_onSearchAction}
                    selected={listSelected[0]}
                    onChangeFormAdd={_onChangeFormAdd}
                />
            </div>
        </div>
    )
}
export default Role;