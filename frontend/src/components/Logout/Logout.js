import { Avatar, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { logout } from 'utils/helpers';
import { setIsLoginUserAction, setUserPermisionsAction } from 'store/reducers/AppReducer';

import logoutLogo from 'assets/logout.png';

const Logout = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleCLickLogout = () => {
        Modal.confirm({
            ttile: t('logout_question'),
            content: t('logout_question'),
            icon: <ExclamationCircleOutlined />,
            okText: t('yes'),
            cancelText: t('cancel_btn'),
            onOk: () => {
                logout();
                dispatch(setIsLoginUserAction(false));
                dispatch(setUserPermisionsAction(null));
            },
        });
    }

    return (
        <Avatar
            style={{cursor: 'pointer'}}
            size={23} src={logoutLogo}
            onClick={handleCLickLogout}
        />
    );
}

export default Logout;