import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Avatar,
  } from 'antd';
import CustomForm from 'components/CustomForm';
import { LockOutlined, MailFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction, setIsLoadingBtnAction } from 'store/reducers/AppReducer';
import ChangeLanguage from 'components/ChangeLanguage/ChangeLocale';
import { Redirect } from 'react-router-dom';

import logo from 'assets/logo.png';
import style from './style.module.css';
  
  const LoginPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.app.isLoadingBtnLogin);
    const isLogin = useSelector((state) => state.app.isLoginUser);

    if (isLogin) {
      return <Redirect to='/' />
    }

    const onFinish = (values) => {
      dispatch(setIsLoadingBtnAction(true));
      dispatch(fetchUserAction(values));
    };

    const rules = {
      email: [
        {
          required: true,
          message: t('required', {field: t('email')})
        },
        {
          type: 'email',
          message: t('check_email')
        }
      ],
      password: [
        {
          required: true,
          message: t('required', {field: t('password')})
        },
        {
          min: 6,
          max: 25,
          message: t('check_range', {field: t('password'), min: 6, max: 25})
        }
      ]
    };
  
      return (
        <>
          <Row justify='end' className={style.lang}>
            <ChangeLanguage />
          </Row>
          <Row justify="center" align="middle" className={style.wrapped}>
            <Col span={8}>
              <Row justify="center" className={style.logo}>
                <Avatar shape="square" size={64} src={logo} />
              </Row>
              <CustomForm
                name="login"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={rules.email}
                >
                  <Input
                    prefix={<MailFilled className="site-form-item-icon" />}
                    type='email'
                    placeholder={t('email')}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={rules.password}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder={t('password')}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={isLoading} type="primary" htmlType="submit" className={style.button}>
                    {t('login')}
                  </Button>
                </Form.Item>
              </CustomForm>
            </Col>
          </Row>
        </>
      );
  }
  
  export default LoginPage;