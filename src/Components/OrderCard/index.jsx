import { XMarkIcon } from "@heroicons/react/24/solid"

const OrderCard = props => {
    // eslint-disable-next-line react/prop-types
    const { id, title, imageURL, price, handleDelete } = props
    let renderXMarkIcon
    if (handleDelete) {
        renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className="size-6 text-black cursor-pointer" />
    }
    return(
        <div className="flex justify-between items-center my-3 ">
            <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={imageURL} alt={title}/>
                </figure>
                <p className="text-sm font-semibold text-black">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium text-black">${price}</p>
                {renderXMarkIcon}
            </div>
        </div>
    )
}

export default OrderCard