// import {
//   Form,
//   Input,
//   Button,
//   Row,
//   Col,
//   Avatar,
// } from 'antd';
// import { LockOutlined, MailFilled } from '@ant-design/icons';
// import { useTranslation } from 'react-i18next';

// import logo from '../../assets/logo.png';
// import style from './style.module.css';
// import ChangeLanguage from '../../components/ChangeLanguage/ChangeLocale';


// const LoginPage = () => {
//   const { t, i18n } = useTranslation();
//   const [form] = Form.useForm();
//   const onFinish = (values) => console.log('Success:', values);

//   i18n.on('languageChanged', () => form.validateFields());

//   const rules = {
//     email: [
//       {
//         required: true,
//         message: t('required', {field: t('email')})
//       },
//       {
//         type: 'email',
//         message: t('check_email')
//       }
//     ],
//     password: [
//       {
//         required: true,
//         message: t('required', {field: t('password')})
//       },
//       {
//         min: 6,
//         max: 25,
//         message: t('check_range', {field: t('password'), min: 6, max: 25})
//       }
//     ]
//   };

//     return (
//       <>
//         <Row justify='end' className={style.lang}>
//           <button onClick={() => form.submit()}>submit</button>
//           <ChangeLanguage />
//         </Row>
//         <Row justify="center" align="middle" className={style.wrapped}>
//           <Col span={8}>
//             <Row justify="center" className={style.logo}>
//               <Avatar shape="square" size={64} src={logo} />
//             </Row>
//             <Form
//               form={form}
//               name="login"
//               onFinish={onFinish}
//             >
//               <Form.Item
//                 name="email"
//                 rules={rules.email}
//               >
//                 <Input
//                   prefix={<MailFilled className="site-form-item-icon" />}
//                   type='email'
//                   placeholder={t('email')}
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="password"
//                 rules={rules.password}
//               >
//                 <Input
//                   prefix={<LockOutlined className="site-form-item-icon" />}
//                   type="password"
//                   placeholder={t('password')}
//                 />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit" className={style.button}>
//                   {t('login')}
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Col>
//         </Row>
//       </>
//     );
// }

// export default LoginPage;