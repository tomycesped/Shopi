import { XMarkIcon, ArrowRightCircleIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const asideRef = useRef(null);
  const processTimeoutRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.closest(".no-close")) return;
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      if (isProcessing) {
        // Cancelar el proceso si está en curso
        if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
        setIsProcessing(false);
      } else {
        context.closeCheckoutSideMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProcessing]); // Dependencia añadida para actualizar el handler

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    if (context.cartProducts.length === 0) {
      setShowEmptyCartMessage(true);
      setTimeout(() => setShowEmptyCartMessage(false), 2000);
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago (guardamos la referencia para poder cancelarlo)
    processTimeoutRef.current = setTimeout(() => {
      const orderToAdd = {
        date: new Date().toLocaleDateString(),
        products: context.cartProducts,
        totalProducts: context.cartProducts.length,
        totalPrice: totalPrice(context.cartProducts),
      };
      
      context.setOrder([...context.order, orderToAdd]);
      context.setCartProducts([]);
      setIsProcessing(false);
      setIsSuccess(true);

      // Mostrar confirmación por 2 segundos antes de navegar
      successTimeoutRef.current = setTimeout(() => {
        context.closeCheckoutSideMenu();
        context.setSearchByTitle(null);
        navigate("/Shopi/my-orders");
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  const cancelCheckout = () => {
    if (isProcessing) {
      if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
      setIsProcessing(false);
    }
  };

  return (
    <aside
      ref={asideRef}
      className={`fixed inset-y-0 right-0 top-[68px] w-96 max-w-[90vw] h-[calc(100vh-68px)] bg-white shadow-xl transition-all duration-300 ease-in-out z-50 transform ${
        context.isCheckoutSideMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">My Order</h2>
        <button 
          onClick={isProcessing ? cancelCheckout : () => context.closeCheckoutSideMenu()} 
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isProcessing ? "Cancel checkout" : "Close checkout"}
        >
          <XMarkIcon className={`size-6 cursor-pointer ${isProcessing ? "text-red-500" : "text-gray-500"}`} />
        </button>
      </div>

      {/* Estado de carga o éxito */}
      {(isProcessing || isSuccess) ? (
        <div className={`h-full flex flex-col items-center justify-center ${isSuccess ? 'bg-green-50' : ''}`}>
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-lg text-gray-700">Processing your order...</p>
              <button
                onClick={cancelCheckout}
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                Cancel Order
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="h-19 w-19 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckIcon className="h-10 w-10 text-green-600 animate-bounce" />
                </div>
                <div className="absolute inset-0 bg-green-100 rounded-full opacity-0 animate-ping"></div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Order Confirmed!</h3>
              <p className="text-green-600">Thank you for your purchase</p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="h-[calc(100%-180px)] overflow-y-auto p-6 space-y-4">
            {context.cartProducts.length > 0 ? (
              context.cartProducts.map((product) => (
                <OrderCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imageURL={product.images}
                  price={product.price}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-300 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                <p className="text-lg text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some items to get started</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            {showEmptyCartMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                Please add items to your cart first!
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-xl font-bold text-indigo-600">
                ${totalPrice(context.cartProducts).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className={`w-full py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                context.cartProducts.length > 0
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={context.cartProducts.length === 0 || isProcessing}
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRightCircleIcon className="size-5" />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default CheckoutSideMenu;