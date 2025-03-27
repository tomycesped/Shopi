import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { CheckIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const Card = (data) => {
  const context = useContext(ShoppingCartContext);
  const [hovered, setHovered] = useState(false);

  const showProduct = (productDetail) => {
    console.log("Product clicked:", productDetail);
    context.openProductDetail(productDetail);
    context.closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCartProducts([...context.cartProducts, productData]);
    context.closeProductDetail();
  };

  const removeProductFromCart = (event, id) => {
    event.stopPropagation();
    const updatedCart = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(updatedCart);
  };

  const renderIcon = (id, isListMode = false) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);
    return (
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full p-1 transition-transform duration-300 ${
          isInCart ? "bg-black" : "bg-white"
        } ${isListMode ? "ml-2" : "absolute top-0 right-0 m-2"} hover:scale-110`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(event) =>
          isInCart
            ? removeProductFromCart(event, id)
            : addProductsToCart(event, data.data)
        }
      >
        {isInCart && hovered ? (
          <TrashIcon className="w-4 h-4 text-white" />
        ) : isInCart ? (
          <CheckIcon className="w-4 h-4 text-white" />
        ) : (
          <PlusIcon className="w-4 h-4 text-black" />
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Versión Mobile/Lista */}
      <div className="md:hidden mb-4 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-md overflow-hidden">
        <div className="flex p-3 cursor-pointer" onClick={() => showProduct(data.data)}>
          <div className="relative flex-shrink-0 w-24 h-24">
            <img
              className="w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
              src={data.data.images[0]}
              alt={data.data.title}
              loading="lazy"
            />
          </div>
          <div className="ml-4 flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium">{data.data.title}</h3>
                <span className="text-xs text-gray-500">{data.data.category.name}</span>
              </div>
              {renderIcon(data.data.id, true)}
            </div>
            <span className="text-lg font-medium mt-2">${data.data.price}</span>
          </div>
        </div>
      </div>

      {/* Versión Desktop */}
      <div
        onClick={() => showProduct(data.data)}
        className="hidden md:block cursor-pointer w-full h-full bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex-col group"
      >
        <figure className="relative w-full pt-[100%] overflow-hidden">
          <div className="absolute inset-0">
            <span className="absolute bottom-0 left-0 bg-white/80 rounded-lg text-black text-xs m-2 px-3 py-0.5 z-10">
              {data.data.category.name}
            </span>
            <img
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              src={data.data.images[0]}
              alt={data.data.title}
              loading="lazy"
            />
            {renderIcon(data.data.id)}
          </div>
        </figure>
        <div className="p-3 flex-grow flex flex-col">
          <p className="flex justify-between items-center">
            <span className="text-sm font-medium">{data.data.title}</span>
            <span className="text-lg font-medium">${data.data.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;