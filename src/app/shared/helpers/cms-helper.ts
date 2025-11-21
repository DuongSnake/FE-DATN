import { phoneRegex } from '@/app/config/constant/regexs';

export const removeVietnameseTones = str => {
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỲÝỴỶỸ]/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/[\u0300][\u0301][\u0303][\u0309][\u0323]/g, '');
  str = str.replace(/[\u02C6][\u0306][\u031B]/g, '');
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  str = str.replace(/[!@%^*()+=<>?/,.:;'"&#[\]~$_`\-{}|\\]/g, ' ');

  return str;
};

export const formatCurrency = (number, local) => {
  return new Intl.NumberFormat(local).format(number);
};

export const totalValueOfObjectArray = (dataList: any[], key: string | number) => {
  return dataList.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[key];
  }, 0);
};

export const onScrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};

export const onScrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

export const checkAllSameValue = arr => {
  if (arr.length === 0) {
    return false;
  }

  if (arr[0] === 'B') {
    return false;
  }

  const firstValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== firstValue) {
      return false;
    }
  }

  return true;
};

export const noWhitespaceStr = str => {
  return str.replace(/\s+/g, '');
};

export const checkPhoneNumber = (string: string) => {
  let removeCodePhone = string;

  if (string) {
    if (string.startsWith('+84', 0)) {
      removeCodePhone = string.replace(/^\+84/g, '0');
    }

    if (string.startsWith('84', 0)) {
      removeCodePhone = string.replace(/^84/g, '0');
    }

    if (string.startsWith('0084', 0)) {
      removeCodePhone = string.replace(/^0084/g, '0');
    }

    const removeSpace = removeCodePhone.trim();
    const lastPhoneNumber = removeSpace.replace(/\D/g, '');

    if (phoneRegex.test(lastPhoneNumber)) {
      return lastPhoneNumber;
    } else {
      return 'false';
    }
  } else {
    return '';
  }
};

export const insert = (arr, index, ...newItems) => [...arr.slice(0, index), ...newItems, ...arr.slice(index + 1)];

export const updateArray = (arr: string | any[], index: number, ...newItems: any[]) => {
  if (arr.length === 1) {
    return newItems;
  } else {
    return [...arr.slice(0, index), ...newItems, ...arr.slice(index + 1)];
  }
};

export const Storage = {
  local: {
    get(key) {
      return localStorage.getItem(key);
    },
    set(key, value) {
      localStorage.setItem(key, value);
    },
    remove(key) {
      localStorage.removeItem(key);
    },
  },
  session: {
    get(key) {
      return sessionStorage.getItem(key);
    },
    set(key, value) {
      sessionStorage.setItem(key, value);
    },
    remove(key) {
      sessionStorage.removeItem(key);
    },
  },
};
