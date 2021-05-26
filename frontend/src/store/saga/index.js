import { all } from 'redux-saga/effects';
import { AuthWatcher } from './AuthSaga';
import { DocumentTemplateWatcher } from './DocumentTemplateSaga';
import { RolesWatcher } from './RoleSaga';
import { UsersWatcher } from './UserSaga';
import { StudentsWatcher } from './StudentsSaga';
import { DepartmentWatcher } from './DepartmentSaga';
import { CreatedDocumentWatcher } from './CreatedDocumentSaga';
import { InfoGekWatcher } from './InfoGekSaga';

export function* rootWatcher() {
    yield all([
        AuthWatcher(),
        RolesWatcher(),
        UsersWatcher(),
        DocumentTemplateWatcher(),
        StudentsWatcher(),
        DepartmentWatcher(),
        CreatedDocumentWatcher(),
        InfoGekWatcher(),
    ]);
}