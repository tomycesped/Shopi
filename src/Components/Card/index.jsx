import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import {CheckIcon, PlusIcon} from "@heroicons/react/24/solid"

const Card = (data) => {
    const context = useContext(ShoppingCartContext)
    const showProduct = (productDetail) => {
        context.openProductDetail()
        context.closeCheckoutSideMenu()
        context.setProductToShow(productDetail)
    }
    const addProductsToCart = (event, productData) => {
        event.stopPropagation()
        context.setCartProducts([...context.cartProducts, productData]);
        context.closeProductDetail()
        context.openCheckoutSideMenu()
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

        if (isInCart) {
         return(
            <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-lg m-2 p-1">
                   <CheckIcon className="size-6 text-white"/>
               </div>
         )
        } else {
            return(
            <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-lg m-2 p-1" onClick={(event) => addProductsToCart(event, data.data)}>
                   <PlusIcon className="size-6 text-black no-close"/>
               </div>
            )
        }
    }
return(
        <div className= "cursor-pointer w-52 h-56 mt-3 bg-white rounded-lg group overflow-hidden"
        onClick={() => showProduct(data.data)}>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 z-1">{data.data.category.name}</span>
                <img className="w-full h-full object-cover rounded-lg rounded-b-none transition-transform duration-300 ease-in-out group-hover:scale-110" src={data.data.images[0]} alt={data.data.title} />
                {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between items-center">
                <span className="text-sm font-light pl-0.5">{data.data.title}</span>
                <span className="text-lg font-medium pr-0.5">${data.data.price}</span>
            </p>
        </div>
    )
}

export default Card;