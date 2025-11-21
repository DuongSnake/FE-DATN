import { CloseOutlined } from '@ant-design/icons';
import React from 'react';

interface Props {
  tab: any;
  tabActived: any;
  onChangeActiveTab: (val: string) => void;
  onCloseTab: (val: string) => void;
}

const TabItem = ({ tab, tabActived, onChangeActiveTab, onCloseTab }: Props) => {
  return (
    <li key={tab.id} className={`${tab.id} ${tab.id === tabActived ? 'active' : ''}`}>
      <span className="item" onClick={() => onChangeActiveTab(tab.id)}>
        {tab.title}
      </span>
      {tab.id !== 'dashboard' && (
        <span onClick={() => onCloseTab(tab.id)}>
          <CloseOutlined />
        </span>
      )}
    </li>
  );
};

export default TabItem;
