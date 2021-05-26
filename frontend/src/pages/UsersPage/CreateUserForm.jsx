import { useState } from 'react';
import { Button, Modal, Form, Input, Row, Col, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from 'utils/helpers';
import api from 'utils/Api';

const ModalCreateUser = ({visible, onCancel}) => {
    const { t } = useTranslation();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
  
    const rules = {
      name: [
          {
              required: true,
              message: t('required', {field: t('users:name')})
          },
          {
              min: 3,
              max: 255,
              message: t('check_range', {field: t('users:name'), min: 3, max: 255})
          }
      ],
      surname: [
          {
              required: true,
              message: t('required', {field: t('users:surname')})
          },
          {
              min: 3,
              max: 255,
              message: t('check_range', {field: t('users:surname'), min: 3, max: 255})
          }
      ],
      patronymic: [
          {
              required: true,
              message: t('required', {field: t('users:patronymic')})
          },
          {
              min: 3,
              max: 255,
              message: t('check_range', {field: t('users:patronymic'), min: 3, max: 255})
          }
      ],
      email: [
          {
              required: true,
              message: t('required', {field: t('users:email')})
          },
          {
              type: 'email',
              message: t('check_email')
          }
      ],
      // phone_number: [
      //     {
      //         required: true,
      //         message: t('required', {field: t('users:phone_number')})
      //     },
      // ]
  };

    return (
      <Modal
        confirmLoading={confirmLoading}
        visible={visible}
        title={t('roles:create_form')}
        okText={t('create_btn')}
        cancelText={t('cancel_btn')}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              try {
                setConfirmLoading(true);
                await api.post('users', values);
                message.success(t('user_created'));
                form.resetFields();
              } catch (error) {
                message.error(getErrorMessage(error));
              } finally {
                setConfirmLoading(false);
              }
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item rules={rules.name} name='name' label={t('users:name')}>
                        <Input />
          </Form.Item>
          <Form.Item rules={rules.surname} name='surname' label={t('users:surname')}>
              <Input />
          </Form.Item>
          <Form.Item rules={rules.patronymic} name='patronymic' label={t('users:patronymic')}>
              <Input />
          </Form.Item>
          <Form.Item rules={rules.email} name='email' label={t('users:email')}>
              <Input />
          </Form.Item>
          <Form.Item name='phone_number' label={t('users:phone_number')}>
              <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
}

const CreateUserForm = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible(!visible)} type="primary">{t('create_btn')}</Button>
            <ModalCreateUser
                visible={visible}
                onCancel={() => setVisible(false)}
            />
        </>
    );
}

export default CreateUserForm;