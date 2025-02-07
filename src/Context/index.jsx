import { createContext, useState } from "react";
import { useEffect } from "react";

export const ShoppingCartContext = createContext();

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) => {
    // shopping car . increment quantity
    const [count, setCount] = useState(0);
    //product detail . open/close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    //checkout side menu . open/close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    //Product detail . show product 
    const [productToShow, setProductToShow] = useState({});

    // shopping cart . add products to cart
    const [cartProducts, setCartProducts] = useState([]);

    //shopping cart . order
    const [order, setOrder] = useState([]);

    //get products
    const [items, setItems] = useState(null);

    const [filteredItems, setFilteredItems] = useState(null);

    // get products by title
    const [searchByTitle, setSearchByTitle] = useState(null);

    //get pruducts by category
    const [searchByCategory, setSearchByCategory] = useState(null);

    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle);
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory);
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if (!searchType) {
            return items
        }
    }

    useEffect(() => {
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        }, [items, searchByTitle, searchByCategory]);

    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            setSearchByTitle,
            searchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
        {children}
        </ShoppingCartContext.Provider>
    )
}