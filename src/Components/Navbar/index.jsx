import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeStyle = "underline underline-offset-4";

  // Cerrar menú al cambiar a pantalla grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { to: "/Shopi/", text: "All", category: null },
    { to: "/Shopi/clothes", text: "Clothes", category: "clothes" },
    { to: "/Shopi/electronics", text: "Electronics", category: "electronics" },
    { to: "/Shopi/furniture", text: "Furniture", category: "furniture" },
    { to: "/Shopi/shoes", text: "Shoes", category: "shoes" },
    { to: "/Shopi/miscellaneous", text: "Miscellaneous", category: "miscellaneous" }
  ];

  const navItems = [
    { to: "/Shopi/my-orders", text: "My Orders" },
    { to: "/Shopi/my-account", text: "My Account" },
    { to: "/Shopi/sign-in", text: "Sign In" }
  ];

  // Animación de escalera para los items
  const StaggeredItem = ({ children, index }) => (
    <div 
      className="opacity-0 transform -translate-y-4"
      style={{
        animation: `fadeInUp 0.3s ease-out forwards ${index * 0.1}s`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );

  return (
    <nav className="flex justify-between items-center fixed z-50 w-full py-5 px-8 text-sm font-light top-0 bg-white shadow-sm">
      {/* Logo y categorías (izquierda) */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          )}
        </button>
        <NavLink
          to="/Shopi/"
          end
          className="font-semibold text-lg text-indigo-600"
          onClick={() => {
            context.setSearchByCategory();
            context.setSearchByTitle(null);
          }}
        >
          Shopi
        </NavLink>
        
        <ul className="hidden lg:flex items-center gap-6 ml-6">
          {categories.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  isActive ? `${activeStyle} text-indigo-600` : "text-gray-700 hover:text-indigo-500 transition-colors"
                }
                onClick={() => {
                  context.setSearchByCategory(item.category);
                  context.setSearchByTitle(null);
                }}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Menú hamburguesa - Versión fullscreen con animación */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 overflow-y-auto">
          {/* Botón de cerrar en la parte superior derecha */}
          <button 
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>

          <div className="max-w-md mx-auto">
            {/* Categorías con animación escalonada */}
            <ul className="space-y-3 mb-8">
              {categories.map((item, index) => (
                <StaggeredItem key={item.to} index={index}>
                  <li>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => 
                        `block py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-600' 
                            : 'text-gray-800 hover:bg-gray-50'
                        }`
                      }
                      onClick={() => {
                        context.setSearchByCategory(item.category);
                        context.setSearchByTitle(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.text}
                    </NavLink>
                  </li>
                </StaggeredItem>
              ))}
            </ul>

            {/* Separador */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Menú de usuario con animación escalonada */}
            <ul className="space-y-3">
              <StaggeredItem index={categories.length}>
                <li className="px-4 py-2 text-gray-500">Hello! Thomas</li>
              </StaggeredItem>
              {navItems.map((item, index) => (
                <StaggeredItem key={item.to} index={categories.length + index + 1}>
                  <li>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => 
                        `block py-3 px-4 rounded-lg text-lg font-medium ${
                          isActive ? 'text-indigo-600' : 'text-gray-800 hover:bg-gray-50'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.text}
                    </NavLink>
                  </li>
                </StaggeredItem>
              ))}
            </ul>
          </div>

          {/* Estilos para la animación */}
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}

      {/* Navegación derecha (solo desktop) */}
      <div className="hidden lg:flex items-center gap-6">
        <ul className="flex items-center gap-6">
          <li className="text-gray-500">Hello! Thomas</li>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  isActive ? `${activeStyle} text-indigo-600` : "text-gray-700 hover:text-indigo-500 transition-colors"
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center cursor-pointer no-close relative"
          onClick={() => {
            if (context.isCheckoutSideMenuOpen) {
              context.closeCheckoutSideMenu();
            } else {
              context.openCheckoutSideMenu();
              context.closeProductDetail();
            }
          }}
        >
          <ShoppingCartIcon className="size-6 text-gray-700 hover:text-indigo-600 transition-colors" />
          {context.cartProducts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {context.cartProducts.length}
            </span>
          )}
        </div>
      </div>

      {/* Carrito (mobile) */}
      <div className="lg:hidden flex items-center">
        <div
          className="flex items-center cursor-pointer no-close relative"
          onClick={() => {
            if (context.isCheckoutSideMenuOpen) {
              context.closeCheckoutSideMenu();
            } else {
              context.openCheckoutSideMenu();
              context.closeProductDetail();
            }
          }}
        >
          <ShoppingCartIcon className="size-6 text-gray-700" />
          {context.cartProducts.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {context.cartProducts.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;