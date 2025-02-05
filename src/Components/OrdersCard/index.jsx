import { ChevronRightIcon } from "@heroicons/react/24/solid"

const OrdersCard = props => {
    // eslint-disable-next-line react/prop-types
    const { totalPrice, totalProducts } = props
    return(
        <div className="flex justify-between items-center mb-4 border border-black w-80 p-4 rounded-lg bg-green-50">
            <div className="flex justify-between w-full">
            <p className="flex flex-col">
                <span className="font-light">04.02.2025</span>
                <span>{totalProducts} articles</span>
            </p>
            <p className="flex items-center gap-2">
                <span className="font-medium text-2xl">${totalPrice}</span>
                <ChevronRightIcon className="size-6 text-black cursor-pointer" />
            </p>             
            </div>
        </div>
    )
}

export default OrdersCard