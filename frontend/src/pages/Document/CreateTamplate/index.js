import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Space, Table, Tag, Form, Input, Modal, message, Select } from 'antd';
import { ExportOutlined, PlusOutlined, DownloadOutlined, PlusCircleOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { fetchCreatedDocumentAction, setCreatedDocumentAction, setPaginationAction } from 'store/reducers/CreatedDocumentReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { Link } from 'react-router-dom';
import { getErrorMessage } from 'utils/helpers';
import api, { BACKEND_URL } from 'utils/Api';
import Spinner from 'components/Spinner/Spinner';


const getFile = path => {
    const [, file] = path.split('/');
    return file;
}

const getColumns = (t) => ([
    {
      title: t('id'),
      dataIndex: 'id',
      width: '2%',
    },
    {
        title: t('title'),
        dataIndex: 'name',
    },
    {
      title: t('template'),
      render: (record) => record.template.name,
    },
    {
      title: t('document_full'),
      render: (record) => record.cached ? (
        <Tag color='#108ee9'><PlusOutlined /></Tag>
       ) : (
        <>
            <Space>
                <Link target='_blank' to={`/documents/create/${record.id}`}><Tag><ExportOutlined /></Tag></Link>
            </Space>
        </>
       ),
      align: 'center'
    },
    {
      title: t('action'),
      render: record => {
        return (
           <>
                {record.cached ? (
                    <Link to={{ pathname: `${BACKEND_URL}/file/download/${getFile(record.cached_path)}`}} target="_blank">
                        <DownloadOutlined 
                            style={{
                                fontSize: '18px',
                                cursor: `${record.cached ? 'pointer' : 'not-allowed'}`,
                                marginRight: '5px',
                                color: `${record.cached ? 'black' : 'grey'}`
                            }}
                        />
                    </Link>
                ) : (
                    <DownloadOutlined 
                        style={{
                            fontSize: '18px',
                            cursor: `${record.cached ? 'pointer' : 'not-allowed'}`,
                            marginRight: '5px',
                            color: `${record.cached ? 'black' : 'grey'}`
                        }}
                    />
                )}
            {/* <DeleteOutlined  style={{fontSize: '18px', cursor: 'pointer'}} /> */}
           </>
        );
      },
      width: '10%',
      align: 'center',
    }
  ]);

const ModalCreateDocument = ({visible, onCancel}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [templates, setTemplates] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = async (val) => {
        try {
            const {data} = await api.get(`templates/load?q=${val}`);
            setTemplates(data);
        } catch (error) {
            
        }
    }

    const options = templates.map(d => <Select.Option value={d.id} key={d.id}>{d.name}</Select.Option>);

    return (
        <Modal
          confirmLoading={confirmLoading}
          visible={visible}
          title={t('name_form_create_document')}
          okText={t('create_btn')}
          cancelText={t('cancel_btn')}
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then(async (values) => {
                try {
                  setConfirmLoading(true);
                  await api.post('generated-documents', values);
                  message.success(t('document_created'));
                  form.resetFields();
                  onCancel();
                  dispatch(fetchCreatedDocumentAction());
                  dispatch(setCreatedDocumentAction(null));
                  dispatch(setPaginationAction(null));
                } catch (error) {
                  message.error(getErrorMessage(error));
                } finally {
                  setConfirmLoading(false);
                }
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
            {!templates ? (
                <Spinner size={52} title='load_data' />
            ): (
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
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
            <Form.Item
              name="template_id"
              label={t('template')}
              rules={[
                {
                  required: true,
                  message: t('required', {field: t('template')})
                }
              ]}
            >
                <Select
                    value={search}
                    showSearch
                    defaultActiveFirstOption
                    showArrow
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={(val) => setSearch(val)}
                    notFoundContent={t('empty_data')}
                >
                    {options}
                </Select>
            </Form.Item>
          </Form>
          )}
        </Modal>
      );
}   

const BtnCreateDocument = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
        <PlusCircleOutlined onClick={() => setVisible(true)} style={{fontSize: '20px', cursor: 'pointer'}} />
        <ModalCreateDocument 
            visible={visible}
            onCancel={() => setVisible(false)}
        />
        </>
    );
}

const CreateTemplatePage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const documents = useSelector(store => store.createdDocument?.data);
    const pagination = useSelector(store => store.createdDocument?.pagination);

    useEffect(() => {
        dispatch(fetchCreatedDocumentAction());
        
        return () => {
          dispatch(setCreatedDocumentAction(null)); 
        };
      }, [dispatch]);

      return (
        <Row>
          <Space direction='vertical' style={{width: '100%'}}>
            <Col>
              <Row align='middle'>
                <Space size='small'>
                  <Col>
                    <Typography.Title level={3}>
                      {t('sub_page_doc')}
                    </Typography.Title>
                  </Col>
                  <Col>
                    {/* <Link to='/documents/created' style={{fontSize: '24px', marginBottom: '5px',display: 'block'}}><PlusCircleOutlined /></Link> */}
                    <BtnCreateDocument />
                  </Col>
                </Space>
              </Row>
            </Col>
            <Col>
              <Table
                columns={getColumns(t)}
                rowKey={record => record.id}
                dataSource={documents ?? []}
                pagination={pagination}
                loading={!documents}
                // onChange={handleTableChange}
              />
            </Col>
          </Space>
        </Row>
      );
}

export default CreateTemplatePage;