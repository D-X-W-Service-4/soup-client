import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.tsx';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
