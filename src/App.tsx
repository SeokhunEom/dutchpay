import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CreateGroup from './components/CreateGroup';
import AddMembers from './components/AddMembers';
import ExpenseMain from './components/ExpenseMain';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CreateGroup />,
    },
    {
      path: 'members',
      element: <AddMembers />,
    },
    {
      path: 'expense',
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
