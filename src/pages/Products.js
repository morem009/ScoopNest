import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaCartPlus,
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectCartProducts, setCart } from "../redux/cartSlice";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  // eslint-disable-next-line
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  // eslint-disable-next-line 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const db = getDatabase();
  // eslint-disable-next-line 
  const userCart = useSelector(selectCartProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Handle user's authentication and fetch cart data
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userRef = ref(db, "users/" + user.uid + "/cart");
        onValue(userRef, (snapshot) => {
          const cartData = snapshot.val();
          if (cartData) {
            dispatch(setCart(cartData));
          }
        });
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth, db, dispatch]);

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
      setProducts(productsArray);
      setDisplayedProducts(productsArray);
    });
  }, [db]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (searchTerm) {
      const suggestions = products
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestedProducts(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestedProducts([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length && searchTerm) {
      navigate(`/products?search=${searchTerm}`);
    }

    setDisplayedProducts(filteredProducts);
    setCurrentPage(1);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    setDisplayedProducts([product]);
    setSuggestedProducts([]);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (location.search === "") {
      setDisplayedProducts(products);
      setSearchTerm("");
    }
  }, [location, products]);

  const handlePageChange = (index) => {
    setCurrentPage(index + 1);
    window.scrollTo(0, 450);
  };

  const handleAddToCart = (productName, productImgSrc, productPrice) => {
    if (!auth.currentUser) {
      navigate("/login");
      window.scrollTo(0, 350);
    } else {
      dispatch(addProduct({ productName, image: productImgSrc, price: productPrice }));
  
      const productRef = ref(db, `users/${auth.currentUser.uid}/cart/${productName}`);
      get(productRef).then((snapshot) => {
        if (snapshot.exists()) {
          let currentData = snapshot.val();
          if (typeof currentData === 'number') {
            set(productRef, { count: currentData + 1, image: productImgSrc, price: productPrice });
          } 
          else {
            set(productRef, { count: currentData.count + 1, image: productImgSrc, price: productPrice });
          }
        } 
        else {
          set(productRef, { count: 1, image: productImgSrc, price: productPrice });
        }
      });

      // Clear suggested products and search term
      setSuggestedProducts([]);
      setSearchTerm("");
    }
  }
  

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = displayedProducts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-10 px-10">
        <div className="container mx-auto mb-4">
          <h2 className="text-4xl font-bold mb-6 text-left">Explore Flavors</h2>
          <div className="relative w-full md:w-2/3 lg:w-1/3 mb-12">
            <div className="flex rounded-full overflow-hidden border border-gray-300 w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
                placeholder="Search products..."
                className="flex-grow px-2 py-2 pl-4 bg-white text-[#F28B82] focus:ring-2 focus:ring-[#F0696A] focus:outline-none"
              />
              <div
                className="bg-[#F28B82] cursor-pointer p-4"
                onClick={handleSearch}
              >
                <FaSearch className="text-white" />
              </div>
            </div>

            {suggestedProducts.length > 0 && (
              <div className="absolute mt-1 w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-md z-50">
                {suggestedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-[#F28B82] hover:text-white rounded-lg cursor-pointer"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            {productsToShow.map((product) => (
              <div
                key={product.id}
                className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-48 h-48 rounded-full mx-auto overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-xl font-semibold mb-4">{product.price}</p>
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={
                        i <= product.rating ? "text-[#F28B82]" : "text-gray-300"
                      }
                    >
                      {i <= product.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <div className="flex md:justify-between justify-center items-center mb-4 space-x-4 md:space-x-0">
                  <button
                    onClick={() =>
                      handleAddToCart(product.name, product.imgSrc, product.price)
                    }
                    className="bg-[#F28B82] hover:bg-[#F0696A] text-white rounded-full py-1 px-3 flex items-center text-sm"
                  >
                    <FaCartPlus className="mr-1" /> Cart
                  </button>

                  <button className="text-[#F28B82] hover:text-[#F0696A] bg-transparent border border-[#F28B82] hover:border-[#F0696A] rounded-full py-1 px-3 flex items-center text-sm">
                    <FaHeart className="mr-1" /> Wishlist
                  </button>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href={product.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F28B82] hover:text-[#F0696A]"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={product.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1877F2] hover:text-[#0b5ed7]"
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a
                    href={product.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#25D366] hover:text-[#128C7E]"
                  >
                    <FaWhatsapp size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`text-lg font-medium ${
                  currentPage === index + 1 ? "text-[#F28B82]" : "text-gray-600"
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
