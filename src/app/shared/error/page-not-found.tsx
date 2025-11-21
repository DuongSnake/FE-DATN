import { Alert } from 'antd';
import React from 'react';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert message={<>The page does not exist.</>} type="warning" />
      </div>
    );
  }
}

export default PageNotFound;
