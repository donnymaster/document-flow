import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
    const { t } = useTranslation();

    return (
        <Result
            status='403'
            title='403'
            subTitle={t('not_authorized')}
            extra={<Link to='/'><Button type="primary">{t('back_home')}</Button></Link>}
        />
    );
}

export default ForbiddenPage;
