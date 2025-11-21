import { ClearOutlined, SaveOutlined, ToTopOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import i18next from '@/i18n/i18n';
import { APP_DATE_FORMAT } from '@/app/config/constant/constants';
import { useAppSelector } from '@/app/config/redux/store';
import { onScrollToTop } from '@/app/shared/helpers/cms-helper';
import TextArea from 'antd/lib/input/TextArea';
import { PRODUCER_TYPE } from '@/app/config/constant/enum';
const EditEventKafkaManagement = ({ isEdit, selected, onChangeFormAdd }) => {

    const [formRegis] = Form.useForm();
    const [listProducerStatus, setListProducerStatus] = useState(PRODUCER_TYPE);



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
                <h3>{isEdit ? 'edit event Kafka Management' : 'event Kafka Management'}</h3>
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
                            <span className="cms-search-label label-padding-left">Topic name</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="topicName"
                                rules={[{ required: true, message: i18next.t('validation-message.required-field') }]}>
                                <Input className="cms-form-control" maxLength={200} readOnly={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label  label-padding-left">Producer status</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="producerStatus">
                                {(selected == undefined) && !isEdit ? (
                                    <>
                                        <Input className="cms-form-control" maxLength={30} readOnly={true} />
                                    </>
                                ) : (
                                    <>
                                        {listProducerStatus.map((obj, i) => {
                                            if (selected != undefined && obj.val === selected.producerStatus) {
                                                return <Input className="cms-form-control" key={i} maxLength={30} readOnly={true} value={i18next.t(obj.text)} />;
                                            }
                                        })}
                                    </>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row align="middle" style={{ marginBottom: 12 }}>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Consumer status</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="consumerStatus">
                                {(selected == undefined) && !isEdit ? (
                                    <>
                                        <Input className="cms-form-control" maxLength={30} readOnly={true} />
                                    </>
                                ) : (
                                    <>
                                        {listProducerStatus.map((obj, i) => {
                                            if (selected != undefined && obj.val === selected.consumerStatus) {
                                                return <Input className="cms-form-control" maxLength={30} readOnly={true} value={i18next.t(obj.text)} />;
                                            }
                                        })}
                                    </>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={10} md={3}>
                            <span className="cms-search-label label-padding-left">Timestamp</span>
                        </Col>

                        <Col xs={14} md={5}>
                            <Form.Item name="timestamp">
                                <Input
                                    className="cms-form-control" maxLength={30} readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ marginBottom: 12 }}>

                        <Col xs={10} md={3}>
                            <span className="cms-search-label">Full data</span>
                        </Col>

                        <Col xs={20} md={120}>
                            <TextArea className="cms-form-control" style={{ height: '300px' }} value={JSON.stringify(selected, null, "\t")} readOnly={true} />
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};


export default EditEventKafkaManagement;