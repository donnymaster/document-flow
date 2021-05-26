import { Tabs } from 'antd';
import UserPermissionsTab from './Tabs/UserPermissionsTab';
import UpdateInfoUserTab from './Tabs/UpdateInfoUserTab';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Spinner from 'components/Spinner/Spinner';
import api from 'utils/Api';
import UserRoleTab from './Tabs/UserRoleTab';

const { TabPane } = Tabs;

const UserPage = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await api.get(`users/${id}`);
                setUser(user); 
            } catch (error) {
                
            }
        };
        fetchUser();
    }, [id]);

    if(!user) {
        return <Spinner size={52} isHeightMaxView title='load_data' />;
    }

    return (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab={t('tab_user_info')} key="1">
                <UpdateInfoUserTab user={user}/>
            </TabPane>
            <TabPane tab={t('tab_user_permissions')} key="2">
                <UserPermissionsTab user={user}/>
            </TabPane>
            <TabPane tab={t('tab_user_roles')} key="3">
                <UserRoleTab user={user}/>
            </TabPane>
        </Tabs>
    );
}

export default UserPage;