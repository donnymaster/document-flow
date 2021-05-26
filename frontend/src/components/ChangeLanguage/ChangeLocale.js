import { useState } from 'react';
import { Avatar, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalChangeLanguage from './ModalChangeLanguage';

import langImg from '../../assets/language.png';
import style from './style.module.css';


const ChangeLanguage = () => {
    const { t } = useTranslation();
    const [ isVisibleModal, setIsVisibleModal ] = useState(false);

    return (
        <>
            <Tooltip
                className={style.cursor}
                color="green" placement="bottom"
                title={t('change_lang')}
                onClick={() => setIsVisibleModal(!isVisibleModal)}
            >
                <Avatar src={langImg} size={23}/>
            </Tooltip>
            <ModalChangeLanguage isModalVisible={isVisibleModal} handleCloseModal={setIsVisibleModal} />
        </>
    );
}

export default ChangeLanguage;