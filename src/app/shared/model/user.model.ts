export interface IUserResponse {
  deptCd: string;
  deptNm: string;
  userId: string;
  userNm: string;
  telNo: string;
  authCd: string;
  status: string;
  lastLoginDt: string;
  regUser: string;
  regDt: string;
  email: string;
  staffCd: string;
}

export interface IListUser {
  authCd: string;
  deptCd: string;
  deptNm: string;
  lastLoginDt: string;
  regDt: string;
  regUser: string;
  status: string;
  telNo: string;
  userId: string;
  userNm: string;
}
