import React, { useState } from 'react';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { translate } from 'react-jhipster';
import moment from 'moment';
import { FORMAT_DATE_OUTPUT } from '@/app/config/constant/constants';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

export interface IProps {
  data: any;
  userName: string;
  services: string;
}

const ModalSelectTemplate = (props: IProps) => {
  const { data, userName, services } = props;

  const onClick: MenuProps['onClick'] = ({ key }) => {
    createDownLoadData(key);
  };

  const createDownLoadData = type => {
    handleExport(type).then(url => {
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', url);
      downloadAnchorNode.setAttribute('download', `${translate('posTransaction.filename')}.xlsx`);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = workbook => {
    const wBout = XLSX.write(workbook, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    });

    return new Blob([s2ab(wBout)], { type: 'application/octet-stream' });
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i < s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = type => {
    const title = [{ A: translate('titleRegisterPOS') }];
    let newData = data;

    if (type === 'error') {
      newData = data?.filter(trans => trans?.errors?.length > 0);
    }

    let table: any = [
      {
        B: 'No',
        C: translate('posManagement.customerId'),
        D: translate('posManagement.customerNm'),
        E: translate('posTransaction.beneficiaryAcc'),
        F: translate('providerManagement.providerId'),
        G: translate('providerManagement.providerNm'),
        H: translate('posManagement.POSID'),
        I: translate('posManagement.posNm'),
        J: translate('posManagement.vaName'),
        K: translate('posManagement.customVA'),
        L: translate('posManagement.errorMessage'),
      },
    ];

    newData?.forEach((row, index) => {
      const payerItem = row;

      table.push({
        B: index + 1,
        C: payerItem.customerId,
        D: payerItem.customerName,
        E: `'${payerItem.beneficiaryAccount}`,
        // E: addSpaceEvery4Characters(payerItem.beneficiaryAccount),
        F: payerItem.providerId,
        G: payerItem.providerName,
        H: payerItem.posId,
        I: payerItem.posName,
        J: payerItem.vaName,
        K: payerItem.posPrefix,
        L: payerItem.errors?.join(', '),
      });
    });

    table = [
      { B: translate('exporter'), C: userName },
      { B: translate('dateCreate'), C: moment().format(FORMAT_DATE_OUTPUT) },
      { B: translate('services'), C: services },
      {},
    ].concat(table);

    const finalData = [...title, ...table];
    const wb = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });
    XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');
    const workbookBlob = workbook2blob(wb);
    const headerIndexes = [];

    finalData.forEach((item, index) => (item['B'] === 'No' ? headerIndexes.push(index) : null));

    const totalRecords = newData?.length;
    const dataInfo = {
      titleCell: 'A1',
      titleRange: 'A1:K1',
      tbodyRange: `B7:K${finalData.length}`,
      theadRange: headerIndexes?.length >= 1 ? `B${headerIndexes[0] + 1}:K${headerIndexes[0] + 1}` : null,
      tFirstColumnRange: headerIndexes?.length >= 1 ? `B${headerIndexes[0] + 3}:B${totalRecords + headerIndexes[0] + 3}` : null,
      tLastColumnRange: headerIndexes?.length >= 1 ? `K${headerIndexes[0] + 3}:K${totalRecords + headerIndexes[0] + 3}` : null,
      requiredColumns: ['C', 'E', 'F', 'H', 'I'],
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlobValue, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlobValue).then(workbook => {
      workbook.sheets().forEach(sheet => {
        sheet.usedRange().style({
          fontFamily: 'Calibri',
          verticalAlignment: 'center',
          fontSize: '12',
        });

        sheet.column('A').width(2);
        sheet.column('B').width(10);
        sheet.column('C').width(15);
        sheet.column('D').width(30);
        sheet.column('E').width(20);
        sheet.column('F').width(20);
        sheet.column('G').width(20);
        sheet.column('H').width(12);
        sheet.column('I').width(12);
        sheet.column('J').width(20);
        sheet.column('K').width(20);
        sheet.column('L').width(40);

        sheet.row(1).height(20);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: 'center',
          verticalAlignment: 'center',
        });

        sheet.range(dataInfo.theadRange).style({
          fill: '95B3D7',
          bold: true,
          horizontalAlignment: 'center',
          wrapText: true,
          border: true,
        });

        sheet.range(dataInfo.tbodyRange).style({
          border: true,
          wrapText: true,
          horizontalAlignment: 'right',
        });
      });

      return workbook.outputAsync().then(workbookBlob => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu
          onClick={onClick}
          items={[
            {
              label: translate('allRecord'),
              key: 'all',
            },
            {
              label: translate('onlyErrorItem'),
              key: 'error',
            },
          ]}
        />
      }
      placement="bottomRight"
      trigger={['click']}
      disabled={data?.length === 0}
    >
      <Button className="button-add" icon={<FileExcelOutlined />} disabled={data?.length === 0}>
        {translate('button.excel-download')}
      </Button>
    </Dropdown>
  );
};

export default ModalSelectTemplate;
