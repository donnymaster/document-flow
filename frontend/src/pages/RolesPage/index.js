import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Space, Table, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CreateFormRole from './CreateFormRole';
import { fetchRolesAction, updateRoleAction, setRolesAction } from 'store/reducers/RolesReducer';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { Link } from 'react-router-dom';
import { getParams } from 'utils/helpers';
import api from 'utils/Api';

const EditLink = ({id}) => <Link to={`/roles/${id}`}><EditOutlined /></Link>;

const EditTitle = ({title, id, t}) => {
  const dispatch = useDispatch();
  const [disableEdit, setDisableEdit] = useState(false);

  const handleChangeTitle = async (title) => {
    setDisableEdit(true);
    try {
      const data = await api.put(`roles/${id}`, {title});
      dispatch(updateRoleAction(data));
      message.success(t('roles:role_update'));
    } catch (error) {
      dispatch(setErrorAction({hasError: true, code: error.code ?? 500}));
    } finally {
      setDisableEdit(false);
    }
  }

  return(
    <Typography.Paragraph
      disabled={disableEdit}
      editable={{ onChange: (title) => !disableEdit ? handleChangeTitle(title) : null}}
    >
      {title}
    </Typography.Paragraph>
  );
}

const getColumns = (t) => ([
  {
    title: t('roles:column_title'),
    render: role => <EditTitle t={t} id={role.id} title={role.title} />
  },
  {
    title: t('roles:column_created'),
    dataIndex: 'created_at',
    width: '15%',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: t('roles:column_updated'),
    dataIndex: 'updated_at',
    width: '15%',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: t('action'),
    render: role => <EditLink id={role.id} />,
    width: '10%',
    align: 'center',
  }
]);

const RolesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const roles = useSelector(store => store.role?.roles);
  const pagination = useSelector(store => store.role?.pagination);

  useEffect(() => {
    dispatch(fetchRolesAction());
    
    return () => {
      dispatch(setRolesAction({roles: null, pagination: null}));
    };
  }, [dispatch]);

  const handleTableChange = (pagination, filters, sort) => {
    dispatch(setRolesAction({roles: null, pagination: null}));
    dispatch(fetchRolesAction(getParams(pagination, sort)));
  }

  return (
    <Row>
      <Space direction='vertical' style={{width: '100%'}}>
        <Col>
          <Row align='middle'>
            <Space size='small'>
              <Col>
                <Typography.Title level={3}>
                  {t('page_roles')}
                </Typography.Title>
              </Col>
              <Col><CreateFormRole /></Col>
            </Space>
          </Row>
        </Col>
        <Col>
          <Table
            columns={getColumns(t)}
            rowKey={record => record.id}
            dataSource={roles}
            pagination={pagination}
            loading={!roles}
            onChange={handleTableChange}
          />
        </Col>
      </Space>
    </Row>
  );
}

export default RolesPage;
