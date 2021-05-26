import { message, Input, Typography, Form, Row, Col, Button, Divider } from 'antd';
import { useState, useEffect } from 'react';
import { getErrorMessage } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import Spinner from 'components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import api from 'utils/Api';

const FormCreateDocument = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const history = useHistory();
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveForm = async values => {
        try {
            setIsLoading(true);
            const result = await api.post(`/document/${id}/template/${document.template.id}/create`, values);
            // message.success(result.message);
            history.push('/documents');
        } catch (error) {
            // message.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await api.get(`/generated-documents/${id}`)
                setDocument(data);
            } catch (error) {
                message.error(getErrorMessage(error));
            }
        };
        fetchData();
    }, [id]);

    if (!document) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Row style={{width: '80%'}}>
            <Col style={{textAlign: 'center'}} span={24}>
                <Typography.Title level={2}>{t('name_form_create_document')}</Typography.Title>
            </Col>
            <Col span={24}>
            <Form
                layout="vertical"
                onFinish={handleSaveForm}
            >
                <Row justify="space-between">
                    <Col span={11}>
                        <Form.Item label={t('title')}>
                            <Input disabled value={document.name}/>
                        </Form.Item>                   
                    </Col>
                    <Col span={11}>
                        <Form.Item label={t('template')}>
                            <Input disabled value={document.template.name} />
                        </Form.Item>                      
                    </Col>
                </Row>
                <Divider>{t('variables')}</Divider>
                <Form.List name="variables">
                {() => (document.template.variables.map(variable => {
                    return (
                        <Form.Item
                            name={`${variable.key}`} 
                            label={variable.name}
                            rules={[
                                {
                                  required: true,
                                  message: t('required', {field: t('variable')})
                                },
                                {
                                  min: 2,
                                  max: 255,
                                  message: t('check_range', {field: t('variable'), min: 2, max: 255})
                                }
                              ]}
                        >
                            <Input />
                        </Form.Item>    
                    );
                }))}
                </Form.List>
                <Row justify='center'>
                    <Col>
                        <Form.Item>
                            <Button loading={isLoading} htmlType="submit" type="primary">{t('save_btn')}</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            </Col>
        </Row>
        </div>
    );
}

export default FormCreateDocument;