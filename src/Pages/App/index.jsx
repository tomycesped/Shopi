import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/',  element: <Home />},
    {path: '/clothes',  element: <Home />},
    {path: '/electronics',  element: <Home />},
    {path: '/furnitures',  element: <Home />},
    {path: '/toys',  element: <Home />},{path: '/others',  element: <Home />},
    {path: '/my-account',  element: <MyAccount />},
    {path: '/my-order',  element: <MyOrder />},
    {path: '/my-orders',  element: <MyOrders />},
    {path: '/my-orders/last',  element: <MyOrder />},
    {path: '/my-orders/:id',  element: <MyOrder />},
    {path: '/sign-in',  element: <SignIn />},
    {path: '/*',  element: <NotFound />},
    

  ]);
  return(routes)
}

const App = () => {
  return (
    <>
    <div className='bg-green-100 scrollbar-home overflow-y-scroll min-h-[200px] max-h-[calc(100vh-68px)] mt-[68px]'>
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
      </div>
    </>
  )
}

export default App
