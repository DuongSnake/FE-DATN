export interface ICreateSiteAssignment {
  userId?: string;
  siteId?: string;
}

export interface IErrorResponse {
  responseCd?: number | null;
  responseMsg?: string | '';
  responseTs?: string | '';
}

export interface IFilter {
  field: string;
  value: string | number | any;
  expression: number;
}

export interface ISort {
  field?: string;
  asc?: boolean;
}

export interface IPagination {
  size?: number;
  page?: number;
  filters?: IFilter[];
  sorts?: ISort[];
}

export const pagination: IPagination = {
  filters: [],
  sorts: [],
};

export interface IResultList {
  totalUnreads: number;
  currentPage: number;
  items: any[];
  totalItems: number;
  totalPages: number;
}

export interface IParam {
  page?: number;
  pageSize?: number;
  sorts?: ISort[];
  blockUnitId?: string;
  blockUnitType?: number;
  blockId?: string;
  searchValue?: string;
  feeType?: number;
  feeTypes?: number[];
  type?: number;
  vehicleTypeId?: string;
  types?: number;
  meterType?: number;
  meterCode?: string;
  monthYear?: string;
  facilityMeasureFormId?: string;
  toDateTime?: any;
  fromDateTime?: any;
  fromDate?: any;
  toDate?: any;
  parkingStatus?: number;
  residentId?: string;
  residentName?: string;
  bookDate?: any;
  serviceName?: string;
  warehouseId?: string;
  date?: any;
  materialClassId?: string;
  materialCategoryId?: string;
  enable?: any;
  groupStatus?;
  paymentStatus?: number;
  paymentStatuses?: number[];
  listObjectId?: [];
  otherListObjectId?: [];
  status?: number;
  method?: number;
  materialId?: string;
  listObject?: any;
  parentBankAccountId?: string;
  fullname?: string;
  fromMonth?: string;
  toMonth?: string;
  groupType?: number;
  id?: string;
  readAll?: boolean;
}
