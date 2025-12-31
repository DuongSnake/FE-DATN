import React, { useMemo } from 'react';
import { Upload, Button } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { openNotificationAction } from '@/app/shared/util/entity-utils';
import { NOTIFICATION } from '@/app/config/constant/enum';
import { validateFileType } from '@/app/shared/util/global-function';
interface IUploadProps {
  onChange?: (file: UploadFile | null) => void;
  label: string;
  msgError?: string;
  fileUpload: UploadFile | null;
  setDataTable?: any;
}

const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
export default function UploadImage({ onChange, label, msgError, fileUpload, setDataTable }: IUploadProps) {
  const fileList = useMemo(() => [fileUpload]?.filter(Boolean), [fileUpload]);
  const uploadProps = useMemo(
    () => ({
      beforeUpload(file: UploadFile<any>) {
        const isAllowedType = validateFileType(file, fileTypes);

        if (!isAllowedType) {
          openNotificationAction(NOTIFICATION.ERROR, '', '', msgError);
        } else {
          onChange?.(file);
        }

        return false;
      },
      onRemove(file: { uid: any }) {
        onChange?.(null);
        setDataTable([]);
        return true;
      },
    }),
    [fileList]
  );

  return (
    <Upload
      multiple
      {...uploadProps}
      fileList={fileList}
      itemRender={(originNode, file, renderFileList, actions) => {
        return (
          <>
            {fileList?.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '8px',
                  alignItems: 'center',
                  padding: '3px 8px',
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  maxWidth: '100%',
                  background: '#fafafa',
                  marginRight: 8,
                }}
              >
                <span style={{ wordBreak: 'break-all' }}>{file.name}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ cursor: 'pointer', color: '#ff4d4f', marginLeft: 8 }} onClick={actions.remove}>
                    <DeleteOutlined />
                  </span>
                </div>
              </div>
            )}
          </>
        );
      }}
    >
      {fileList?.length === 0 ? (
        <Button icon={<UploadOutlined />} className="ant-btn custome-btn-batch-regis">
          {label}
        </Button>
      ) : null}
    </Upload>
  );
}
