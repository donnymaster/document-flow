import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { rusToLatin, getErrorMessage } from 'utils/helpers';
import api from 'utils/Api';

const GekInfoModal = ({visible, onCancel}) => {
  const { t } = useTranslation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <Modal
      confirmLoading={confirmLoading}
      visible={visible}
      title={t('gek_form')}
      okText={t('create_btn')}
      cancelText={t('cancel_btn')}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            try {
              setConfirmLoading(true);
              await api.post('info-gek', values);
              message.success(t('gek_form_created'));
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
          name="group"
          label={t('group')}
          rules={[
            {
              required: true,
              message: t('required', {field: t('group')})
            },
            {
              min: 2,
              max: 255,
              message: t('check_range', {field: t('group'), min: 2, max: 255})
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="value"
          label={t('text')}
          rules={[
            {
              required: true,
              message: t('required', {field: t('key')})
            },
            {
              min: 2,
              message: t('check_range', {field: t('key'), min: 2})
            }
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const CreateGekInfoModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <PlusOutlined onClick={() => setVisible(true)} style={{fontSize: '20px', cursor: 'pointer'}}/>
      <GekInfoModal
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}

export default CreateGekInfoModal;