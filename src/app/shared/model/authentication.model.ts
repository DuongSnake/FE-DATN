export interface IListMenu {
  childs: IListMenu[];
  menuCd: string;
  parentCd: string;
  roles: string[];
}

export interface IAuthParams {
  userName: string;
  password: string;
}

export interface IExtendParams {
  refreshToken: string;
}

export interface IUserRecovery {
  userId: string;
  recoveryCd: string;
  recoveryCdExpireDtm: string;
  recoveryCnt: number;
}
