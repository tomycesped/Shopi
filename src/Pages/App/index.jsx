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
    {path: '/Shopi',  element: <Home />},
    {path: '/Shopi/clothes',  element: <Home />},
    {path: '/Shopi/electronics',  element: <Home />},
    {path: '/Shopi/furniture',  element: <Home />},
    {path: '/Shopi/shoes',  element: <Home />},{path: '/Shopi/miscellaneous',  element: <Home />},
    {path: '/Shopi/my-account',  element: <MyAccount />},
    {path: '/Shopi/my-order',  element: <MyOrder />},
    {path: '/Shopi/my-orders',  element: <MyOrders />},
    {path: '/Shopi/my-orders/last',  element: <MyOrder />},
    {path: '/Shopi/my-orders/:id',  element: <MyOrder />},
    {path: '/Shopi/sign-in',  element: <SignIn />},
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
