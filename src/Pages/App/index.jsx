import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Navbar from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';
import ProductDetail from '../../Components/ProductDetail';
// import Layout from '../../Components/Layout';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/Shopi', element: <Home /> },
    { path: '/Shopi/clothes', element: <Home /> },
    { path: '/Shopi/electronics', element: <Home /> },
    { path: '/Shopi/furniture', element: <Home /> },
    { path: '/Shopi/shoes', element: <Home /> },
    { path: '/Shopi/miscellaneous', element: <Home /> },
    { path: '/Shopi/my-account', element: <MyAccount /> },
    // Orden corregido:
    { path: '/Shopi/my-orders/last', element: <MyOrder /> }, // Primero la ruta específica
    { path: '/Shopi/my-orders/:id', element: <MyOrder /> },  // Luego el parámetro dinámico
    { path: '/Shopi/my-orders', element: <MyOrders /> },     // Finalmente la ruta general
    { path: '/Shopi/my-order', element: <MyOrder /> },       // Esta parece redundante, ¿es necesaria?
    { path: '/Shopi/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <div className="relative">
          <Navbar />
          <div className="bg-gray-200 min-h-[calc(100vh-68px)] mt-[68px] overflow-y-auto">
            <AppRoutes />
          </div>
          <CheckoutSideMenu />
        </div>
        <ProductDetail />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
