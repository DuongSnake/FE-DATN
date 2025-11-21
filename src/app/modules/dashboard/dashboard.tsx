import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '@/app/config/redux/store';

import './dashboard.scss';

export const Dashboard = () => {

  const [loading, setLoading] = useState(true);

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
          <div className="dashboard-page">Dash board
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
