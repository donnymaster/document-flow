import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

const CustomForm = ({
    children,
    getForm,
    ...props
}) => {
    const [form] = Form.useForm();
    const { i18n } = useTranslation();

    i18n.on('languageChanged', () => form.validateFields());
    getForm(form);

    return (
        <Form form={form} {...props}> 
            {children}
        </Form>
    );
}

CustomForm.defaultProps = {
    getForm: () => {},
};

export default CustomForm;