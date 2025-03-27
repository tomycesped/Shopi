import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [searchByTitle, setSearchByTitle] = useState(null);
  const [searchByCategory, setSearchByCategory] = useState(null);

  const openProductDetail = (product) => {
    setProductToShow(product);
    console.log("Opening product detail for:", product);
      setIsProductDetailOpen(true)
  };

  const closeProductDetail = () => setIsProductDetailOpen(false);

  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => {
        console.error("Error fetching products:", error);
        setItems([]);
      });
  }, []);

  useEffect(() => {
    if (searchByTitle && !searchByCategory) {
      setFilteredItems(items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase())));
    }
    if (!searchByTitle && searchByCategory) {
      setFilteredItems(items?.filter(item => item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase())));
    }
    if (!searchByTitle && !searchByCategory) {
      setFilteredItems(items);
    }
    if (searchByTitle && searchByCategory) {
      setFilteredItems(items?.filter(
        item => item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase()) &&
                item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      ));
    }
  }, [items, searchByTitle, searchByCategory]);

  return (
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
  );
};
