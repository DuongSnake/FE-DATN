import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import i18next from '@/i18n/i18n';

export const headerRequired = caption => {
  return (
    <div>
      {caption}{' '}
      <span className="cms-required-field" style={{ fontSize: '16px', fontWeight: 'bold' }}>
        *
      </span>
    </div>
  );
};

export const cellIndexRender = d => {
  return <span>{d.row.loadIndex + 1}</span>;
};
export const cellIndexPagerRender = (d, n, p) => {
  return <span>{d.row.loadIndex + 1 + p * (n - 1)}</span>;
};

export const requiredFieldRender = () => {
  return <span className="cms-required-field">*</span>;
};

export const showConfirmModal = (description: string, onSuccess: VoidFunction) => {
  Modal.confirm({
    title: i18next.t('modal-common.question-title'),
    icon: <ExclamationCircleOutlined />,
    content: i18next.t(description),
    okText: i18next.t('button.confirm'),
    cancelText: i18next.t('button.close'),
    wrapClassName: 'cms-confirm-modal',
    onOk() {
      onSuccess();
    }
  });
};

export const messageSuccess = msg => {
  Modal.success({
    title: i18next.t('modal-common.info-title'),
    content: msg,
    okText: i18next.t('button.confirm')
  });
};

export const warningSuccess = msg => {
  Modal.warning({
    title: i18next.t('modal-common.info-title'),
    content: msg,
    okText: i18next.t('button.confirm')
  });
};
