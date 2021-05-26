import { Typography, Row, Col, Space, Table, Tag, Tooltip  } from 'antd';
import { fetchUsersAction, setUsersAction } from 'store/reducers/UsersReducer';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParams } from 'utils/helpers';
import CreateUserForm from './CreateUserForm';
import { useEffect } from 'react';

import style from './style.module.css';

const EditLink = ({id}) => <Link to={`/users/${id}`}><EditOutlined /></Link>;

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
        title: t('users:email'),
        dataIndex: 'email',
    },
    {
        title: t('users:phone_number'),
        render: (record) => record.phone_number ?? '-',
    },
    {
        title: t('users:roles'),
        render: (record) => {
            
            if (!record.roles.length) {
                return '-';
            }

            if (record.roles.length === 1) {
                return record.roles.map(item => (
                    <Tag key={item.id}>{item.title}</Tag>
                ));
            }
            const [first, ...roles] = record.roles;
            const rolesString = roles.reduce((val, role) => `${val}${val !== '' ? ';': '' } ${role.title}`, '');
            return (
                <>
                    <Tag>{first.title}</Tag>
                    <Tooltip title={
                        <>
                            <p>1)test</p>
                            <p>2)test1</p>
                            <p>3)test</p>
                            <p>4)test1</p>
                        </>
                    } color='geekblue'>
                        <Tag style={{cursor: 'pointer'}}>...</Tag>
                    </Tooltip>
                </>
            );
        },
    },
    {
        title: t('action'),
        render: record => <EditLink id={record.id} />,
        width: '10%',
        align: 'center',
    }
]);

const UsersPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const users = useSelector(store => store.usersData?.users);
    const pagination = useSelector(store => store.usersData?.pagination);

    useEffect(() => {
        dispatch(fetchUsersAction());
        
        return () => {
          dispatch(setUsersAction({users: null, pagination: null}));
        };
      }, [dispatch]);


    const handleTableChange = (pagination, filters, sort) => {
        dispatch(setUsersAction({users: null, pagination: null}));
        dispatch(fetchUsersAction(getParams(pagination, sort)));
    }

    return (
        <Row>
            <Space direction='vertical' style={{width: '100%'}}>
                <Col>
                <Row align='middle' justify='space-between'>
                    <Col>
                        <Typography.Title level={3}>
                        {t('page_users')}
                        </Typography.Title>
                    </Col>
                    <Col>
                        <Space>
                            <CreateUserForm />
                        </Space>
                    </Col>
                </Row>
                </Col>
                <Col>
                <Table
                    rowClassName={(record) => !!record.roles.length ? style.light : style.dark}
                    columns={getColumns(t)}
                    rowKey={record => record.id}
                    dataSource={users}
                    pagination={pagination}
                    loading={!users}
                    onChange={handleTableChange}
                />
                </Col>
            </Space>
         </Row>
    );
}

export default UsersPage;