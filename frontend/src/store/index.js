import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppReducer from './reducers/AppReducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootWatcher } from './saga';
import { ErrorRedirectReducer } from './reducers/ErrorRedirectReducer';
import { RolesReducer } from './reducers/RolesReducer';
import { UsersReducer } from './reducers/UsersReducer';
import { DocumentTemplateReducer } from './reducers/DocumentTemplateReducer';
import { StudentsReducer } from './reducers/StudentsReducer';
import { DepartmentReducer } from './reducers/DepartmentReducer';
import { CreatedDocumentReducer } from './reducers/CreatedDocumentReducer';
import { InfoGekReducer } from './reducers/infoGekReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    app: AppReducer,
    errorApp: ErrorRedirectReducer,
    role: RolesReducer,
    usersData: UsersReducer,
    documentTemplate: DocumentTemplateReducer,
    students: StudentsReducer,
    departments: DepartmentReducer,
    createdDocument: CreatedDocumentReducer,
    infoGek: InfoGekReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootWatcher);
