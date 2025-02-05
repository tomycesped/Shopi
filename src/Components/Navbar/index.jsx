import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { ShoppingCartContext } from "../../Context"
import {ShoppingCartIcon} from "@heroicons/react/24/solid"

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'
    return(
        <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 bg-green-200" >
            <ul className="flex items-center gap-3">
                <li className="font-semibold text-lg">
                    <NavLink to='/' onClick={() => context.setSearchByCategory()}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory()}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/clothes' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory("clothes")}>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/electronics' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory("electronics")}>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/furnitures' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory("furnitures")}>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/toys' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory("toys")}>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/others' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                        onClick={() => context.setSearchByCategory("others")}>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-3">
                <li className="text-black/60">
                        tom@cesped.com
                </li>
                <li>
                    <NavLink to='/my-orders' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-in' className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }>
                        Sign In
                    </NavLink>
                </li>
                <li onClick={() => {
                    if (context.isCheckoutSideMenuOpen) {
                  context.closeCheckoutSideMenu();
                    } else {
                  context.openCheckoutSideMenu();
                  context.closeProductDetail();
                    }
                  }} className="flex items-center cursor-pointer no-close">
                   <ShoppingCartIcon className="size-6 text-green-950"/>
                    <span>{context.cartProducts.length}</span>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;