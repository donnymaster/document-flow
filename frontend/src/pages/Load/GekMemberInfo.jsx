import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Row, Col, Space, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchInfoGekAction, setInfoGekAction } from 'store/reducers/infoGekReducer';
import Spinner from 'components/Spinner/Spinner';
import CreateGekInfoModal from './CreateGekInfoModal';

const getColumns = t => ([
    {
        title: t('group'),
        dataIndex: 'group',
    },
    {
        title: t('text'),
        dataIndex: 'value',
    },
    {
        title: t('user'),
        render: (record) => `${record.user.name} ${record.user.surname} ${record.user.patronymic}`,
    }
])

const GekMemberInfo = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const infoGek = useSelector(store => store.infoGek?.data);
    const pagination = useSelector(store => store.infoGek?.pagination);

    useEffect(() => {
        dispatch(fetchInfoGekAction());

        return () => {
            dispatch(setInfoGekAction(null));
        };
    }, [dispatch]);

    if  (!infoGek) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    return (
        <Row>
        <Space direction='vertical' style={{width: '100%'}}>
          <Col>
            <Row align='middle'>
              <Space size='small'>
                <Col>
                  <Typography.Title level={3}>
                    {t('gek_info')}
                  </Typography.Title>
                </Col>
                <Col><CreateGekInfoModal /></Col>
              </Space>
            </Row>
          </Col>
          <Col>
            <Table
              columns={getColumns(t)}
              rowKey={record => record.id}
              dataSource={infoGek}
              pagination={pagination}
            //   onChange={handleTableChange}
            />
          </Col>
        </Space>
      </Row>
    );
}

export default GekMemberInfo;