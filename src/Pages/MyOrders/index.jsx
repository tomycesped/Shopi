import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

function MyOrders() {
  const context = useContext(ShoppingCartContext);
  
  // Ordenar órdenes por fecha (más reciente primero)
  const sortedOrders = [...context.order].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">
            {sortedOrders.length > 0 
              ? `You have ${sortedOrders.length} order${sortedOrders.length !== 1 ? 's' : ''}`
              : "Your order history will appear here"}
          </p>
        </div>

        {/* Mensaje cuando no hay órdenes */}
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">Your completed orders will appear here</p>
            <Link
              to="/Shopi/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Última orden destacada */}
            <div className="border-2 border-green-500 rounded-lg p-1">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckBadgeIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">MOST RECENT ORDER</span>
                </div>
                <Link 
                  to={`/Shopi/my-orders/${context.order.length - 1}`} // Último índice
                  className="block"
                >
                  <OrdersCard 
                    totalPrice={sortedOrders[0].totalPrice}
                    totalProducts={sortedOrders[0].totalProducts}
                    date={sortedOrders[0].date}
                    highlight={true}
                  />
                </Link>
              </div>
            </div>

            {/* Órdenes anteriores (si hay más de 1) */}
            {sortedOrders.length > 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Previous Orders</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedOrders.slice(1).map((order, index) => (
                    <Link 
                      key={index} 
                      to={`/Shopi/my-orders/${context.order.length - 2 - index}`} // Índices correctos
                      className="bg-white transition-transform hover:scale-[1.02] hover:shadow-md rounded-lg overflow-hidden"
                    >
                      <OrdersCard 
                        totalPrice={order.totalPrice}
                        totalProducts={order.totalProducts}
                        date={order.date}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyOrders;