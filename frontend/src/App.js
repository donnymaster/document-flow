import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import MainPage from './pages/MainPage';
import ProjectsPage from './pages/ProjectsPage';
import LoadFacultiesPage from './pages/Load/Faculties';
import LoadStudentsPage from './pages/Load/Students';
import LoadTeachersPage from './pages/Load/Teachers';
import CreatedDocumentsPage from './pages/Document/Created';
import TemplatesListPage from './pages/Document/TemplatesList';
import CreateTemplatePage from './pages/Document/CreateTamplate';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import RolesPage from './pages/RolesPage';
import RolePage from './pages/RolesPage/RolePage';
import StatisticsPage from './pages/RolesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForbiddenPage from 'pages/ErrorPage/ForbiddenPage';
import NotFound from 'pages/ErrorPage/NotFound';
import AuthorizationCheck from 'components/AuthorizationCheck';
import ServerError from 'pages/ErrorPage/ServerError';
import DepartmentsPage from 'pages/Load/Departments';
import PrivateRoute from 'components/PrivateRoute';
import GekMemberInfo from 'pages/Load/GekMemberInfo';

import MainLayout from './layouts/MainLayout';
import ErrorRedirect from "components/ErrorRedirect";
import FormCreateDocument from "pages/Document/CreateTamplate/FormCreateDocument";

function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path='/server-error' component={ServerError} /> 
        <Route>
          <ErrorRedirect>
            <AuthorizationCheck>
              <MainLayout>
                <Switch>
                  <Route exact path="/"> 
                  <CreateTemplatePage />
                  </Route>
                  <PrivateRoute permissions='item12' component={ProjectsPage} path='/projects' />
                  <Route exact path="/load/faculties">
                    <LoadFacultiesPage />
                  </Route>
                  <Route exact path="/load/faculties">
                    <LoadFacultiesPage />
                  </Route>
                  <Route exact path="/load/students">
                    <LoadStudentsPage />
                  </Route>
                  <Route exact path="/load/departments">
                    <DepartmentsPage />
                  </Route>
                  <Route exact path="/load/teachers">
                    <LoadTeachersPage />
                  </Route>
                  <Route exact path="/load/gek">
                    <GekMemberInfo />
                  </Route>
                  <Route exact path="/documents/create/:id">
                    <FormCreateDocument />
                  </Route>
                  <Route exact path="/documents/templates">
                    <TemplatesListPage />
                  </Route>
                  <Route exact path="/documents">
                    <CreateTemplatePage />
                  </Route>
                  <Route exact path="/users">
                    <UsersPage />
                  </Route>
                  <Route exact path="/roles">
                    <RolesPage />
                  </Route>
                  <Route exact path="/roles/:id">
                    <RolePage />
                  </Route>
                  <Route exact path="/users/:id">
                    <UserPage />
                  </Route>
                  <Route exact path="/statistics">
                    <StatisticsPage />
                  </Route>
                  <Route exact path="/forbidden">
                    <ForbiddenPage />
                  </Route>
                  <Route exact path="/not-found">
                    <NotFound />
                  </Route>
                  <Route exact path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </MainLayout>
              </AuthorizationCheck>
            </ErrorRedirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
