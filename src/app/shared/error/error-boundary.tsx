import React from 'react';
import { Button, Modal } from 'antd';
import i18next from '@/i18n/i18n';

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
  readonly isModalVisible: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      errorInfo: undefined,
      isModalVisible: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  _handleCancel = () => {
    this.setState(
      {
        isModalVisible: false,
      },
      () => {
        window.location.reload();
      },
    );
  };

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
        import.meta.env.VITE_NODE_ENV === 'development' ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <Modal
          maskClosable={false}
          className="popup-insert-supplier"
          width={1000}
          title={<div className="drop-drag">Có lỗi xảy ra</div>}
          visible={this.state.isModalVisible}
          onCancel={this._handleCancel}
          footer={[
            <Button key="back" onClick={this._handleCancel}>
              {i18next.t('button.close')}
            </Button>,
          ]}
        >
          <div>
            <h2 className="error">
              Có lỗi xảy ra. Vui lòng thông báo lỗi này tới bộ phận CSKH của InfoCMS. Xin chân thành cảm ơn quý khách
            </h2>
            {errorDetails}
          </div>
        </Modal>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
