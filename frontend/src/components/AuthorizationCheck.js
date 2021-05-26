import { useSelector, useDispatch } from 'react-redux';
import { fetchPermisionsAction } from 'store/reducers/AppReducer';
import Spinner from 'components/Spinner/Spinner';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

const AuthorizationCheck = ({children}) => {
    const isLogin = useSelector(store => store.app.isLoginUser);
    const permissions = useSelector(store => store.app.userPermissions);
    const history = useHistory();
    const dispatch = useDispatch();

    if (!isLogin) {
        // history.push('/login');
        return <Redirect to='/login' />
    }

    if (!permissions) {
        dispatch(fetchPermisionsAction());
        return (<Spinner size={52} isHeightMaxView title='load_profile' />);
    }
    
    return children;
}

export default AuthorizationCheck;
