import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import i18next from '@/i18n/i18n';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import TextArea from 'antd/lib/input/TextArea';
const EditAccessManagement = ({ isEdit, selected, onChangeFormAdd }) => {

    const { validateError} = useAppSelector(state => state.accessManagementReducer);

    const [formRegis] = Form.useForm();

    useEffect(() => {
        if (validateError && validateError.length > 0) {
            formRegis.setFields([
                {
                    name: '_id',
                    errors: [i18next.t('accessManagement.groupCdExits')]
                }
            ]);
        }
    }, [validateError]);

    useEffect(() => {
        if (selected && isEdit) {
            formRegis.setFieldsValue({
                ...selected
            });
        }
    }, [isEdit, selected]);

    return (
        <div className="insert edit-department">
            <div className="heading">
                <h3>{isEdit ? 'edit access Management' : 'access Management'}</h3>
            </div>

            <div className="content">
                <div className="actions">
                    <Button className="button-add" onClick={onScrollToTop} icon={<ToTopOutlined />}>
                        {i18next.t('button.go-to-list')}
                    </Button>
                </div>

                <Form form={formRegis} className="custom-form edit-department__form">

                    <Row align="middle" style={{ marginBottom: 12 }}>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label">_id</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="_id">
                                <Input className="cms-form-control" maxLength={255} readOnly={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label label-padding-left">Client Id gateway</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="clientIdGw"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} readOnly={true}/>
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label  label-padding-left">Request Url</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="reqUrl">
                                <Input className="cms-form-control" maxLength={200} readOnly={true}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="middle" style={{ marginBottom: 12 }}>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Request Ip</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="reqIp">
                                <Input className="cms-form-control" maxLength={30} readOnly={true}/>
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label label-padding-left">Timestamp</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="timestamp">
                                <Input
                                    className="cms-form-control" maxLength={30} readOnly={true}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Full json data</span>
                        </Col>

                        <Col xs={20} md={120}>
                                <TextArea className="cms-form-control"  style={{height : '300px'}} value={JSON.stringify(selected, null, "\t")}  readOnly={true}/>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};


export default EditAccessManagement;