import { useContext, useState } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
    const context = useContext(ShoppingCartContext);
    const [visibleCount, setVisibleCount] = useState(12); // Mostrar 12 productos inicialmente

    // Función para renderizar productos con paginación
    const RenderView = () => {
        // Seleccionamos los productos a mostrar (filtrados o todos)
        const productsToDisplay = context.searchByTitle?.length > 0 || context.searchByCategory
            ? context.filteredItems || []
            : context.items || [];

        // Productos visibles actualmente
        const visibleProducts = productsToDisplay.slice(0, visibleCount);

        if (context.searchByTitle?.length > 0 && visibleProducts.length === 0) {
            return <div className="flex justify-center w-full mt-5"><span>No results found.</span></div>;
        }

        return (
            <>
                {visibleProducts.map(item => (
                    <Card key={item.id} data={item} />
                ))}
                
                {/* Botón "Show More" si hay más productos */}
                {visibleProducts.length < productsToDisplay.length && (
                    <div className="col-span-full flex justify-center mt-8">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </>
        );
    }

    return (
        <Layout>  
            <div className="w-full px-7 max-w-7xl mx-auto">
                {/* Sección de búsqueda */}
                <div className="mb-8">
                    <h1 className="font-medium text-indigo-500 hover:text-indigo-700 text-xl mb-2">Find something you like:</h1>
                    <input 
                        type="text" 
                        placeholder="Search..."
                        className="rounded-lg border border-indigo-500 w-full p-3 focus:outline-none bg-indigo-50"
                        onChange={(event) => {
                            context.setSearchByTitle(event.target.value);
                            setVisibleCount(12); // Resetear paginación al buscar
                        }}
                    />
                </div>
                
                {/* Mobile: Lista vertical (1 columna) */}
                <div className="md:hidden space-y-4">
                    <RenderView />
                </div>
                
                {/* Tablet: 3 columnas (≥768px) */}
                <div className="hidden md:grid lg:hidden grid-cols-3 gap-5">
                    <RenderView />
                </div>
                
                {/* Desktop: 4 columnas (≥1024px) */}
                <div className="hidden lg:grid grid-cols-4 gap-5">
                    <RenderView />
                </div>
                
                <ProductDetail />
            </div>
        </Layout>
    );
}

export default Home;