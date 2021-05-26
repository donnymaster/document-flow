import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Space, Table, Switch, message } from 'antd';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { useTranslation } from 'react-i18next';
import { getParams } from 'utils/helpers';
import api from 'utils/Api';
import { useParams } from "react-router-dom";
import Spinner from 'components/Spinner/Spinner';

const SwitchRoleUser = ({userRoles, userId, roleName, roleId}) => {
    const dispatch = useDispatch();
    const isActive = userRoles.find((item) => item.name === roleName);
    const [disabled, setDisabled] = useState(false);
    const [active, setActive] = useState(!!isActive);
    
    const onChangeActive = async () => {
        const url = `users/${userId}/${active ? 'revoke' : 'assign'}/role/${roleId}`;
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


const getColumns = (t, userRoles, userId) => ([
    {
        title: t('title'),
        dataIndex: 'title',
    },
    {
        title: t('key'),
        dataIndex: 'name',
    },
    {
        title: t('action'),
        render: (record) => {
            return <SwitchRoleUser userRoles={userRoles} userId={userId} roleName={record.name} roleId={record.id} />;
        },
        width: '10%',
        align: 'center',
    }
]);

const UserRoleTab = ({user}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [pagination, setPagination] = useState(null);
    const [roles, setRoles] = useState(null);

    const [userRoles, setUserRoles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRoles = await api.get(`/users/${user.id}/roles`);
                const roles = await api.get('roles');

                setUserRoles(userRoles.data);

                setRoles(roles.data);
                setPagination({
                    current: roles.meta.current_page,
                    pageSize: roles.meta.per_page,
                    total: roles.meta.total,
                });
            } catch (error) {
                dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
            }
        };

        fetchData();
    }, [user, dispatch]);


    if (!roles && !userRoles) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    return (
        <Row>
            <Col span={24}>
              <Table
                columns={getColumns(t, userRoles, user.id)}
                rowKey={record => record.id}
                dataSource={roles}
                pagination={{...pagination, showSizeChanger: false}}
                loading={!roles}
                // onChange={handleTableChange}
              />
            </Col>
        </Row>
      );
}

export default UserRoleTab;