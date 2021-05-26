import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Result
            status='404'
            title='404'
            subTitle={t('not_found')}
            extra={<Link to='/'><Button type="primary">{t('back_home')}</Button></Link>}
        />
    );
}

export default NotFound;