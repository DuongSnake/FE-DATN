import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './change-password.scss';
import i18next from '@/i18n/i18n';

const ChangePassword = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const _showModal = () => {
    setVisible(true);
  };

  const _closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      <span onClick={_showModal}>{i18next.t('changePassword.menu')}</span>
      <Modal
        className="modal-size-sm"
        open={visible}
        title={
          <div className="header-modal">
            <span>{i18next.t('changePassword.notification')}</span>
          </div>
        }
        onCancel={_closeModal}
        maskClosable={false}
        footer={[
          <Button key="back" className="button-close" onClick={_closeModal}>
            {i18next.t('button.close')}
          </Button>
        ]}
      >
        <div className="body-content">
          <div className="content">
            <p>{i18next.t('changePassword.content1')}</p>
            <p>{i18next.t('changePassword.content2')}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangePassword;
