import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 bg-green-200">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink
            to="/Shopi/"
            end
            onClick={() => {
              context.setSearchByCategory();
              context.setSearchByTitle(null);
            }}
          >
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/"
            end
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => {
              context.setSearchByCategory();
              context.setSearchByTitle(null);
            }}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/clothes"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => {
              context.setSearchByCategory("clothes");
              context.setSearchByTitle(null);
            }}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/electronics"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => {
              context.setSearchByCategory("electronics");
              context.setSearchByTitle(null);
            }}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/furnitures"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => {
              context.setSearchByCategory("furnitures");
              context.setSearchByTitle(null);
            }}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/toys"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => {
              context.setSearchByCategory("toys");
              context.setSearchByTitle(null);
            }}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/others"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            onClick={() => {
              context.setSearchByCategory("others");
              context.setSearchByTitle(null);
            }}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">tom@cesped.com</li>
        <li>
          <NavLink
            to="/Shopi/my-orders"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/my-account"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Shopi/sign-in"
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Sign In
          </NavLink>
        </li>
        <li
          onClick={() => {
            if (context.isCheckoutSideMenuOpen) {
              context.closeCheckoutSideMenu();
            } else {
              context.openCheckoutSideMenu();
              context.closeProductDetail();
            }
          }}
          className="flex items-center cursor-pointer no-close"
        >
          <ShoppingCartIcon className="size-6 text-green-950" />
          <span>{context.cartProducts.length}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
