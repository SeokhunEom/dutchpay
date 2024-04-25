import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

  return <RouterProvider router={router} />;
}

export default App;
