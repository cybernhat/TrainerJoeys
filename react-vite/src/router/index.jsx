import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import UploadPicture from '../components/Product/CreateProduct';
import OneProduct from '../components/Product/OneProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/upload",
        element: <UploadPicture/>
      },
      {
        path: "/products/:productId",
        element: <OneProduct/>
      }
    ],
  },
]);
