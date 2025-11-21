export interface IFeeGen {
  state: string;
}

export interface IResponseFeeGenerate {
  closingMonth: string;
  closingStatus: string;
  customerNm: string;
  customerNo: string;
  deptCd: string;
  deptNm: string;
  fee: number;
  feeType: string;
  payerNm: string;
  payerNo: string;
  serviceCd: string;
  statusNm: string;
  transId: string;
  transactionAmt: string;
  transactionDt: string;
}
