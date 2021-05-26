import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Space, Table, Switch, Breadcrumb, message } from 'antd';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { useTranslation } from 'react-i18next';
import { getParams } from 'utils/helpers';
import api from 'utils/Api';
import { Link, useParams } from "react-router-dom";
import Spinner from 'components/Spinner/Spinner';


const SwitchRolePermission = ({name, rolePer, roleId, perId}) => {
    const dispatch = useDispatch();
    const isActive = rolePer.find((item) => item.name === name);
    const [disabled, setDisabled] = useState(false);
    const [active, setActive] = useState(!!isActive);
    
    const onChangeActive = async () => {
        const url = `roles/${roleId}/${active ? 'revoke' : 'assign'}/permission/${perId}`;
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

const getColumns = (t, rolePermissions, roleId) => ([
    {
        title: t('title'),
        dataIndex: 'title',
    },
    {
        title: t('action'),
        render: (record) => <SwitchRolePermission perId={record.id} name={record.name} rolePer={rolePermissions} roleId={roleId} />,
        width: '10%',
        align: 'center',
    }
]);

const RolePage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadRole = await api.get(`roles/${id}`);
                const loadPermissions = await api.get('permissions');
                setRole(loadRole);
                setPermissions(loadPermissions.data);
                setPagination({
                    current: loadPermissions.meta.current_page,
                    pageSize: loadPermissions.meta.per_page,
                    total: loadPermissions.meta.total,
                });
            } catch (error) {
                dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
            }
        };

        fetchData();
    }, [id, dispatch]);

    if  (!role && !permissions) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    const handleTableChange = async (pagination, filters, sort) => {
        setPermissions(null);
        try {
            const url = `permissions${getParams(pagination, sort)}`;
            const data = await api.get(url);
            setPermissions(data.data);
            setPagination({
                current: data.meta.current_page,
                pageSize: data.meta.per_page,
                total: data.meta.total,
            });
        } catch (error) {
            dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
        }
    }

    return (
        <Row>
          <Space direction='vertical' style={{width: '100%'}}>
            <Col>
              <Row align='middle'>
              <Breadcrumb style={{fontSize: '16px', marginBottom: '10px'}}>
                <Breadcrumb.Item>
                    <Link to='/roles'>{t('page_roles')}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {t('setting_roles' , {role: role.title})}
                </Breadcrumb.Item>
            </Breadcrumb>
              </Row>
            </Col>
            <Col>
              <Table
                columns={getColumns(t, role.permissons ?? [], role?.id)}
                rowKey={record => record.id}
                dataSource={permissions}
                pagination={{...pagination, showSizeChanger: false}}
                loading={!permissions}
                onChange={handleTableChange}
              />
            </Col>
          </Space>
        </Row>
      );
}

export default RolePage;