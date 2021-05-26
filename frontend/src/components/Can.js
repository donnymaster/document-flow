import {useSelector} from 'react-redux';

const Can = ({children , permissions}) => {
    const userPermissions = useSelector(state => state.app.userPermissions);
    let isVisibleContent = false;

    if (typeof permissions === 'string') {
        isVisibleContent = userPermissions.includes(permissions);
    }

    if (Array.isArray(permissions)) {
        isVisibleContent = userPermissions.every(permission => permissions.includes(permission));
    }

    return (
        <>
            {isVisibleContent || children}
        </>
    );
}

export default Can;
