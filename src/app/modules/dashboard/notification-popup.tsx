import React from 'react';
import { Button, Modal } from 'antd';
import i18next from '@/i18n/i18n';

export interface IProps {
  visible: boolean;
  onCancel: any;
  contents: string;
  title: string;
}

const NotificationPopup = (props: IProps) => {
  const { visible, contents, onCancel, title } = props;

  return (
    <div className="notification-popup">
      <Modal
        open={visible}
        className="modal-size-md notification-modal"
        title={
          <div className="header-modal">
            <span>{title}</span>
          </div>
        }
        onCancel={onCancel}
        footer={[
          <Button key="back" className="button-close" onClick={onCancel}>
            {i18next.t('button.close')}
          </Button>
        ]}
      >
        <p dangerouslySetInnerHTML={{ __html: contents }} />
      </Modal>
    </div>
  );
};

export default NotificationPopup;
