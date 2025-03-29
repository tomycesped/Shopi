import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const ProductDetail = () => {
  const { 
    isProductDetailOpen, 
    closeProductDetail, 
    productToShow,
    cartProducts,
    setCartProducts
  } = useContext(ShoppingCartContext);
  
  const asideRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_DESCRIPTION_LENGTH = 100;
  const hasLongDescription = productToShow?.description?.length > MAX_DESCRIPTION_LENGTH;

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const isInCart = productToShow && cartProducts.some(product => product.id === productToShow.id);

  const handleCartAction = (e) => {
    e.stopPropagation();
    if (isInCart) {
      setCartProducts(cartProducts.filter(product => product.id !== productToShow.id));
    } else {
      setCartProducts([...cartProducts, productToShow]);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.no-close')) return;
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      closeProductDetail();
    }
  };

  useEffect(() => {
    if (isProductDetailOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProductDetailOpen]);

  return ReactDOM.createPortal(
    <aside
      ref={asideRef}
      className={`fixed no-close inset-y-0 right-0 top-[68px] w-96 max-w-[90vw] h-[calc(100vh-68px)] bg-white shadow-sm transition-all duration-300 ease-in-out z-50 transform ${
        isProductDetailOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full overflow-y-auto p-6 relative">
        <button 
          onClick={closeProductDetail} 
          className="fixed top-0 right-0 p-3 bg-white rounded-bl-lg shadow-md hover:bg-gray-100 transition-colors z-10 cursor-pointer"
          aria-label="Close product details"
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {productToShow?.title ? (
          <div className="space-y-4 pt-2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90" 
                src={productToShow?.images?.[0]} 
                alt={productToShow?.title} 
                onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{productToShow.title}</h2>
            <p className="text-xl font-semibold text-indigo-600">
              ${productToShow.price.toFixed(2)}
            </p>
            <div className="text-gray-600">
              <p className={`${isExpanded ? "" : "line-clamp-3"}`}>
                {productToShow.description}
              </p>
              {hasLongDescription && (
                <button 
                  onClick={toggleDescription} 
                  className="mt-1 cursor-pointer text-indigo-500 hover:text-indigo-700 text-sm font-medium transition-colors"
                >
                  {isExpanded ? "Show less" : "Read more..."}
                </button>
              )}
            </div>
            <button
              onClick={handleCartAction}
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 mt-4 transition-colors cursor-pointer ${
                isInCart ? "bg-red-100 hover:bg-red-200 text-red-700" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
              }`}
            >
              {isInCart ? (
                <>
                  <TrashIcon className="w-5 h-5" />
                  Remove from Cart
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 text-lg">Select a product to view details</p>
          </div>
        )}
      </div>
    </aside>,
    document.body
  );
};

export default ProductDetail;