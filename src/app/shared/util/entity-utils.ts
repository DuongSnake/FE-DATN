import { Modal } from 'antd';
import i18next from '@/i18n/i18n';
import { toast } from 'react-toastify';

export const openNotification = (type: string, key?: string, data?: any, message?: string) => {
  let description: any = key ? i18next.t(key, data) : message;

  if (description && description.startsWith('translation-not-found')) {
    description = message ? message : 'Can not find description, please contact administrator for this message: ' + key;
  }

  toast[type](description, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const openNotificationAction = (type: string, key?: string, data?: any, message?: string) => {
  const description = message;

  Modal[type]({
    title: checkTypeNoti(type),
    content: description,
    okText: i18next.t('button.close'),
  });
};

function checkTypeNoti(type) {
  if (type === 'error') {
    return i18next.t('notificationTitleError');
  } else if (type === 'success') {
    return i18next.t('notificationTitleSuccess');
  } else {
    return i18next.t('notificationTitleWarning');
  }
}
