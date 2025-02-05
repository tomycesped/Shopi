import { XMarkIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef } from "react"; 
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  const asideRef = useRef(null); // Crea una referencia para el aside

  // Función para cerrar el menú si se hace clic fuera
  const handleClickOutside = (event) => {
      // Verifica si el clic ocurrió en un elemento excluido
  if (event.target.closest(".no-close")) {
    return; // No cierres el menú
  }
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      context.closeCheckoutSideMenu(); // Cierra el menú lateral
    }
  };

  // Agrega el event listener al montar el componente
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "04.02.2025",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.closeCheckoutSideMenu();
    context.setSearchByTitle(null);
  };

  return (
    <aside
      ref={asideRef} // Asigna la referencia al aside
      className={`w-[27%] h-[calc(100vh-68px)] flex flex-col fixed right-0 top-[68px] z-2 border border-white rounded-lg bg-green-950 
      transition-transform duration-300 ease-in-out 
      ${context.isCheckoutSideMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center py-4">
        <h2 className="font-medium text-xl text-white pl-4">My order</h2>
        <div className="pr-4">
          <XMarkIcon
            onClick={() => context.closeCheckoutSideMenu()}
            className="size-6 text-white cursor-pointer"
          />
        </div>
      </div>

      {/* Lista de productos con scroll */}
      <div className="px-3 overflow-y-scroll scrollbar-cart">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.images}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* Total y botón de checkout */}
      <div className="px-7 py-3 bg-gradient-to-b from-green-950 via-green-900 to-green-800 mt-auto border-white border-t">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light text-xl text-white">Total:</span>
          <span className="font-medium text-2xl text-white">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full bg-black py-3 rounded-lg border-2 border-white cursor-pointer font-bold text-white flex justify-center gap-2"
            onClick={() => handleCheckout()}
          >
            Checkout
            <ArrowRightCircleIcon className="size-6 text-white" />
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;