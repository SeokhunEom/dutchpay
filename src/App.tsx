import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CreateGroup from './components/CreateGroup';
import AddMembers from './components/AddMembers';
import ExpenseMain from './components/ExpenseMain';
import ROUTES from './routes';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={ROUTES.CREATE_GROUP} />,
    },
    {
      path: ROUTES.CREATE_GROUP,
      element: <CreateGroup />,
    },
    {
      path: ROUTES.ADD_MEMBERS,
      element: <AddMembers />,
    },
    {
      path: ROUTES.EXPENSE_MAIN,
      element: <ExpenseMain />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
