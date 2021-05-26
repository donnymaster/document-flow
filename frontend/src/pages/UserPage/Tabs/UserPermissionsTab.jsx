import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Space, Table, Switch, message } from 'antd';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { useTranslation } from 'react-i18next';
import api from 'utils/Api';
import Spinner from 'components/Spinner/Spinner';

const SwitchPermission = ({name, userPer, userId, perNotId}) => {
    const dispatch = useDispatch();
    const isActive = userPer.find((item) => item.name === name);
    const [disabled, setDisabled] = useState(false);
    const [active, setActive] = useState(!!isActive);

    const onChangeActive = async () => {
        const url = `users/${userId}/${active ? 'revoke' : 'assign'}/permission/${perNotId}`;
        setActive(!active);
        let messageResult = '';
        try {
            setDisabled(true);
            messageResult = await api.get(url);
            message.success(messageResult.message);
        } catch (error) {
            dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
        }
        setDisabled(false);
    }
    
    return (
        <Switch onClick={onChangeActive} disabled={disabled} checked={active}/>
    );
}

const getColumns = (t, userPermissions, userId) => ([
    {
        title: t('title'),
        dataIndex: 'title',
    },
    {
        title: t('action'),
        render: (record) => <SwitchPermission perNotId={record.id} name={record.name} userPer={userPermissions} userId={userId} />,
        width: '10%',
        align: 'center',
    }
]);


const UserPermissionsTab = ({user}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [userPermissions, setUserPermissions] = useState(null);
    const [userNotPermissions, setUserNotPermissions] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPermissions = await api.get(`users/${user.id}/permissions`);
                const userNotPer = await api.get(`/users/${user.id}/without-permissions`);

                setUserPermissions(userPermissions.data);
                setUserNotPermissions(userNotPer.data);

                setPagination({
                    current: userNotPer.meta.current_page,
                    pageSize: userNotPer.meta.per_page,
                    total: userNotPer.meta.total,
                });
            } catch (error) {
                dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
            }
        };

        fetchData();
    }, [user, dispatch]);

    if  (!userPermissions && !userNotPermissions) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    return (
        <Row>
          <Space direction='vertical' style={{width: '100%'}}>
            <Col>
              <Table
                columns={getColumns(t, userPermissions ?? [], user.id)}
                rowKey={record => record.id}
                dataSource={userNotPermissions}
                pagination={{...pagination, showSizeChanger: false}}
                loading={!userNotPermissions}
                // onChange={handleTableChange}
              />
            </Col>
          </Space>
        </Row>
      );
}

export default UserPermissionsTab;