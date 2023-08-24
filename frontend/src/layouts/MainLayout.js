import { useState } from 'react';
import { Layout, Menu, Avatar, Space, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import ChangeLanguage from '../components/ChangeLanguage/ChangeLocale';
import Logout from 'components/Logout/Logout';
import { links, getMenuLinks } from '../routes';

import logo from '../assets/logo.png';
import style from './app.module.css';

const { Header, Content, Sider } = Layout;

const MainLayout = (props) => {
  const { t } = useTranslation();
  const isLoadingApp = useSelector(store => store.app.isLoading);
  const [collapsed, setCollapsed] = useState(false);

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
        <Space direction="vertical" align="center" className={style.logo}>
          <Avatar size={44} shape="square" src={logo} />
        </Space>
        <Menu theme="light" mode="inline">
          {getMenuLinks(links, t)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={style.header}>
          <Row>
            <Col span={1}>
              {isLoadingApp ? (
                <LoadingOutlined style={{ fontSize: 30, color: '#1890ff' }} spin />
              ) : null}
            </Col>
            <Col span={23}>
              <Row justify="end" align="middle">
                <Col>
                  <ChangeLanguage />
                </Col>
                <Col style={{marginLeft: '10px'}}>
                  <Logout />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content className={style.content}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
