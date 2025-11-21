export interface IResponseCustomerList {
  customerId: string;
  customerNo: string;
  customerNm: string;
}

export interface IResponseUnpaidListECollection {
  benefitAccntNo: string;
  customerId: string;
  customerName: string;
  disableMap: string;
  ecolCd: string;
  endDt: string;
  paidYn: string;
  payerNm: string;
  payerNo: string;
  payerTel: string;
  penaltyAmt: number;
  receivableAmt: number;
  receivableRemainAmt: number;
  refNum: string;
  transId: string;
}

export interface IResponseUnpaidListAutoCollection {
  benefitAccntNo: string;
  customerId: string;
  customerName: string;
  disableMap: string;
  autoCollectionId: string;
  endDt: string;
  paidYn: string;
  payerNm: string;
  payerNo: string;
  payerTel: string;
  penaltyAmt: number;
  receivableAmt: number;
  receivableRemainAmt: number;
  refNum: string;
  transId: string;
}

export interface IResponseListTransactionHistory {
  accountNumber: string;
  customerName: string;
  refNum: string;
  remark: string;
  transactionAmount: number;
  transactionDate: string;
  transactionTime: string;
}
