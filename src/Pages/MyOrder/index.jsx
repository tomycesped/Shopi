import Layout from "../../Components/Layout";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../../Components/OrderCard";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === "last") index = context.order?.length - 1
    return (
      <>
        <Layout>
        <div className="w-120 items-center relative justify-center flex mb-3 mt-[-50px]" >
            <Link to="/my-orders" className="absolute left-0">
            <ChevronLeftIcon className="size-8 text-black cursor-pointer border-2 border-black rounded-full"/>
            </Link>
            <h1>My Order</h1>
          </div>
          <div className="flex flex-col w-120">
            {context.order?.[index]?.products.map((product) => (
              <div key={product.id} className="bg-lime-800 px-4 rounded-lg mb-2">
                <OrderCard 
                 key={product.id}
                 id={product.id}
                 title={product.title}
                 imageURL={product.images}
                 price={product.price}
                  />
                  </div>
            ))
            }
            </div>
        </Layout>
      </>
    )
  }
  
  export default MyOrder
  