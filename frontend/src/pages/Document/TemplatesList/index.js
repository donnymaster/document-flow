import { Typography, Row, Col, Space, Table, Tag, Button  } from 'antd';
import { fetchDocumentTemplateAction, setDocumentTemplateAction } from 'store/reducers/DocumentTemplateReducer';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import CreatedFormTemplate from './CreatedFormTemplate';
import { Link } from 'react-router-dom';
import { getParams } from 'utils/helpers';
import { useEffect } from 'react';

const getColumns = t => ([
    {
        title: t('title'),
        dataIndex: 'name',
    },
    {
        title: t('version'),
        dataIndex: 'version',
    },
    {
        title: t('column_created'),
        dataIndex: 'created_at',
        width: '15%',
        sorter: {
          multiple: 1,
        },
    },
    {
        title: t('column_updated'),
        dataIndex: 'updated_at',
        width: '15%',
        sorter: {
          multiple: 1,
        },
    },
])

const TemplatesListPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const templates = useSelector(store => store.documentTemplate?.data);
    const pagination = useSelector(store => store.documentTemplate?.pagination);

    useEffect(() => {
        dispatch(fetchDocumentTemplateAction());

        return () => {
            dispatch(setDocumentTemplateAction(null));
        };
    }, [dispatch]);

    return (
        <Row>
            <Space direction='vertical' style={{width: '100%'}}>
                <Col>
                <Row align='middle'>
                    <Space>
                        <Col>
                            <Typography.Title level={3}>
                            {t('page_template_doc')}
                            </Typography.Title>
                        </Col>
                        <Col><CreatedFormTemplate /></Col>
                    </Space>
                </Row>
                </Col>
                <Col>
                <Table
                    columns={getColumns(t)}
                    rowKey={record => record.id}
                    dataSource={templates}
                    pagination={pagination}
                    loading={!templates}
                    // onChange={handleTableChange}
                />
                </Col>
            </Space>
            </Row>
    );
}

export default TemplatesListPage;