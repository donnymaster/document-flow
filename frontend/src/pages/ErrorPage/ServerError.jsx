import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

const ServerError = () => {
    const { t } = useTranslation();

    return (
        <Result
            status='500'
            subTitle={t('server_error')}
        />
    );
}

export default ServerError;