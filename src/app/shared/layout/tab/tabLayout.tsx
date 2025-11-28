import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Skeleton, Tooltip } from 'antd';
import React, { useState } from 'react';
import i18next from '@/i18n/i18n';
import Loadable from 'react-loadable';
import importedComponent from 'react-imported-component';
import { ID_MENU_TAB } from '@/app/config/constant/enum';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import Dashboard from '../../../modules/dashboard/dashboard';
import { changeTabActive, removeTab, reset, sortAgainTab, updateTabIsEditing } from './tabs.reducer';
import TabItem from './tab-item';

const UserManagement = importedComponent(() => import('@/app/modules/admin/user-management/UserManagement'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const MajorManagement = importedComponent(() => import('@/app/modules/admin/major/MajorManagement'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const AdmissionPeriodManagement = importedComponent(() => import('@/app/modules/admin/admission-period/AdmissionPeriodManagement'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const PeriodAssignmentManagement = importedComponent(() => import('@/app/modules/admin/period-assignment/PeriodAssignment'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const InstructorMapPeriodAssignment = importedComponent(() => import('@/app/modules/admin/instructor-map-period-assignment/InstructorMapPeriodAssignment'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const StudentMapInstructor = importedComponent(() => import('@/app/modules/admin/student-map-instructor/StudentMapInstructor'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const AssignmentStudentRegister = importedComponent(() => import('@/app/modules/admin/assignment-student-register/AssignmentStudentRegister'), {
  LoadingComponent: () => <Skeleton loading={true} active />,
});

const listComponent = [
  {
    id: 'dashboard',
    panelComponent: <Dashboard />,
  },
  {
    id: ID_MENU_TAB.Z0016,
    panelComponent: <UserManagement />,
  },
  {
    id: ID_MENU_TAB.Z0022,
    panelComponent: <MajorManagement />,
  },
  {
    id: ID_MENU_TAB.Z0023,
    panelComponent: <AdmissionPeriodManagement />,
  },
  {
    id: ID_MENU_TAB.Z0024,
    panelComponent: <PeriodAssignmentManagement />,
  },
  {
    id: ID_MENU_TAB.Z0025,
    panelComponent: <InstructorMapPeriodAssignment />,
  },
  {
    id: ID_MENU_TAB.Z0026,
    panelComponent: <StudentMapInstructor />,
  },
  {
    id: ID_MENU_TAB.Z0027,
    panelComponent: <AssignmentStudentRegister />,
  },
];

const TabLayout = () => {
  const dispatch = useAppDispatch();
  const listTabs = useAppSelector(state => state.tabAction.tabs);
  const tabActived = useAppSelector(state => state.tabAction.tabActive);
  const tabIsEditing = useAppSelector(state => state.tabAction.tabIsEditing);

  const [showToggleTab, setShowToggleTab] = useState(false);

  const handleConfirmChangeTab = value => {
    Modal.destroyAll();
    dispatch(updateTabIsEditing(false));
    dispatch(changeTabActive(value));
  };

  const _handleChangeTabActive = (value: string) => {
    if (tabIsEditing) {
      Modal.confirm({
        title: 'Thông báo',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn đang có dữ liệu nhập chưa được xử lý',
        okText: 'Bỏ qua',
        cancelText: 'Ở lại',
        onOk() {
          handleConfirmChangeTab(value);
        },
      });
    } else {
      dispatch(updateTabIsEditing(false));
      dispatch(changeTabActive(value));
    }
  };

  const tabActive = () => {
    const tabSelected = listTabs.find(item => {
      if (item.id === tabActived) {
        return item;
      }
    });

    const componentSelected = listComponent.find(component => {
      if (tabSelected.id === component.id) {
        return component;
      }
    });

    return componentSelected.panelComponent;
  };

  const onChangeSortTab = (value, index2) => {
    if (tabIsEditing) {
      Modal.confirm({
        title: i18next.t('confirm.title'),
        icon: <ExclamationCircleOutlined />,
        content: i18next.t('confirm.dataProcess'),
        okText: i18next.t('button.cancel'),
        cancelText: i18next.t('button.stay'),
        onOk() {
          handleConfirmChangeTab(value);
        },
      });
    } else {
      dispatch(updateTabIsEditing(false));
      dispatch(sortAgainTab({ index2 }));
      dispatch(changeTabActive(value));
      _closeToggleTable();
    }
  };

  const _onConfirmCloseTab = value => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <ExclamationCircleOutlined />,
      content: i18next.t('confirmCloseTab.content'),
      okText: i18next.t('button.close'),
      cancelText: i18next.t('button.cancel'),
      onOk: () => _onRemoveTab(value),
    });
  };

  const _onRemoveTab = value => {
    const indexRemove = listTabs.findIndex(item => item.id === value);

    if (tabIsEditing) {
      Modal.confirm({
        title: 'Thông báo',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn đang có dữ liệu nhập chưa được xử lý',
        okText: 'Bỏ qua',
        cancelText: 'Ở lại',
        onOk() {
          Modal.destroyAll();
          dispatch(updateTabIsEditing(false));
          dispatch(removeTab(value));
          tabActived === value && dispatch(changeTabActive(listTabs[indexRemove - 1].id));
        },
      });
    } else {
      dispatch(updateTabIsEditing(false));
      dispatch(removeTab(value));
      tabActived === value && dispatch(changeTabActive(listTabs[indexRemove - 1].id));
    }
  };

  const _onConfirmCloseAllTab = () => {
    Modal.confirm({
      title: i18next.t('confirm.title'),
      icon: <ExclamationCircleOutlined />,
      content: i18next.t('confirmCloseTab.contentAll'),
      okText: i18next.t('button.close'),
      cancelText: i18next.t('button.cancel'),
      onOk: () => _onCloseAllTab(),
    });
  };

  const _onCloseAllTab = () => {
    dispatch(reset());
  };

  const _showToggleTab = () => {
    setShowToggleTab(!showToggleTab);
  };

  const _closeToggleTable = () => {
    setShowToggleTab(false);
  };

  return (
    <>
      <div className="tab-heading-page">
        {listTabs.length <= 7 ? (
          <ul>
            {listTabs.length > 2 && (
              <div className="close-all-tab">
                <Tooltip title={i18next.t('closeAll')}>
                  <i className="ti-close" onClick={_onConfirmCloseAllTab} />
                </Tooltip>
              </div>
            )}

            {listTabs.map((item, index) => (
              <TabItem
                key={item.id}
                tab={item}
                tabActived={tabActived}
                onChangeActiveTab={_handleChangeTabActive}
                onCloseTab={_onConfirmCloseTab}
              />
            ))}
          </ul>
        ) : (
          <ul className="have-toggle-tab">
            {listTabs.length > 2 && (
              <div className="close-all-tab">
                <Tooltip title={i18next.t('closeAll')}>
                  <i className="ti-close" onClick={_onConfirmCloseAllTab} />
                </Tooltip>
              </div>
            )}

            {listTabs.slice(0, 7).map((item, index) => (
              <TabItem
                key={item.id}
                tab={item}
                tabActived={tabActived}
                onChangeActiveTab={_handleChangeTabActive}
                onCloseTab={_onConfirmCloseTab}
              />
            ))}
            <div className="custom-select">
              <span onClick={_showToggleTab}>
                {showToggleTab ? <i className="ti-angle-double-down" /> : <i className="ti-angle-double-up" />}

                <span className="number">{listTabs.length}</span>
              </span>

              <ul className={showToggleTab ? 'open' : ''}>
                {listTabs.map((item, index) => (
                  <li key={item.id} className={`${item.id} ${item.id === tabActived ? 'active' : ''}`}>
                    {listTabs.slice(0, 7).filter(i => i.id === item.id).length > 0 && <i className="ti-check" />}
                    <span className="item" onClick={() => onChangeSortTab(item.id, index)}>
                      {item.title}
                    </span>
                    {item.id !== 'dashboard' && (
                      <span onClick={() => _onConfirmCloseTab(item.id)}>
                        <CloseOutlined />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {showToggleTab && <div className="background" onClick={_closeToggleTable} />}
            </div>
          </ul>
        )}
      </div>
      <div className="tab-content-page">{tabActive()}</div>
    </>
  );
};

export default TabLayout;
