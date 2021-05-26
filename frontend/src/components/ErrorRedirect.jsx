import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAction } from 'store/reducers/ErrorRedirectReducer';
import { logout } from 'utils/helpers';
import { setIsLoginUserAction, setUserPermisionsAction } from 'store/reducers/AppReducer';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const links = [
    {
        code: 401,
        path: '/login',
        redirect: <Redirect to='/login' />,
        callback: (dispatch) => {
            logout();
            dispatch(setIsLoginUserAction(false));
            dispatch(setUserPermisionsAction(null));
        },
    },
    {
        code: 403,
        path: '/forbidden',
        redirect: <Redirect to='/forbidden' />,
    },
    {
        code: 404,
        path: '/not-found',
        redirect: <Redirect to='/not-found' />,
    },
    {
        code: 500,
        path: '/server-error',
        redirect: <Redirect to='/server-error' />,
    }
];

const ErrorRedirect = ({children}) => {
    const dispatch = useDispatch();
    const isHasError = useSelector(state => state.errorApp.hasError);
    const errorCode = useSelector(state => state.errorApp.code);
    const history = useHistory();

    useEffect(() => {
        if (errorCode) {
            const link = links.find(item => item.code === errorCode);
            dispatch(setErrorAction({hasError: false, code: null}));
    
            if (link?.callback) {
                link.callback(dispatch);
            }
            history.push(link.path);
            // window.history.replaceState('Object', 'Title', link.path);
            return null;
        }
    }, [isHasError, errorCode, dispatch, history]);
    
    return children;
}

export default ErrorRedirect;