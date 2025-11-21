import i18next from '@/i18n/i18n';
import moment from 'moment';
import { FORMAT_DATE_OUTPUT, FORMAT_YYYYMMDD } from '@/app/config/constant/constants';
import _ from 'lodash';
import { LIST_FEE_AC, LIST_FEE_ACC, LIST_FEE_TRANSFER } from '@/app/config/constant/enum';
import { v4 as uuidv4 } from 'uuid';

export const checkSuccessDispatch = res => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.meta.requestStatus === 'fulfilled' && res.payload && res.payload.responseCd === '000000';
};

export const checkInsertSuccessDispatch = res => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.meta.requestStatus === 'fulfilled' && res.payload && res.payload.responseCd === '100000';
};

export const checkUpdateSuccessDispatch = res => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.meta.requestStatus === 'fulfilled' && res.payload && res.payload.responseCd === '200000';
};

export const checkDeleteSuccessDispatch = res => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.meta.requestStatus === 'fulfilled' && res.payload && res.payload.responseCd === '300000';
};

export const checkSuccessDownload = res => {
  return res.status === 200 && res.data.size > 203; // 203 is content of response status fail
};

export const checkZ0126Exception = res => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.meta.requestStatus === 'fulfilled' && res.payload && res.payload.responseCd === 'Z0126';
};

export function calculationTotalArr(key: string, arr: any): number {
  return arr.reduce((accumulator: number, currentValue: { [x: number]: number }) => {
    return accumulator + Number(currentValue[key]);
  }, 0);
}

export const convertStringToNumber = (val: string) => {
  return val.toString().replace(/,/g, '');
};

export const convertYesNoToBoolean = (val: 'Y' | 'N') => val === 'Y';

export const convertBooleanToYesNo = (val: boolean) => (val ? 'Y' : 'N');

export const getDifferentClass = (isChange: boolean) => (isChange ? '' : 'text-red');

export const checkMomentDate = date => {
  return !moment.isMoment(date);
};

export const _checkDateEndContract = endDt => {
  if (endDt === undefined) {
    return i18next.t('contract-management.form.service-fee.infinite');
  }

  if (endDt === '99999999' || endDt === null) {
    return i18next.t('contract-management.form.service-fee.infinite');
  } else {
    if (checkMomentDate(endDt)) {
      return moment(endDt, FORMAT_YYYYMMDD).format(FORMAT_DATE_OUTPUT);
    } else {
      return endDt.format(FORMAT_DATE_OUTPUT);
    }
  }
};

export const _getDefaultDateStart = (data: any = {}) => {
  if (data.startDt) {
    if (checkMomentDate(data?.startDt)) {
      return moment(data?.startDt, FORMAT_YYYYMMDD);
    } else {
      return data?.startDt;
    }
  } else {
    return moment();
  }
};

export const _checkUnTickUse = (data, value, compare) => {
  if (value === '' || value === undefined || value === null) {
    return true;
  }

  if (data) {
    const selectValue = data.find(item => item.serviceAcct === value);

    return selectValue?.[compare] === '1';
  }

  return true;
};

export const _convertNotification = arr => {
  const newArray = [];

  if (arr?.length) {
    arr.forEach(item => {
      newArray.push({ ...item, serviceUse: item.serviceUse === '1' });
    });
  }

  return newArray;
};
export const _convertDataAcc = (arr, arrAcc) => {
  const deptCopyArr = _.cloneDeep(arr);
  const newArrayData = [];
  const newArray = [];

  deptCopyArr?.forEach((item_, index_) => {
    if (item_.serviceAcct !== '') {
      return newArrayData.push({
        ...item_,
        contractServiceInfos: [
          ...item_.contractServiceInfos,
          {
            serviceCd: 'C',
            serviceUse: arrAcc[0].serviceUse,
            contractServiceFeeInfos: arrAcc[0].contractServiceFeeInfos,
          },
        ],
      });
    }
  });

  const backupArrNew = _.cloneDeep(newArrayData);

  newArrayData?.forEach((item1, index1) => {
    newArray.push({
      eccPrefix: item1.eccPrefix,
      serviceAcct: item1.serviceAcct,
      restrictionType: item1.restrictionType,
      contractId: item1.contractId,
      contractServiceInfos: item1.contractServiceInfos,
    });
    const contractServiceInfos = item1.contractServiceInfos;

    contractServiceInfos?.forEach((item2, index2) => {
      newArray[index1]['contractServiceInfos'][index2]['serviceCd'] = item2.serviceCd;
      newArray[index1]['contractServiceInfos'][index2]['serviceUse'] = item2.serviceUse === true ? '1' : '0';
      newArray[index1]['contractServiceInfos'][index2]['contractServiceFeeInfos'] =
        backupArrNew[index1]['contractServiceInfos'][index2]['contractServiceFeeInfos'];

      const newFeeList = [];

      item2?.contractServiceFeeInfos?.forEach(item3 => {
        if (item3.startDt) {
          if (item2.serviceCd === 'E') {
            newFeeList.push({
              idx: item3['idxECollFee'] || null,
              startDt: checkMomentDate(item3.startDt) ? item3.startDt : item3?.startDt?.format(FORMAT_YYYYMMDD),
              endDt: null,
              feeType: '0',
              fee: convertStringToNumber(item3.eCollFee),
            });
          } else if (item2.serviceCd === 'A') {
            LIST_FEE_AC.forEach(item4 => {
              newFeeList.push({
                idx: item3[item4.idx] || null,
                startDt: checkMomentDate(item3.startDt) ? item3.startDt : item3?.startDt.format(FORMAT_YYYYMMDD),
                endDt: null,
                feeType: item4.feeType,
                fee: convertStringToNumber(item3[item4.value]),
              });
            });
          } else if (item2.serviceCd === 'T') {
            LIST_FEE_TRANSFER.forEach(item4 => {
              newFeeList.push({
                idx: item3[item4.idx] || null,
                startDt: checkMomentDate(item3.startDt) ? item3.startDt : item3?.startDt.format(FORMAT_YYYYMMDD),
                endDt: null,
                feeType: item4.feeType,
                fee: convertStringToNumber(item3[item4.value]),
              });
            });
          } else if (item2.serviceCd === 'C') {
            LIST_FEE_ACC.forEach(item4 => {
              newFeeList.push({
                idx: item3[item4.idx] || null,
                startDt: checkMomentDate(item3.startDt) ? item3.startDt : item3?.startDt?.format(FORMAT_YYYYMMDD),
                endDt: null,
                feeType: item4.feeType,
                fee: convertStringToNumber(item3[item4.value]),
              });
            });
          }
        }
      });

      newArray[index1]['contractServiceInfos'][index2]['contractServiceFeeInfos'] = newFeeList;
    });
  });
  return newArray;
};
export const _convertFeeServices = arr => {
  const listFee = arr?.contractServiceFeeInfos;
  const newrArr = [
    {
      serviceUse: arr?.serviceUse === '1',
      serviceCd: arr?.serviceCd,
      contractServiceFeeInfos: [],
    },
  ];
  const listFeeNew = newrArr[0]?.contractServiceFeeInfos;

  if (listFee?.length > 0) {
    listFee.forEach((item, index) => {
      const findIndex = listFeeNew.findIndex(fee => fee.startDt.format(FORMAT_YYYYMMDD) === item.startDt);

      if (findIndex === -1) {
        newrArr[0].contractServiceFeeInfos.push({
          startDt: checkMomentDate(item.startDt) && item.startDt !== '99999999' ? moment(item.startDt, FORMAT_YYYYMMDD) : item.startDt,
          endDt:
            checkMomentDate(item.endDt) && item.endDt !== '99999999' && item.endDt !== null ? moment(item.endDt, FORMAT_YYYYMMDD) : null,
        });

        LIST_FEE_ACC.forEach(fee => {
          newrArr[0].contractServiceFeeInfos[newrArr[0].contractServiceFeeInfos.length - 1][fee.value] = _findFee(item, fee.feeType);
          newrArr[0].contractServiceFeeInfos[newrArr[0].contractServiceFeeInfos.length - 1][fee.idx] = _findIdx(item, fee.feeType);
        });
      } else {
        LIST_FEE_ACC.forEach(fee => {
          if (item.feeType === fee.feeType) {
            newrArr[0].contractServiceFeeInfos[findIndex][fee.value] = _findFee(item, fee.feeType);
            newrArr[0].contractServiceFeeInfos[findIndex][fee.idx] = _findIdx(item, fee.feeType);
          }
        });
      }
    });
  }

  return newrArr;
};
export const _findFee = (item, feeType) => {
  if (item.feeType === feeType) {
    return item.fee;
  }

  return 0;
};

export const _findIdx = (item, feeType) => {
  if (item.feeType === feeType) {
    return item.idx;
  }

  return null;
};

export const _convertFeeServicesAnother = arr => {
  const newrArr = [];

  arr.forEach((item, index) => {
    newrArr.push({ ...item, id: uuidv4(), contractServiceInfos: [] });
    const contractServiceInfos = item.contractServiceInfos;
    const listNotAcc = contractServiceInfos?.filter(service => service.serviceCd !== 'C');

    listNotAcc?.forEach((serv, index2) => {
      const listFee = serv.contractServiceFeeInfos;
      newrArr[index].contractServiceInfos.push({
        serviceUse: serv.serviceUse === '1',
        serviceCd: serv.serviceCd,
        contractServiceFeeInfos: [],
      });

      const listFeeNew = newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos;

      if (listFee?.length > 0) {
        listFee.forEach((item2, index3) => {
          const findIndex = listFeeNew?.findIndex(fee => fee.startDt.format(FORMAT_YYYYMMDD) === item2.startDt);

          if (findIndex === -1) {
            listFeeNew.push({
              startDt:
                checkMomentDate(item2.startDt) && item2.startDt !== '99999999' ? moment(item2.startDt, FORMAT_YYYYMMDD) : item2.startDt,
              endDt:
                checkMomentDate(item2.endDt) && item2.endDt !== '99999999' && item2.endDt !== null
                  ? moment(item2.endDt, FORMAT_YYYYMMDD)
                  : null,
            });

            if (serv.serviceCd === 'E') {
              newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
              ]['eCollFee'] = _findFee(item2, '0');
              newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
              ]['idxECollFee'] = _findIdx(item2, '0');
            } else if (serv.serviceCd === 'A') {
              LIST_FEE_AC.forEach(fee => {
                newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
                ][fee.value] = _findFee(item2, fee.feeType);
                newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
                ][fee.idx] = _findIdx(item2, fee.feeType);
              });
            } else if (serv.serviceCd === 'T') {
              LIST_FEE_TRANSFER.forEach(fee => {
                newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
                ][fee.value] = _findFee(item2, fee.feeType);
                newrArr[index]['contractServiceInfos'][index2]['contractServiceFeeInfos'][
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos.length - 1
                ][fee.idx] = _findIdx(item2, fee.feeType);
              });
            }
          } else {
            if (serv.serviceCd === 'E') {
              newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos[findIndex].eCollFee = _findFee(item2, '0');
            } else if (serv.serviceCd === 'A') {
              LIST_FEE_AC.forEach(fee => {
                if (item2.feeType === fee.feeType) {
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos[findIndex][fee.value] = _findFee(item2, fee.feeType);
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos[findIndex][fee.idx] = _findIdx(item2, fee.feeType);
                }
              });
            } else if (serv.serviceCd === 'T') {
              LIST_FEE_TRANSFER.forEach(fee => {
                if (item2.feeType === fee.feeType) {
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos[findIndex][fee.value] = _findFee(item2, fee.feeType);
                  newrArr[index].contractServiceInfos[index2].contractServiceFeeInfos[findIndex][fee.idx] = _findIdx(item2, fee.feeType);
                }
              });
            }
          }
        });
      }
    });
  });

  return newrArr;
};
export const groupArrayBy = array => {
  const newArray = [];

  array.forEach((item, index) => {
    newArray.push({
      channel: item.channel,
      contractServiceFeeInfos: item.contractServiceFeeInfos,
      service: item.service,
    });
    newArray[index]['serviceUse'] = item.serviceUse === true ? '1' : '0';

    const contractServiceFeeInfos = item.contractServiceFeeInfos;
    const newFeeList = [];

    contractServiceFeeInfos.forEach((item2, index2) => {
      newFeeList.push({
        idx: item2.idx,
        startDt: item2.startDt
          ? checkMomentDate(item2.startDt)
            ? item2.startDt
            : item2.startDt.format(FORMAT_YYYYMMDD)
          : moment().format(FORMAT_YYYYMMDD),
        endDt: null,
        fee: convertStringToNumber(item2.fee) || 0,
      });
    });

    newArray[index]['contractServiceFeeInfos'] = newFeeList;
  });

  return newArray;
};
