import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Upload, Steps, Button, message, Row, Col, Divider } from 'antd';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getErrorMessage } from 'utils/helpers';
import api, { BACKEND_URL, getToken } from 'utils/Api';
import { fetchDocumentTemplateAction, setDocumentTemplateAction } from 'store/reducers/DocumentTemplateReducer';
import { useDispatch } from 'react-redux';

import example from 'assets/example.mp4';

const ModalCreateFormTemplate = ({visible, onCancel}) => {
    const { t } = useTranslation();
    const [filePath, setFilePath] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onCloseModal = () => {
        if (filePath) {
            Modal.confirm({
                title: t('close_form'),
                icon: <ExclamationCircleOutlined />,
                content: t('info_close_form_create_template'),
                onOk() {
                  // send server request delete file
                  onCancel();
                },
                okText: t('yes'),
                cancelText: t('cancel_btn'),
              });
        } else {
            onCancel();
        }
    }

    const videlStyle = {
        width: '100%',
        border: '1px solid #1890ff',
        marginTop: '14px',
        maxHeight: '300px',
    };

    const uploadFileStyle = {
        minHeight: '300px',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
    }

    const props = {
        maxCount: 1,
        name: 'file',
        accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        multiple: false,
        headers: getToken(),
        action: `${BACKEND_URL}/file/save`,
        onChange(info) {
          const { status } = info.file;
          if (status === 'done') {
              setFilePath(info.file.response.path);
              message.success(t('file_upload', {file: info.file.name}));
          } else if (status === 'error') {
              message.error(t('file_upload_error', {file: info.file.name}));
          }
        },
        onRemove: () => {
            setFilePath(null);
        }
      };

      const handleSubmitForm = async values => {
        const val = values.variables;

        if (!val || (Array.isArray(val) ? !val.length : false)) {
            message.error(t('empty_variables'));
            return;
        }
        setConfirmLoading(true);
        try {
            const messages = await api.post('document-templates', {
                ...values,
                file_path: filePath,
            });
            message.success(messages.message);
            setFilePath(null);
            form.resetFields();
            setCurrent(0);
            onCancel();
            dispatch(setDocumentTemplateAction(null));
            dispatch(fetchDocumentTemplateAction());
        } catch (error) {
            message.error(getErrorMessage(error));
        } finally {
            setConfirmLoading(false);
        }
      }

      const steps = [
        {
          title: t('instruction'),
          content: () => {
              return (
                <div>
                    <video loop style={videlStyle} src={example} autoPlay></video>
                </div>
              );
          },
        },
        {
          title: t('template'),
          content: () => {
            return (
                <Upload.Dragger {...props} style={uploadFileStyle}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">{t('load_drop_file')}</p>
                </Upload.Dragger>
            );
        },
        },
        {
          title: t('variables'),
          content: () => {
            return (
                <Form
                    onFinish={handleSubmitForm}
                    autoComplete="off"
                    style={{
                        marginTop: '15px',
                        marginBottom: '5px'
                    }}
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                    modifier: 'public',
                    }}
                >
                    <Row justify='space-between'>
                        <Col span={11}>
                            <Form.Item
                            name="name"
                            label={t('title')}
                            rules={[
                                {
                                    required: true,
                                    message: t('required', {field: t('title')})
                                },
                                {
                                    min: 2,
                                    max: 255,
                                    message: t('check_range', {field: t('title'), min: 2, max: 255})
                                }
                            ]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                        <Form.Item
                        name="version"
                        label={t('version')}
                        rules={[
                            {
                            required: true,
                            message: t('required', {field: t('version')})
                            },
                            {
                            min: 2,
                            max: 255,
                            message: t('check_range', {field: t('version'), min: 2, max: 255})
                            }
                        ]}
                        >
                        <Input />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Divider>{t('variables')}</Divider>
                    <Form.List name="variables">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('title')}
                                        {...restField}
                                        name={[name, 'name']}
                                        fieldKey={[fieldKey, 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message: t('required', {field: t('title')})
                                            },
                                            {
                                                min: 2,
                                                max: 255,
                                                message: t('check_range', {field: t('title'), min: 2, max: 255})
                                            }
                                        ]}
                                        style={{marginRight: '30px'}}
                                        required
                                    >
                                        <Input />
                                    </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Form.Item
                                            label={t('key')}
                                            {...restField}
                                            name={[name, 'key']}
                                            fieldKey={[fieldKey, 'key']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('required', {field: t('key')})
                                                },
                                                {
                                                    min: 2,
                                                    max: 255,
                                                    message: t('check_range', {field: t('key'), min: 2, max: 255})
                                                }
                                            ]}
                                            style={{marginRight: '5px'}}
                                            required
                                        >
                                        <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col style={{paddingTop: '15px'}}>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Col>
                                    <Col span={23}>
                                        <Form.Item
                                            label={t('description')}
                                            {...restField}
                                            name={[name, 'description']}
                                            fieldKey={[fieldKey, 'description']}
                                        >
                                        <Input.TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                            </Row>
                            ))}
                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                {t('add_variable')}
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
            </Form>
            );
        },
        },
      ];

    return (
        <Modal
            width='800px'
            confirmLoading={confirmLoading}
            visible={visible}
            title={t('document_templates:create_form')}
            onCancel={onCloseModal}
            footer={null}
        >
            <Steps current={current}>
                {steps.map(item => (
                    <Steps.Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content" style={{marginBottom: '15px'}}>
                {steps[current].content()}
            </div>
            <Row justify='end'>
                <Col>
                    {current < steps.length - 1 && (current === 1 ? (
                        <Button disabled={!filePath} type="primary" onClick={() => next()}>
                            {t('next')}
                        </Button>
                    ) : (
                        <Button type="primary" onClick={() => next()}>
                            {t('next')}
                        </Button>
                    ))}
                    {current === steps.length - 1 && (
                        <Button loading={confirmLoading} type="primary" onClick={() => form.submit()}>
                        {t('save_btn')}
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        {t('prev')}
                        </Button>
                    )}
                </Col>
            </Row>
    </Modal>
    );
}

const CreatedFormTemplate = () => {
    const [visible, setVisible] = useState(false);
    
    return (
        <>  
            <PlusOutlined onClick={() => setVisible(true)} style={{fontSize: '20px', cursor: 'pointer'}}/>
            <ModalCreateFormTemplate
                visible={visible}
                onCancel={() => setVisible(false)}
            />
        </>
    );
}

export default CreatedFormTemplate;