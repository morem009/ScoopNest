import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectCartProducts, setCart } from "../redux/cartSlice";
import SearchComponent from '../components/SearchComponent';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const db = getDatabase();
  // eslint-disable-next-line
  const userCart = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const currentURL = window.location.href;
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const socialMediaLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentURL)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=Check%20out%20this%20awesome%20product!`
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid + "/cart");
        onValue(userRef, (snapshot) => {
          const cartData = snapshot.val();
          if (cartData) {
            dispatch(setCart(cartData));
          }
        });
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
    const unsubscribe = auth.onAuthStateChanged((user) => {});
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (searchTerm) {
      const suggestions = products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);
      setSuggestedProducts(suggestions);
    } else {
      setSuggestedProducts([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    if (location.search === "") {
      setDisplayedProducts(products);
      setSearchTerm("");
    }
  }, [location, products]);

  const handleSearch = () => {
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setDisplayedProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleAddToCart = (productID, productName, productImgSrc, productPrice) => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      dispatch(addProduct({ productID, productName, image: productImgSrc, price: productPrice }));
      const productRef = ref(db, `users/${auth.currentUser.uid}/cart/${productID}`);
      get(productRef).then((snapshot) => {
        if (snapshot.exists()) {
          let currentData = snapshot.val();
          set(productRef, {
            count: currentData.count + 1,
            image: productImgSrc,
            price: productPrice,
          });
        } else {
          set(productRef, {
            count: 1,
            image: productImgSrc,
            price: productPrice,
            name: productName,
          });
        }
      });
    }
  };

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = displayedProducts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-10 px-10">
        <div className="container mx-auto mb-4">
          <h2 className="text-4xl font-bold mb-6 text-left">Explore Flavors</h2>
          <SearchComponent 
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            suggestions={suggestedProducts}
            onSuggestionClick={product => {
              setSearchTerm(product.name);
              setDisplayedProducts([product]);
              setCurrentPage(1);
            }}
          />
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            {productsToShow.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={handleAddToCart}
                socialMediaLinks={socialMediaLinks}
              />
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(index) => {
            setCurrentPage(index + 1);
            window.scrollTo(0, 450);
          }} />
        </div>
      </section>
    </div>
  );
}

export default Products;
