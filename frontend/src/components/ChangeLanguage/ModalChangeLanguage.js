import { Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import style from './style.module.css';

const { Option } = Select;

const ModalChangeLanguage = ({isModalVisible, handleCloseModal}) => {
    const { t, i18n } = useTranslation();

    const handleChangeLang = (lang) => {
        i18n.changeLanguage(lang);
        handleCloseModal(false);
    }

    return (
        <div>
            <Modal
                title={t('lang_info')}
                visible={isModalVisible}
                onCancel={() => handleCloseModal(false)}
                footer={null}
            >
            <Select
                placeholder={t('lang')}
                onChange={handleChangeLang}
                className={style.select}
                defaultValue={i18n.language}
            >
                <Option value="uk">{t('lang_uk')}</Option>
                <Option value="ru">{t('lang_ru')}</Option>
            </Select>
            </Modal>
        </div>
    );
}

export default ModalChangeLanguage;