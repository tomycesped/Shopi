import Layout from "../../Components/Layout";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const { id } = useParams();
  
  // Manejo mejorado del caso "last"
  const orderIndex = id === "last" 
    ? context.order?.length - 1 
    : parseInt(id);

  // Validación de índice
  if (isNaN(orderIndex) || orderIndex < 0 || orderIndex >= context.order?.length) {
    return (
      <Layout>
        <div className="px-4 py-8 text-center">
          <h2 className="text-xl font-bold text-gray-800">Order Not Found</h2>
          <Link 
            to="/Shopi/my-orders" 
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Back to orders
          </Link>
        </div>
      </Layout>
    );
  }
  // Datos de la orden actual
  const currentOrder = context.order[orderIndex];
  const orderDate = currentOrder?.date || "No date available";

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header con navegación */}
        <div className="flex items-center justify-between mb-6 relative">
          <Link 
            to="/Shopi/my-orders" 
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Back to orders</span>
          </Link>
          
          <div className="text-center absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Order Details</h1>
            {currentOrder && (
              <p className="text-sm text-gray-500 mt-1 mb-2">
                {orderDate} • {currentOrder.totalProducts} items • ${currentOrder.totalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {!currentOrder ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Order not found</h3>
              <p className="text-gray-500">We couldnt find the order youre looking for</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Lista de productos */}
              {currentOrder.products.map((product) => (
                <div 
                  key={product.id} 
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <OrderCard 
                    id={product.id}
                    title={product.title}
                    imageURL={product.images?.[0]}
                    price={product.price}
                    showDetailsButton={false}
                  />
                </div>
              ))}

              {/* Resumen de la orden */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${currentOrder.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${currentOrder.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder;