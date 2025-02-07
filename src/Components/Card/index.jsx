import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { CheckIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const Card = (data) => {
    const context = useContext(ShoppingCartContext);
    const [hovered, setHovered] = useState(false);

    const showProduct = (productDetail) => {
        context.openProductDetail();
        context.closeCheckoutSideMenu();
        context.setProductToShow(productDetail);
    };

    const addProductsToCart = (event, productData) => {
        event.stopPropagation();
        context.setCartProducts([...context.cartProducts, productData]);
        context.closeProductDetail();
        context.openCheckoutSideMenu();
    };

    const removeProductFromCart = (event, id) => {
        event.stopPropagation();
        const updatedCart = context.cartProducts.filter(product => product.id !== id);
        context.setCartProducts(updatedCart); // Se actualiza el carrito sin el producto eliminado
    };

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.some(product => product.id === id);

        return (
            <div
                className="absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-lg m-2 p-1 transition-all duration-300"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={(event) => isInCart ? removeProductFromCart(event, id) : addProductsToCart(event, data.data)}
                style={{ backgroundColor: isInCart ? "black" : "white", cursor: "pointer" }}
            >
                {isInCart && hovered ? (
                    <TrashIcon className="size-5 text-white no-close" />
                ) : isInCart ? (
                    <CheckIcon className="size-5 text-white no-close" />
                ) : (
                    <PlusIcon className="size-5 text-black no-close" />
                )}
            </div>
        );
    };

    return (
        <div
            className="cursor-pointer w-52 h-56 mt-3 bg-white rounded-lg group overflow-hidden"
            onClick={() => showProduct(data.data)}
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 z-1">
                    {data.data.category.name}
                </span>
                <img
                    className="w-full h-full object-cover rounded-lg rounded-b-none transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={data.data.images[0]}
                    alt={data.data.title}
                />
                {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between items-center">
                <span className="text-sm font-light pl-0.5">{data.data.title}</span>
                <span className="text-lg font-medium pr-0.5">${data.data.price}</span>
            </p>
        </div>
    );
};

export default Card;

