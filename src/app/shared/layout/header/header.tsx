import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import React, { useEffect, useState } from 'react';

import { USER_NAME, USER_TYPE } from '@/app/config/constant/constants';
import { CMS_ROLES } from '@/app/config/constant/enum';
import { ActionMenu } from '../menus/action';
import './header.scss';
import { getUserId } from '@/app/shared/util/store-utils';
import { openNotificationAction } from '@/app/shared/util/entity-utils';
import { validatePassword } from '@/app/shared/reducers/authentication';
import logoHeader from '@/content/images/logo/logo_header.svg';
import { Storage } from '../../helpers/cms-helper';
import i18next from 'i18next';

const Header = () => {
  const dispatch = useAppDispatch();
  const userNm = useAppSelector(state => state.authentication.userNm) || Storage.session.get(USER_NAME);
  const userType = useAppSelector(state => state.authentication.userType) || Storage.session.get(USER_TYPE);
  const isNeedChangePassword = useAppSelector(state => state.authentication.isOldPassword);

  const [roleNm, setRoleNm] = useState('');

  useEffect(() => {
    if (userType && !!userType) {
      setRoleNm('(' + CMS_ROLES.filter(role => role.roleCd === userType)[0].roleNm + ')');
    }
  }, [userType]);

  useEffect(() => {
    if (isNeedChangePassword) {
      setTimeout(() => {
        openNotificationAction('warning', 'error.changePassword', '', '');
      }, 1000);
    }
  }, [isNeedChangePassword]);

  useEffect(() => {
    dispatch(validatePassword({ userId: getUserId() }));
  }, []);

  return (
    <div className="header">
      <div className="header-left">
      </div>
      <div className="header-right">
        <div className="menu-right">
          <div className="user">
            <span>{i18next.t('account')}: </span> {userNm}
            <span> {roleNm}</span>
          </div>
        </div>
        <div className="menu-language" style={{ marginRight: 12 }}>
          <ActionMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
