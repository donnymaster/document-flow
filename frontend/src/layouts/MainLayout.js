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

          {/* <Menu.Item key="1" icon={<DesktopOutlined />}>
            <Link to='/'>{t('page_main')}</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to='/projects'>{t('page_projects')}</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<DesktopOutlined />} title={t('sub_page_load_data')}>
            <Menu.Item key="2">
              <Link to="/load/students">
                {t('page_load_student')}
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/load/teachers">
                {t('page_load_teacher')}
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/load/faculties">
                {t('page_load_faculties')}
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<DesktopOutlined />} title={t('sub_page_doc')}>
            <Menu.Item key="5">
              <Link to="/documents/created">
                {t('page_created_doc')}
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/documents/templates">
                {t('page_template_doc')}
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/documents/templates/create">
                {t('page_create_template_doc')}
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="8" icon={<DesktopOutlined />}>
            <Link to='/users'>{t('page_users')}</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<DesktopOutlined />}>
            <Link to='/roles'>{t('page_roles')}</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<DesktopOutlined />}>
            <Link to='/statistics'>{t('page_statistics')}</Link>
          </Menu.Item> */}
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