export const ERRORS = {
  11: 'msg.11',
  12: 'msg.12',
  21: 'msg.21',
  28: 'msg.28',
  29: 'msg.29',
  33: 'msg.33',
  34: 'msg.34',
  35: 'msg.35',
  36: 'msg.36',
  70: 'msg.70',
  38: 'msg.38',
  59: 'msg.59',
  76: 'msg.76',
  45: 'msg.45',
  40: 'msg.40',
  32: 'msg.32',
  44: 'msg.44',
};

export const PAGE_SIZE_OPTION = [10, 20, 50, 100, 200, 500, 1000, 2000, 3000];

export const FEE_CLOSE_STATUS = [
  {
    val: 'N',
    text: 'service-management.service-fee.not-closed',
    textColor: '#757575',
  },
  {
    val: 'Y',
    text: 'service-management.service-fee.closed',
    textColor: '#3babec',
  },
];

export const BANK_CODE_STATUS = [
  {
    val: 'Y',
    text: 'bankCodeManagement.active',
    textColor: '#757575',
  },
  {
    val: 'N',
    text: 'bankCodeManagement.in-active',
    textColor: '#3babec',
  },
];

export const RESPONSE_CODE_STATUS = [
  {
    val: '1',
    text: 'Đang hoạt động',
    textColor: '#28C76F',
  },
  {
    val: '99',
    text: 'Đã xóa',
    textColor: '#EA5455',
  },
];

export const TYPE_REQUEST_METHOD = [
  {
    val: 'POST',
    text: 'POST',
    textColor: '#757575',
  },
  {
    val: 'GET',
    text: 'GET',
    textColor: '#3babec',
  },
];


export const USER_TYPE = {
  S: 'S',
  B: 'B',
  D: 'D',
  O: 'O',
  A: 'A',
};

export const ID_MENU_TAB = {
  Z001: 'bankCode',
  Z002: 'action',
  Z003: 'callbackUrl',
  Z004: 'clientGateway',
  Z005: 'clientGatewayMap',
  Z006: 'cmsAppUrl',
  Z007: 'menu',
  Z008: 'menuGroup',
  Z009: 'role',
  Z0010: 'roleACtion',
  Z0011: 'gatewayApi',
  Z0012: 'accessLog',
  Z0013: 'eventKafkaLog',
  Z0014: 'mgmtClientCallBack',
  Z0015: 'mgmtCodeFromBank',
  Z0016: 'user',
  Z0017: 'resource',
  Z0018: 'roleMap',
  Z0019: 'userMap',
  Z0020: 'policyMapRole',
  Z0021: 'scrapingLog',
  Z0022: 'major',
  Z0023: 'admissionPeriod',
  Z0024: 'periodAssignment',
  Z0025: 'instructorMapPeriodAssignment',
  Z0026: 'studentMapInstructor',
  Z0027: 'assignmentStudentRegister',
  Z0028: 'registerAssignmentStudent',
  Z0029: 'registerAssignmentStudent'
};

export const MENU_PRIVILEGES = [
  {
    tabId: ID_MENU_TAB.Z001,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z002,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z003,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z004,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z005,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z006,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z007,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z008,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z009,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0010,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0011,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0012,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0013,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0014,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0015,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0016,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0017,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0018,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0019,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0020,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0021,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0022,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0023,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0024,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0025,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0026,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0027,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0028,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
  {
    tabId: ID_MENU_TAB.Z0029,
    userGroup: [USER_TYPE.S, USER_TYPE.B],
  },
];

export const CMS_ROLES = [
  { roleCd: 'S', roleNm: 'System Admin' },
  { roleCd: 'B', roleNm: 'Bank Admin' },
  { roleCd: 'D', roleNm: 'Department Master' },
  { roleCd: 'O', roleNm: 'Department Operator' },
  { roleCd: 'A', roleNm: 'Department Approver' },
];

export const SMS_STATUS = [
  { code: '1', name: 'service-management.sms-inquiry.success' },
  { code: '2', name: 'service-management.sms-inquiry.fail' },
];

export const MESSAGE_RESULT = [
  { code: '1', name: 'service-management.sms-inquiry.success' },
  { code: '2', name: 'service-management.sms-inquiry.fail' },
];

export const SERVICE_TYPE_CHECKBOX = [
  { value: 'web', label: 'Web', name: 'useWebClient' },
  { value: 'api', label: 'API', name: 'useExternalApi' },
];

export const E_COLLECTION_CREATION = [{ value: 'instant', label: 'contract-management.form.instant-ecollection' }];

export const BATCH_REQUEST_STATUS = [
  {
    val: '0',
    text: 'request-approval.selected-value.request-status.draf',
    textColor: '#9a9999',
  },
  {
    val: '1',
    text: 'request-approval.selected-value.request-status.pending',
    textColor: '#3babec',
  },
  {
    val: '3',
    text: 'request-approval.selected-value.request-status.approved',
    textColor: '#28C76F',
  },
  {
    val: '2',
    text: 'request-approval.selected-value.request-status.rejected',
    textColor: '#EA5455',
  },
  {
    val: '4',
    text: 'request-approval.selected-value.request-status.completed',
    textColor: '#00e1e1',
  },
  {
    val: '5',
    text: 'request-approval.selected-value.request-status.recalled',
    textColor: '#ff9900',
  },
];

export const AUTO_UNPAID_STATUS = [
  {
    val: 'R',
    text: 'transactionHistory.dataText.request',
    textColor: '#9a9999',
  },
  {
    val: 'W',
    text: 'transactionHistory.dataText.waiting',
    textColor: '#3babec',
  },
  {
    val: 'D',
    text: 'transactionHistory.dataText.done',
    textColor: '#28C76F',
  },
  {
    val: 'F',
    text: 'transactionHistory.dataText.fail',
    textColor: '#EA5455',
  },
  {
    val: 'P',
    text: 'transactionHistory.dataText.processing',
    textColor: '#00e1e1',
  },
];

export const PAID_STATUS = [
  {
    val: 'U',
    text: 'transactionHistory.dataText.unreceived',
    textColor: '#9a9999',
  },
  {
    val: 'R',
    text: 'transactionHistory.dataText.received',
    textColor: '#28C76F',
  },
];

export const APPROVAL_REQUEST_STATUS = [
  {
    val: '1',
    text: 'request-approval.selected-value.request-status.pending',
    textColor: '#3babec',
  },
  {
    val: '2',
    text: 'request-approval.selected-value.request-status.approved',
    textColor: '#28C76F',
  },
  {
    val: '3',
    text: 'request-approval.selected-value.request-status.rejected',
    textColor: '#EA5455',
  },
  {
    val: '4',
    text: 'request-approval.selected-value.request-status.recalled',
    textColor: '#ff9900',
  },
];

export const APPROVAL_TYPE = [
  {
    val: '0',
    text: 'request-approval.selected-value.request-type.add-contract',
  },
  {
    val: '1',
    text: 'request-approval.selected-value.request-type.edit-contract',
  },
  {
    val: '2',
    text: 'request-approval.selected-value.request-type.ter-contract',
  },
  {
    val: '3',
    text: 'request-approval.selected-value.request-type.new-ecollection',
  },
];

export const SERVICE_TYPE = [
  { value: '0', name: 'Web' },
  { value: '1', name: 'API' },
  { value: '2', name: 'Web/API' },
];

export const E_COLLECTION_TYPE = {
  0: 'Web',
  1: 'API',
  2: 'Web/API',
};

export const TRANSFER_TYPES = [
  {
    val: 'S',
    text: 'auto-collection-tranfer.selected-value.tranfer-type.single-transfer',
    textColor: '#000000',
  },
  {
    val: 'M',
    text: 'auto-collection-tranfer.selected-value.tranfer-type.multi-transfer',
    textColor: '#0000ff',
  },
  {
    val: 'P',
    text: 'auto-collection-tranfer.selected-value.tranfer-type.pay-roll-transfer',
    textColor: '#00ff00',
  },
];

export const STATUS_TRANSFER_RECON = [
  {
    val: '0',
    text: 'auto-collection-tranfer.selected-value.bnk-result.verified',
    textColor: '#000000',
  },
  {
    val: '1',
    text: 'auto-collection-tranfer.selected-value.bnk-result.not-exist-b',
    textColor: '#0000ff',
  },
  {
    val: '2',
    text: 'auto-collection-tranfer.selected-value.bnk-result.not-exist-cms',
    textColor: '#00ff00',
  },
  {
    val: '3',
    text: 'auto-collection-tranfer.selected-value.bnk-result.not-verified',
    textColor: '#00ff00',
  },
];

export const BANK_STATUS_TRANSFER = [
  {
    val: '0',
    text: 'transferRecon.status.pending',
    textColor: '#3babec',
  },
  {
    val: '1',
    text: 'transferRecon.status.success',
    textColor: '#28C76F',
  },
  {
    val: '2',
    text: 'transferRecon.status.timeout',
    textColor: '#e06234',
  },
  {
    val: '3',
    text: 'transferRecon.status.failed',
    textColor: '#ea5455',
  },
  {
    val: '-1',
    text: 'transferRecon.status.noProcess',
    textColor: '#f5c125',
  },
  {
    val: '6',
    text: 'transferRecon.status.pendingNextDay',
    textColor: '#ff9900',
  },
];

export const FEE_TYPE = [
  {
    val: '0',
    text: 'service-management.service-fee.eCollectionFee',
    serviceCode: 'E',
  },
  {
    val: '4',
    text: 'service-management.service-fee.smsFee',
    serviceCode: 'S',
  },
  {
    val: '5',
    text: 'service-management.service-fee.zaloFee',
    serviceCode: 'Z',
  },
  {
    val: '10',
    text: 'service-management.service-fee.autoCollectionRegisterFee',
    serviceCode: 'A',
  },
  {
    val: '11',
    text: 'service-management.service-fee.autoCollectionAgreementFee',
    serviceCode: 'A',
  },
  {
    val: '12',
    text: 'service-management.service-fee.autoCollectionTransactionFee',
    serviceCode: 'A',
  },
  {
    val: '20',
    text: 'service-management.service-fee.singleTransferLess500Fee',
    serviceCode: 'T',
  },
  {
    val: '21',
    text: 'service-management.service-fee.singleTransferThan500Fee',
    serviceCode: 'T',
  },
  {
    val: '22',
    text: 'service-management.service-fee.multiTransferLess500Fee',
    serviceCode: 'T',
  },
  {
    val: '23',
    text: 'service-management.service-fee.multiTransferThan500Fee',
    serviceCode: 'T',
  },
  {
    val: '24',
    text: 'service-management.service-fee.transferPayrollFee',
    serviceCode: 'T',
  },
  {
    val: '25',
    text: 'service-management.service-fee.singleTransferLess300Fee',
    serviceCode: 'T',
  },
  {
    val: '26',
    text: 'service-management.service-fee.singleTransferThan300Fee',
    serviceCode: 'T',
  },
  {
    val: '27',
    text: 'service-management.service-fee.multiTransferLess300Fee',
    serviceCode: 'T',
  },
  {
    val: '28',
    text: 'service-management.service-fee.multiTransferThan300Fee',
    serviceCode: 'T',
  },
  {
    val: '29',
    text: 'service-management.service-fee.scheduledTransferFee',
    serviceCode: 'T',
  },
  {
    val: '30',
    text: 'service-management.service-fee.transactionHistoryFee',
    serviceCode: 'T',
  },
  {
    val: '31',
    text: 'service-management.service-fee.beneficiaryAccountFee',
    serviceCode: 'T',
  },
];

export const CHANNEL_DATA = [
  { code: 'S', name: 'SMS' },
  { code: 'Z', name: 'Zalo' },
  { code: 'E', name: 'E-mail' },
  { code: 'K', name: 'KakaoTalk' },
];

export const SERVICE_NAME = [
  { code: 'E', name: 'E-Collection' },
  // { code: 'A', name: 'Auto-Collection' },
];

export const MESSAGE_TYPE = [
  { code: '10', name: 'service-management.sms-inquiry.message-type-1', method: 'U' },
  { code: '20', name: 'service-management.sms-inquiry.message-type-2', method: 'U' },
  { code: '30', name: 'service-management.sms-inquiry.message-type-3', method: 'S' },
  { code: '40', name: 'service-management.sms-inquiry.message-type-4', method: 'U' },
  { code: '50', name: 'service-management.sms-inquiry.message-type-5', method: 'U' },
  { code: '70', name: 'service-management.sms-inquiry.message-type-7', method: 'U' },
  { code: 'RE', name: 'service-management.sms-inquiry.message-type-re', method: 'U' },
  { code: 'AR', name: 'service-management.sms-inquiry.message-type-ar', method: 'S' },
  { code: 'CM', name: 'service-management.sms-inquiry.message-type-cm', method: 'A' },
];

export const SENDING_METHOD = [
  {
    code: 'S',
    name: 'service-management.messageTemplateManagement.systemAutomatic',
    listType: ['30', 'AR'],
  },
  {
    code: 'U',
    name: 'service-management.messageTemplateManagement.userManually',
    listType: ['10', '20', '30', '40', '50', '70', 'RE'],
  },
  {
    code: 'SU',
    name: 'service-management.messageTemplateManagement.allMethod',
    listType: ['30'],
  },
  {
    code: 'A',
    name: 'service-management.messageTemplateManagement.allNoticeAtOnce',
    listType: ['CM'],
  },
];

export const LIST_VARIANT_LIST = [
  {
    type: '10',
    listVariant: [
      {
        code: '${payerNm}',
        name: '',
      },
      {
        code: '${customerNm}',
        name: '',
      },
      {
        code: '${remark}',
        name: '',
      },
      {
        code: '${ecolCd}',
        name: '',
      },
      {
        code: '${receivableAmt}',
        name: '',
      },
      {
        code: '${endDt}',
        name: '',
      },
      {
        code: '${realAmt}',
        name: '',
      },
      {
        code: '${customerTel}',
        name: '',
      },
      {
        code: '${customerEmail}',
        name: '',
      },
      {
        code: '${customerWebSite}',
        name: '',
      },
      {
        code: '${customerAddress}',
        name: '',
      },
    ],
  },
  {
    type: '20',
    listVariant: [
      {
        code: '${payerNm}',
        name: '',
      },
      {
        code: '${customerNm}',
        name: '',
      },
      {
        code: '${remark}',
        name: '',
      },
      {
        code: '${ecolCd}',
        name: '',
      },
      {
        code: '${reqDepositAmt}',
        name: '',
      },
      {
        code: '${realAmt}',
        name: '',
      },
      {
        code: '${customerTel}',
        name: '',
      },
      {
        code: '${customerEmail}',
        name: '',
      },
      {
        code: '${customerWebSite}',
        name: '',
      },
      {
        code: '${customerAddress}',
        name: '',
      },
    ],
  },
  {
    type: '30',
    listVariant: [
      {
        code: '${payerNm}',
        name: '',
      },
      {
        code: '${customerNm}',
        name: '',
      },
      {
        code: '${remark}',
        name: '',
      },
      {
        code: '${acolCd}',
        name: '',
      },
      {
        code: '${reqDepositAmt}',
        name: '',
      },
      {
        code: '${feeNote}',
        name: '',
      },
      {
        code: '${tranSacTime}',
        name: '',
      },
    ],
  },
  {
    type: '50',
    listVariant: [
      {
        code: '${payerNm}',
        name: '',
      },
      {
        code: '${customerNm}',
        name: '',
      },
      {
        code: '${acolCd}',
        name: '',
      },
      {
        code: '${reqDepositAmt}',
        name: '',
      },
      {
        code: '${feeNote}',
        name: '',
      },
      {
        code: '${tranSacTime}',
        name: '',
      },
      {
        code: '${customerTel}',
        name: '',
      },
      {
        code: '${customerEmail}',
        name: '',
      },
      {
        code: '${customerWebSite}',
        name: '',
      },
      {
        code: '${customerAddress}',
        name: '',
      },
    ],
  },
  {
    type: 'AR',
    listVariant: [
      {
        code: '${payerNm}',
        name: '',
      },
      {
        code: '${customerNm}',
        name: '',
      },
      {
        code: '${acolCd}',
        name: '',
      },
      {
        code: '${telNo}',
        name: '',
      },
      {
        code: '${customerTel}',
        name: '',
      },
      {
        code: '${customerEmail}',
        name: '',
      },
      {
        code: '${customerWebSite}',
        name: '',
      },
      {
        code: '${customerAddress}',
        name: '',
      },
    ],
  },
];

export const LIST_LANGUAGE = [
  {
    code: 'vi',
    name: 'service-management.messageTemplateManagement.vietnamese',
  },
  {
    code: 'ko',
    name: 'service-management.messageTemplateManagement.korean',
  },
  {
    code: 'en',
    name: 'service-management.messageTemplateManagement.english',
  },
];

export const LIST_STATUS_FILTER_ECC_HISTORY = [
  {
    code: 'A',
    name: 'transactionHistory.statusList.all',
  },
  {
    code: 'U',
    name: 'transactionHistory.statusList.unreceived',
  },
  {
    code: 'R',
    name: 'transactionHistory.statusList.received',
  },
];

export const LIST_STATUS_FILTER_ACC_HISTORY = [
  {
    code: 'A',
    name: 'transactionHistory.statusList.all',
  },
  {
    code: 'W',
    name: 'transactionHistory.statusList.waiting',
  },
  {
    code: 'P',
    name: 'transactionHistory.statusList.processing',
  },
  {
    code: 'S',
    name: 'transactionHistory.statusList.success',
  },
  {
    code: 'F',
    name: 'transactionHistory.statusList.failed',
  },
];

export const LOCALES_SUPPOST = {
  vi: 'vi',
  ko: 'ko',
  en: 'en',
};

export const NOTIFICATION = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

export const LIST_FEE_AC = [
  {
    feeType: '10',
    value: 'acollRegFee',
    idx: 'idxAcollRegFee',
  },
  {
    feeType: '11',
    value: 'acollAgreeFee',
    idx: 'idxAcollAgreeFee',
  },
  {
    feeType: '12',
    value: 'acollFee',
    idx: 'idxAcollFee',
  },
];
export const LIST_FEE_TRANSFER = [
  {
    feeType: '20',
    value: 'singleNrtSmallFee',
    idx: 'idxSingleNrtSmallFee',
  },
  {
    feeType: '21',
    value: 'singleNrtBigFee',
    idx: 'idxSingleNrtBigFee',
  },
  {
    feeType: '22',
    value: 'multiNrtSmallFee',
    idx: 'idxMultiNrtSmallFee',
  },
  {
    feeType: '23',
    value: 'multiNrtBigFee',
    idx: 'idxMultiNrtBigFee',
  },
  {
    feeType: '24',
    value: 'payrollNrtSmallFee',
    idx: 'idxPayrollNrtSmallFee',
  },
  {
    feeType: '25',
    value: 'payrollNrtBigFee',
    idx: 'idxPayrollNrtBigFee',
  },
  {
    feeType: '26',
    value: 'withinNrtSmallFee',
    idx: 'idxWithinNrtSmallFee',
  },
  {
    feeType: '27',
    value: 'withinNrtBigFee',
    idx: 'idxWithinNrtBigFee',
  },
  {
    feeType: '28',
    value: 'scheduledFee',
    idx: 'idxScheduledFee',
  },
];

export const LIST_FEE_ACC = [
  {
    feeType: '30',
    value: 'transHisFee',
    idx: 'idxTransHisFee',
  },
  {
    feeType: '31',
    value: 'benAccntFee',
    idx: 'idxBenAccntFee',
  },
];
export const RESTRICTION_TYPE = [
  {
    val: '0',
    text: 'contract-management.form.service-fee.noRestrictions',
  },
  {
    val: '1',
    text: 'contract-management.form.service-fee.specifiedAmount',
  },
];
export const languages = {
  vi: {
    flag: '/src/content/images/icons/vietnam.main.svg',
    name: 'i18n.vn',
  },
  en: {
    flag: '/src/content/images/icons/English.main.svg',
    name: 'i18n.en',
  },
};
export const ALGORITHM_TYPE = [
  {
    val: '1',
    text: 'PGP',
  },
  {
    val: '2',
    text: 'RSA',
  },
];
export const PRODUCER_TYPE = [
  {
    val: '0',
    text: 'cms-common.sendFail',
    textColor: '#EA5455',
  },
  {
    val: '1',
    text: 'cms-common.sent',
    textColor: '#28C76F',
  },
];
export const STATUS_USE = [
  {
    val: 'Y',
    text: 'cms-common.use',
  },
  {
    val: 'N',
    text: 'cms-common.notUse',
  },
];

export const STATUS_ACTIVE = [
  {
    val: '1',
    text: 'bankCodeManagement.active',
    textColor: '#757575',
  },
  {
    val: '99',
    text: 'bankCodeManagement.in-active',
    textColor: '#3babec',
  },
]
export const APPROVE_ASSIGNMENT_REGISTER_STATUS = [
  {
    val: 0,
    text: 'Chưa duyệt',
    textColor: '#000000ff',
  },
  {
    val: 1,
    text: 'Đã duyệt',
    textColor: '#28C76F',
  },
  {
    val: 2,
    text: 'Bảo lưu',
    textColor: '#EA5455',
  },
];;

