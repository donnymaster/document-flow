import { Row, Col, Form, Input, Button, message } from 'antd';
import CustomForm from 'components/CustomForm';
import { useState } from 'react';
import api from 'utils/Api';
import { useTranslation } from 'react-i18next';

const UpdateInfoUserTab = ({user}) => {
    const { t } = useTranslation();
    const [disableBtn, disableBtnSet] = useState(false);

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

    const onFinish = async (values) => {
        disableBtnSet(true);
        try {
            await api.put(`users/${user.id}`, values);
            message.success(t('updated_user'));
        } catch (error) {
            
        }

        disableBtnSet(false);
    }

    return (
        <Row justify='center'>
            <Col span={12}>
                <CustomForm
                    layout='vertical'
                    initialValues={{...user}}
                    onFinish={onFinish}
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
                    <Row justify='center'>
                        <Col>
                            <Form.Item>
                                <Button disabled={disableBtn} htmlType="submit" type="primary">{t('save_btn')}</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </CustomForm>
            </Col>
        </Row>
    );
}

export default UpdateInfoUserTab;