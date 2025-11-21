import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { changeWidth, collapsed } from '../layout.reducer';
import SidebarContent from './sidebar-content';
import './sider.scss';

const Sidebar = props => {
  const { time } = props;
  const dispatch = useAppDispatch();
  const widthWindow = useAppSelector(state => state.layout.width);
  const { width } = useWindowDimensions();

  const [collapsedMenu, setCollapsedMenu] = useState(false);

  useEffect(() => {
    dispatch(changeWidth(width));

    if (width < 1281) {
      setCollapsedMenu(true);
      dispatch(collapsed(true));
    }
  }, [width]);

  const _onToggleCollapsed = () => {
    setCollapsedMenu(!collapsedMenu);
    dispatch(collapsed(!collapsedMenu));
  };

  return (
    <>
      <Layout.Sider trigger={null} className={`info-app-sidebar`} collapsed={collapsedMenu}>
        {widthWindow >= 1281 && (
          <div className="toggle-menu">
            <span onClick={_onToggleCollapsed}>
              <i className={`${collapsedMenu ? 'ti-angle-right' : 'ti-angle-left'}`} />
            </span>
          </div>
        )}
        <SidebarContent time={time} />
      </Layout.Sider>
    </>
  );
};
export default Sidebar;
