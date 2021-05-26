import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Space, Table, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { 
    fetchDepartmentsAction,
    setDepartmentsAction,
    setPaginationAction
 } from 'store/reducers/DepartmentReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { Link } from 'react-router-dom';
import { getParams } from 'utils/helpers';
import api from 'utils/Api';

const getColumns = t => ([
    {
        title: t('title'),
        dataIndex: 'name',
    },
    {
        title: t('short_name'),
        render: (record) => record.short_name ?? '-',
    },
    {
        title: t('faculty'),
        render: (record) => record.name,
    },
]);


const DepartmentsPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const departments = useSelector(store => store.departments?.data);
    const pagination = useSelector(store => store.departments?.pagination);

    useEffect(() => {
        dispatch(fetchDepartmentsAction());
        
        return () => {
          dispatch(setDepartmentsAction(null));
          dispatch(setPaginationAction(null));
        };
      }, [dispatch]);

      return (
        <Row>
            <Space direction='vertical' style={{width: '100%'}}>
                <Col>
                <Row align='middle' justify='space-between'>
                    <Col>
                        <Typography.Title level={3}>
                        {t('page_load_departments')}
                        </Typography.Title>
                    </Col>
                </Row>
                </Col>
                <Col>
                <Table
                    columns={getColumns(t)}
                    rowKey={record => record.id}
                    dataSource={departments}
                    pagination={pagination}
                    // onChange={handleTableChange}
                />
                </Col>
            </Space>
        </Row>
    );
}

export default DepartmentsPage;