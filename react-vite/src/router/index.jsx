import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import UploadPicture from '../components/Product/CreateProduct';
import OneProduct from '../components/Product/OneProduct';
import EditProduct from '../components/Product/EditProduct';
import UserPage from '../components/UserPage/UserPage';
import ShoppingCart from '../components/Cart/ShoppingCart';
import ProfilePage from '../components/Profile/Profile';
import LandingPage
 from '../components/LandingPage/LandingPage';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/home",
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
        path: "/products/upload",
        element: <UploadPicture/>
      },
      {
        path: "/products/:productId",
        element: <OneProduct/>
      },
      {
        path: '/products/:productId/edit',
        element: <EditProduct/>
      },
      {
        path:'/user',
        element: <UserPage/>
      },
      {
        path:'/user/cart',
        element: <ShoppingCart/>
      },
      {
        path: '/profile/:userId',
        element: <ProfilePage/>
      }

    ],
  },
]);
