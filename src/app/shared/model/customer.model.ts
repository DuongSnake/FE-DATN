export interface ICustomerSelectResponse {
  branchCd: string;
  customerId: string;
  merchantId: string;
  customerNo: string;
  customerNm: string;
  bizNo: string;
  regDt: string;
  issuedDt: string;
  issuedPlace: string;
  masterId: string;
  remarks: string;
  listUser: { idUser: number; idChannelUser: string }[];
  isUpdateBank?: string;
  userNm: string;
  email: string;
  telNo: string;
  logoName: string;
  logoSize: number;
  logoContent: string;
}

export interface ICustomerSelect {
  customerId: string;
  customerNo: string;
  customerNm: string;
  bizNo: string;
  bizIssuedDt: string;
  bizIssuedPlace: string;
  masterId: string;
  note: string;
  accNoList: [];
  regDt: string;
  eccRemain: number;
  branchNm: string;
}

export interface IBatchSelect {
  status: string;
  batchGroupId: string;
  accntNo: string;
  requestAmt: number;
  customerId: string;
  customerNo: string;
  customerNm: string;
  bizNo: string;
  bizIssuedDt: string;
  bizIssuedPlace: string;
  masterId: string;
  note: string;
  accNoList: [];
  regDt: string;
  eccRemain: number;
  eccPrfx: string;
  listAccNo?: any;
}
