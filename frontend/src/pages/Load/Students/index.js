import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Space, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchStudentsAction, setStudentsAction, setPaginationAction } from 'store/reducers/StudentsReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { Link } from 'react-router-dom';
import { getParams } from 'utils/helpers';
import api from 'utils/Api';

const getColumns = t => ([
    {
        title: t('users:name'),
        dataIndex: 'name',
    },
    {
        title: t('users:surname'),
        dataIndex: 'surname',
    },
    {
        title: t('users:patronymic'),
        dataIndex: 'patronymic',
    },
   {
       title: t('department'),
       render: record => record.department_group.name,
   },
   {
    title: t('action'),
    render: (record) => <DeleteOutlined />,
    width: '10%',
    align: 'center',
  }
]);

const LoadStudentsPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const students = useSelector(store => store.students?.data);
    const pagination = useSelector(store => store.students?.pagination);

    useEffect(() => {
        dispatch(fetchStudentsAction());
        dispatch(setPaginationAction(null));

        return () => {
            dispatch(setStudentsAction(null));
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
                    {t('page_load_student')}
                  </Typography.Title>
                </Col>
                {/* <Col><CreateFormRole /></Col> */}
              </Space>
            </Row>
          </Col>
          <Col>
            <Table
              columns={getColumns(t)}
              rowKey={record => record.id}
              dataSource={students}
              pagination={pagination}
            //   onChange={handleTableChange}
            />
          </Col>
        </Space>
      </Row>
    );
}

export default LoadStudentsPage;