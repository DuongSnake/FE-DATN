import { Col, Row, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../config/redux/store';
import { Column } from '@ant-design/plots';
import moment from 'moment';
import { formatCurrency } from '../../shared/helpers/cms-helper';
import { LIST_MONTH } from '../../config/constant/enum';
import { FORMAT_DATE_MM_OUTPUT, FORMAT_YYYYMM } from '../../config/constant/constants';
import './report-year.scss';
import './dashboard.scss';

export const Dashboard = () => {
  const [yearTarget, setYearTarget] = useState(moment());
  const listReportYear = [
    {
      "groupCd": "G001",
      "groupNm": "Nhóm 2",
      "month": "202505",
      "ecolAmt": 0,
      "acolAmt": 0,
      "ccolAmt": 3000010,
      "totalCnt": 6,
      "totalAmt": 6000010
    },
    {
      "groupCd": "G001",
      "groupNm": "Nhóm 2",
      "month": "202507",
      "ecolAmt": 1500000,
      "acolAmt": 0,
      "ccolAmt": 0,
      "totalCnt": 6,
      "totalAmt": 6000010
    },
    {
      "groupCd": "G001",
      "groupNm": "Nhóm 2",
      "month": "202508",
      "ecolAmt": 1500000,
      "acolAmt": 0,
      "ccolAmt": 0,
      "totalCnt": 6,
      "totalAmt": 6000010
    }];
  const [loading, setLoading] = useState(true);
  const formatTooltip = {
    formatter(datum) {
      return { name: datum.type, value: formatCurrency(datum.value, 'en') };
    },
  };
  const _onChangeMonth = (date, dateString) => {
    setYearTarget(date);
  };

  const _convertDataYear = arr => {
    const listGroup = [];
    const listNewData = [];

    if (!!arr && arr.length > 0) {
      arr.map(item => listGroup.push(item.groupCd));
    }

    const removeDuplicateData = [...new Set(listGroup)];

    if (!!removeDuplicateData && removeDuplicateData.length > 0) {
      removeDuplicateData.forEach(item => {
        const listFilter = arr.filter(i => i.groupCd === item);
        const listColumn = [];

        LIST_MONTH.forEach(month => {
          if (!!listFilter && listFilter.length > 0) {
            const thisMonth = listFilter.filter(li => moment(li.month, FORMAT_YYYYMM).format('MM') === month.value);

            if (thisMonth?.length > 0) {
              return listColumn.push(
                ...[
                  {
                    month: moment(thisMonth[0].month, FORMAT_YYYYMM).format(FORMAT_DATE_MM_OUTPUT),
                    monthName: LIST_MONTH.find(mo => mo.value === moment(thisMonth[0].month, FORMAT_YYYYMM).format('MM')).name,
                    value: thisMonth[0].ecolAmt,
                    type: 'E-collection',
                  }
                ],
              );
            } else {
              return listColumn.push(
                ...[
                  {
                    month: moment(month.value + moment(yearTarget).format('YYYY'), 'MMYYYY').format(FORMAT_DATE_MM_OUTPUT),
                    monthName: LIST_MONTH.find(mo => mo.value === month.value).name,
                    value: 0,
                    type: 'E-collection',
                  }
                ],
              );
            }
          }
        });

        listNewData.push({
          group: listFilter[0].groupNm,
          totalAmt: listFilter[0].totalAmt,
          totalCnt: listFilter[0].totalCnt,
          list: [...listColumn],
        });
      });
    }

    return listNewData;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="loading">
            <span id="messageCommon" data-message="Vui lòng đợi trong giây lát"></span>
            <span id="messagePayment" data-message=""></span>
            <span id="messagePaymentAG" data-message=""></span>
            <span id="messageMemberPortal" data-message="Vui lòng đợi trong giây lát"></span>
            <div className="loading__spinner"></div>
            <div className="loading__text" id="loadingAlertText"></div>
          </div>
        </>
      ) : (
        <>
          <div>

            <div className="ReportYear">
              <div className="page-heading-template">
                <h3 className="heading-template">
                  Thống kê năm
                </h3>
              </div>
              <div className="content">
                <div className="search">
                  <Row className="mb-0">
                    <Col xl={{ span: 8 }} xxl={{ span: 7 }} className="item-center mb-15">
                      <label>Năm </label>
                      <DatePicker picker="year" value={yearTarget} format="YYYY" onChange={_onChangeMonth} />
                    </Col>
                  </Row>
                </div>
                <div className="card">
                  <div className="report-pie">
                    <div className="item-circle">
                      <div className="circle-title">
                        Số sinh viên bằng xuất sắc
                      </div>
                      <div className="circle-content">
                        5
                      </div>
                    </div>
                    <div className="item-circle">
                      <div className="circle-title">
                        Tổng số sinh viên bằng giỏi
                      </div>
                      <div className="circle-content">
                        50
                      </div>
                    </div>
                    <div className="item-circle">
                      <div className="circle-title">
                        Tổng số sinh viên bằng khá
                      </div>
                      <div className="circle-content">
                        120
                      </div>
                    </div>
                  </div>

                  <div className="heading-top">
                    <div className="title">
                      Số lượng sinh viên đã đăng ký năm {moment(yearTarget).format('YYYY')}
                    </div>
                  </div>
                  {_convertDataYear(listReportYear).map((item, index) => (
                    <div className="report-column" key={index}>
                      <div className="top-report">

                        <div className="value-group">
                          {/* <span className="totalCount">
                            Số lượng giao dịch:<strong>{item.totalCnt}</strong>
                          </span> */}
                          <span className="totalAmt">
                            Tổng số sinh viên tiền:<strong>{formatCurrency(item.totalAmt, 'en')}</strong>
                          </span>
                        </div>
                      </div>
                      <Column
                        legend={false}
                        data={item.list}
                        isStack={true}
                        xField={'monthName'}
                        yField={'value'}
                        seriesField={'type'}
                        color={['#3A47DC', '#63D6E1', '#20B640']}
                        tooltip={formatTooltip}
                        maxColumnWidth={40}
                        meta={{
                          value: {
                            formatter: v => formatCurrency(v, 'en'),
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
