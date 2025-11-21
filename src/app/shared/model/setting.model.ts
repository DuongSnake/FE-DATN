export interface IUserInformation {
  userId?: string;
  userNm?: string;
  userType?: string;
  payerCnt?: number;
  customerId?: string;
  dept?: string;
  telNo?: string;
  email?: string;
  authUseMgmt?: string;
  authPayerMgmt?: string;
  authDepositMgmt?: string;
  authWithdrawMgmt?: string;
}

export interface IPramUser {
  userId: string;
  requestTs: string;
  data?: IUserInformation;
}
