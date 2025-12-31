import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@/app/config/redux/store';
import { createCommonIParams } from '@/app/shared/model/common.model';
import { downloadTemplate, uploadBatchFile, batchInsertUser } from './UserManagement.reducer';
import { Button, Modal, Row, Col } from 'antd';
import { translate } from 'react-jhipster';
import { Column, DataGrid, Pager, Paging, Selection } from 'devextreme-react/data-grid';
import { cellIndexRender, headerRequired } from '@/app/modules/common/JSXFunction';
import { FileAddOutlined, SaveOutlined, CloseOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/app/shared/helpers/cms-helper';
import UploadImage from './Upload';
import ModalSelectTemplate from './ModalSelectTemplate';
import { USER_NAME } from '@/app/config/constant/constants';
import { Storage } from 'react-jhipster';
import { openNotificationAction } from '@/app/shared/util/entity-utils';
import { NOTIFICATION } from '@/app/config/constant/enum';

const BatchRegisterPopup = ({ fetchListAgain }: any) => {
  const dataGridRef = useRef(null);
  const dispatch = useAppDispatch();
  const totalRecord = 0;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [dataTable, setDataTable] = useState([]);

  const _onIsOpenModal = () => {
    setIsOpen(true);
  };

  const _closeModal = () => {
    setIsOpen(false);
    setDataTable([]);
    setFileUpload(null);
  };

  const _onInsertBatch = () => {
    const payload = createCommonIParams(dataTable);

    dispatch(batchInsertUser(payload)).then(res => {
      _closeModal();
      //Goi lai ham insert
      // fetchListAgain();
    });
  };

  const _onSelectedData = () => {
    if (dataTable?.some(item => item?.errors?.length > 0)) {
      return openNotificationAction(NOTIFICATION.ERROR, 'errorExcel', '', '');
    } else {
      _onInsertBatch();
    }
  };

  const handleDownloadTemplate = () => {
    const query = createCommonIParams();
    dispatch(downloadTemplate(query));
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', fileUpload as File);

    dispatch(uploadBatchFile(formData)).then(res => {
      setDataTable(res?.payload?.data || []);
    });
  };

  return (
    <div className="service-list-popup">
      <Button className="button-add" icon={<FileAddOutlined />} onClick={_onIsOpenModal}>
        {translate('button.batch-register')}
      </Button>
      <Modal
        open={isOpen}
        className="modal-size-xl"
        title={
          <div className="header-modal">
            <span>{translate('button.batch-register')}</span>{' '}
          </div>
        }
        onOk={_onSelectedData}
        onCancel={_closeModal}
        footer={[
          <Button
            key="submit"
            className="button-add"
            type="primary"
            onClick={_onSelectedData}
            icon={<SaveOutlined />}
            disabled={dataTable?.length === 0}
          >
            <span>{translate('button.save')}</span>
          </Button>,
          <Button key="back" className="button-close" onClick={_closeModal} icon={<CloseOutlined />}>
            <span>{translate('button.close')}</span>
          </Button>,
        ]}
      >
        <div className="regis-card">
          <div className="regis-card-header">
            <div>
              <span>{translate('posManagement.registration')}</span>
            </div>
          </div>

          <div className="regis-card-content cms-form-label cms-form-page form-regis__contract">
            <Row style={{ marginBottom: 12 }} align="middle">
              <Col xl={3} xxl={3}>
                <span className="cms-search-label">{translate('posManagement.file-browser')}</span>
              </Col>
              <Col xl={9} xxl={9}>
                <UploadImage
                  label={translate('label.choose-file')}
                  onChange={file => setFileUpload(file)}
                  setDataTable={setDataTable}
                  fileUpload={fileUpload}
                  msgError={`File ${translate('validation-message.not-a-excel')}`}
                />
              </Col>
              <Col xl={3} xxl={3}>
                <Button
                  icon={<UploadOutlined />}
                  className="button-add label-padding-left custome-btn-batch-regis"
                  disabled={!fileUpload}
                  onClick={handleUpload}
                >
                  {translate('cms-common.upload')}
                </Button>
              </Col>
            </Row>
            <Row style={{ marginBottom: 12 }} align="middle">
              <Col xl={3} xxl={3}>
                <span className="cms-search-label">{translate('posManagement.templates')}</span>
              </Col>
              <Col xl={3} xxl={3}>
                <Button
                  icon={<DownloadOutlined />}
                  className="button-add label-padding-left custome-btn-batch-regis"
                  onClick={handleDownloadTemplate}
                >
                  {translate('button.download')}
                </Button>
              </Col>
            </Row>
          </div>
        </div>

        <div className="regis-card">
          <div className="regis-card-header">
            <div>
              <span>{translate('posManagement.detail-registration')}</span>
            </div>
          </div>

          <div className="card-content-form-batch-registration cms-form-label cms-form-page form-regis__contract">
            <Row>
              <Col xs={12} style={{ marginBottom: 16 }}>
                <span>
                  {translate('service-management.service-fee.total-transaction')}
                  <b>{formatCurrency(dataTable?.length, 'en')}</b>
                </span>
              </Col>

              <Col xs={12} style={{ textAlign: 'right' }}>
                <div className="download-template">
                  <ModalSelectTemplate
                    data={dataTable}
                    userName={Storage.session.get(USER_NAME)}
                    services={translate('menu.posManagement')}
                  />
                </div>
              </Col>
            </Row>

            <div className="table-data">
              <DataGrid
                id="gridContainer"
                ref={dataGridRef}
                dataSource={dataTable}
                keyExpr="customerId"
                columnResizingMode={'widget'}
                columnMinWidth={50}
                allowColumnResizing={true}
                showBorders={true}
                allowColumnReordering={true}
                wordWrapEnabled={true}
                hoverStateEnabled={true}
                onRowDblClick={_onSelectedData}
              >
                <Paging defaultPageSize={10} enabled={false} />
                <Pager visible={false} showNavigationButtons={false} />
                <Selection mode="single" showCheckBoxesMode={'always'} deferred={true} />
                <Column
                  allowFiltering={false}
                  allowSorting={false}
                  caption={translate('providerManagement.serial')}
                  alignment="center"
                  width={86}
                  cellRender={cellIndexRender}
                />
                <Column
                  dataField="customerId"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.customerId')}
                  dataType="text"
                  width={150}
                  headerCellRender={() => headerRequired(translate('posManagement.customerId'))}
                />
                <Column
                  dataField="customerName"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.customerNm')}
                  dataType="text"
                  minWidth={268}
                />
                <Column
                  dataField="beneficiaryAccount"
                  alignment="right"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posTransaction.beneficiaryAcc')}
                  dataType="text"
                  width={180}
                  headerCellRender={() => headerRequired(translate('posTransaction.beneficiaryAcc'))}
                />
                <Column
                  dataField="providerId"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('providerManagement.providerId')}
                  dataType="text"
                  width={180}
                  headerCellRender={() => headerRequired(translate('providerManagement.providerId'))}
                />
                <Column
                  dataField="providerName"
                  alignment="left"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('providerManagement.providerNm')}
                  dataType="text"
                  width={268}
                />
                <Column
                  dataField="posId"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.POSID')}
                  dataType="text"
                  width={150}
                  headerCellRender={() => headerRequired(translate('posManagement.POSID'))}
                />
                <Column
                  dataField="posName"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.posNm')}
                  dataType="text"
                  minWidth={268}
                  headerCellRender={() => headerRequired(translate('posManagement.posNm'))}
                />
                <Column
                  dataField="vaName"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.vaName')}
                  dataType="text"
                  minWidth={268}
                />
                <Column
                  dataField="posPrefix"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.customVA')}
                  dataType="text"
                  minWidth={268}
                />
                <Column
                  dataField="errors"
                  alignment="center"
                  allowFiltering={false}
                  allowSorting={true}
                  caption={translate('posManagement.errorMessage')}
                  dataType="text"
                  minWidth={268}
                  cellRender={({ value }) => {
                    if (Array?.isArray(value)) {
                      return value?.join(', ');
                    }
                    return value;
                  }}
                />
              </DataGrid>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BatchRegisterPopup;
