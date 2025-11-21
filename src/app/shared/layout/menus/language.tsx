import { Avatar, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { DEFAULT_LOCALE, LOCALE } from '@/app/config/constant/constants';
import React from 'react';
import { Storage } from '../../helpers/cms-helper';
import i18next from '@/i18n/i18n';
import { languages } from '@/app/config/constant/enum';

export const LanguageMenu = () => {
  const locale = Storage.local.get(LOCALE);
  const currentLanguage = locale ? languages[locale] : languages[DEFAULT_LOCALE];

  const handleChangeLang = (key: string) => {
    Storage.local.set(LOCALE, key);
    window.location.reload();
  };

  const generateLangOption = () => {
    const options = [];

    Object.keys(languages).forEach(key => {
      options.push(
        <Menu.Item key={key}>
          <Avatar size="small" style={{ marginRight: 8 }} src={languages[key].flag} />
          {i18next.t(languages[key].name)}
        </Menu.Item>,
      );
    });

    return options;
  };

  return (
    <>
      <Menu mode="horizontal" key="language" onClick={data => handleChangeLang(data.key)} selectedKeys={[currentLanguage.key]}>
        <SubMenu key={'language-menu'} title={<Avatar size="small" src={currentLanguage.flag} />} popupClassName="language-submenu">
          {generateLangOption()}
        </SubMenu>
      </Menu>
    </>
  );
};
