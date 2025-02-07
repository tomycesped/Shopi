import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef } from "react";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);
    const asideRef = useRef(null); // Referencia al aside

    // Función para cerrar el detalle si se hace clic fuera
    const handleClickOutside = (event) => {
        if (asideRef.current && !asideRef.current.contains(event.target)) {
            context.closeProductDetail();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <aside 
            ref={asideRef}
            className={`w-[15.5%] h-[calc(100vh-68px)] flex flex-col fixed left-0 border border-white rounded-lg bg-green-950 z-2
            transition-transform duration-300 ease-in-out 
            ${context.isProductDetailOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex justify-between items-center py-4">
                <h2 className="font-medium text-xl text-white pl-4">Detail</h2>
                <div className="pr-4">
                    <XMarkIcon onClick={() => context.closeProductDetail()} className="size-6 text-white cursor-pointer"/>
                </div>
            </div>
            <figure className="px-4">
                <img className="w-full h-full rounded-lg" src={context.productToShow.images} alt={context.productToShow.title}/>
            </figure>
            <p className="flex flex-col p-6">
                <span className="font-medium text-2xl text-white mb-2">${context.productToShow.price}</span>
                <span className="font-medium text-md text-white">{context.productToShow.title}</span>
                <span className="font-light text-sm text-gray-400">{context.productToShow.description}</span>
            </p>
        </aside>
    );
};

export default ProductDetail;
