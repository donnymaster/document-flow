import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";

const PrivateRoute = ({component, permissions, ...rest}) => {
    const isLogin = useSelector(state => state.app.isLoginUser);
    const userPermissions = useSelector(state => state.app.userPermissions);
    const history = useHistory();

    useEffect(() => {
        if (!isLogin) {  
            history.push('/login');
        }
        
        let isHasPermission = false;

        if (Array.isArray(permissions)) {
            isHasPermission = userPermissions.every((item) => permissions.includes(item));
        } else {
            isHasPermission = userPermissions.every((item) => item === permissions);
        }

        if(!isHasPermission) {
            history.push('/forbidden');
        }

    }, [history, isLogin, userPermissions, permissions]);

    return <Route component={component} {...rest}/>
}
 
export default PrivateRoute;