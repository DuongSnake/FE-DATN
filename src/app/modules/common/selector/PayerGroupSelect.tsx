import { Select } from 'antd';
import React, { useEffect } from 'react';
import { getDataPayerGroup } from './PayerGroupSelect.reducer';
import { useAppDispatch, useAppSelector } from '@/app/config/redux/store';
import { createCommonIParams } from '@/app/shared/model/common.model';

const { Option } = Select;

const PayerGroupSelect = (props: {
  key: string;
  name: string;
  placeHolder: string;
  defaultVal?: string;
  disabled?: boolean;
  onChangeFn?: any;
}) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.payerGroupSelect.dataPayerGroup);

  let options = [];

  const _fetchGroup = () => {
    const payload = createCommonIParams();
    dispatch(getDataPayerGroup(payload));
  };

  useEffect(() => {
    _fetchGroup();
  }, []);
  options = list.map(d => <Option key={d.groupCd}>{d.groupNm}</Option>);
  return (
    <>
      <Select placeholder={props.placeHolder} onChange={props.onChangeFn}>
        {options}
      </Select>
    </>
  );
};
export default PayerGroupSelect;
