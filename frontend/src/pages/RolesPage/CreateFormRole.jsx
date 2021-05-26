import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { rusToLatin, getErrorMessage } from 'utils/helpers';
import api from 'utils/Api';

const ModalCreateRole = ({visible, onCancel}) => {
  const { t } = useTranslation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

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
              await api.post('roles', values);
              message.success(t('roles:role_created'));
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
        <Form.Item
          getValueFromEvent={(event) => {
            form.setFieldsValue({ name: rusToLatin(event.target.value) });
            return event.target.value;
          }}
          name="title"
          label={t('title')}
          rules={[
            {
              required: true,
              message: t('required', {field: t('title')})
            },
            {
              min: 2,
              max: 255,
              message: t('check_range', {field: t('title'), min: 2, max: 255})
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label={t('key')}
          rules={[
            {
              required: true,
              message: t('required', {field: t('key')})
            },
            {
              min: 2,
              max: 255,
              message: t('check_range', {field: t('key'), min: 2, max: 255})
            }
          ]}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const CreateFormRole = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <PlusOutlined onClick={() => setVisible(true)} style={{fontSize: '20px', cursor: 'pointer'}}/>
      <ModalCreateRole
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default CreateFormRole;