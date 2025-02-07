import { useContext } from "react"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext)
  const RenderView = () => {
    if (context.searchByTitle?.length > 0) { if(context.filteredItems?.length > 0) {
      return(
        context.filteredItems?.map(item =>  (
          <Card key={item.id} data={item} /> 
        )))} else {
          return (
            <div className="justify-center w-full">
              <span>No results found.</span>
            </div>
          )
        }
    } else {
      return(
        context.filteredItems?.map(item =>  (
          <Card key={item.id} data={item} /> 
        )))
    }
  }
  return (
    <>
    <p className="text-xs absolute pl-1 font-extralight">Hecho con amor por @tomcesped 🖤
          </p>
          <p className="text-xs absolute mt-4 pl-1 font-extralight">
            API controlada por Platzi
          </p>
      <Layout>  
      <div className="w-80 items-center relative just ify-center mb-4 mt-[-50px]">
            <h1 className="font-medium text-xl">Find something you like:</h1>
            <input 
          type="text" 
          placeholder="Search..."
          onFocus={(e) => (e.target.dataset.placeholder = e.target.placeholder, e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = e.target.dataset.placeholder)}
          className="rounded-lg border border-black w-80 p-3 mb-1 focus:outline-none bg-green-50"
          onChange={(event) => context.setSearchByTitle(event.target.value)}/>
          </div>
          
        <div className="grid grid-cols-4 w-full max-w-screen-lg bg-green-100 justify-items-center">
        <RenderView />
        </div>
        <ProductDetail />
      </Layout>
    </>
  )
}

export default Home
